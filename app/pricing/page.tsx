import Link from "next/link";

export default function Pricing() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="border-b border-stone-200 pt-32 pb-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h1 className="font-serif text-6xl font-bold leading-tight text-primary md:text-7xl">
            Enterprise pricing that scales with you
          </h1>
          <p className="mt-8 text-2xl text-secondary leading-relaxed">
            Predictive intelligence built for retail teams that move fast
          </p>
        </div>
      </div>

      {/* Pricing Card */}
      <div className="py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="rounded-2xl border-2 border-stone-200 bg-white p-12">
            <div className="text-center">
              <h2 className="font-serif text-4xl font-bold text-primary">
                Enterprise Plan
              </h2>
              <p className="mt-4 text-xl text-secondary">
                Tailored to your team size and needs
              </p>
            </div>

            {/* What's Included */}
            <div className="mt-12 space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <svg className="h-6 w-6 text-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-lg font-medium text-primary">Unlimited weekly reports</p>
                  <p className="mt-1 text-base text-secondary">As many markets, channels, and brands as you need</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <svg className="h-6 w-6 text-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-lg font-medium text-primary">Full AI-powered analysis</p>
                  <p className="mt-1 text-base text-secondary">Signal detection, predictive insights, risk flagging, opportunity surfacing</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <svg className="h-6 w-6 text-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-lg font-medium text-primary">Institutional memory that compounds</p>
                  <p className="mt-1 text-base text-secondary">Unlimited historical data retention, pattern learning, strategic context</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <svg className="h-6 w-6 text-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-lg font-medium text-primary">Team seats</p>
                  <p className="mt-1 text-base text-secondary">CEO, CFO, COO, and key leadership team members</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <svg className="h-6 w-6 text-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-lg font-medium text-primary">Enterprise security and compliance</p>
                  <p className="mt-1 text-base text-secondary">SOC 2 Type II, SSO, role-based access, audit logs</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <svg className="h-6 w-6 text-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-lg font-medium text-primary">Dedicated support</p>
                  <p className="mt-1 text-base text-secondary">Onboarding, training, and ongoing success support</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-12 text-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-4 text-base font-medium text-white transition-all hover:bg-accent"
              >
                Get custom pricing
              </Link>
              <p className="mt-4 text-sm text-secondary">
                Book a call and we will provide pricing based on your team size and needs
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Philosophy */}
      <div className="border-t border-stone-200 bg-stone-50 py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="font-serif text-4xl font-bold text-primary text-center">
            Our pricing philosophy
          </h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-lg bg-white border-2 border-accent">
                <svg className="h-7 w-7 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="mt-6 font-serif text-xl font-semibold text-primary">
                Value compounds
              </h3>
              <p className="mt-3 text-base text-secondary">
                Intelligence gets more valuable over time. Your investment compounds with every week.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-lg bg-white border-2 border-accent">
                <svg className="h-7 w-7 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="mt-6 font-serif text-xl font-semibold text-primary">
                Priced for teams
              </h3>
              <p className="mt-3 text-base text-secondary">
                Built for the executive team running weekly trade, not per-seat SaaS economics.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-lg bg-white border-2 border-accent">
                <svg className="h-7 w-7 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="mt-6 font-serif text-xl font-semibold text-primary">
                No surprises
              </h3>
              <p className="mt-3 text-base text-secondary">
                Transparent pricing. No hidden fees. No per-report charges. One annual contract.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="border-t border-stone-200 py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="font-serif text-4xl font-bold text-primary text-center mb-12">
            Common questions
          </h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-primary">
                How is pricing determined?
              </h3>
              <p className="mt-3 text-lg text-secondary leading-relaxed">
                Pricing is based on your team size (number of users) and complexity (number of markets, channels, brands). We will provide a custom quote after understanding your needs.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-primary">
                What is the contract length?
              </h3>
              <p className="mt-3 text-lg text-secondary leading-relaxed">
                Annual contracts. Intelligence that compounds needs time to deliver value - we are aligned on building something that lasts.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-primary">
                Is there a setup fee?
              </h3>
              <p className="mt-3 text-lg text-secondary leading-relaxed">
                No. Onboarding, training, and data integration are included in your annual subscription.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-primary">
                Can we start with a pilot?
              </h3>
              <p className="mt-3 text-lg text-secondary leading-relaxed">
                Yes. We typically start with a single market or channel for 90 days, then expand once you have seen the value compound.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-primary">
                What if we need more seats later?
              </h3>
              <p className="mt-3 text-lg text-secondary leading-relaxed">
                You can add seats at any time. We pro-rate the cost for the remainder of your contract term.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="border-t border-stone-200 py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="font-serif text-4xl font-bold text-primary">
            Ready to see pricing for your team?
          </h2>
          <p className="mt-6 text-xl text-secondary">
            Book a 30-minute call and we will walk you through pricing and options
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-4 text-base font-medium text-white transition-all hover:bg-accent"
            >
              Schedule a call
            </Link>
            
              <Link
  href="mailto:hello@laminir.com"
  className="inline-block text-base font-medium text-secondary transition-colors hover:text-accent"
>
  Or email us directly
</Link>
          </div>
        </div>
      </div>
    </div>
  );
}