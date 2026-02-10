"use client";

import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import NavBar from "./navbar";
import PublicNavBar from "./public-navbar";

export default function SmartNavBar() {
  const { isSignedIn } = useUser();
  const pathname = usePathname();

  // Public pages that should show public nav even if signed in
const publicPages = ["/", "/about", "/use-cases", "/pricing", "/contact", "/privacy", "/terms"];
  const isPublicPage = publicPages.includes(pathname);

  // If on public page, show public nav
  if (isPublicPage) {
    return <PublicNavBar />;
  }

  // Otherwise, show app nav
  return <NavBar />;
}