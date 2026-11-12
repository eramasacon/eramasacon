"use server";

import { readFields, SERVICE_OPTIONS, SUCCESS_MESSAGE, validate, type FieldErrors } from "@/lib/contact-form";

export type ContactResult = { ok: true; message: string } | { ok: false; message: string; fieldErrors?: FieldErrors };

const NOT_CONFIGURED =
  "Sorry, the form could not be sent right now. Please email us at info@eramasacon.com or call +966 138656686.";

/**
 * Handles the contact form. WordPress stored entries in its database
 * (MetForm, no email notifications). Here a submission is delivered as JSON to
 * CONTACT_FORM_WEBHOOK_URL (e.g. an email/CRM/automation webhook).
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

  const webhook = process.env.CONTACT_FORM_WEBHOOK_URL;
  if (!webhook) {
    console.error("[contact form] CONTACT_FORM_WEBHOOK_URL is not set; submission rejected.");
    return { ok: false, message: NOT_CONFIGURED };
  }

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submission),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) throw new Error(`webhook responded ${response.status}`);
  } catch (error) {
    console.error("[contact form] delivery failed:", error);
    return { ok: false, message: NOT_CONFIGURED };
  }
  return { ok: true, message: SUCCESS_MESSAGE };
}
