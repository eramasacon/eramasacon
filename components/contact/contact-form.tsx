"use client";

import { useId, useState, useTransition, type FormEvent, type ReactNode } from "react";
import Select from "react-select";
import { submitContactForm } from "@/app/contact-us/actions";
import { readFields, SERVICE_OPTIONS, validate, type ContactFields, type FieldErrors } from "@/lib/contact-form";

/**
 * WordPress MetForm form 960 ("Contact Form"). MetForm rendered it in the
 * browser; this reproduces the markup it produced (Elementor template 960 with
 * MetForm classes) so the original CSS applies, and submits to a server action.
 */
export function ContactForm() {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [response, setResponse] = useState<{ ok: boolean; message: string } | null>(null);
  const [service, setService] = useState<(typeof SERVICE_OPTIONS)[number] | null>(null);
  const [pending, startTransition] = useTransition();
  const [formKey, setFormKey] = useState(0);
  const selectInstanceId = useId();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (pending) return;
    setResponse(null);
    const data = new FormData(event.currentTarget);
    const clientErrors = validate(readFields(data));
    setErrors(clientErrors);
    if (Object.keys(clientErrors).length) {
      const form = event.currentTarget;
      requestAnimationFrame(() => form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus());
      return;
    }
    startTransition(async () => {
      try {
        const result = await submitContactForm(data);
        setResponse({ ok: result.ok, message: result.message });
        if (result.ok) {
          setService(null);
          setFormKey((k) => k + 1); // reset the fields, as MetForm does
        } else if (result.fieldErrors) {
          setErrors(result.fieldErrors);
        }
      } catch {
        setResponse({ ok: false, message: "Your message could not be sent. Please try again or call +966 138656686." });
      }
    });
  };

  const clearError = (name: keyof ContactFields) => {
    if (errors[name]) setErrors((current) => ({ ...current, [name]: undefined }));
  };

  return (
    <div
      id="mf-response-props-id-960"
      data-response_type="alert"
      data-erroricon="fas fa-exclamation-triangle"
      data-successicon="fas fa-check"
      data-messageposition="top"
      className=" mf-scroll-top-no"
    >
      <div className="formpicker_warper formpicker_warper_editable" data-metform-formpicker-key="960">
        <div className="mf-widget-container">
          <div id="metform-wrap-69d3aa7-960" className="mf-form-wrapper" data-form-id="960" data-form-type="general-form">
            <form key={formKey} className="metform-form-content" onSubmit={onSubmit} noValidate aria-busy={pending}>
              <div
                className={`mf-main-response-wrap   mf-response-msg-wrap${response && !response.ok ? " mf-error-res" : ""}`}
                data-show={response ? "1" : "0"}
                role="status"
                aria-live="polite"
              >
                <div className="mf-response-msg">
                  {response?.ok === false ? (
                    <i className="mf-alert-icon fas fa-exclamation-triangle" aria-hidden="true" />
                  ) : (
                    <i className="mf-success-icon fas fa-check" aria-hidden="true" />
                  )}
                  <p>{response?.message}</p>
                </div>
              </div>
              <div className="metform-form-main-wrapper">
                <div className="elementor elementor-960" data-elementor-type="wp-post" data-elementor-id="960">
                  <FormRow id="69d457b">
                    <FormColumn id="931eec2" width={50}>
                      <TextField widget="c42b403" kind="text" name="Name" label="Name" required error={errors.Name} onInput={clearError} />
                    </FormColumn>
                    <FormColumn id="13723a8" width={50}>
                      <TextField widget="5a80b31" kind="email" name="Email" label="Email" required error={errors.Email} onInput={clearError} />
                    </FormColumn>
                  </FormRow>
                  <FormRow id="99d77be">
                    <FormColumn id="3b780fd" width={50}>
                      <TextField
                        widget="932d6a6"
                        kind="telephone"
                        name="Phone_number"
                        label="Phone Number"
                        required
                        error={errors.Phone_number}
                        onInput={clearError}
                      />
                    </FormColumn>
                    <FormColumn id="6f8e918" width={50}>
                      <div className="elementor-element elementor-element-4ee6130 elementor-widget elementor-widget-mf-select">
                        <div className="mf-input-wrapper">
                          <Label htmlFor="mf-input-select-4ee6130" required={false}>
                            Services
                          </Label>
                          <Select
                            inputId="mf-input-select-4ee6130"
                            instanceId={selectInstanceId}
                            className="mf-input mf-input-select"
                            classNamePrefix="mf_select"
                            name="Services"
                            options={SERVICE_OPTIONS}
                            value={service}
                            onChange={(option) => setService(option)}
                            placeholder="Select a service"
                            isSearchable={false}
                            aria-invalid={Boolean(errors.Services)}
                            aria-describedby={errors.Services ? "Services-error" : undefined}
                          />
                          <ErrorMessage id="Services-error" message={errors.Services} />
                        </div>
                      </div>
                    </FormColumn>
                  </FormRow>
                  <FormRow id="6845399">
                    <FormColumn id="fc7073e" width={100}>
                      <div className="elementor-element elementor-element-0434292 elementor-widget elementor-widget-mf-textarea">
                        <div className="mf-input-wrapper">
                          <Label htmlFor="mf-input-text-area-0434292" required>
                            Message
                          </Label>
                          <textarea
                            className="mf-input mf-textarea "
                            id="mf-input-text-area-0434292"
                            name="Message"
                            placeholder=" "
                            cols={30}
                            rows={10}
                            required
                            aria-invalid={Boolean(errors.Message)}
                            aria-describedby={errors.Message ? "Message-error" : undefined}
                            onInput={() => clearError("Message")}
                          />
                          <ErrorMessage id="Message-error" message={errors.Message} />
                        </div>
                      </div>
                      <div className="elementor-element elementor-element-2274861 mf-btn--left elementor-widget elementor-widget-mf-button">
                        <div className="mf-btn-wraper " data-mf-form-conditional-logic-requirement="">
                          <button type="submit" className="metform-btn metform-submit-btn " disabled={pending}>
                            <span>{pending ? "Sending…" : "Send Message"}</span>
                          </button>
                        </div>
                      </div>
                    </FormColumn>
                  </FormRow>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function FormRow({ id, children }: { id: string; children: ReactNode }) {
  return (
    <section
      className={`elementor-section elementor-top-section elementor-element elementor-element-${id} elementor-section-boxed elementor-section-height-default elementor-section-height-default wpr-particle-no wpr-jarallax-no wpr-parallax-no wpr-sticky-section-no`}
    >
      <div className="elementor-container elementor-column-gap-default">{children}</div>
    </section>
  );
}

function FormColumn({ id, width, children }: { id: string; width: 50 | 100; children: ReactNode }) {
  return (
    <div className={`elementor-column elementor-col-${width} elementor-top-column elementor-element elementor-element-${id}`}>
      <div className="elementor-widget-wrap elementor-element-populated">{children}</div>
    </div>
  );
}

function Label({ htmlFor, required, children }: { htmlFor: string; required: boolean; children: ReactNode }) {
  return (
    <label className="mf-input-label" htmlFor={htmlFor}>
      {children}
      {" "}
      {required && <span className="mf-input-required-indicator" aria-hidden="true">*</span>}
    </label>
  );
}

function ErrorMessage({ id, message }: { id: string; message?: string }) {
  return message ? <span id={id} className="mf-error-message">{message}</span> : null;
}

function TextField({
  widget,
  kind,
  name,
  label,
  required,
  error,
  onInput,
}: {
  widget: string;
  kind: "text" | "email" | "telephone";
  name: keyof ContactFields;
  label: string;
  required: boolean;
  error?: string;
  onInput: (name: keyof ContactFields) => void;
}) {
  const id = `mf-input-${kind}-${widget}`;
  return (
    <div className={`elementor-element elementor-element-${widget} elementor-widget elementor-widget-mf-${kind}`}>
      <div className="mf-input-wrapper">
        <Label htmlFor={id} required={required}>
          {label}
        </Label>
        <input
          type={kind === "telephone" ? "tel" : kind}
          className="mf-input "
          id={id}
          name={name}
          placeholder=" "
          required={required}
          autoComplete={kind === "email" ? "email" : kind === "telephone" ? "tel" : "name"}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${name}-error` : undefined}
          onInput={() => onInput(name)}
        />
        <ErrorMessage id={`${name}-error`} message={error} />
      </div>
    </div>
  );
}
