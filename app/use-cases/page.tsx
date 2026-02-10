import Link from "next/link";

export default function UseCases() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="border-b border-stone-200 pt-32 pb-20">
        <div className="mx-auto max-w-4xl px-6">
          <h1 className="font-serif text-6xl font-bold leading-tight text-primary md:text-7xl">
            Built for the room where it happens
          </h1>
          <p className="mt-8 text-2xl text-secondary leading-relaxed">
            See how CEOs, CFOs, and COOs use Laminir to run weekly trade with predictive intelligence
          </p>
        </div>
      </div>

      {/* CEO Use Case */}
      <div className="border-b border-stone-200 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2">
              <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-accent">
                <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="mt-6 font-serif text-4xl font-bold text-primary">
                For CEOs & Founders
              </h2>
              <p className="mt-4 text-lg text-secondary">
                Strategic oversight without drowning in details
              </p>
            </div>

            <div className="lg:col-span-3 space-y-8">
              <div>
                <h3 className="font-serif text-2xl font-semibold text-primary">
                  The challenge
                </h3>
                <p className="mt-3 text-lg text-secondary leading-relaxed">
                  You're pulled between strategy and execution. Weekly reports show what happened, but you need to know: Are we drifting from our anchors? What needs my intervention? What's coming that I can't see yet?
                </p>
              </div>

              <div>
                <h3 className="font-serif text-2xl font-semibold text-primary">
                  How Laminir helps
                </h3>
                <div className="mt-4 space-y-4">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <svg className="h-6 w-6 text-accent" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-primary">Strategic drift detection</p>
                      <p className="mt-1 text-secondary">AI flags when execution is drifting from your strategic anchors before it becomes a problem</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <svg className="h-6 w-6 text-accent" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-primary">Executive summary that matters</p>
                      <p className="mt-1 text-secondary">AI-generated insights focused on what requires your decision, not just data dumps</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <svg className="h-6 w-6 text-accent" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-primary">Institutional memory</p>
                      <p className="mt-1 text-secondary">"What did we decide when this happened before?" Context that compounds over time</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
                <p className="text-sm font-medium text-blue-900 mb-2">Real impact:</p>
                <p className="text-sm text-blue-800 italic">
                  "I prep for trade meetings in 10 minutes instead of an hour. And I'm asking better questions because the AI shows me what I'm missing."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CFO Use Case */}
      <div className="border-b border-stone-200 bg-stone-50 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2">
              <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-accent">
                <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="mt-6 font-serif text-4xl font-bold text-primary">
                For CFO / Finance Leaders
              </h2>
              <p className="mt-4 text-lg text-secondary">
                Forward-looking variance analysis with margin impact
              </p>
            </div>

            <div className="lg:col-span-3 space-y-8">
              <div>
                <h3 className="font-serif text-2xl font-semibold text-primary">
                  The challenge
                </h3>
                <p className="mt-3 text-lg text-secondary leading-relaxed">
                  You need to forecast with confidence, but weekly variance reports are backward-looking. By the time you see the gap, it's baked into the month. You need early warnings, not autopsies.
                </p>
              </div>

              <div>
                <h3 className="font-serif text-2xl font-semibold text-primary">
                  How Laminir helps
                </h3>
                <div className="mt-4 space-y-4">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <svg className="h-6 w-6 text-accent" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-primary">Predictive gap analysis</p>
                      <p className="mt-1 text-secondary">AI detects trending variance patterns before they threaten the quarter</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <svg className="h-6 w-6 text-accent" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-primary">GM$ impact visibility</p>
                      <p className="mt-1 text-secondary">See both margin % and margin $ impact—understand the P&L consequence, not just the percentage</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <svg className="h-6 w-6 text-accent" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-primary">Forecast accuracy tracking</p>
                      <p className="mt-1 text-secondary">Historical performance vs plan trends help you forecast more accurately each week</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
                <p className="text-sm font-medium text-blue-900 mb-2">Real impact:</p>
                <p className="text-sm text-blue-800 italic">
                  "We caught a margin compression trend on week 2 instead of week 8. That early warning saved us $200K in the quarter."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* COO Use Case */}
      <div className="border-b border-stone-200 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2">
              <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-accent">
                <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h2 className="mt-6 font-serif text-4xl font-bold text-primary">
                For COO / Operations
              </h2>
              <p className="mt-4 text-lg text-secondary">
                Cross-functional coordination with full context
              </p>
            </div>

            <div className="lg:col-span-3 space-y-8">
              <div>
                <h3 className="font-serif text-2xl font-semibold text-primary">
                  The challenge
                </h3>
                <p className="mt-3 text-lg text-secondary leading-relaxed">
                  You're orchestrating multiple teams—buying, marketing, ops, retail. Everyone has dashboards, but no one has the same context. Trade meetings become status reports instead of decisions.
                </p>
              </div>

              <div>
                <h3 className="font-serif text-2xl font-semibold text-primary">
                  How Laminir helps
                </h3>
                <div className="mt-4 space-y-4">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <svg className="h-6 w-6 text-accent" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-primary">Single source of truth</p>
                      <p className="mt-1 text-secondary">One weekly report that connects performance, strategy, and forward plans—everyone works from the same intelligence</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <svg className="h-6 w-6 text-accent" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-primary">Cross-channel visibility</p>
                      <p className="mt-1 text-secondary">See how channels are performing against each other and where operational bottlenecks exist</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <svg className="h-6 w-6 text-accent" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-primary">Decision tracking</p>
                      <p className="mt-1 text-secondary">Document decisions, track assumptions, and reference historical context without digging through email</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
                <p className="text-sm font-medium text-blue-900 mb-2">Real impact:</p>
                <p className="text-sm text-blue-800 italic">
                  "Trade meetings are 30 minutes now instead of 90. We spend less time reconstructing context and more time deciding."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="font-serif text-4xl font-bold text-primary">
            See how it works for your role
          </h2>
          <p className="mt-6 text-xl text-secondary">
            Book a demo and we'll show you exactly how Laminir fits your workflow
          </p>
          <div className="mt-10">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-4 text-base font-medium text-white transition-all hover:bg-accent"
            >
              Schedule a demo
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}