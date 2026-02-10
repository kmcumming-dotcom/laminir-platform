"use client";

import Link from "next/link";
import { useUser, SignInButton } from "@clerk/nextjs";

export default function Home() {
  const { isSignedIn } = useUser();

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Hero Section */}
      <div className="relative flex min-h-screen items-center justify-center px-6">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-12 inline-flex items-center gap-2 rounded-full border border-stone-200 bg-stone-50 px-4 py-2 text-sm font-medium text-secondary">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent"></span>
            </span>
            Predictive intelligence for retail executives
          </div>

          <h1 className="font-serif text-6xl font-bold leading-[1.1] tracking-tight text-primary sm:text-7xl md:text-8xl lg:text-9xl">
  Predictive
  <br />
  intelligence
  <br />
  <span className="text-secondary">for retail</span>
</h1>

          <p className="mt-12 max-w-2xl text-xl leading-relaxed text-secondary md:text-2xl">
  Spot margin leaks before they cost you 6 figures. Catch trends 2-4 weeks earlier than competitors. Make decisions backed by intelligence that compounds weekly.
</p>

          <div className="mt-16 flex flex-wrap items-center gap-6">
            {isSignedIn ? (
              <Link
                href="/dashboard"
                className="group inline-flex items-center gap-3 text-lg font-medium text-primary transition-colors hover:text-accent"
              >
                <span>View this week's intelligence</span>
                <svg className="h-5 w-5 transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            ) : (
              <>
                <SignInButton mode="modal" forceRedirectUrl="/dashboard">
                  <button className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-4 text-base font-medium text-white transition-all hover:bg-accent">
                    Get started
                  </button>
                </SignInButton>
                <Link
                  href="#problem"
                  className="inline-flex items-center justify-center text-base font-medium text-secondary transition-colors hover:text-accent"
                >
                  See how it works →
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="h-6 w-6 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* Trust Bar */}
      <div className="border-y border-stone-200 bg-stone-50 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-center text-xs font-medium uppercase tracking-wider text-stone-400">
            Trusted by leading retail executives
          </p>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
  <div className="text-center">
    <p className="font-serif text-3xl font-bold text-accent">$50K+</p>
    <p className="mt-1 text-sm text-secondary">Avg margin recovery first 90 days</p>
  </div>
  <div className="text-center">
    <p className="font-serif text-3xl font-bold text-accent">6 hours</p>
    <p className="mt-1 text-sm text-secondary">Saved per week on trade prep</p>
  </div>
  <div className="text-center">
    <p className="font-serif text-3xl font-bold text-accent">2-4 weeks</p>
    <p className="mt-1 text-sm text-secondary">Faster response to signals</p>
  </div>
</div>
        </div>
      </div>

      {/* Problem/Solution Section */}
<div id="problem" className="py-32">
  <div className="mx-auto max-w-7xl px-6">
    <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
      <div>
        <h2 className="font-serif text-5xl font-bold leading-tight text-primary">
  Every week you react costs you money
</h2>
<div className="mt-12 space-y-6 text-lg text-secondary">
  <p>
    That margin leak you spotted in Week 8? It cost you $30K by the time you caught it. That promo decision you made without trend data? Left $50K on the table.
  </p>
  <p>
    By the time your report shows the problem, your competitor already moved. By the time you align on the fix, the window closed.
  </p>
  <p className="font-medium text-primary">
    Reactive intelligence does not just slow you down - it costs you real revenue.
  </p>
</div>
      </div>
      <div>
        <h2 className="font-serif text-5xl font-bold leading-tight text-primary">
  We help you make money, not just see data
</h2>
<div className="mt-12 space-y-6 text-lg text-secondary">
  <p>
    Laminir catches margin leaks on Week 2, not Week 8. Spots promotional opportunities while there is still time to act. Flags strategic drift before it costs you a quarter.
  </p>
  <p>
    AI that learns your business patterns, predicts what happens next, and tells you which decisions actually matter. Every week compounds - better forecasts, sharper signals, smarter recommendations.
  </p>
  <p className="font-medium text-primary">
    Intelligence that pays for itself 10x over.
  </p>
</div>
      </div>
    </div>
  </div>
</div>

      {/* How It Works */}
<div className="border-t border-stone-200 bg-stone-50 py-32">
  <div className="mx-auto max-w-7xl px-6">
    <div className="text-center">
      <h2 className="font-serif text-5xl font-bold text-primary">
        How it works
      </h2>
      <p className="mt-6 text-xl text-secondary">
        From data to foresight in three steps
      </p>
    </div>

    <div className="mt-20 grid grid-cols-1 gap-12 md:grid-cols-3">
      {/* Step 1 */}
      <div className="relative">
        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-accent text-xl font-bold text-white">
          1
        </div>
        <h3 className="font-serif text-2xl font-semibold text-primary">
          Connect your data
        </h3>
        <p className="mt-4 text-lg leading-relaxed text-secondary">
          Upload weekly forecasts, actuals, and GTM calendar. Define your strategic anchors once. We handle the rest.
        </p>
      </div>

      {/* Step 2 */}
      <div className="relative">
        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-accent text-xl font-bold text-white">
          2
        </div>
        <h3 className="font-serif text-2xl font-semibold text-primary">
          AI detects signals
        </h3>
        <p className="mt-4 text-lg leading-relaxed text-secondary">
          Pattern recognition across weeks. Early warnings when metrics drift. Opportunities flagged before competitors see them.
        </p>
      </div>

      {/* Step 3 */}
      <div className="relative">
        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-accent text-xl font-bold text-white">
          3
        </div>
        <h3 className="font-serif text-2xl font-semibold text-primary">
          Decide with confidence
        </h3>
        <p className="mt-4 text-lg leading-relaxed text-secondary">
          Predictive insights that point forward. Strategic context that compounds. Decisions backed by institutional memory.
        </p>
      </div>
    </div>
  </div>
</div>
{/* Product Demo Video */}
<div className="border-t border-stone-200 bg-stone-50 py-32">
  <div className="mx-auto max-w-5xl px-6">
    <div className="text-center mb-12">
      <h2 className="font-serif text-5xl font-bold text-primary">
        See Laminir in action
      </h2>
      <p className="mt-6 text-xl text-secondary">
        Watch how predictive intelligence transforms weekly trade decisions
      </p>
    </div>
    
    <div className="rounded-2xl overflow-hidden shadow-2xl border border-stone-200">
      <div className="relative" style={{ paddingBottom: '56.25%' }}>
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src="YOUR_VIDEO_URL_HERE"
          title="Laminir Product Demo"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  </div>
</div>
{/* Institutional Memory - The Compounding Edge */}
<div className="border-t border-stone-200 py-32">
  <div className="mx-auto max-w-7xl px-6">
    <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
      {/* Left: The Problem */}
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-stone-50 px-4 py-2 text-sm font-medium text-secondary mb-8">
          <svg className="h-4 w-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          The compounding advantage
        </div>
        
        <h2 className="font-serif text-5xl font-bold leading-tight text-primary">
          Intelligence that remembers
        </h2>
        
        <div className="mt-8 space-y-6 text-lg text-secondary">
          <p>
            Most dashboards reset every week. Context evaporates. Patterns go unnoticed. Every decision starts from scratch.
          </p>
          <p>
            Laminir builds institutional memory. Every week's data enriches the next. Strategic anchors persist. AI learns what matters to your business.
          </p>
          <p className="font-medium text-primary">
            Week 1 is good. Week 52 is transformational.
          </p>
        </div>
      </div>

      {/* Right: How It Compounds */}
      <div className="lg:pt-16">
        <div className="space-y-8">
          {/* Week 1 */}
          <div className="relative pl-8 before:absolute before:left-0 before:top-2 before:h-3 before:w-3 before:rounded-full before:bg-stone-300">
            <div className="flex items-baseline gap-3">
              <span className="text-sm font-medium uppercase tracking-wider text-stone-500">Week 1</span>
              <div className="h-px flex-1 bg-stone-200"></div>
            </div>
            <p className="mt-2 text-base text-secondary">
              Upload data. Define strategy. Get insights.
            </p>
          </div>

          {/* Week 4 */}
          <div className="relative pl-8 before:absolute before:left-0 before:top-2 before:h-3 before:w-3 before:rounded-full before:bg-stone-400">
            <div className="flex items-baseline gap-3">
              <span className="text-sm font-medium uppercase tracking-wider text-stone-500">Week 4</span>
              <div className="h-px flex-1 bg-stone-200"></div>
            </div>
            <p className="mt-2 text-base text-secondary">
              AI spots your first trend. Flags variance patterns. References past decisions.
            </p>
          </div>

          {/* Week 12 */}
          <div className="relative pl-8 before:absolute before:left-0 before:top-2 before:h-3 before:w-3 before:rounded-full before:bg-stone-500">
            <div className="flex items-baseline gap-3">
              <span className="text-sm font-medium uppercase tracking-wider text-stone-500">Week 12</span>
              <div className="h-px flex-1 bg-stone-200"></div>
            </div>
            <p className="mt-2 text-base text-secondary">
              Seasonal patterns emerge. Strategic drift gets caught early. Context is automatic.
            </p>
          </div>

          {/* Week 26 */}
          <div className="relative pl-8 before:absolute before:left-0 before:top-2 before:h-3 before:w-3 before:rounded-full before:bg-accent">
            <div className="flex items-baseline gap-3">
              <span className="text-sm font-medium uppercase tracking-wider text-accent">Week 26</span>
              <div className="h-px flex-1 bg-stone-200"></div>
            </div>
            <p className="mt-2 text-base font-medium text-primary">
              Predictive signals get sharper. Every decision builds on history. Your intelligence compounds.
            </p>
          </div>
        </div>

        <div className="mt-12 rounded-lg border border-blue-200 bg-blue-50 p-6">
          <p className="text-sm leading-relaxed text-blue-900">
            <span className="font-semibold">Unlike dashboards that forget,</span> Laminir's AI learns your business patterns, strategic priorities, and decision history. The longer you use it, the smarter it gets.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
{/* What Makes Us Different - The Human Element */}
<div className="border-t border-stone-200 py-32">
  <div className="mx-auto max-w-7xl px-6">
    <div className="mx-auto max-w-3xl text-center">
      <div className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-stone-50 px-4 py-2 text-sm font-medium text-secondary mb-8">
        <svg className="h-4 w-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
        </svg>
        What makes Laminir different
      </div>
      
      <h2 className="font-serif text-5xl font-bold leading-tight text-primary">
        Retail intelligence crafted by retail operators
      </h2>
      <p className="mt-6 text-xl text-secondary leading-relaxed">
        Not another ChatGPT wrapper. Not a generic AI dashboard. Laminir is purpose-built intelligence architecture forged from 25+ years of retail operations experience.
      </p>
    </div>

    <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-12">
      {/* Expert-Crafted AI */}
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-lg bg-accent/10">
          <svg className="h-8 w-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <h3 className="mt-6 font-serif text-2xl font-semibold text-primary">
          Expert-crafted intelligence
        </h3>
        <p className="mt-4 text-lg text-secondary leading-relaxed">
          Every AI prompt, every pattern, every insight is architected by operators who have run weekly trade at scale. We know what signals matter because we have lived the decisions.
        </p>
      </div>

      {/* No Integration Tax */}
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-lg bg-accent/10">
          <svg className="h-8 w-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h3 className="mt-6 font-serif text-2xl font-semibold text-primary">
          Sits above your stack
        </h3>
        <p className="mt-4 text-lg text-secondary leading-relaxed">
          No integrations required. No IT tickets. We are the decision layer between your team and your systems. Upload data, get intelligence. It is that simple.
        </p>
      </div>

      {/* Retail-Native, Not Generic */}
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-lg bg-accent/10">
          <svg className="h-8 w-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <h3 className="mt-6 font-serif text-2xl font-semibold text-primary">
          Retail-native, not retrofitted
        </h3>
        <p className="mt-4 text-lg text-secondary leading-relaxed">
          Built for retail from the ground up. We understand margin pressure, promotional calendars, channel conflicts, and strategic anchors because we have managed them ourselves.
        </p>
      </div>
    </div>

    {/* Proof Statement */}
    <div className="mt-16 mx-auto max-w-3xl">
      <div className="rounded-2xl border-2 border-accent/20 bg-accent/5 p-8 text-center">
        <p className="text-lg leading-relaxed text-primary">
          <span className="font-semibold">The difference is in the details:</span> Our AI does not just flag variance. It knows <em>why</em> margin compression in Q2 matters differently than Q4. It understands <em>when</em> to surface a signal vs. noise. It predicts <em>what</em> happens next because the intelligence architecture is built on decades of pattern recognition from real retail operations.
        </p>
        <p className="mt-4 text-base text-secondary">
          This is not generic AI applied to retail. This is retail intelligence, amplified by AI.
        </p>
      </div>
    </div>
  </div>
</div>
{/* ROI Proof Section - Collapsible */}
<div className="border-t border-stone-200 py-32 fade-in-section">
  <div className="mx-auto max-w-7xl px-6">
    <div className="text-center mb-16">
      <h2 className="font-serif text-5xl font-bold text-primary">
        What does Laminir actually save you?
      </h2>
      <p className="mt-6 text-xl text-secondary">
        Real impact from retail operators using predictive intelligence
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Margin Recovery - Collapsible */}
      <details className="group rounded-2xl border-2 border-accent/20 bg-white overflow-hidden">
        <summary className="cursor-pointer p-8 list-none">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 mb-6">
                <svg className="h-7 w-7 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl font-semibold text-primary">
                Catch margin leaks early
              </h3>
              <p className="mt-4 text-lg text-secondary leading-relaxed">
                Average customer catches 0.5-2% margin compression within first 90 days.
              </p>
            </div>
            <svg className="h-6 w-6 text-accent flex-shrink-0 transition-transform group-open:rotate-180 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </summary>
        <div className="px-8 pb-8">
          <p className="text-lg text-secondary mb-4">
            On $10M revenue, that is $50K-$200K recovered.
          </p>
          <div className="rounded-lg bg-accent/5 p-4">
            <p className="text-sm text-primary">
              <span className="font-semibold">Real example:</span> Spotted promotional discount stacking error costing $3K/week. Caught on Week 2, saved $36K in the quarter.
            </p>
          </div>
        </div>
      </details>

      {/* Time Savings - Collapsible */}
      <details className="group rounded-2xl border-2 border-accent/20 bg-white overflow-hidden">
        <summary className="cursor-pointer p-8 list-none">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 mb-6">
                <svg className="h-7 w-7 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl font-semibold text-primary">
                Reclaim executive time
              </h3>
              <p className="mt-4 text-lg text-secondary leading-relaxed">
                6 hours saved per week on trade prep and analysis.
              </p>
            </div>
            <svg className="h-6 w-6 text-accent flex-shrink-0 transition-transform group-open:rotate-180 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </summary>
        <div className="px-8 pb-8">
          <p className="text-lg text-secondary mb-4">
            At $150/hour executive time, that is $46,800 annually in recovered productivity.
          </p>
          <div className="rounded-lg bg-accent/5 p-4">
            <p className="text-sm text-primary">
              <span className="font-semibold">Real example:</span> CFO used to spend 90 minutes prepping for trade meetings. Now spends 15 minutes reviewing AI brief.
            </p>
          </div>
        </div>
      </details>

      {/* Better Decisions - Collapsible */}
      <details className="group rounded-2xl border-2 border-accent/20 bg-white overflow-hidden">
        <summary className="cursor-pointer p-8 list-none">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 mb-6">
                <svg className="h-7 w-7 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl font-semibold text-primary">
                Make better calls faster
              </h3>
              <p className="mt-4 text-lg text-secondary leading-relaxed">
                Spot trends 2-4 weeks earlier than competitors.
              </p>
            </div>
            <svg className="h-6 w-6 text-accent flex-shrink-0 transition-transform group-open:rotate-180 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </summary>
        <div className="px-8 pb-8">
          <p className="text-lg text-secondary mb-4">
            Move on opportunities before the window closes. Avoid bad decisions before they cost you.
          </p>
          <div className="rounded-lg bg-accent/5 p-4">
            <p className="text-sm text-primary">
              <span className="font-semibold">Real example:</span> Predicted Q4 demand spike 3 weeks early. Increased inventory allocation, captured $120K in incremental revenue.
            </p>
          </div>
        </div>
      </details>
    </div>

    <div className="mt-16 text-center">
      <p className="text-2xl text-primary">
        <span className="font-semibold">The math is simple:</span> Catch <span className="text-accent">one</span> margin leak or make <span className="text-accent">one</span> better decision per quarter, and Laminir pays for itself 10x over.
      </p>
      <div className="mt-8">
        <Link
          href="/get-started"
          className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-4 text-base font-medium text-white transition-all hover:bg-accent"
        >
          Start making money, not just seeing data
        </Link>
      </div>
    </div>
  </div>
</div>
      {/* Use Cases */}
<div className="py-32">
  <div className="mx-auto max-w-7xl px-6">
    <div className="text-center">
      <h2 className="font-serif text-5xl font-bold text-primary">
        Built for the room where it happens
      </h2>
      <p className="mt-6 text-xl text-secondary">
        Executive intelligence for the people running weekly trade
      </p>
    </div>

    <div className="mt-20 grid grid-cols-1 gap-12 md:grid-cols-3">
      {/* CEO/Founder */}
      <div className="rounded-2xl border border-stone-200 bg-white p-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-stone-100">
          <svg className="h-6 w-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <h3 className="mt-6 font-serif text-2xl font-semibold text-primary">
          CEO & Founders
        </h3>
        <p className="mt-4 text-lg leading-relaxed text-secondary">
          Know what's working, what's drifting, and where to intervene—without drowning in dashboards. Strategic context that compounds every week.
        </p>
        <Link href="/use-cases" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent hover:gap-3 transition-all">
          <span>Learn more</span>
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* CFO */}
      <div className="rounded-2xl border border-stone-200 bg-white p-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-stone-100">
          <svg className="h-6 w-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="mt-6 font-serif text-2xl font-semibold text-primary">
          CFO / Finance Leaders
        </h3>
        <p className="mt-4 text-lg leading-relaxed text-secondary">
          Forward-looking variance analysis with margin $ impact. Early warnings on revenue gaps before they threaten the quarter.
        </p>
        <Link href="/use-cases" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent hover:gap-3 transition-all">
          <span>Learn more</span>
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* COO */}
      <div className="rounded-2xl border border-stone-200 bg-white p-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-stone-100">
          <svg className="h-6 w-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h3 className="mt-6 font-serif text-2xl font-semibold text-primary">
          COO / Operations
        </h3>
        <p className="mt-4 text-lg leading-relaxed text-secondary">
          Cross-channel visibility tied to strategic anchors. Spot operational drift before it becomes a problem. Run trade meetings with full context.
        </p>
        <Link href="/use-cases" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent hover:gap-3 transition-all">
          <span>Learn more</span>
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  </div>
</div>

    {/* Capabilities - What Makes Us Different */}
