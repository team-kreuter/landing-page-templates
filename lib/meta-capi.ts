import trackingData from "@/data/tracking.json";
import crypto from "crypto";

interface CAPIEventData {
  eventName: string;
  eventTime?: number;
  userData: {
    email?: string;
    phone?: string;
    clientIpAddress?: string;
    clientUserAgent?: string;
    fbc?: string;
    fbp?: string;
  };
  customData?: Record<string, unknown>;
  eventSourceUrl?: string;
  actionSource?: string;
}

function hashValue(value: string): string {
  return crypto.createHash("sha256").update(value.toLowerCase().trim()).digest("hex");
}

export async function sendCAPIEvent(data: CAPIEventData) {
  const config = trackingData.metaPixel;

  if (!config.enabled || !config.capiToken || !config.capiPixelId) {
    console.warn("Meta CAPI not configured - skipping event:", data.eventName);
    return null;
  }

  const eventData: Record<string, unknown> = {
    event_name: data.eventName,
    event_time: data.eventTime || Math.floor(Date.now() / 1000),
    action_source: data.actionSource || "website",
    event_source_url: data.eventSourceUrl,
    user_data: {
      em: data.userData.email ? [hashValue(data.userData.email)] : undefined,
      ph: data.userData.phone ? [hashValue(data.userData.phone.replace(/\D/g, ""))] : undefined,
      client_ip_address: data.userData.clientIpAddress,
      client_user_agent: data.userData.clientUserAgent,
      fbc: data.userData.fbc,
      fbp: data.userData.fbp,
    },
    custom_data: data.customData,
  };

  try {
    const response = await fetch(
      `https://graph.facebook.com/v21.0/${config.capiPixelId}/events`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: [eventData],
          access_token: config.capiToken,
        }),
      }
    );

    const result = await response.json();
    if (!response.ok) {
      console.error("Meta CAPI error:", result);
    }
    return result;
  } catch (error) {
    console.error("Meta CAPI request failed:", error);
    return null;
  }
}
