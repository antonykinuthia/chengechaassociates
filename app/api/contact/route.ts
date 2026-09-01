import { NextRequest, NextResponse } from "next/server";
import { BrevoClient } from "@getbrevo/brevo";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

const client = new BrevoClient({
  apiKey: requireEnv("BREVO_API_KEY"),
});

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    await client.transactionalEmails.sendTransacEmail({
      subject: `New enquiry from ${name} — Chengecha & Associates`,
      htmlContent: `
        <h3>New contact form submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br/>")}</p>
      `,
      sender: {
        name: "Chengecha & Associates Website",
        email: requireEnv("BREVO_SENDER_EMAIL"),
      },
      to: [{ email: requireEnv("CONTACT_RECEIVER_EMAIL") }],
      replyTo: { email, name },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Brevo send error:", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}