import CryptoJS from "crypto-js";

const OTP_SECRET = process.env.OTP_SECRET || "default-secret-change-me";
const OTP_EXPIRY_MINUTES = 10;

export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function createOTPHash(identifier: string, otp: string): string {
  const expiry = Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000;
  const data = `${identifier}.${otp}.${expiry}`;
  const hash = CryptoJS.HmacSHA256(data, OTP_SECRET).toString();
  return `${hash}.${expiry}`;
}

export function verifyOTP(identifier: string, otp: string, hash: string): boolean {
  const [originalHash, expiryStr] = hash.split(".");
  const expiry = parseInt(expiryStr, 10);

  if (Date.now() > expiry) return false;

  const data = `${identifier}.${otp}.${expiry}`;
  const expectedHash = CryptoJS.HmacSHA256(data, OTP_SECRET).toString();

  return originalHash === expectedHash;
}
