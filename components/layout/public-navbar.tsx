import Link from "next/link";
import useScroll from "@/lib/hooks/use-scroll";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";

export default function PublicNavBar() {
  const scrolled = useScroll(50);

  return (
    <div
      className={`fixed top-0 flex w-full justify-center ${
        scrolled
          ? "border-b border-stone-200 bg-white/80 backdrop-blur-xl"
          : "bg-white/0"
      } z-30 transition-all`}
    >
      <div className="mx-5 flex h-16 w-full max-w-screen-xl items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-serif text-xl font-semibold tracking-tight text-primary transition-colors hover:text-accent">
          laminir.
        </Link>

        {/* Public Navigation Links */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link 
            href="/about"
            className="text-sm font-medium text-secondary transition-colors hover:text-accent"
          >
            About
          </Link>
          <Link 
            href="/use-cases"
            className="text-sm font-medium text-secondary transition-colors hover:text-accent"
          >
            Use Cases
          </Link>
          <Link 
            href="/pricing"
            className="text-sm font-medium text-secondary transition-colors hover:text-accent"
          >
            Pricing
          </Link>
          <Link 
            href="/contact"
            className="text-sm font-medium text-secondary transition-colors hover:text-accent"
          >
            Contact
          </Link>
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          <SignedOut>
            <Link
              href="/get-started"
              className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-accent"
            >
              Get started
            </Link>
            <SignInButton mode="modal" forceRedirectUrl="/dashboard">
              <button className="text-sm font-medium text-secondary transition-colors hover:text-accent">
                Log in
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Link 
              href="/dashboard"
              className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-accent"
            >
              Go to app
            </Link>
          </SignedIn>
        </div>
      </div>
    </div>
  );
}