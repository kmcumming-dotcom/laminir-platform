"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function GetStarted() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    revenue: "",
    phone: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Send to your CRM/email service (Mailchimp, HubSpot, etc.)
    console.log("Lead captured:", formData);
    setSubmitted(true);
    
    // Redirect to pricing page after brief delay
    setTimeout(() => {
      router.push("/get-started/pricing");
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
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
            Perfect! Redirecting you to pricing...
          </h2>
          <p className="mt-4 text-lg text-secondary">
            We will also send pricing details to your email.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="border-b border-stone-200 pt-32 pb-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-stone-50 px-4 py-2 text-sm font-medium text-secondary mb-8">
            <svg className="h-4 w-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
            Start your 14-day free trial
          </div>
          
          <h1 className="font-serif text-6xl font-bold leading-tight text-primary md:text-7xl">
            Get predictive intelligence
            <br />
            for your retail business
          </h1>
          
          <p className="mt-8 text-2xl text-secondary leading-relaxed">
            See pricing tailored to your business size. No demos required, no credit card needed.
          </p>
        </div>
      </div>

      {/* Lead Capture Form */}
      <div className="py-20">
        <div className="mx-auto max-w-2xl px-6">
          <div className="rounded-2xl border-2 border-stone-200 bg-white p-10 shadow-xl">
            <h2 className="font-serif text-3xl font-bold text-primary text-center">
              Tell us about your business
            </h2>
            <p className="mt-4 text-center text-lg text-secondary">
              We will show you pricing that fits your size and needs
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-primary mb-2">
                  Full name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-stone-300 px-4 py-3 text-primary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  placeholder="John Smith"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">
                  Work email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-stone-300 px-4 py-3 text-primary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  placeholder="you@company.com"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-primary mb-2">
                  Company name *
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  required
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-stone-300 px-4 py-3 text-primary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  placeholder="Acme Inc"
                />
              </div>

              <div>
                <label htmlFor="revenue" className="block text-sm font-medium text-primary mb-2">
                  Annual revenue *
                </label>
                <select
                  id="revenue"
                  name="revenue"
                  required
                  value={formData.revenue}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-stone-300 px-4 py-3 text-primary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                >
                  <option value="">Select revenue range</option>
                  <option value="under-10m">Under $10M (Starter - 1 channel)</option>
<option value="10m-50m">$10M - $50M (Enterprise recommended)</option>
<option value="50m-100m">$50M - $100M (Enterprise)</option>
<option value="over-100m">Over $100M (Enterprise)</option>
                </select>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-primary mb-2">
                  Phone number (optional)
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-stone-300 px-4 py-3 text-primary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-primary mb-2">
                  What are you looking for? (optional)
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-stone-300 px-4 py-3 text-primary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  placeholder="Better forecasting, margin insights, strategic alignment..."
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-primary px-8 py-4 text-base font-medium text-white transition-all hover:bg-accent"
              >
                See pricing
              </button>

              <p className="text-center text-sm text-secondary">
                We will never spam you. Unsubscribe anytime.
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Trust Signals */}
      <div className="border-t border-stone-200 bg-stone-50 py-16">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 mb-4">
                <svg className="h-6 w-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <p className="font-medium text-primary">Enterprise security</p>
              <p className="mt-1 text-sm text-secondary">SOC 2 Type II certified</p>
            </div>
            <div>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 mb-4">
                <svg className="h-6 w-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="font-medium text-primary">14-day free trial</p>
              <p className="mt-1 text-sm text-secondary">No credit card required</p>
            </div>
            <div>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 mb-4">
                <svg className="h-6 w-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <p className="font-medium text-primary">Cancel anytime</p>
              <p className="mt-1 text-sm text-secondary">No long-term contracts</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}