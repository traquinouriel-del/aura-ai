const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const GROQ_ENDPOINT = "https://api.groq.com/openai/v1/chat/completions";

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const { systemPrompt, userPrompt, temperature, maxTokens, imageBase64 } = await req.json();

    if (!userPrompt || typeof userPrompt !== "string") {
      return new Response(JSON.stringify({ error: "userPrompt is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const apiKey = Deno.env.get("GROQ_API_KEY");
    if (!apiKey) {
      console.error("[sedux-generate] GROQ_API_KEY not configured");
      return new Response(JSON.stringify({ error: "Model provider not configured", kind: "auth" }), {
        status: 503,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const modelId = Deno.env.get("SEDUX_MODEL_ID");
    if (!modelId) {
      console.error("[sedux-generate] SEDUX_MODEL_ID not configured");
      return new Response(JSON.stringify({ error: "Model not configured. Set SEDUX_MODEL_ID to a Groq model identifier." }), {
        status: 503,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const messages: Array<Record<string, unknown>> = [
      { role: "system", content: systemPrompt ?? "" },
    ];

    if (imageBase64) {
      messages.push({
        role: "user",
        content: [
          { type: "text", text: userPrompt },
          {
            type: "image_url",
            image_url: { url: `data:image/jpeg;base64,${imageBase64}` },
          },
        ],
      });
    } else {
      messages.push({ role: "user", content: userPrompt });
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30_000);

    let resp: Response;
    try {
      resp = await fetch(GROQ_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: modelId,
          messages,
          temperature: temperature ?? 0.8,
          max_tokens: maxTokens ?? 1024,
        }),
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timeout);
    }

    if (!resp.ok) {
      const errBody = await resp.text();
      console.error("[sedux-generate] Groq error:", resp.status, errBody);
      const kind =
        resp.status === 401 || resp.status === 403 ? "auth"
        : resp.status === 429 ? "rate_limit"
        : resp.status >= 500 ? "network"
        : "unknown";
      return new Response(
        JSON.stringify({ error: "Provider error", kind, status: resp.status }),
        { status: resp.status, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const data = await resp.json();
    const text = data?.choices?.[0]?.message?.content ?? "";
    const tokensUsed = data?.usage?.total_tokens ?? 0;

    return new Response(
      JSON.stringify({ text, tokensUsed }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("[sedux-generate] Error:", err);
    const isTimeout = err instanceof DOMException && err.name === "AbortError";
    return new Response(
      JSON.stringify({ error: isTimeout ? "Request timed out" : "Internal error", kind: isTimeout ? "timeout" : "unknown" }),
      { status: isTimeout ? 504 : 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
