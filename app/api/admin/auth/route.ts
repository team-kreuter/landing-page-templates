import { NextRequest, NextResponse } from "next/server";
import { verifyPassword, setAuthCookie, clearAuthCookie } from "@/lib/admin-auth";

export async function POST(req: NextRequest) {
  try {
    const { password, action } = await req.json();

    if (action === "logout") {
      await clearAuthCookie();
      return NextResponse.json({ success: true });
    }

    if (!verifyPassword(password)) {
      return NextResponse.json({ error: "Falsches Passwort" }, { status: 401 });
    }

    await setAuthCookie();
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Fehler bei der Anmeldung" }, { status: 500 });
  }
}
