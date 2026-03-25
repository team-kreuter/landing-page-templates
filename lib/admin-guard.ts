import { NextResponse } from "next/server";

const isDev = process.env.NODE_ENV === "development";

export function requireDevMode(): NextResponse | null {
  if (!isDev) {
    return NextResponse.json(
      { error: "Änderungen sind nur im lokalen Entwicklungsmodus möglich. Bitte nutze 'npm run dev' lokal." },
      { status: 403 }
    );
  }
  return null;
}
