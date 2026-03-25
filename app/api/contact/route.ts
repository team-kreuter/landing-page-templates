import { NextRequest, NextResponse } from "next/server";
import { sendCAPIEvent } from "@/lib/meta-capi";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, message } = body;

    if (!name || !email || !phone) {
      return NextResponse.json({ error: "Bitte füllen Sie alle Pflichtfelder aus." }, { status: 400 });
    }

    // Here you would typically save to a database or send an email notification
    // For the template, we just log it
    console.log("New contact form submission:", { name, email, phone, message });

    // Send Lead event to Meta CAPI
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "";
    const ua = req.headers.get("user-agent") || "";
    const cookies = req.headers.get("cookie") || "";

    // Extract fbp and fbc from cookies
    const fbpMatch = cookies.match(/_fbp=([^;]+)/);
    const fbcMatch = cookies.match(/_fbc=([^;]+)/);

    await sendCAPIEvent({
      eventName: "Lead",
      userData: {
        email,
        phone,
        clientIpAddress: ip,
        clientUserAgent: ua,
        fbp: fbpMatch?.[1],
        fbc: fbcMatch?.[1],
      },
      customData: {
        lead_name: name,
      },
      eventSourceUrl: req.headers.get("referer") || undefined,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Ein Fehler ist aufgetreten." }, { status: 500 });
  }
}
