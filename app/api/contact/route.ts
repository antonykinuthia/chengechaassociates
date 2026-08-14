// import { NextRequest, NextResponse } from "next/server";
// import * as brevo from "@getbrevo/brevo";

// export async function POST(req: NextRequest) {
//   try {
//     const { name, email, message } = await req.json();

//     if (!name || !email || !message) {
//       return NextResponse.json({ error: "Missing fields" }, { status: 400 });
//     }

//     const apiInstance = new brevo.TransactionalEmailsApi();
//     apiInstance.setApiKey(
//       brevo.TransactionalEmailsApiApiKeys.apiKey,
//       process.env.BREVO_API_KEY!
//     );

//     const sendSmtpEmail = new brevo.SendSmtpEmail();
//     sendSmtpEmail.subject = `New enquiry from ${name} — Chengecha Associates`;
//     sendSmtpEmail.htmlContent = `
//       <h3>New contact form submission</h3>
//       <p><strong>Name:</strong> ${name}</p>
//       <p><strong>Email:</strong> ${email}</p>
//       <p><strong>Message:</strong></p>
//       <p>${message.replace(/\n/g, "<br/>")}</p>
//     `;
//     sendSmtpEmail.sender = {
//       name: "Chengecha Associates Website",
//       email: process.env.BREVO_SENDER_EMAIL!,
//     };
//     sendSmtpEmail.to = [{ email: process.env.CONTACT_RECEIVER_EMAIL! }];
//     sendSmtpEmail.replyTo = { email, name };

//     await apiInstance.sendTransacEmail(sendSmtpEmail);

//     return NextResponse.json({ success: true });
//   } catch (err) {
//     console.error("Brevo send error:", err);
//     return NextResponse.json({ error: "Failed to send" }, { status: 500 });
//   }
// }