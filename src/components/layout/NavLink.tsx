"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";

/** Link that marks itself aria-current="page" on its own page and sub-pages (/services, /services/x). */
export function NavLink({ href, ...props }: ComponentProps<typeof Link> & { href: string }) {
  const path = usePathname();
  const active = path === href || path.startsWith(`${href}/`);
  return <Link href={href} aria-current={active ? "page" : undefined} {...props} />;
}
