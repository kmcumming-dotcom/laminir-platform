import Link from "next/link";

export default function Footer() {
  return (
    <div className="w-full border-t border-stone-200 bg-stone-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <span className="font-serif text-lg font-semibold text-primary">laminir.</span>
            <span className="text-sm text-secondary">
              © {new Date().getFullYear()}
            </span>
          </div>
          <div className="flex gap-6">
            <Link href="/about" className="text-sm text-secondary transition-colors hover:text-accent">
              About
            </Link>
            <Link href="/faq" className="text-sm text-secondary transition-colors hover:text-accent">
    FAQ
  </Link>
            <Link href="/privacy" className="text-sm text-secondary transition-colors hover:text-accent">
              Privacy
            </Link>
            <Link href="/terms" className="text-sm text-secondary transition-colors hover:text-accent">
              Terms
            </Link>
            <Link href="/contact" className="text-sm text-secondary transition-colors hover:text-accent">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}