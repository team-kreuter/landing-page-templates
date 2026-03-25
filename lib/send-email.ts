import nodemailer from "nodemailer";
import emailConfig from "@/data/email.json";

interface ContactData {
  name: string;
  email: string;
  phone?: string;
  position?: string;
  message: string;
}

export async function sendContactEmail(data: ContactData): Promise<boolean> {
  if (!emailConfig.enabled || !emailConfig.smtp.host || !emailConfig.to) {
    console.log("Email not configured - skipping send");
    return false;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: emailConfig.smtp.host,
      port: emailConfig.smtp.port,
      secure: emailConfig.smtp.secure,
      auth: {
        user: emailConfig.smtp.user,
        pass: emailConfig.smtp.password,
      },
    });

    const lines = [
      `Name: ${data.name}`,
      `E-Mail: ${data.email}`,
      data.phone ? `Telefon: ${data.phone}` : null,
      data.position ? `Position: ${data.position}` : null,
      ``,
      `Nachricht:`,
      data.message,
    ].filter((l) => l !== null);

    const htmlLines = [
      `<h2>Neue Anfrage über das Kontaktformular</h2>`,
      `<table style="border-collapse:collapse;width:100%;max-width:600px">`,
      `<tr><td style="padding:8px 12px;border:1px solid #e5e5e5;font-weight:600;width:120px">Name</td><td style="padding:8px 12px;border:1px solid #e5e5e5">${data.name}</td></tr>`,
      `<tr><td style="padding:8px 12px;border:1px solid #e5e5e5;font-weight:600">E-Mail</td><td style="padding:8px 12px;border:1px solid #e5e5e5"><a href="mailto:${data.email}">${data.email}</a></td></tr>`,
      data.phone ? `<tr><td style="padding:8px 12px;border:1px solid #e5e5e5;font-weight:600">Telefon</td><td style="padding:8px 12px;border:1px solid #e5e5e5"><a href="tel:${data.phone}">${data.phone}</a></td></tr>` : null,
      data.position ? `<tr><td style="padding:8px 12px;border:1px solid #e5e5e5;font-weight:600">Position</td><td style="padding:8px 12px;border:1px solid #e5e5e5">${data.position}</td></tr>` : null,
      `</table>`,
      `<h3 style="margin-top:20px">Nachricht</h3>`,
      `<p style="white-space:pre-wrap;background:#f9f9f9;padding:12px;border-radius:8px">${data.message}</p>`,
    ].filter((l) => l !== null);

    await transporter.sendMail({
      from: `"${emailConfig.from.name}" <${emailConfig.from.email || emailConfig.smtp.user}>`,
      to: emailConfig.to,
      replyTo: emailConfig.replyTo ? data.email : undefined,
      subject: emailConfig.subject || "Neue Anfrage über das Kontaktformular",
      text: lines.join("\n"),
      html: htmlLines.join("\n"),
    });

    console.log("Contact email sent to:", emailConfig.to);
    return true;
  } catch (error) {
    console.error("Failed to send email:", error);
    return false;
  }
}
