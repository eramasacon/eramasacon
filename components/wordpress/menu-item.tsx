"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps, ReactNode } from "react";

/**
 * WordPress nav menu item. WordPress adds "current" classes on the server for
 * the page being viewed; here they follow the URL so one header serves every page.
 */
export function MenuItem({
  path,
  descendantPaths = [],
  className,
  children,
  ...rest
}: ComponentProps<"li"> & { path: string; descendantPaths?: string[]; children: ReactNode }) {
  const pathname = usePathname();
  const classes = [className];
  if (pathname === path) classes.push("current-menu-item current_page_item active");
  else if (descendantPaths.includes(pathname)) {
    classes.push("current-menu-ancestor current-menu-parent current_page_parent current_page_ancestor");
  }
  return (
    <li {...rest} className={classes.join(" ")}>
      {children}
    </li>
  );
}

/** Nav menu link; ElementsKit marks the current page's link with `active`. */
export function MenuLink({ href, className, ...rest }: ComponentProps<typeof Link> & { href: string }) {
  const pathname = usePathname();
  return <Link {...rest} href={href} className={pathname === href ? `${className} active` : className} />;
}
