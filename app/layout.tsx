import "./globals.css";
import cx from "classnames";
import { sfPro, inter, playfair } from "./fonts";
import Footer from "@/components/layout/footer";
import { Suspense } from "react";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import SmartNavBar from "@/components/layout/smart-navbar";
import { ClerkProvider } from "@clerk/nextjs";


export const metadata = {
  title: "Laminir - Trade Intelligence Platform",
  description:
    "Executive-grade retail decision intelligence with institutional memory",
  metadataBase: new URL("https://laminir.com"),
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
  signInFallbackRedirectUrl="/dashboard"
  signUpFallbackRedirectUrl="/dashboard"
  appearance={{
    variables: {
      colorPrimary: '#D97706',
      colorText: '#1A1A1A',
      colorBackground: '#FFFFFF',
      colorInputBackground: '#FFFFFF',
      colorNeutral: '#D97706',
    },
    elements: {
      userButtonPopoverCard: 'bg-white',
      userButtonPopoverActionButton: 'hover:bg-stone-100',
      avatarBox: 'bg-accent',
      userButtonAvatarBox: 'bg-accent',
    }
  }}
>
      <html lang="en">
        <body className={cx(sfPro.variable, inter.variable, playfair.variable, "font-sans", "bg-white")}>
          <Suspense fallback="...">
            <SmartNavBar />
          </Suspense>
          <main className="flex min-h-screen w-full flex-col items-center justify-start pt-16">
            {children}
          </main>
          <Footer />
          <VercelAnalytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
