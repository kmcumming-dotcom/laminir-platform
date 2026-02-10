"use client";

import Link from "next/link";
import { SignUpButton } from "@clerk/nextjs";
import { useState } from "react";

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual");

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="border-b border-stone-200 pt-32 pb-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h1 className="font-serif text-6xl font-bold leading-tight text-primary md:text-7xl">
            Intelligence that pays for itself
          </h1>
          <p className="mt-8 text-2xl text-secondary leading-relaxed">
            Catch one margin leak, spot one trend early, avoid one bad decision - and Laminir has paid for itself 10x over
          </p>
        </div>
      </div>

      {/* Value Proposition Bar */}
      <div className="border-b border-stone-200 bg-stone-50 py-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="font-serif text-3xl font-bold text-accent">$50K+</p>
              <p className="mt-2 text-sm text-secondary">Average margin recovery in first 90 days</p>
            </div>
            <div>
              <p className="font-serif text-3xl font-bold text-accent">6 hours</p>
              <p className="mt-2 text-sm text-secondary">Saved per week on trade prep and analysis</p>
            </div>
            <div>
              <p className="font-serif text-3xl font-bold text-accent">2-4 weeks</p>
              <p className="mt-2 text-sm text-secondary">Faster response to market signals</p>
            </div>
          </div>
        </div>
      </div>

      {/* Billing Toggle */}
      <div className="py-12">
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
              billingCycle === "monthly"
                ? "bg-primary text-white"
                : "bg-stone-100 text-secondary hover:bg-stone-200"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle("annual")}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
              billingCycle === "annual"
                ? "bg-primary text-white"
                : "bg-stone-100 text-secondary hover:bg-stone-200"
            }`}
          >
            Annual <span className="ml-2 text-xs">(Save 20%)</span>
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="pb-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Micro Plan */}
            <div className="rounded-2xl border-2 border-stone-200 bg-white p-8">
              <h2 className="font-serif text-2xl font-bold text-primary">
                Micro
              </h2>
              <p className="mt-2 text-sm text-secondary">
                Test the waters
              </p>
              
              <div className="mt-6 flex items-baseline gap-2">
                <span className="font-serif text-4xl font-bold text-primary">
                  ${billingCycle === "annual" ? "79" : "99"}
                </span>
                <span className="text-lg text-secondary">/mo</span>
              </div>
              {billingCycle === "annual" && (
                <p className="mt-1 text-xs text-accent font-medium">
                  $948/year (save $240)
                </p>
              )}

              <div className="mt-8 space-y-3">
                <div className="flex items-start gap-2">
                  <svg className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-secondary">1 channel</p>
                </div>
                <div className="flex items-start gap-2">
                  <svg className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-secondary">Monthly reports</p>
                </div>
                <div className="flex items-start gap-2">
                  <svg className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-secondary">AI insights</p>
                </div>
                <div className="flex items-start gap-2">
                  <svg className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-secondary">3 team seats</p>
                </div>
                <div className="flex items-start gap-2">
                  <svg className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-secondary">Email support</p>
                </div>
              </div>

              <div className="mt-8">
                <SignUpButton mode="modal" forceRedirectUrl="/dashboard">
                  <button className="w-full rounded-lg border-2 border-primary px-6 py-3 text-sm font-medium text-primary transition-all hover:bg-primary hover:text-white">
                    Start free trial
                  </button>
                </SignUpButton>
              </div>
            </div>

            {/* Starter Plan */}
            <div className="rounded-2xl border-2 border-stone-200 bg-white p-8">
              <h2 className="font-serif text-2xl font-bold text-primary">
                Starter
              </h2>
              <p className="mt-2 text-sm text-secondary">
                Most popular
              </p>
              
              <div className="mt-6 flex items-baseline gap-2">
                <span className="font-serif text-4xl font-bold text-primary">
                  ${billingCycle === "annual" ? "200" : "250"}
                </span>
                <span className="text-lg text-secondary">/mo</span>
              </div>
              {billingCycle === "annual" && (
                <p className="mt-1 text-xs text-accent font-medium">
                  $2,400/year (save $600)
                </p>
              )}

              <div className="mt-8 space-y-3">
                <div className="flex items-start gap-2">
                  <svg className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-secondary">1 channel</p>
                </div>
                <div className="flex items-start gap-2">
                  <svg className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-secondary"><strong>Weekly</strong> reports</p>
                </div>
                <div className="flex items-start gap-2">
                  <svg className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-secondary">Full AI analysis</p>
                </div>
                <div className="flex items-start gap-2">
                  <svg className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-secondary">5 team seats</p>
                </div>
                <div className="flex items-start gap-2">
                  <svg className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-secondary">Priority email support</p>
                </div>
              </div>

              <div className="mt-8">
                <SignUpButton mode="modal" forceRedirectUrl="/dashboard">
                  <button className="w-full rounded-lg bg-primary px-6 py-3 text-sm font-medium text-white transition-all hover:bg-accent">
                    Start free trial
                  </button>
                </SignUpButton>
              </div>
            </div>

            {/* Growth Plan */}
            <div className="rounded-2xl border-2 border-accent bg-white p-8 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-white">
                  BEST VALUE
                </span>
              </div>

              <h2 className="font-serif text-2xl font-bold text-primary">
                Growth
              </h2>
              <p className="mt-2 text-sm text-secondary">
                Multi-channel brands
              </p>
              
              <div className="mt-6 flex items-baseline gap-2">
                <span className="font-serif text-4xl font-bold text-primary">
                  ${billingCycle === "annual" ? "400" : "500"}
                </span>
                <span className="text-lg text-secondary">/mo</span>
              </div>
              {billingCycle === "annual" && (
                <p className="mt-1 text-xs text-accent font-medium">
                  $4,800/year (save $1,200)
                </p>
              )}

              <div className="mt-8 space-y-3">
                <div className="flex items-start gap-2">
                  <svg className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-secondary"><strong>Up to 3 channels</strong></p>
                </div>
                <div className="flex items-start gap-2">
                  <svg className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-secondary">Weekly reports</p>
                </div>
                <div className="flex items-start gap-2">
                  <svg className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-secondary">Full AI analysis</p>
                </div>
                <div className="flex items-start gap-2">
                  <svg className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-secondary">10 team seats</p>
                </div>
                <div className="flex items-start gap-2">
                  <svg className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-secondary">Priority support</p>
                </div>
              </div>

              <div className="mt-8">
                <SignUpButton mode="modal" forceRedirectUrl="/dashboard">
                  <button className="w-full rounded-lg bg-accent px-6 py-3 text-sm font-medium text-white transition-all hover:bg-primary">
                    Start free trial
                  </button>
                </SignUpButton>
              </div>
            </div>

            {/* Enterprise Plan */}
            <div className="rounded-2xl border-2 border-stone-200 bg-stone-50 p-8">
              <h2 className="font-serif text-2xl font-bold text-primary">
                Enterprise
              </h2>
              <p className="mt-2 text-sm text-secondary">
                $10M+ revenue
              </p>
              
              <div className="mt-6 flex items-baseline gap-2">
                <span className="font-serif text-4xl font-bold text-primary">
                  Custom
                </span>
              </div>
              <p className="mt-1 text-xs text-secondary">
                Starting at $1,500/mo
              </p>

              <div className="mt-8 space-y-3">
                <div className="flex items-start gap-2">
                  <svg className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-secondary"><strong>Unlimited channels</strong></p>
                </div>
                <div className="flex items-start gap-2">
                  <svg className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-secondary"><strong>Live dashboard</strong></p>
                </div>
                <div className="flex items-start gap-2">
                  <svg className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-secondary">API integrations</p>
                </div>
                <div className="flex items-start gap-2">
                  <svg className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-secondary">Unlimited seats</p>
                </div>
                <div className="flex items-start gap-2">
                  <svg className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-secondary">Dedicated CSM</p>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  href="/contact"
                  className="block w-full rounded-lg border-2 border-primary px-6 py-3 text-center text-sm font-medium text-primary transition-all hover:bg-primary hover:text-white"
                >
                  Book a demo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ROI Calculator Section */}
      <div className="border-t border-stone-200 bg-accent/5 py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-center font-serif text-4xl font-bold text-primary mb-6">
            What does this actually save you?
          </h2>
          <p className="text-center text-xl text-secondary mb-12">
            Real ROI from our customers
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-xl border-2 border-accent/20 bg-white p-8">
              <h3 className="font-serif text-2xl font-semibold text-primary mb-4">
                Time savings
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-secondary">Weekly trade prep</span>
                  <span className="font-semibold text-primary">6 hours saved</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-secondary">At $150/hour executive time</span>
                  <span className="font-semibold text-primary">$900/week</span>
                </div>
                <div className="border-t-2 border-stone-200 pt-4 flex justify-between items-baseline">
                  <span className="font-semibold text-primary">Annual value</span>
                  <span className="font-serif text-2xl font-bold text-accent">$46,800</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border-2 border-accent/20 bg-white p-8">
              <h3 className="font-serif text-2xl font-semibold text-primary mb-4">
                Margin recovery
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-secondary">Average margin leak caught</span>
                  <span className="font-semibold text-primary">0.5-2%</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-secondary">On $10M revenue</span>
                  <span className="font-semibold text-primary">$50K-200K</span>
                </div>
                <div className="border-t-2 border-stone-200 pt-4 flex justify-between items-baseline">
                  <span className="font-semibold text-primary">First-year recovery</span>
                  <span className="font-serif text-2xl font-bold text-accent">$50K+</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-lg text-secondary">
              <span className="font-semibold text-primary">Starter plan ($2,400/year)</span> pays for itself if you catch <span className="font-semibold text-accent">one</span> margin leak or make <span className="font-semibold text-accent">one</span> better decision per quarter.
            </p>
          </div>
        </div>
      </div>

     

      {/* Comparison Table */}
      <div className="border-t border-stone-200 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center font-serif text-4xl font-bold text-primary mb-12">
            Feature comparison
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-stone-300">
                  <th className="py-4 text-left font-serif text-lg font-semibold text-primary">Feature</th>
                  <th className="py-4 text-center font-serif text-base font-semibold text-primary">Micro</th>
                  <th className="py-4 text-center font-serif text-base font-semibold text-primary">Starter</th>
                  <th className="py-4 text-center font-serif text-base font-semibold text-primary">Growth</th>
                  <th className="py-4 text-center font-serif text-base font-semibold text-primary">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                <tr>
                  <td className="py-4 text-secondary">Channels included</td>
                  <td className="py-4 text-center text-secondary">1</td>
                  <td className="py-4 text-center text-secondary">1</td>
                  <td className="py-4 text-center text-secondary">Up to 3</td>
                  <td className="py-4 text-center text-secondary">Unlimited</td>
                </tr>
                <tr>
                  <td className="py-4 text-secondary">Report frequency</td>
                  <td className="py-4 text-center text-secondary">Monthly</td>
                  <td className="py-4 text-center text-secondary">Weekly</td>
                  <td className="py-4 text-center text-secondary">Weekly</td>
                  <td className="py-4 text-center text-secondary">Weekly + Live</td>
                </tr>
                <tr>
                  <td className="py-4 text-secondary">Dashboard access</td>
                  <td className="py-4 text-center text-stone-400">—</td>
                  <td className="py-4 text-center text-stone-400">—</td>
                  <td className="py-4 text-center text-stone-400">—</td>
                  <td className="py-4 text-center text-accent">✓</td>
                </tr>
                <tr>
                  <td className="py-4 text-secondary">AI predictive insights</td>
                  <td className="py-4 text-center text-accent">✓</td>
                  <td className="py-4 text-center text-accent">✓</td>
                  <td className="py-4 text-center text-accent">✓</td>
                  <td className="py-4 text-center text-accent">✓</td>
                </tr>
                <tr>
                  <td className="py-4 text-secondary">Margin leak detection</td>
                  <td className="py-4 text-center text-accent">✓</td>
                  <td className="py-4 text-center text-accent">✓</td>
                  <td className="py-4 text-center text-accent">✓</td>
                  <td className="py-4 text-center text-accent">✓</td>
                </tr>
                <tr>
                  <td className="py-4 text-secondary">Institutional memory</td>
                  <td className="py-4 text-center text-accent">✓</td>
                  <td className="py-4 text-center text-accent">✓</td>
                  <td className="py-4 text-center text-accent">✓</td>
                  <td className="py-4 text-center text-accent">✓</td>
                </tr>
                <tr>
                  <td className="py-4 text-secondary">System integrations</td>
                  <td className="py-4 text-center text-stone-400">—</td>
                  <td className="py-4 text-center text-stone-400">—</td>
                  <td className="py-4 text-center text-stone-400">—</td>
                  <td className="py-4 text-center text-accent">✓</td>
                </tr>
                <tr>
                  <td className="py-4 text-secondary">Excel uploads</td>
                  <td className="py-4 text-center text-accent">✓</td>
                  <td className="py-4 text-center text-accent">✓</td>
                  <td className="py-4 text-center text-accent">✓</td>
                  <td className="py-4 text-center text-accent">✓</td>
                </tr>
                <tr>
                  <td className="py-4 text-secondary">Team seats</td>
                  <td className="py-4 text-center text-secondary">3</td>
                  <td className="py-4 text-center text-secondary">5</td>
                  <td className="py-4 text-center text-secondary">10</td>
                  <td className="py-4 text-center text-secondary">Unlimited</td>
                </tr>
                <tr>
                  <td className="py-4 text-secondary">Strategic anchors</td>
                  <td className="py-4 text-center text-secondary">Pre-built</td>
                  <td className="py-4 text-center text-secondary">Pre-built</td>
                  <td className="py-4 text-center text-secondary">Pre-built</td>
                  <td className="py-4 text-center text-secondary">Custom</td>
                </tr>
                <tr>
                  <td className="py-4 text-secondary">Onboarding</td>
                  <td className="py-4 text-center text-secondary">Self-serve</td>
                  <td className="py-4 text-center text-secondary">Self-serve</td>
                  <td className="py-4 text-center text-secondary">Self-serve</td>
                  <td className="py-4 text-center text-secondary">White-glove</td>
                </tr>
                <tr>
                  <td className="py-4 text-secondary">Support</td>
                  <td className="py-4 text-center text-secondary">Email</td>
                  <td className="py-4 text-center text-secondary">Email</td>
                  <td className="py-4 text-center text-secondary">Priority Email</td>
                  <td className="py-4 text-center text-secondary">Phone/Slack</td>
                </tr>
                <tr>
                  <td className="py-4 text-secondary">Dedicated CSM</td>
                  <td className="py-4 text-center text-stone-400">—</td>
                  <td className="py-4 text-center text-stone-400">—</td>
                  <td className="py-4 text-center text-stone-400">—</td>
                  <td className="py-4 text-center text-accent">✓</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="border-t border-stone-200 bg-stone-50 py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-center font-serif text-4xl font-bold text-primary mb-12">
            Common questions
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-primary">
                What is the difference between monthly and weekly reports?
              </h3>
              <p className="mt-2 text-base text-secondary">
                Micro plan gives you monthly AI reports (good for testing or seasonal businesses). Starter and Growth provide weekly reports so you can catch trends and make decisions faster. Weekly cadence is what most retail executives need to stay ahead.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-primary">
                Why does Enterprise include a live dashboard but others do not?
              </h3>
              <p className="mt-2 text-base text-secondary">
                Report-only plans give you weekly AI-generated intelligence (PDF + web view). Enterprise adds a live dashboard you can explore anytime - drill into metrics, compare time periods, export data. Think of reports as your weekly brief, dashboard as your war room.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-primary">
                How does channel pricing work?
              </h3>
              <p className="mt-2 text-base text-secondary">
                Micro and Starter include 1 channel (e.g., your Shopify store). Growth includes up to 3 channels (Shopify + Amazon + Retail, for example). Enterprise includes unlimited channels. Each channel requires separate data tracking and AI analysis, which is why we bundle them into tiers.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-primary">
                Can I upgrade from Starter to Growth or Enterprise later?
              </h3>
              <p className="mt-2 text-base text-secondary">
                Absolutely. Most customers start with Starter or Growth and upgrade when they add channels or hit $10M+ revenue. We migrate your historical data and institutional memory seamlessly - nothing gets lost.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-primary">
                What if I only need reports during peak season?
              </h3>
              <p className="mt-2 text-base text-secondary">
                You can pause and resume anytime on monthly plans. However, institutional memory works best with consistent data - the AI learns your patterns over time. We recommend at least 12 consecutive weeks to see the compounding value.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-primary">
                How long does it take to see ROI?
              </h3>
              <p className="mt-2 text-base text-secondary">
                Most customers catch their first margin leak or spot a meaningful trend within 4-8 weeks. The platform pays for itself if you avoid one bad promo decision ($10K+ impact) or catch one margin compression early ($20K+ recovery). Time savings (6 hours/week) add up to $46K+ annually.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-primary">
                Do you offer refunds?
              </h3>
              <p className="mt-2 text-base text-secondary">
                We offer a 14-day free trial (no credit card required). After that, we have a 30-day money-back guarantee if you are not seeing value. We want customers who love the product, not those stuck in contracts.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-primary">
                What is included in white-glove onboarding?
              </h3>
              <p className="mt-2 text-base text-secondary">
                Enterprise customers get dedicated implementation: custom strategic anchor setup, data mapping workshop, system integration configuration, team training sessions, and a dedicated customer success manager for ongoing support. Onboarding takes 2-4 weeks vs. self-serve which you can start in 15 minutes.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="border-t border-stone-200 py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="font-serif text-4xl font-bold text-primary">
            Start making money, not just analysing data
          </h2>
          <p className="mt-6 text-xl text-secondary">
            14-day free trial. No credit card required. Cancel anytime.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
            <SignUpButton mode="modal" forceRedirectUrl="/dashboard">
              <button className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-4 text-base font-medium text-white transition-all hover:bg-accent">
                Start free trial
              </button>
            </SignUpButton>
            <Link
              href="/contact"
              className="inline-block text-base font-medium text-secondary transition-colors hover:text-accent"
            >
              or book a demo for Enterprise
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}