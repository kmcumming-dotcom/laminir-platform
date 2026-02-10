"use client";

import { useState } from "react";
import Link from "next/link";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  // Product & Platform
  {
    category: "Product & Platform",
    question: "What is Laminir?",
    answer: "Laminir is predictive intelligence for retail executives. We transform weekly trade data into forward-looking insights that detect signals, flag risks, and surface opportunities before they become obvious. Unlike traditional dashboards that show what happened, Laminir shows what is coming."
  },
  {
    category: "Product & Platform",
    question: "How is this different from our existing dashboards?",
    answer: "Traditional dashboards are backward-looking and reset every week. Laminir is predictive and builds institutional memory over time. Our AI learns your business patterns, maintains strategic context across weeks, and flags variance trends before they threaten the quarter. Week 1 gives you insights. Week 52 gives you foresight."
  },
  {
    category: "Product & Platform",
    question: "What data do I need to provide?",
    answer: "You need three data inputs: (1) Weekly forecasts (sales, units, margin, traffic, conversion, marketing metrics), (2) Weekly actuals (same metrics), and (3) GTM calendar (upcoming events, promos, launches). We provide Excel templates that make uploads simple. Most teams spend 15-20 minutes per week on data prep."
  },
  {
    category: "Product & Platform",
    question: "Does Laminir integrate with our systems?",
    answer: "We work with Excel/CSV uploads for maximum flexibility and security. For enterprise customers, we offer API integrations with common retail systems (Shopify, NetSuite, SAP, etc.). Most teams start with uploads and add integrations later as usage scales."
  },
  {
    category: "Product & Platform",
    question: "Can we customize the strategic anchors and metrics?",
    answer: "Absolutely. Strategic anchors are fully customizable to your business priorities. You define them once during onboarding, and they persist across all reports. Metrics can be tailored to your KPIs - we support custom calculations and industry-specific measurements."
  },
  
  // Getting Started
  {
    category: "Getting Started",
    question: "How long does onboarding take?",
    answer: "2-4 weeks from contract signature to first report. Week 1: Data mapping and template setup. Week 2: Upload first dataset and review AI output. Week 3: Refine strategic anchors and customize reports. Week 4: Go live with your first weekly report. We provide hands-on support throughout."
  },
  {
    category: "Getting Started",
    question: "Do we need technical resources to implement Laminir?",
    answer: "No. Laminir is built for business users, not IT teams. If you can work with Excel, you can use Laminir. Our customer success team handles all setup and configuration. No coding, no IT tickets, no technical dependencies."
  },
  {
    category: "Getting Started",
    question: "Can we start with a pilot?",
    answer: "Yes. Most customers start with a single market or channel for 90 days. This lets you see the value of institutional memory compounding before expanding to additional markets, channels, or brands. Pilots typically include 3-5 executive users."
  },
  {
    category: "Getting Started",
    question: "What does the first report look like?",
    answer: "Week 1 focuses on variance analysis (actual vs plan) with AI-generated insights on what is working and what needs attention. As weeks progress, the AI starts detecting patterns, referencing past decisions, and flagging trends. By Week 8-12, you will see predictive signals and strategic drift detection."
  },
  
  // Pricing & Plans
  {
    category: "Pricing & Plans",
    question: "How is pricing determined?",
    answer: "Pricing is based on team size (number of users) and complexity (number of markets, channels, brands you are tracking). We provide custom quotes after understanding your needs. Annual contracts with no per-report charges or hidden fees."
  },
  {
    category: "Pricing & Plans",
    question: "What is included in the Enterprise plan?",
    answer: "Everything: unlimited weekly reports, full AI-powered analysis, institutional memory, team seats for CEO/CFO/COO and key leaders, enterprise security (SOC 2, SSO, audit logs), dedicated customer success, onboarding and training. No feature tiers - everyone gets the full platform."
  },
  {
    category: "Pricing & Plans",
    question: "Is there a setup fee?",
    answer: "No. Onboarding, training, data integration, and customer success are all included in your annual subscription. We are incentivized to get you to value quickly."
  },
  {
    category: "Pricing & Plans",
    question: "Can we add more users later?",
    answer: "Yes. You can add seats at any time. We pro-rate the cost for the remainder of your contract term. Most teams start with 3-5 executives and expand to 8-12 as they see the value."
  },
  {
    category: "Pricing & Plans",
    question: "What is the contract length?",
    answer: "Annual contracts. Intelligence that compounds needs time to deliver value. We are aligned on building something that lasts, not a quick SaaS trial. Most customers renew and expand after seeing 6-12 months of institutional memory accumulate."
  },
  
  // Security & Compliance
  {
    category: "Security & Compliance",
    question: "How secure is our data?",
    answer: "Enterprise-grade security: SOC 2 Type II certified, data encrypted in transit and at rest (AES-256), role-based access control, audit logging, SSO support (SAML 2.0). Your data is isolated in dedicated instances - we never commingle customer data or use it to train models for other customers."
  },
  {
    category: "Security & Compliance",
    question: "Where is our data stored?",
    answer: "Data is stored in AWS (US-East region by default). We can accommodate other regions or private cloud requirements for enterprise customers. All data remains in your specified region and is never transferred across borders without explicit approval."
  },
  {
    category: "Security & Compliance",
    question: "Can we delete our data?",
    answer: "Yes. You own your data. You can export it at any time and request full deletion upon contract termination. We retain data for 30 days post-termination for recovery purposes, then permanently delete it."
  },
  {
    category: "Security & Compliance",
    question: "Do you have a Data Processing Agreement?",
    answer: "Yes. We provide a standard DPA that covers GDPR, CCPA, and other privacy regulations. We can also execute customer DPAs as needed for enterprise compliance."
  },
  
  // Using Laminir
  {
    category: "Using Laminir",
    question: "How much time does this save our team?",
    answer: "Most executives report saving 30-60 minutes per week on trade prep. More importantly, they make better decisions faster because context is always available. One CFO told us: 'I used to spend an hour reconstructing last week before I could think about next week. Now I spend 10 minutes reviewing and 50 minutes deciding.'"
  },
  {
    category: "Using Laminir",
    question: "Who should use Laminir in our organization?",
    answer: "Laminir is built for the executive team running weekly trade: CEO/Founder, CFO, and COO. These are the people who need to connect strategy, performance, and forward plans into one coherent view. It is not built for departmental teams (buying, marketing, ops) - it is built for the room where decisions happen."
  },
  {
    category: "Using Laminir",
    question: "What happens if we miss a week of data uploads?",
    answer: "The AI will flag the gap and continue working with available data. You can backfill missing weeks later. Institutional memory is resilient - a single missed week does not break the pattern recognition. That said, consistency matters for predictive accuracy."
  },
  {
    category: "Using Laminir",
    question: "Can we access historical reports?",
    answer: "Yes. All reports are archived and searchable. You can compare current week to any past week, see how decisions evolved over time, and reference what you flagged when similar situations occurred. This is the institutional memory in action."
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Group FAQs by category
  const categories = Array.from(new Set(faqs.map(faq => faq.category)));

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="border-b border-stone-200 pt-32 pb-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h1 className="font-serif text-6xl font-bold leading-tight text-primary md:text-7xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-8 text-2xl text-secondary leading-relaxed">
            Everything you need to know about Laminir
          </p>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="py-20">
        <div className="mx-auto max-w-4xl px-6">
          {categories.map((category) => (
            <div key={category} className="mb-16">
              <h2 className="font-serif text-3xl font-bold text-primary mb-8">
                {category}
              </h2>
              <div className="space-y-4">
                {faqs
                  .filter(faq => faq.category === category)
                  .map((faq, index) => {
                    const globalIndex = faqs.indexOf(faq);
                    const isOpen = openIndex === globalIndex;
                    
                    return (
                      <div
                        key={globalIndex}
                        className="rounded-lg border border-stone-200 bg-white overflow-hidden transition-all"
                      >
                        <button
                          onClick={() => toggleFAQ(globalIndex)}
                          className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-stone-50 transition-colors"
                        >
                          <span className="font-semibold text-lg text-primary pr-8">
                            {faq.question}
                          </span>
                          <svg
                            className={`h-6 w-6 text-accent flex-shrink-0 transition-transform ${
                              isOpen ? 'rotate-180' : ''
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </button>
                        {isOpen && (
                          <div className="px-6 pb-5 pt-2">
                            <p className="text-base text-secondary leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Still have questions CTA */}
      <div className="border-t border-stone-200 bg-stone-50 py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="font-serif text-4xl font-bold text-primary">
            Still have questions?
          </h2>
          <p className="mt-6 text-xl text-secondary">
            Book a call with our team and we will walk you through everything
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-4 text-base font-medium text-white transition-all hover:bg-accent"
            >
              Schedule a demo
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