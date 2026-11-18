"use client";

import { createContext, useCallback, useContext, useEffect, useId, useRef, useState, useTransition, type FormEvent, type ReactNode } from "react";
import { requestCompanyProfile } from "@/app/actions/request-profile";
import {
  HONEYPOT_FIELD,
  readProfileRequest,
  validateProfileRequest,
  type ProfileRequestErrors,
  type ProfileRequestFields,
} from "@/lib/profile-request";
import styles from "./profile-request.module.css";

const ProfileRequestContext = createContext<(() => void) | null>(null);

/** Renders the shared request modal once and lets any trigger open it. */
export function ProfileRequestProvider({ children }: { children: ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [session, setSession] = useState(0);
  // Each open mounts a fresh form, then shows the dialog so focus lands in it.
  const open = useCallback(() => setSession((s) => s + 1), []);
  useEffect(() => {
    const el = dialog.current;
    if (session === 0 || !el || el.open) return;
    el.showModal();
    el.querySelector<HTMLInputElement>('input[name="email"]')?.focus();
  }, [session]);

  return (
    <ProfileRequestContext.Provider value={open}>
      {children}
      <dialog
        ref={dialog}
        className={styles.dialog}
        aria-labelledby="profile-request-title"
        onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }}
      >
        <ProfileRequestForm key={session} onClose={() => dialog.current?.close()} />
      </dialog>
    </ProfileRequestContext.Provider>
  );
}

/** Button that opens the company profile request modal. */
export function ProfileRequestButton({ className, children }: { className?: string; children: ReactNode }) {
  const open = useContext(ProfileRequestContext);
  if (!open) throw new Error("ProfileRequestButton must be used inside ProfileRequestProvider");
  return (
    <button type="button" className={className} aria-haspopup="dialog" onClick={open}>
      {children}
    </button>
  );
}

function ProfileRequestForm({ onClose }: { onClose: () => void }) {
  const [errors, setErrors] = useState<ProfileRequestErrors>({});
  const [failure, setFailure] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const id = useId();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (pending) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const clientErrors = validateProfileRequest(readProfileRequest(data));
    setErrors(clientErrors);
    setFailure(null);
    if (Object.keys(clientErrors).length) {
      requestAnimationFrame(() => form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus());
      return;
    }
    startTransition(async () => {
      try {
        const result = await requestCompanyProfile(data);
        if (result.ok) setSuccess(result.message);
        else {
          setFailure(result.message);
          if (result.fieldErrors) setErrors(result.fieldErrors);
        }
      } catch {
        setFailure("Sorry, we couldn't send the profile right now. Please try again later.");
      }
    });
  };

  const clearError = (name: keyof ProfileRequestFields) => {
    if (errors[name]) setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const field = (name: keyof ProfileRequestFields, label: string, props: { type?: string; autoComplete: string; placeholder: string; optional?: boolean }) => (
    <div className={styles.field}>
      <label htmlFor={`${id}-${name}`}>{label}{props.optional ? <span className={styles.optional}> (optional)</span> : <span className={styles.required} aria-hidden="true"> *</span>}</label>
      <input
        id={`${id}-${name}`}
        name={name}
        type={props.type ?? "text"}
        autoComplete={props.autoComplete}
        placeholder={props.placeholder}
        required={!props.optional}
        aria-invalid={errors[name] ? true : undefined}
        aria-describedby={errors[name] ? `${id}-${name}-error` : undefined}
        onInput={() => clearError(name)}
        disabled={pending}
      />
      {errors[name] && <p id={`${id}-${name}-error`} className={styles.error}>{errors[name]}</p>}
    </div>
  );

  return (
    <div className={styles.panel}>
      <button type="button" className={styles.close} onClick={onClose} aria-label="Close">
        <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
      </button>

      {success ? (
        <div className={styles.success} role="status">
          <span className={styles.successIcon} aria-hidden="true">
            <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12.5 9.5 18 20 6.5" /></svg>
          </span>
          <h2 id="profile-request-title">Check your inbox</h2>
          <p>{success}</p>
          <button type="button" className={styles.submit} onClick={onClose} autoFocus>Done</button>
        </div>
      ) : (
        <>
          <p className={styles.eyebrow}>Company profile</p>
          <h2 id="profile-request-title">Get our company profile</h2>
          <p className={styles.intro}>Enter your email and we&apos;ll send the PDF straight to your inbox.</p>
          <form onSubmit={onSubmit} noValidate aria-busy={pending}>
            {field("email", "Work email", { type: "email", autoComplete: "email", placeholder: "you@company.com" })}
            {field("name", "Full name", { autoComplete: "name", placeholder: "Your name", optional: true })}
            {field("company", "Company", { autoComplete: "organization", placeholder: "Company name", optional: true })}
            <div className={styles.honeypot} aria-hidden="true">
              <label>Leave this empty<input name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" /></label>
            </div>
            {failure && <p className={styles.failure} role="alert">{failure}</p>}
            <button type="submit" className={styles.submit} disabled={pending}>
              {pending ? "Sending…" : "Email me the profile"}
              {!pending && <svg aria-hidden="true" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12h16m-7-7 7 7-7 7" /></svg>}
            </button>
            <p className={styles.note}>We only use your details to send the profile and follow up on your enquiry.</p>
          </form>
        </>
      )}
    </div>
  );
}
