import Link from "next/link";

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="border-b border-stone-200 pt-32 pb-20">
        <div className="mx-auto max-w-4xl px-6">
          <h1 className="font-serif text-6xl font-bold leading-tight text-primary md:text-7xl">
            Intelligence that sees around corners
          </h1>
          <p className="mt-8 text-2xl text-secondary leading-relaxed">
            We're building predictive intelligence infrastructure for retail executives. Decision-making that compounds, not resets.
          </p>
        </div>
      </div>

      {/* The Problem We're Solving */}
      <div className="border-b border-stone-200 py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="font-serif text-4xl font-bold text-primary">
            The problem we're solving
          </h2>
          <div className="mt-8 space-y-6 text-lg text-secondary leading-relaxed">
            <p>
              Retail executives are drowning in dashboards that show what already happened. By the time the weekly report lands, the trend is baked in. The competitor already moved. The opportunity already closed.
            </p>
            <p>
              Worse, every decision starts from scratch. Context evaporates between meetings. Strategic anchors get forgotten in execution pressure. Institutional memory lives in people's heads, not systems.
            </p>
            <p className="font-medium text-primary">
              Reactive intelligence doesn't compound. And intelligence that doesn't compound can't scale.
            </p>
          </div>
        </div>
      </div>

      {/* Our Approach */}
      <div className="border-b border-stone-200 bg-stone-50 py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="font-serif text-4xl font-bold text-primary">
            Our approach
          </h2>
          <div className="mt-8 space-y-6 text-lg text-secondary leading-relaxed">
            <p>
              Laminir is predictive intelligence for retail. We detect signals before they become trends. We flag risks while they're still small. We surface opportunities before your competitors see them.
            </p>
            <p>
              Our AI learns your business patterns, watches your metrics, and maintains strategic context across weeks. Every data upload enriches the model. Every decision adds to institutional memory.
            </p>
            <p>
              Week 1 gives you insights. Week 52 gives you foresight.
            </p>
          </div>

          {/* Key Principles */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-lg border border-stone-200 bg-white p-6">
              <h3 className="font-serif text-xl font-semibold text-primary">
                Forward-looking, not backward
              </h3>
              <p className="mt-3 text-base text-secondary">
                Every insight points toward what's coming, not just what happened. Predictive signals, early warnings, opportunity detection.
              </p>
            </div>

            <div className="rounded-lg border border-stone-200 bg-white p-6">
              <h3 className="font-serif text-xl font-semibold text-primary">
                Compounds over time
              </h3>
              <p className="mt-3 text-base text-secondary">
                Intelligence that builds on itself. Pattern recognition improves. Strategic context persists. Institutional memory grows.
              </p>
            </div>

            <div className="rounded-lg border border-stone-200 bg-white p-6">
              <h3 className="font-serif text-xl font-semibold text-primary">
                Strategy-anchored
              </h3>
              <p className="mt-3 text-base text-secondary">
                Every insight connects to your strategic anchors. AI checks for drift. Decisions stay aligned to what matters most.
              </p>
            </div>

            <div className="rounded-lg border border-stone-200 bg-white p-6">
              <h3 className="font-serif text-xl font-semibold text-primary">
                Built for operators
              </h3>
              <p className="mt-3 text-base text-secondary">
                No consultants required. No training needed. Intelligence designed for the people running weekly trade.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Who We Built This For */}
      <div className="border-b border-stone-200 py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="font-serif text-4xl font-bold text-primary">
            Who we built this for
          </h2>
          <div className="mt-8 space-y-6 text-lg text-secondary leading-relaxed">
            <p>
              Laminir is built for CEOs, CFOs, and COOs running DTC and retail brands ($10M-$500M revenue). The people in the room where weekly trade decisions happen.
            </p>
            <p>
              If you run weekly trade meetings and need to connect strategy, performance, and forward plans into one coherent view—this is for you.
            </p>
            <p>
              If you're tired of reconstructing context every week and want intelligence that remembers—this is for you.
            </p>
            <p>
              If you want to see signals before they become headlines—this is for you.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="font-serif text-4xl font-bold text-primary">
            Ready to see what's coming?
          </h2>
          <p className="mt-6 text-xl text-secondary">
            Join retail executives using predictive intelligence to stay ahead of the curve
          </p>
          <div className="mt-10">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-4 text-base font-medium text-white transition-all hover:bg-accent"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}