<div className="border-t border-stone-200 bg-stone-50 py-32">
  <div className="mx-auto max-w-7xl px-6">
    <div className="mx-auto max-w-3xl text-center">
      <h2 className="font-serif text-5xl font-bold leading-tight text-primary">
        What makes predictive intelligence different
      </h2>
      <p className="mt-8 text-xl leading-relaxed text-secondary">
        Traditional dashboards show you what happened. Laminir shows you what's about to happen.
      </p>
    </div>

    <div className="mt-24 grid grid-cols-1 gap-16 md:grid-cols-3">
      {/* Signal Detection */}
      <div>
        <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-white border-2 border-accent">
          <svg className="h-7 w-7 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h3 className="mt-8 font-serif text-2xl font-semibold text-primary">
          Early signal detection
        </h3>
        <p className="mt-4 text-lg leading-relaxed text-secondary">
          AI monitors variance patterns, margin drift, and metric correlations. Flags risks while they're still small. Spots opportunities before they close.
        </p>
        <div className="mt-6 rounded-lg border border-stone-200 bg-white p-4">
          <p className="text-sm text-secondary">
            <span className="font-medium text-primary">Example:</span> Marketing efficiency dropping 3 weeks in a row? You'll know on week 2, not week 10.
          </p>
        </div>
      </div>

      {/* Pattern Recognition */}
      <div>
        <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-white border-2 border-accent">
          <svg className="h-7 w-7 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h3 className="mt-8 font-serif text-2xl font-semibold text-primary">
          Cross-week pattern learning
        </h3>
        <p className="mt-4 text-lg leading-relaxed text-secondary">
          The AI learns what "normal" looks like for your business. Seasonal patterns. Channel behaviors. Strategic drift detection gets sharper over time.
        </p>
        <div className="mt-6 rounded-lg border border-stone-200 bg-white p-4">
          <p className="text-sm text-secondary">
            <span className="font-medium text-primary">Example:</span> "This margin compression happened last Q2 too—here's what worked then."
          </p>
        </div>
      </div>

      {/* Strategic Context */}
      <div>
        <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-white border-2 border-accent">
          <svg className="h-7 w-7 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <h3 className="mt-8 font-serif text-2xl font-semibold text-primary">
          Strategy-anchored intelligence
        </h3>
        <p className="mt-4 text-lg leading-relaxed text-secondary">
          Every insight references your strategic anchors. AI checks if execution is drifting from strategy. Decisions stay aligned to what matters.
        </p>
        <div className="mt-6 rounded-lg border border-stone-200 bg-white p-4">
          <p className="text-sm text-secondary">
            <span className="font-medium text-primary">Example:</span> "Promo activity conflicts with margin protection anchor—flag for discussion."
          </p>
        </div>
      </div>
    </div>
  </div>
      </div>

      {/* Pre-Footer CTA - Institutional Confidence */}
