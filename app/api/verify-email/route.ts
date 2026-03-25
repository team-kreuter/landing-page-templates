import { NextRequest, NextResponse } from "next/server";
import { generateOTP, createOTPHash, verifyOTP } from "@/lib/otp";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, action, otp, hash } = body;

  // Verify OTP
  if (action === "verify") {
    if (!email || !otp || !hash) {
      return NextResponse.json({ error: "Fehlende Daten" }, { status: 400 });
    }
    const valid = verifyOTP(email, otp, hash);
    return NextResponse.json({ verified: valid });
  }

  // Send OTP
  if (!email || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/.test(email)) {
    return NextResponse.json({ error: "Ungültige E-Mail-Adresse" }, { status: 400 });
  }

  const code = generateOTP();
  const otpHash = createOTPHash(email, code);

  // If SMTP is configured, send email
  const smtpHost = process.env.SMTP_HOST;
  if (smtpHost) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: process.env.SMTP_PORT === "465",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: email,
        subject: "Ihr Bestätigungscode",
        text: `Ihr Bestätigungscode lautet: ${code}\n\nDer Code ist 10 Minuten gültig.`,
        html: `
          <div style="font-family: sans-serif; max-width: 400px; margin: 0 auto;">
            <h2>Bestätigungscode</h2>
            <p>Ihr Code lautet:</p>
            <p style="font-size: 32px; font-weight: bold; letter-spacing: 4px; color: #2563eb;">${code}</p>
            <p style="color: #64748b; font-size: 14px;">Der Code ist 10 Minuten gültig.</p>
          </div>
        `,
      });
    } catch (error) {
      console.error("Email send error:", error);
      return NextResponse.json({ error: "E-Mail konnte nicht gesendet werden" }, { status: 500 });
    }
  } else {
    // SMTP not configured - log code for development
    console.log(`[DEV] Email OTP for ${email}: ${code}`);
  }

  return NextResponse.json({ hash: otpHash, sent: !!smtpHost });
}
