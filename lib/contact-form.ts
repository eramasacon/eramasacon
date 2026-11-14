/**
 * Contact form (WordPress MetForm form 960) fields, options and validation.
 * Shared by the browser form and the server action so both apply the same rules.
 */

export const SUCCESS_MESSAGE = "Thank you! Form submitted successfully.";
export const REQUIRED_MESSAGE = "This field is required.";
export const EMAIL_MESSAGE = "Please enter a valid Email address";

// Contracting services offered in the site's navigation.
export const SERVICE_OPTIONS = [
  { label: "HVAC Contracting", value: "hvac-contracting" },
  { label: "Electrical and instrumentation", value: "electrical-and-instrumentation" },
  { label: "MEP Design Consultancy", value: "mep-design-consultancy" },
  { label: "General enquiry", value: "general-enquiry" },
] as const;

export type ContactFields = {
  Name: string;
  Email: string;
  Phone_number: string;
  Services: string;
  Message: string;
};

export type FieldErrors = Partial<Record<keyof ContactFields, string>>;

const MAX_LENGTH: Record<keyof ContactFields, number> = {
  Name: 200,
  Email: 254,
  Phone_number: 50,
  Services: 50,
  Message: 5000,
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function readFields(data: FormData): ContactFields {
  const get = (key: keyof ContactFields) => {
    const value = data.get(key);
    return typeof value === "string" ? value.trim() : "";
  };
  return { Name: get("Name"), Email: get("Email"), Phone_number: get("Phone_number"), Services: get("Services"), Message: get("Message") };
}

export function validate(fields: ContactFields): FieldErrors {
  const errors: FieldErrors = {};
  for (const key of ["Name", "Email", "Phone_number", "Message"] as const) {
    if (!fields[key]) errors[key] = REQUIRED_MESSAGE;
  }
  if (fields.Email && !EMAIL_PATTERN.test(fields.Email)) errors.Email = EMAIL_MESSAGE;
  if (fields.Services && !SERVICE_OPTIONS.some((o) => o.value === fields.Services)) errors.Services = REQUIRED_MESSAGE;
  for (const key of Object.keys(MAX_LENGTH) as (keyof ContactFields)[]) {
    if (fields[key].length > MAX_LENGTH[key]) errors[key] = `Please use at most ${MAX_LENGTH[key]} characters.`;
  }
  return errors;
}