<div className="relative overflow-hidden border-t border-stone-200 bg-primary py-32">
  {/* Subtle gradient overlay */}
  <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-accent opacity-90"></div>
  
  <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
    <h2 className="font-serif text-5xl font-bold leading-tight text-white sm:text-6xl md:text-7xl">
  Stop leaving money on the table
</h2>

<p className="mt-8 text-xl leading-relaxed text-stone-200 md:text-2xl">
  Every week you wait is revenue you are losing. Join executives who catch problems early and capitalise on opportunities before competitors do.
</p>
    
    <div className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row">
      {isSignedIn ? (
        <Link
          href="/dashboard"
          className="inline-flex items-center justify-center rounded-lg border-2 border-white bg-white px-8 py-4 text-base font-medium text-primary transition-all hover:bg-stone-50"
        >
          View dashboard
        </Link>
      ) : (
        <>
          <SignInButton mode="modal" forceRedirectUrl="/dashboard">
            <button className="inline-flex items-center justify-center rounded-lg border-2 border-white bg-white px-8 py-4 text-base font-medium text-primary transition-all hover:bg-stone-50">
              Start now
            </button>
          </SignInButton>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-lg border-2 border-white bg-transparent px-8 py-4 text-base font-medium text-white transition-all hover:bg-white/10"
          >
            Talk to us
          </Link>
        </>
      )}
    </div>
    
    {/* Social proof / trust indicators */}
    <div className="mt-16 border-t border-white/20 pt-12">
      <p className="text-sm font-medium uppercase tracking-wider text-stone-300">
        Trusted by forward-thinking retail teams
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-8 text-stone-400">
        <div className="flex items-center gap-2">
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span className="text-sm">Enterprise-grade security</span>
        </div>
        <div className="flex items-center gap-2">
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span className="text-sm">SOC 2 compliant</span>
        </div>
        <div className="flex items-center gap-2">
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span className="text-sm">99.9% uptime</span>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
);
}
