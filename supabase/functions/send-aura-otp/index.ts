import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

async function sha256(text: string): Promise<string> {
  const data = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function generateCode(): string {
  const arr = new Uint32Array(1);
  crypto.getRandomValues(arr);
  return String(arr[0] % 1000000).padStart(6, "0");
}

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") ?? "";
const RESEND_FROM = Deno.env.get("RESEND_FROM_EMAIL") ?? "Aura AI <no-reply@aura-ai.app>";
const APP_URL = Deno.env.get("APP_URL") ?? "https://aura-ai.app";

function buildEmailHtml(code: string): string {
  return `<!DOCTYPE html>
<html lang="pt">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Aura AI — Código de Verificação</title>
</head>
<body style="margin:0;padding:0;background:#0a0a0f;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0f;min-height:100vh;">
<tr>
<td align="center" style="padding:40px 20px;">
<table width="500" cellpadding="0" cellspacing="0" style="background:#12121a;border:1px solid #1e1e2e;border-radius:24px;overflow:hidden;max-width:500px;width:100%;">

<tr>
<td align="center" style="padding:48px 40px 0 40px;">
<table cellpadding="0" cellspacing="0">
<tr>
<td style="width:64px;height:64px;border-radius:18px;background:linear-gradient(135deg,#0f172a,#334155,#475569);text-align:center;vertical-align:middle;box-shadow:0 8px 24px -4px rgba(71,85,105,0.4);">
<span style="font-size:32px;font-weight:800;color:#fff;display:block;line-height:64px;letter-spacing:-1px;">A</span>
</td>
</tr>
</table>
</td>
</tr>

<tr>
<td align="center" style="padding:20px 40px 0 40px;">
<h1 style="margin:0;font-size:26px;font-weight:800;color:#f8fafc;letter-spacing:-0.5px;">Aura AI</h1>
<p style="margin:6px 0 0 0;font-size:14px;color:#94a3b8;">O teu assistente de comunicação</p>
</td>
</tr>

<tr>
<td style="padding:36px 40px 0 40px;">
<p style="margin:0 0 8px 0;font-size:16px;line-height:1.6;color:#cbd5e1;">
Olá! Bem-vindo à <strong style="color:#f8fafc;">Aura AI</strong>.
</p>
<p style="margin:0 0 28px 0;font-size:15px;line-height:1.6;color:#94a3b8;">
Usa o código abaixo para confirmar o teu e-mail. Este código é válido durante <strong style="color:#f8fafc;">10 minutos</strong>.
</p>

<table width="100%" cellpadding="0" cellspacing="0">
<tr>
<td align="center" style="background:#1a1a2e;border:2px solid #475569;border-radius:16px;padding:32px 20px;">
<span style="font-size:42px;font-weight:800;color:#f8fafc;letter-spacing:10px;font-family:'SF Mono','Courier New',monospace;">${code}</span>
</td>
</tr>
</table>
</td>
</tr>

<tr>
<td style="padding:24px 40px 0 40px;">
<p style="margin:0;font-size:13px;line-height:1.5;color:#64748b;">
Se não foste tu a pedir este código, podes ignorar este e-mail com segurança. A tua conta está protegida.
</p>
</td>
</tr>

<tr>
<td style="padding:32px 40px 40px 40px;">
<table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #1e1e2e;">
<tr>
<td style="padding-top:24px;text-align:center;">
<p style="margin:0;font-size:12px;color:#475569;">
<strong style="color:#64748b;">Aura AI</strong> — Comunica com confiança<br>
${APP_URL}
</p>
</td>
</tr>
</table>
</td>
</tr>

</table>
</td>
</tr>
</table>
</body>
</html>`;
}

function buildEmailText(code: string): string {
  return `Aura AI — Código de Verificação

Olá! Bem-vindo à Aura AI.

Usa o código abaixo para confirmar o teu e-mail. Este código é válido durante 10 minutos.

Código: ${code}

Se não foste tu a pedir este código, podes ignorar este e-mail com segurança.

Aura AI — Comunica com confiança
${APP_URL}`;
}

async function sendEmail(to: string, code: string): Promise<boolean> {
  if (!RESEND_API_KEY) {
    console.warn("[send-aura-otp] RESEND_API_KEY not configured — skipping email send. Code:", code);
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
        to,
        subject: "Aura AI — O teu código de verificação",
        html: buildEmailHtml(code),
        text: buildEmailText(code),
      }),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      console.error("[send-aura-otp] Resend error:", res.status, errText);
      return false;
    }
    return true;
  } catch (err) {
    clearTimeout(timeoutId);
    console.error("[send-aura-otp] Resend fetch failed:", err);
    return false;
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { email, shouldCreateUser } = await req.json();
    if (!email || typeof email !== "string") {
      return new Response(JSON.stringify({ error: "Email is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const normalized = email.trim().toLowerCase();
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(normalized)) {
      return new Response(JSON.stringify({ error: "Invalid email" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const supabase = createClient(supabaseUrl, serviceKey);

    if (shouldCreateUser === false) {
      const { data: existing } = await supabase
        .from("profiles")
        .select("id")
        .eq("email", normalized)
        .maybeSingle();
      if (!existing) {
        const { data: authUser } = await supabase.auth.admin
          .listUsers()
          .then((r) => r.data.users.find((u) => u.email === normalized) ?? null)
          .catch(() => null);
        if (!authUser) {
          return new Response(JSON.stringify({ error: "User not found" }), {
            status: 404,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
      }
    }

    const now = new Date();
    const tenMinAgo = new Date(now.getTime() - 10 * 60 * 1000);
    const { count: recentCount } = await supabase
      .from("aura_otps")
      .select("id", { count: "exact", head: true })
      .eq("email", normalized)
      .gte("created_at", tenMinAgo.toISOString());

    if (recentCount && recentCount >= 3) {
      return new Response(JSON.stringify({ error: "Too many requests. Please wait before requesting another code." }), {
        status: 429,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const code = generateCode();
    const codeHash = await sha256(code);
    const expiresAt = new Date(now.getTime() + 10 * 60 * 1000);

    const { error: insertError } = await supabase.from("aura_otps").insert({
      email: normalized,
      code_hash: codeHash,
      expires_at: expiresAt.toISOString(),
    });

    if (insertError) {
      console.error("[send-aura-otp] DB insert error:", insertError);
      return new Response(JSON.stringify({ error: "Failed to generate code" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const emailSent = await sendEmail(normalized, code);

    return new Response(JSON.stringify({ ok: true, emailSent }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("[send-aura-otp] Error:", err);
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
