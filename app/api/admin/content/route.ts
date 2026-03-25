import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin-auth";
import { requireDevMode } from "@/lib/admin-guard";
import fs from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const ALLOWED_PAGES = ["leadsgenerierung"];

export async function GET(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
  }

  const page = req.nextUrl.searchParams.get("page");
  if (!page || !ALLOWED_PAGES.includes(page)) {
    return NextResponse.json({ error: "Ungültige Seite" }, { status: 400 });
  }

  try {
    const filePath = path.join(DATA_DIR, `${page}.json`);
    const data = await fs.readFile(filePath, "utf-8");
    return NextResponse.json(JSON.parse(data));
  } catch {
    return NextResponse.json({ error: "Datei nicht gefunden" }, { status: 404 });
  }
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
  }

  const blocked = requireDevMode();
  if (blocked) return blocked;

  try {
    const { page, data } = await req.json();
    if (!page || !ALLOWED_PAGES.includes(page)) {
      return NextResponse.json({ error: "Ungültige Seite" }, { status: 400 });
    }

    const filePath = path.join(DATA_DIR, `${page}.json`);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Content save error:", error);
    return NextResponse.json({ error: "Fehler beim Speichern" }, { status: 500 });
  }
}
