import dotenv from "dotenv";

dotenv.config();

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, subject, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Please provide name, email and message" });
  }

  const serviceId = process.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = process.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    return res.status(200).json({
      success: true,
      message: "Thank you! Your message was received. The live email delivery is not configured yet, so this demo uses a safe fallback response.",
    });
  }

  try {
    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        template_params: {
          from_name: name,
          from_email: email,
          reply_to: email,
          subject: subject || "Portfolio Contact Form Message",
          message,
          to_email: "psehan12@gmail.com",
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`EmailJS returned ${response.status}`);
    }

    return res.status(200).json({
      success: true,
      message: "Thank you! Your message has been sent successfully to Pasindu's inbox.",
    });
  } catch (error) {
    console.error("Email delivery failed", error);
    return res.status(500).json({
      error: "Failed to dispatch email. Please contact psehan12@gmail.com directly.",
    });
  }
}
