exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Method Not Allowed" }) };
  }

  try {
    const { from_name, from_email, phone, service, message } = JSON.parse(event.body || "{}");

    if (!from_name || !from_email || !phone || !service || !message) {
      return { statusCode: 400, body: JSON.stringify({ error: "All fields are required." }) };
    }

    const SERVICE_ID = process.env.EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY;
    const PRIVATE_KEY = process.env.EMAILJS_PRIVATE_KEY;

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY || !PRIVATE_KEY) {
      console.error("Missing EmailJS env vars");
      return { statusCode: 500, body: JSON.stringify({ error: "Server configuration error." }) };
    }

    // Call EmailJS REST API directly - no package needed
    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: SERVICE_ID,
        template_id: TEMPLATE_ID,
        user_id: PUBLIC_KEY,
        accessToken: PRIVATE_KEY,
        template_params: { from_name, from_email, phone, service, message },
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("EmailJS API error:", text);
      return { statusCode: 500, body: JSON.stringify({ error: "EmailJS rejected the request." }) };
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    console.error("Function error:", err);
    return { statusCode: 500, body: JSON.stringify({ error: "Failed to send email." }) };
  }
};
