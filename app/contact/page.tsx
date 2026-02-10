"use client";

import { useState } from "react";
import Link from "next/link";

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formState);
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  if (submitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white pt-24 px-6">
        <div className="max-w-md text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="mt-6 font-serif text-3xl font-bold text-primary">
            Thanks for reaching out
          </h2>
          <p className="mt-4 text-lg text-secondary">
            We will get back to you within 24 hours to schedule a demo and discuss your needs.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-8 text-accent hover:underline"
          >
            Send another message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-stone-200 pt-32 pb-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h1 className="font-serif text-6xl font-bold leading-tight text-primary md:text-7xl">
            Let us talk about your trade intelligence
          </h1>
          <p className="mt-8 text-2xl text-secondary leading-relaxed">
            Book a demo or ask us anything about predictive intelligence for retail
          </p>
        </div>
      </div>

      <div className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="font-serif text-3xl font-bold text-primary">
                Schedule a demo
              </h2>
              <p className="mt-4 text-lg text-secondary">
                Tell us about your needs and we will show you how Laminir fits your workflow
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-primary mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formState.name}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-stone-300 px-4 py-3 text-primary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formState.email}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-stone-300 px-4 py-3 text-primary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    placeholder="you@company.com"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-primary mb-2">
                    Company *
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    required
                    value={formState.company}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-stone-300 px-4 py-3 text-primary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    placeholder="Your company"
                  />
                </div>

                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-primary mb-2">
                    Role *
                  </label>
                  <select
                    id="role"
                    name="role"
                    required
                    value={formState.role}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-stone-300 px-4 py-3 text-primary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  >
                    <option value="">Select your role</option>
                    <option value="ceo">CEO / Founder</option>
                    <option value="cfo">CFO / Finance Leader</option>
                    <option value="coo">COO / Operations</option>
                    <option value="other">Other Leadership</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-primary mb-2">
                    What would you like to discuss?
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formState.message}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-stone-300 px-4 py-3 text-primary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    placeholder="Tell us about your current trade process and what you would like to improve..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-lg bg-primary px-8 py-4 text-base font-medium text-white transition-all hover:bg-accent"
                >
                  Request a demo
                </button>
              </form>
            </div>

            <div className="space-y-12">
              <div>
                <h3 className="font-serif text-2xl font-semibold text-primary">
                  Prefer email?
                </h3>
                <p className="mt-4 text-lg text-secondary">
                  Reach out directly and we will respond within 24 hours
                </p>
                <Link
                  href="mailto:hello@laminir.com"
                  className="mt-4 inline-block text-xl text-accent hover:underline"
                >
                  hello@laminir.com
                </Link>
              </div>

              <div className="rounded-2xl border border-stone-200 bg-stone-50 p-8">
                <h3 className="font-serif text-2xl font-semibold text-primary">
                  What to expect
                </h3>
                <div className="mt-6 space-y-4">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-white text-xs font-bold">
                        1
                      </div>
                    </div>
                    <div>
                      <p className="font-medium text-primary">Discovery call (30 min)</p>
                      <p className="mt-1 text-sm text-secondary">
                        We learn about your current process and trade cadence
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-white text-xs font-bold">
                        2
                      </div>
                    </div>
                    <div>
                      <p className="font-medium text-primary">Live demo (45 min)</p>
                      <p className="mt-1 text-sm text-secondary">
                        See Laminir in action with real retail data
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-white text-xs font-bold">
                        3
                      </div>
                    </div>
                    <div>
                      <p className="font-medium text-primary">Custom proposal</p>
                      <p className="mt-1 text-sm text-secondary">
                        Pricing and implementation plan for your team
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-white text-xs font-bold">
                        4
                      </div>
                    </div>
                    <div>
                      <p className="font-medium text-primary">Pilot or go-live</p>
                      <p className="mt-1 text-sm text-secondary">
                        Start with one market or go full deployment
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-serif text-2xl font-semibold text-primary mb-6">
                  Common questions
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium text-primary">How long is onboarding?</p>
                    <p className="mt-1 text-secondary">
                      2-4 weeks from contract to first report, depending on data complexity
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-primary">Do you integrate with our systems?</p>
                    <p className="mt-1 text-secondary">
                      We work with Excel/CSV uploads. API integrations available for enterprise plans.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-primary">Can we customize the reports?</p>
                    <p className="mt-1 text-secondary">
                      Yes. Strategic anchors and metrics are fully customizable to your business.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}