import { NextRequest, NextResponse } from "next/server";
import { sendCAPIEvent } from "@/lib/meta-capi";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { eventName, userData, customData, eventSourceUrl } = body;

    if (!eventName) {
      return NextResponse.json({ error: "eventName required" }, { status: 400 });
    }

    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "";
    const ua = req.headers.get("user-agent") || "";

    const result = await sendCAPIEvent({
      eventName,
      userData: {
        ...userData,
        clientIpAddress: ip,
        clientUserAgent: ua,
      },
      customData,
      eventSourceUrl: eventSourceUrl || req.headers.get("referer") || undefined,
    });

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("CAPI error:", error);
    return NextResponse.json({ error: "Failed to send event" }, { status: 500 });
  }
}
