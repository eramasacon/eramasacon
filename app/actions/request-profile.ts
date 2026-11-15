"use server";

import {
  HONEYPOT_FIELD,
  readProfileRequest,
  validateProfileRequest,
  type ProfileRequestResult,
} from "@/lib/profile-request";

const UNAVAILABLE =
  "Sorry, we couldn't send the profile right now. Please try again later or email us at info@eramasacon.com.";

/**
 * Emails the company profile PDF to the person who asked for it.
 *
 * TODO(email): the delivery step is not wired up yet. Once the sender address
 * and Resend setup are confirmed, send the PDF (content/site-navigation.ts →
 * companyProfile) to `fields.email` inside `deliverProfile` below.
 */
export async function requestCompanyProfile(data: FormData): Promise<ProfileRequestResult> {
  // Bots fill every field; pretend it worked so they don't retry.
  if (data.get(HONEYPOT_FIELD)) return { ok: true, message: successMessage("") };

  const fields = readProfileRequest(data);
  const fieldErrors = validateProfileRequest(fields);
  if (Object.keys(fieldErrors).length) {
    return { ok: false, message: "Please check the highlighted fields.", fieldErrors };
  }

  try {
    const delivered = await deliverProfile(fields);
    if (!delivered) return { ok: false, message: UNAVAILABLE };
  } catch (error) {
    console.error("[company profile] delivery failed:", error);
    return { ok: false, message: UNAVAILABLE };
  }
  return { ok: true, message: successMessage(fields.email) };
}

function successMessage(email: string) {
  return email
    ? `Thanks! We've sent the company profile to ${email}. It should arrive in a few minutes.`
    : "Thanks! The company profile is on its way to your inbox.";
}

/** Returns false when email delivery isn't configured. */
async function deliverProfile(fields: { name: string; email: string; company: string }): Promise<boolean> {
  // Placeholder until email sending is set up. In development the request is
  // logged and treated as sent so the modal flow can be tested end to end;
  // in production it fails honestly instead of claiming an email went out.
  if (process.env.NODE_ENV === "development") {
    console.info("[company profile] email sending not configured yet; request:", fields);
    return true;
  }
  console.error("[company profile] email sending is not configured; request rejected.");
  return false;
}
