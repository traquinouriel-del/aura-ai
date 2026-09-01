import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") ?? "";
const RESEND_FROM = Deno.env.get("RESEND_FROM_EMAIL") ?? "Aura <no-reply@aura-ae.com>";
const ADMIN_EMAIL = "traquinouriel@gmail.com";
const APP_URL = Deno.env.get("APP_URL") ?? "https://aura-ae.com";

function buildTicketHtml(subject: string, message: string, fromEmail: string | null, category: string | null): string {
  return `<!DOCTYPE html>
<html lang="pt">
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:20px;background:#0a0a0f;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
<table width="560" cellpadding="0" cellspacing="0" style="background:#12121a;border:1px solid #1e1e2e;border-radius:16px;max-width:560px;width:100%;">
<tr><td style="padding:24px 32px;border-bottom:1px solid #1e1e2e;">
<h2 style="margin:0;font-size:18px;color:#f8fafc;">Novo Relatório de Suporte — Aura</h2>
</td></tr>
<tr><td style="padding:24px 32px;">
<p style="margin:0 0 16px 0;font-size:14px;color:#94a3b8;">De: <strong style="color:#cbd5e1;">${fromEmail ?? "Utilizador anónimo"}</strong></p>
${category ? `<p style="margin:0 0 16px 0;font-size:14px;color:#94a3b8;">Categoria: <strong style="color:#cbd5e1;">${category}</strong></p>` : ""}
<p style="margin:0 0 16px 0;font-size:14px;color:#94a3b8;">Assunto: <strong style="color:#cbd5e1;">${subject}</strong></p>
<div style="background:#1a1a2e;border-radius:12px;padding:20px;margin:16px 0;">
<p style="margin:0;font-size:14px;line-height:1.6;color:#e2e8f0;white-space:pre-wrap;">${message}</p>
</div>
</td></tr>
<tr><td style="padding:16px 32px;border-top:1px solid #1e1e2e;">
<p style="margin:0;font-size:12px;color:#475569;">Enviado via painel de suporte Aura — ${APP_URL}</p>
</td></tr>
</table>
</body>
</html>`;
}

function buildTicketText(subject: string, message: string, fromEmail: string | null, category: string | null): string {
  return `Novo Relatório de Suporte — Aura

De: ${fromEmail ?? "Utilizador anónimo"}
Categoria: ${category ?? "N/A"}
Assunto: ${subject}

${message}

---
Enviado via painel de suporte Aura — ${APP_URL}`;
}

async function sendTicketEmail(subject: string, message: string, fromEmail: string | null, category: string | null): Promise<boolean> {
  if (!RESEND_API_KEY) {
    console.warn("[send-support-ticket] RESEND_API_KEY not configured — skipping email. Ticket stored in DB only.");
    return false;
  }
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: RESEND_FROM,
        to: ADMIN_EMAIL,
        subject: `[Suporte Aura] ${category ? `[${category}] ` : ""}${subject}`,
        html: buildTicketHtml(subject, message, fromEmail, category),
        text: buildTicketText(subject, message, fromEmail, category),
      }),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      console.error("[send-support-ticket] Resend error:", res.status, errText);
      return false;
    }
    return true;
  } catch (err) {
    clearTimeout(timeoutId);
    console.error("[send-support-ticket] Resend fetch failed:", err);
    return false;
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { subject, message, email, visitorId, userId, category } = await req.json();

    if (!subject || typeof subject !== "string" || !subject.trim()) {
      return new Response(JSON.stringify({ error: "Subject is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!message || typeof message !== "string" || !message.trim()) {
      return new Response(JSON.stringify({ error: "Message is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const supabase = createClient(supabaseUrl, serviceKey);

    const { error: insertError } = await supabase.from("support_tickets").insert({
      subject: subject.trim().slice(0, 200),
      message: message.trim().slice(0, 5000),
      category: (category || null) as string | null,
      email: email?.trim() || null,
      visitor_id: visitorId || null,
      user_id: userId || null,
    });

    if (insertError) {
      console.error("[send-support-ticket] DB insert error:", insertError);
      return new Response(JSON.stringify({ error: "Failed to save ticket" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const emailSent = await sendTicketEmail(subject.trim(), message.trim(), email?.trim() || null, category || null);

    return new Response(JSON.stringify({ ok: true, emailSent }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("[send-support-ticket] Error:", err);
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
