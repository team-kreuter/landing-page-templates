import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin-auth";
import nodemailer from "nodemailer";
import fs from "fs/promises";
import path from "path";

export async function POST() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
  }

  try {
    const configPath = path.join(process.cwd(), "data", "email.json");
    const config = JSON.parse(await fs.readFile(configPath, "utf-8"));

    if (!config.smtp.host || !config.to) {
      return NextResponse.json({ error: "SMTP-Host und Empfänger müssen konfiguriert sein." }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: config.smtp.host,
      port: config.smtp.port,
      secure: config.smtp.secure,
      auth: {
        user: config.smtp.user,
        pass: config.smtp.password,
      },
    });

    await transporter.sendMail({
      from: `"${config.from.name}" <${config.from.email || config.smtp.user}>`,
      to: config.to,
      subject: "Test-E-Mail – Konfiguration erfolgreich!",
      text: "Diese Test-E-Mail bestätigt, dass die SMTP-Konfiguration korrekt ist.",
      html: '<div style="font-family:system-ui,sans-serif;max-width:500px;margin:0 auto;padding:20px"><h2 style="color:#22c55e">Test erfolgreich!</h2><p>Die SMTP-Konfiguration ist korrekt. Kontaktformular-Einreichungen werden ab jetzt an diese Adresse gesendet.</p></div>',
    });

    return NextResponse.json({ message: "Test-E-Mail erfolgreich gesendet!" });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unbekannter Fehler";
    console.error("Test email error:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
