"use server";

import { readFields, SERVICE_OPTIONS, SUCCESS_MESSAGE, validate, type FieldErrors } from "@/lib/contact-form";
import { CONTACT_TO, emailConfigured, escapeHtml, sendEmail } from "@/lib/email";

export type ContactResult = { ok: true; message: string } | { ok: false; message: string; fieldErrors?: FieldErrors };

const NOT_CONFIGURED =
  "Sorry, the form could not be sent right now. Please email us at info@eramasacon.com or call +966 138656686.";

/**
 * Handles the contact form: emails each enquiry to CONTACT_TO via Resend
 * (see lib/email.ts), with Reply-To set to the visitor.
 */
export async function submitContactForm(data: FormData): Promise<ContactResult> {
  const fields = readFields(data);
  const fieldErrors = validate(fields);
  if (Object.keys(fieldErrors).length) {
    return { ok: false, message: "Please check the highlighted fields.", fieldErrors };
  }

  const submission = {
    form: "contact",
    submittedAt: new Date().toISOString(),
    name: fields.Name,
    email: fields.Email,
    phone: fields.Phone_number,
    service: SERVICE_OPTIONS.find((o) => o.value === fields.Services)?.label ?? "",
    message: fields.Message,
  };

  if (!emailConfigured()) {
    if (process.env.NODE_ENV === "development") {
      console.info("[contact form] RESEND_API_KEY not set; submission (not emailed):", submission);
      return { ok: true, message: SUCCESS_MESSAGE };
    }
    console.error("[contact form] RESEND_API_KEY is not set; submission rejected.");
    return { ok: false, message: NOT_CONFIGURED };
  }

  const rows: [string, string][] = [
    ["Name", submission.name],
    ["Email", submission.email],
    ["Phone", submission.phone],
    ["Service", submission.service || "Not specified"],
  ];
  try {
    await sendEmail({
      to: CONTACT_TO,
      replyTo: submission.email, // "Reply" in the inbox answers the visitor directly
      subject: `New website enquiry from ${submission.name}${submission.service ? ` – ${submission.service}` : ""}`,
      text: `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\nMessage:\n${submission.message}\n\nSent from the contact form on eramasacon.com`,
      html: `<div style="font-family:Arial,sans-serif;font-size:15px;color:#202725">
  <h2 style="margin:0 0 16px">New website enquiry</h2>
  <table cellpadding="6" style="border-collapse:collapse">${rows
    .map(([k, v]) => `<tr><td style="color:#6d746b;padding-right:16px">${k}</td><td><strong>${escapeHtml(v)}</strong></td></tr>`)
    .join("")}</table>
  <p style="margin:20px 0 6px;color:#6d746b">Message</p>
  <p style="white-space:pre-wrap;margin:0">${escapeHtml(submission.message)}</p>
  <p style="margin-top:28px;font-size:12px;color:#999">Sent from the contact form on eramasacon.com. Reply to this email to answer ${escapeHtml(submission.name)} directly.</p>
</div>`,
    });
  } catch (error) {
    console.error("[contact form] delivery failed:", error);
    return { ok: false, message: NOT_CONFIGURED };
  }

  // Confirmation to the visitor; the enquiry already reached the team, so a failure here is only logged.
  try {
    await sendAcknowledgement(submission);
  } catch (error) {
    console.error("[contact form] acknowledgement failed:", error);
  }
  return { ok: true, message: SUCCESS_MESSAGE };
}

function sendAcknowledgement(s: { name: string; email: string; service: string; message: string }) {
  const about = s.service ? ` about ${s.service}` : "";
  const name = escapeHtml(s.name);
  return sendEmail({
    to: s.email,
    replyTo: CONTACT_TO, // replies reach the team, not the noreply sender
    subject: "We've received your enquiry – Eram Asacon",
    text: `Hello ${s.name},\n\nThank you for contacting Eram Asacon. We've received your enquiry${about} and our team will get back to you within 1 business day.\n\nYour message:\n${s.message}\n\nFor urgent matters, call +966 138656686 or simply reply to this email.\n\nEram Asacon\n#353, 2nd floor, Khobar Mall, King Fahd Road, Al Khobar`,
    html: `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6;color:#202725;max-width:560px">
  <p>Hello ${name},</p>
  <p>Thank you for contacting Eram Asacon. We've received your enquiry${s.service ? ` about <strong>${escapeHtml(s.service)}</strong>` : ""} and our team will get back to you within 1 business day.</p>
  <p style="margin:20px 0 6px;color:#6d746b">Your message</p>
  <p style="white-space:pre-wrap;margin:0;padding:12px 16px;background:#f4f5f3;border-left:3px solid #c5352d">${escapeHtml(s.message)}</p>
  <p style="margin-top:20px">For urgent matters, call <a href="tel:+966138656686" style="color:#c5352d">+966 138656686</a> or simply reply to this email.</p>
  <p style="margin-top:28px">Eram Asacon<br><span style="color:#6d746b;font-size:13px">#353, 2nd floor, Khobar Mall, King Fahd Road, Al Khobar</span></p>
</div>`,
  });
}
