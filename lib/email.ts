/**
 * Server-side only: import from server actions, never from client components.
 *
 * Sends email through Resend's REST API (https://resend.com/docs/api-reference/emails/send-email).
 *
 * Environment variables (set in .env.local locally and on the hosting provider):
 *   RESEND_API_KEY  – API key from https://resend.com/api-keys (required to send)
 *   EMAIL_FROM      – sender on a domain verified in Resend, e.g. "Eram Asacon <noreply@eramasacon.com>"
 *   CONTACT_TO      – inbox that receives contact form enquiries (default info@eramasacon.com)
 */
export const CONTACT_TO = process.env.CONTACT_TO || "info@eramasacon.com";
const EMAIL_FROM = process.env.EMAIL_FROM || "Eram Asacon <noreply@eramasacon.com>";

export function emailConfigured() {
  return Boolean(process.env.RESEND_API_KEY);
}

type Email = { to: string | string[]; subject: string; html: string; text: string; replyTo?: string };

export async function sendEmail({ to, subject, html, text, replyTo }: Email): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY is not set");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: EMAIL_FROM, to, subject, html, text, ...(replyTo ? { reply_to: replyTo } : {}) }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) {
    throw new Error(`Resend responded ${response.status}: ${await response.text()}`);
  }
}

/** Escapes user input before it is placed in an HTML email. */
export function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}
