"use server";

import {
  HONEYPOT_FIELD,
  readProfileRequest,
  validateProfileRequest,
  type ProfileRequestResult,
} from "@/lib/profile-request";
import { CONTACT_TO, emailConfigured, escapeHtml, sendEmail } from "@/lib/email";
import { SITE_URL } from "@/lib/site";
import { companyProfile } from "@/content/site-navigation";

const UNAVAILABLE =
  "Sorry, we couldn't send the profile right now. Please try again later or email us at info@eramasacon.com.";

/** Emails the company profile download link to the person who asked for it (via Resend, lib/email.ts). */
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

/**
 * Emails a download link (the PDF is ~37 MB, too large to attach) to the
 * requester, and notifies CONTACT_TO of the new lead.
 * Returns false when email delivery isn't configured.
 */
async function deliverProfile(fields: { name: string; email: string; company: string }): Promise<boolean> {
  if (!emailConfigured()) {
    // In development the request is logged and treated as sent so the modal
    // can be tested; in production it fails honestly.
    if (process.env.NODE_ENV === "development") {
      console.info("[company profile] RESEND_API_KEY not set; request (not emailed):", fields);
      return true;
    }
    console.error("[company profile] RESEND_API_KEY is not set; request rejected.");
    return false;
  }

  const link = `${SITE_URL}${companyProfile}`;
  const name = escapeHtml(fields.name);
  await sendEmail({
    to: fields.email,
    replyTo: CONTACT_TO,
    subject: "Your Eram Asacon company profile",
    text: `Hello ${fields.name},\n\nThank you for your interest in Eram Asacon. You can download our company profile here:\n${link}\n\nIf you have a project in mind, simply reply to this email or call +966 138656686.\n\nEram Asacon\n#353, 2nd floor, Khobar Mall, King Fahd Road, Al Khobar\nhttps://eramasacon.com`,
    html: `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6;color:#202725;max-width:560px">
  <p>Hello ${name},</p>
  <p>Thank you for your interest in Eram Asacon. Our company profile covers our MEP and HVAC services, fabrication capabilities and recent projects.</p>
  <p style="margin:28px 0"><a href="${link}" style="background:#c5352d;color:#fff;text-decoration:none;padding:14px 24px;font-weight:bold;display:inline-block">Download the company profile (PDF)</a></p>
  <p>If you have a project in mind, simply reply to this email or call <a href="tel:+966138656686" style="color:#c5352d">+966 138656686</a>.</p>
  <p style="margin-top:28px">Eram Asacon<br><span style="color:#6d746b;font-size:13px">#353, 2nd floor, Khobar Mall, King Fahd Road, Al Khobar · <a href="https://eramasacon.com" style="color:#6d746b">eramasacon.com</a></span></p>
</div>`,
  });

  // Lead notification for the team; a failure here must not hide the profile email that already went out.
  try {
    await sendEmail({
      to: CONTACT_TO,
      replyTo: fields.email,
      subject: `Company profile requested by ${fields.name} (${fields.company})`,
      text: `Name: ${fields.name}\nEmail: ${fields.email}\nCompany: ${fields.company}\n\nThe company profile link was emailed to them.`,
      html: `<div style="font-family:Arial,sans-serif;font-size:15px;color:#202725"><h2 style="margin:0 0 12px">Company profile requested</h2><p>Name: <strong>${name}</strong><br>Email: <strong>${escapeHtml(fields.email)}</strong><br>Company: <strong>${escapeHtml(fields.company)}</strong></p><p style="color:#6d746b">The profile download link was emailed to them. Reply to follow up.</p></div>`,
    });
  } catch (error) {
    console.error("[company profile] lead notification failed:", error);
  }
  return true;
}
