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

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { email, code, password, firstName } = await req.json();
    if (!email || !code) {
      return new Response(JSON.stringify({ error: "Email and code are required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const normalized = email.trim().toLowerCase();
    const codeStr = String(code).trim();

    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const supabase = createClient(supabaseUrl, serviceKey);

    const now = new Date();

    const { data: otpRows } = await supabase
      .from("aura_otps")
      .select("id, code_hash, expires_at, consumed_at, attempt_count")
      .eq("email", normalized)
      .is("consumed_at", null)
      .order("created_at", { ascending: false })
      .limit(1);

    const otp = otpRows?.[0];
    if (!otp) {
      return new Response(JSON.stringify({ error: "Invalid or expired code" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (otp.attempt_count >= 5) {
      return new Response(JSON.stringify({ error: "Too many attempts. Please request a new code." }), {
        status: 429,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const expiresAt = new Date(otp.expires_at);
    if (now > expiresAt) {
      return new Response(JSON.stringify({ error: "Code expired. Please request a new code." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const inputHash = await sha256(codeStr);
    if (inputHash !== otp.code_hash) {
      await supabase
        .from("aura_otps")
        .update({ attempt_count: otp.attempt_count + 1 })
        .eq("id", otp.id);
      return new Response(JSON.stringify({ error: "Invalid code" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    await supabase
      .from("aura_otps")
      .update({ consumed_at: now.toISOString() })
      .eq("id", otp.id);

    const { data: existingProfile, error: profileLookupError } = await supabase
      .from("profiles")
      .select("id")
      .eq("email", normalized)
      .maybeSingle();

    if (profileLookupError) {
      console.error("[verify-aura-otp] profile lookup error:", profileLookupError);
      return new Response(JSON.stringify({ error: "Internal error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let userId: string;
    let isNewUser = false;

    if (existingProfile?.id) {
      userId = existingProfile.id;
      if (password && typeof password === "string" && password.length >= 6) {
        await supabase.auth.admin.updateUserById(userId, { password });
      }
    } else {
      const createParams: Record<string, unknown> = {
        email: normalized,
        email_confirm: true,
      };
      if (password && typeof password === "string" && password.length >= 6) {
        createParams.password = password;
      }
      const { data: newUser, error: createError } = await supabase.auth.admin.createUser(createParams);
      if (createError || !newUser) {
        console.error("[verify-aura-otp] createUser error:", createError);
        return new Response(JSON.stringify({ error: "Failed to create account" }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      userId = newUser.id;
      isNewUser = true;
    }

    // Create profile row for new users (service role bypasses RLS)
    if (isNewUser) {
      const display = firstName || null;
      const { error: profError } = await supabase
        .from("profiles")
        .insert({
          id: userId,
          email: normalized,
          display_name: display,
          first_name: firstName || null,
        });
      if (profError) {
        console.error("[verify-aura-otp] profile insert error:", profError);
      }
    }

    return new Response(JSON.stringify({ ok: true, userId, email: normalized }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("[verify-aura-otp] Error:", err);
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
