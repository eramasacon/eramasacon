"use client";
/* eslint-disable @next/next/no-img-element -- local company logo */
import { ArrowIcon } from "@/components/site/arrow-icon";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { companyProfile, mainNavigation, serviceNavigation } from "@/content/site-navigation";
import styles from "./site.module.css";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const services = useRef<HTMLDetailsElement>(null);
  const close = () => { setOpen(false); if (services.current) services.current.open = false; };
  const isActive = (href: string) => pathname === href || (href === "/services" && serviceNavigation.some(item => item.href === pathname));

  return (
    <header id="masthead" className={styles.header} onKeyDown={event => {
      if (event.key === "Escape") {
        close();
        if (window.matchMedia("(max-width: 1024px)").matches) menuButton.current?.focus();
        else services.current?.querySelector("summary")?.focus();
      }
    }}>
      <Link className={styles.logo} href="/" aria-label="Eram Asacon home" onClick={close}>
        <img src="/wp-content/uploads/2025/02/lkjdfldfhg-1024x272.png" width="204" height="54" alt="Eram Asacon" />
      </Link>
      <button ref={menuButton} className={styles.menuButton} type="button" aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen(!open)}>{open ? "Close" : "Menu"}<span aria-hidden="true">{open ? "×" : "☰"}</span></button>
      <nav id="primary-navigation" aria-label="Main navigation" className={`${styles.navigation} ${open ? styles.open : ""}`} onClick={event => { if ((event.target as HTMLElement).closest("a")) close(); }} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) close(); }}>
        <ul className={styles.navList}>
          {mainNavigation.map(item => (
            <li key={item.href} className={isActive(item.href) ? styles.active : undefined}>
              {item.href === "/services" ? <details ref={services} className={styles.serviceMenu}>
                <summary>Services <span aria-hidden="true">⌄</span></summary>
                <ul className={styles.dropdown}>
                  <li><Link href="/services" aria-current={pathname === "/services" ? "page" : undefined}>Explore all services</Link></li>
                  {serviceNavigation.map(service => <li key={service.href}><Link href={service.href} aria-current={pathname === service.href ? "page" : undefined}>{service.label}</Link></li>)}
                </ul>
              </details> : <Link href={item.href} aria-current={pathname === item.href ? "page" : undefined}>{item.label}</Link>}
            </li>
          ))}
        </ul>
        <a className={styles.profile} href={companyProfile} download>Company profile <span aria-hidden="true"><ArrowIcon direction="down" /></span></a>
      </nav>
    </header>
  );
}
