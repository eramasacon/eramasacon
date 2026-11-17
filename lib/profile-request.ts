/**
 * Company profile request form: fields and validation.
 * Only email is required; name and company are optional.
 * Shared by the browser modal and the server action so both apply the same rules.
 */

export type ProfileRequestFields = {
  name: string;
  email: string;
  company: string;
};

export type ProfileRequestErrors = Partial<Record<keyof ProfileRequestFields, string>>;

export type ProfileRequestResult =
  | { ok: true; message: string }
  | { ok: false; message: string; fieldErrors?: ProfileRequestErrors };

const MAX_LENGTH: Record<keyof ProfileRequestFields, number> = { name: 200, email: 254, company: 200 };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Hidden field that people never see; bots that fill it are dropped. */
export const HONEYPOT_FIELD = "website";

export function readProfileRequest(data: FormData): ProfileRequestFields {
  const get = (key: keyof ProfileRequestFields) => {
    const value = data.get(key);
    return typeof value === "string" ? value.trim() : "";
  };
  return { name: get("name"), email: get("email"), company: get("company") };
}

export function validateProfileRequest(fields: ProfileRequestFields): ProfileRequestErrors {
  const errors: ProfileRequestErrors = {};
  if (!fields.email) errors.email = "Please enter your email address.";
  else if (!EMAIL_PATTERN.test(fields.email)) errors.email = "Please enter a valid email address.";
  for (const key of Object.keys(MAX_LENGTH) as (keyof ProfileRequestFields)[]) {
    if (fields[key].length > MAX_LENGTH[key]) errors[key] = `Please use at most ${MAX_LENGTH[key]} characters.`;
  }
  return errors;
}
