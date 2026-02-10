"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import useScroll from "@/lib/hooks/use-scroll";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function NavBar() {
  const scrolled = useScroll(50);
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/week", label: "This Week" },
    { href: "/history", label: "History" },
    { href: "/inputs", label: "Inputs" },
    { href: "/reports", label: "Reports" },
  ];

  return (
    <>
      <div
        className={`fixed top-0 flex w-full justify-center ${
          scrolled
            ? "border-b border-stone-200 bg-white/80 backdrop-blur-xl"
            : "bg-white/0"
        } z-30 transition-all`}
      >
        <div className="mx-5 flex h-16 w-full max-w-screen-xl items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="font-serif text-xl font-semibold tracking-tight text-primary transition-colors hover:text-accent"
          >
            laminir.
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-accent ${
                  pathname === link.href ? "text-accent" : "text-secondary"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side: Auth + Mobile Menu Button */}
<div className="flex items-center gap-4">
  {/* Auth */}
  <SignedOut>
    <SignInButton mode="modal" forceRedirectUrl="/dashboard">
    <button className="text-sm font-medium text-secondary transition-colors hover:text-accent">
      Log in
    </button>
  </SignInButton>
</SignedOut>
  <SignedIn>
    <UserButton 
      afterSignOutUrl="/"
      appearance={{
        elements: {
          avatarBox: "h-9 w-9 ring-2 ring-accent",
          userButtonPopoverCard: "border border-stone-200",
        },
        variables: {
          colorPrimary: "#D97706",
        }
      }}
    />
  </SignedIn>

            {/* Mobile Menu Button */}
            <SignedIn>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden text-secondary hover:text-accent transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </SignedIn>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <SignedIn>
        {mobileMenuOpen && (
          <div className="fixed top-16 left-0 right-0 z-20 border-b border-stone-200 bg-white shadow-lg md:hidden">
            <nav className="mx-5 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? "bg-stone-100 text-accent"
                      : "text-secondary hover:bg-stone-50 hover:text-accent"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </SignedIn>
    </>
  );
}