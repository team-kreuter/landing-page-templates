import { cookies } from "next/headers";
import crypto from "crypto";

const COOKIE_NAME = "admin_session";
const isDev = process.env.NODE_ENV === "development";

function getPassword(): string | null {
  const pw = process.env.ADMIN_PASSWORD;
  if (pw) return pw;
  // Fallback "admin" only in development
  if (isDev) return "admin";
  return null;
}

function getExpectedToken(): string | null {
  const password = getPassword();
  if (!password) return null;
  return crypto.createHash("sha256").update(password + "__immo-admin__").digest("hex");
}

export function verifyPassword(password: string): boolean {
  const expected = getPassword();
  if (!expected) return false;
  return password === expected;
}

export async function setAuthCookie(): Promise<void> {
  const token = getExpectedToken();
  if (!token) return;
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, // 24h
  });
}

export async function clearAuthCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function isAuthenticated(): Promise<boolean> {
  const expected = getExpectedToken();
  if (!expected) return false;
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return token === expected;
}
