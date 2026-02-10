"use client";

import { useDashboard } from "@/lib/hooks/useDashboard";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useState } from "react";
import { LineChart, Line, ResponsiveContainer } from "recharts";

// Helper function to parse bullet points and sub-bullets
function formatBulletPoints(text: string) {
  if (!text) return [];
  
  const items = text.split('•').filter(item => item.trim());
  
  return items.map(item => {
    const parts = item.split('→').map(p => p.trim()).filter(p => p);
    
    return {
      main: parts[0] || '',
      subs: parts.slice(1)
    };
  });
}

export default function Dashboard() {
  const { user } = useUser();
  const [filters, setFilters] = useState<{ channel?: string; market?: string }>({});
const { data, loading, error, availableChannels, availableMarkets } = useDashboard(filters);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-24">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-black mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-24 px-4">
        <div className="max-w-md rounded-lg border border-red-200 bg-red-50 p-6 text-center">
          <p className="font-semibold text-red-900">Error loading dashboard</p>
          <p className="mt-2 text-sm text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const formatPercent = (num: number) => `${num > 0 ? '+' : ''}${num.toFixed(1)}%`;
  const formatCurrency = (num: number) => `$${Math.round(num / 1000)}K`;
  const formatCurrencyFull = (num: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(num);

  // Calculate impact metrics
  const salesGap = data.salesActual - data.salesPlan;
  const gmGap = (data.salesActual * data.gmActual) - (data.salesPlan * data.gmPlan);

  return (
    <div className="min-h-screen bg-stone-50 pt-24 pb-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="font-serif text-4xl font-bold text-primary">
            Welcome back{user?.firstName ? `, ${user.firstName}` : ''}
          </h1>
          <p className="mt-2 text-sm text-secondary">
            {data.reportName} • Last updated 2 hours ago
          </p>
        </div>

        {/* Filters */}
<div className="mb-8 flex flex-wrap gap-4">
  <div>
    <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-stone-500">
      Channel
    </label>
    <select
      value={filters.channel || ''}
      onChange={(e) => setFilters({ ...filters, channel: e.target.value || undefined })}
      className="w-48 rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm text-primary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
    >
      <option value="">All Channels</option>
      {availableChannels.map((channel) => (
        <option key={channel} value={channel}>
          {channel}
        </option>
      ))}
    </select>
  </div>

  <div>
    <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-stone-500">
      Market
    </label>
    <select
      value={filters.market || ''}
      onChange={(e) => setFilters({ ...filters, market: e.target.value || undefined })}
      className="w-48 rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm text-primary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
    >
      <option value="">All Markets</option>
      {availableMarkets.map((market) => (
        <option key={market} value={market}>
          {market}
        </option>
      ))}
    </select>
  </div>
</div>

        {/* Quick Actions */}
        <div className="mb-12 flex flex-wrap gap-3">
          <Link
            href="/week"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent"
          >
            View full report
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          <Link
            href="/inputs"
            className="inline-flex items-center rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent"
          >
            Upload forecast
          </Link>
          <Link
            href="/inputs"
            className="inline-flex items-center rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent"
          >
            Add decision
          </Link>
        </div>

        {/* HERO METRICS - Sales & Marketing Efficiency */}
<div className="mb-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
  {/* Sales Performance Hero */}
  <div className="rounded-2xl border border-stone-200 bg-white p-8 shadow-sm">
    <p className="text-sm font-medium uppercase tracking-wider text-stone-500">
      Sales Performance
    </p>
    <div className="mt-4 flex items-baseline gap-4">
      <p className={`font-serif text-6xl font-bold ${data.salesVsFcst >= 0 ? 'text-green-600' : 'text-red-600'}`}>
        {formatPercent(data.salesVsFcst)}
      </p>
      <div className="text-stone-500">
        <p className="text-sm">vs forecast</p>
        <p className="text-xs">{formatCurrencyFull(data.salesActual)} / {formatCurrencyFull(data.salesPlan)}</p>
      </div>
    </div>
    
    {/* Impact & So What */}
<div className="mt-6 space-y-3">
  <div className="rounded-lg bg-stone-50 p-3">
    <p className="text-xs font-medium uppercase tracking-wide text-stone-500">Impact</p>
    <p className="mt-1 text-sm font-medium text-primary">
      {formatCurrencyFull(Math.abs(salesGap))} {salesGap >= 0 ? 'above' : 'below'} plan
    </p>
    <p className="mt-1 text-xs text-secondary">
      GM Impact: {formatCurrencyFull(Math.abs(gmGap))} {gmGap >= 0 ? 'gain' : 'loss'}
    </p>
    <p className="mt-1 text-xs text-secondary">
      {salesGap < 0 ? 'Revenue shortfall jeopardizes Q1 target' : 'Ahead of quarterly revenue target'}
    </p>
  </div>
  
  <div className="rounded-lg bg-stone-50 p-3">
    <p className="text-xs font-medium uppercase tracking-wide text-stone-500">Trajectory</p>
    <p className={`mt-1 text-sm font-medium ${data.wowSalesMovement >= 0 ? 'text-green-600' : 'text-red-600'}`}>
      {data.wowSalesMovement >= 0 ? '↗' : '↘'} {formatPercent(data.wowSalesMovement)} week-over-week
    </p>
  </div>
</div>

    {/* Trend Chart */}
<div className="mt-6">
  <p className="mb-2 text-xs font-medium uppercase tracking-wider text-stone-500">
    8-Week Trend
  </p>
  {data.salesTrend.length >= 2 ? (
    <div className="h-32 rounded-lg bg-stone-50 p-2">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data.salesTrend.map((val, idx) => ({ week: idx + 1, value: val }))}>
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke={data.salesVsFcst >= 0 ? '#16a34a' : '#dc2626'} 
            strokeWidth={2}
            dot={data.salesTrend.length <= 4}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  ) : (
    <div className="h-32 rounded-lg bg-stone-50 p-2 flex items-center justify-center">
      <p className="text-xs text-stone-400">Insufficient data for trend (need 2+ weeks)</p>
    </div>
  )}
</div>
  </div>

  {/* Marketing Efficiency Hero */}
  <div className="rounded-2xl border border-stone-200 bg-white p-8 shadow-sm">
    <p className="text-sm font-medium uppercase tracking-wider text-stone-500">
      Marketing Efficiency (MER)
    </p>
    <div className="mt-4 flex items-baseline gap-4">
      <p className={`font-serif text-6xl font-bold ${data.merVsPlan >= 0 ? 'text-green-600' : 'text-red-600'}`}>
        {data.mer.toFixed(1)}x
      </p>
      <div className="text-stone-500">
        <p className="text-sm">{formatPercent(data.merVsPlan)} vs plan</p>
        <p className="text-xs">Revenue per $ spent</p>
      </div>
    </div>
    
    {/* Impact */}
    <div className="mt-6 space-y-3">
      <div className="rounded-lg bg-stone-50 p-3">
        <p className="text-xs font-medium uppercase tracking-wide text-stone-500">What This Means</p>
        <p className="mt-1 text-sm text-primary">
          Every $1 in marketing generates ${data.mer.toFixed(2)} in revenue
        </p>
        <p className="mt-1 text-xs text-secondary">
          {data.merVsPlan >= 0 
            ? 'Marketing efficiency above target - strong ROI' 
            : 'Marketing efficiency below target - review channel mix'}
        </p>
      </div>
      
      <div className="rounded-lg bg-stone-50 p-3">
        <p className="text-xs font-medium uppercase tracking-wide text-stone-500">Channel Breakdown</p>
        <div className="mt-2 space-y-1 text-xs text-secondary">
          <div className="flex justify-between">
            <span>Paid Social</span>
            <span className="font-medium text-primary">{(data.roas * 0.6).toFixed(1)}x</span>
          </div>
          <div className="flex justify-between">
            <span>Paid Search</span>
            <span className="font-medium text-primary">{(data.roas * 0.8).toFixed(1)}x</span>
          </div>
          <div className="flex justify-between">
            <span>Email/SMS</span>
            <span className="font-medium text-primary">{(data.roas * 1.2).toFixed(1)}x</span>
          </div>
        </div>
      </div>
      {/* AI Commentary */}
        {data.digitalEfficiencyCommentary && (
          <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <span className={`inline-flex items-center justify-center rounded-full w-6 h-6 text-xs font-semibold ${
                  data.digitalEfficiencySignal === 'Positive' 
                    ? 'bg-green-500 text-white'
                    : data.digitalEfficiencySignal === 'Negative'
                    ? 'bg-red-500 text-white'
                    : 'bg-yellow-500 text-white'
                }`}>
                  {data.digitalEfficiencySignal === 'Positive' ? '↗' : data.digitalEfficiencySignal === 'Negative' ? '↘' : '→'}
                </span>
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium uppercase tracking-wide text-blue-900 mb-1">
                  AI Analysis
                </p>
                <p className="text-sm text-blue-800 leading-relaxed">
                  {data.digitalEfficiencyCommentary}
                </p>
              </div>
            </div>
          </div>
        )}
    </div>

    {/* Note */}
    <div className="mt-6">
      <p className="text-xs text-stone-500">
        <span className="font-medium">ROAS:</span> {data.roas.toFixed(2)}x 
        <span className={`ml-2 ${data.roasVsPlan >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          ({formatPercent(data.roasVsPlan)} vs plan)
        </span>
      </p>
    </div>
  </div>
</div>

        {/* Section 1: Supporting Metrics */}
<div className="mb-12">
  <h2 className="mb-6 font-serif text-2xl font-semibold text-primary">
    Supporting Metrics
  </h2>
  <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
    {/* GM */}
    <div className="rounded-lg border border-stone-200 bg-white p-6">
      <p className="text-xs font-medium uppercase tracking-wide text-stone-500">
        Gross Margin
      </p>
      <p className={`mt-3 font-serif text-3xl font-bold ${data.gmVsFcst >= 0 ? 'text-green-600' : 'text-red-600'}`}>
        {formatPercent(data.gmVsFcst)}
      </p>
      <p className="mt-1 text-xs text-stone-500">vs forecast</p>
      <div className="mt-2 h-8">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data.gmTrend.map((val, idx) => ({ week: idx, value: val }))}>
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={data.gmVsFcst >= 0 ? '#16a34a' : '#dc2626'} 
              strokeWidth={1.5}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>

    {/* AOV */}
    <div className="rounded-lg border border-stone-200 bg-white p-6">
      <p className="text-xs font-medium uppercase tracking-wide text-stone-500">
        AOV
      </p>
      <p className={`mt-3 font-serif text-3xl font-bold ${data.aovVsFcst >= 0 ? 'text-green-600' : 'text-red-600'}`}>
        {formatPercent(data.aovVsFcst)}
      </p>
      <p className="mt-1 text-xs text-stone-500">vs forecast</p>
    </div>

    {/* Traffic */}
    <div className="rounded-lg border border-stone-200 bg-white p-6">
      <p className="text-xs font-medium uppercase tracking-wide text-stone-500">
        Traffic
      </p>
      <p className={`mt-3 font-serif text-3xl font-bold ${data.trafficVsFcst >= 0 ? 'text-green-600' : 'text-red-600'}`}>
        {formatPercent(data.trafficVsFcst)}
      </p>
      <p className="mt-1 text-xs text-stone-500">vs forecast</p>
    </div>

    {/* Conversion */}
    <div className="rounded-lg border border-stone-200 bg-white p-6">
      <p className="text-xs font-medium uppercase tracking-wide text-stone-500">
        Conversion
      </p>
      <p className={`mt-3 font-serif text-3xl font-bold ${data.conversionVsFcst >= 0 ? 'text-green-600' : 'text-red-600'}`}>
        {data.conversionVsFcst > 0 ? '+' : ''}{data.conversionVsFcst.toFixed(1)}pts
      </p>
      <p className="mt-1 text-xs text-stone-500">vs forecast</p>
    </div>

    {/* ROAS */}
    <div className="rounded-lg border border-stone-200 bg-white p-6">
      <p className="text-xs font-medium uppercase tracking-wide text-stone-500">
        ROAS
      </p>
      <p className={`mt-3 font-serif text-3xl font-bold ${data.roasVsPlan >= 0 ? 'text-green-600' : 'text-red-600'}`}>
        {data.roas.toFixed(1)}x
      </p>
      <p className="mt-1 text-xs text-stone-500">vs plan</p>
    </div>
  </div>
</div>

        {/* Executive Summary */}
        <div className="mb-12">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-primary">
            Executive Summary
          </h2>
          <div className="rounded-lg border border-stone-200 bg-white p-8">
            <p className="text-lg leading-relaxed text-secondary whitespace-pre-wrap">
              {data.executiveSummary}
            </p>
          </div>
        </div>
{/* Signals Observed */}
{data.signalsObserved && (
  <div className="mb-12">
    <div className="flex items-center gap-3 mb-6">
      <h2 className="font-serif text-2xl font-semibold text-primary">
        Market Signals
      </h2>
      <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700">
        AI Detected
      </span>
    </div>
    <div className="rounded-lg border border-purple-200 bg-purple-50 p-6">
      <p className="text-base leading-relaxed text-purple-900 whitespace-pre-wrap">
        {data.signalsObserved}
      </p>
    </div>
  </div>
)}

{/* Data Confidence Notes */}
{data.confidenceDataNotes && (
  <div className="mb-12">
    <div className="flex items-center gap-3 mb-6">
      <h2 className="font-serif text-2xl font-semibold text-primary">
        Data Quality Notes
      </h2>
      <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
        ⚠️ Review
      </span>
    </div>
    <div className="rounded-lg border border-amber-200 bg-amber-50 p-6">
      <p className="text-base leading-relaxed text-amber-900 whitespace-pre-wrap">
        {data.confidenceDataNotes}
      </p>
    </div>
  </div>
)}
        {/* NEXT WEEK PREVIEW - Forward Looking */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="font-serif text-2xl font-semibold text-primary">
              Next Week Preview
            </h2>
            <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-white">
              Predictive
            </span>
          </div>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Upcoming GTM Moments */}
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
              <div className="flex items-center gap-2 mb-4">
                <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h3 className="font-semibold text-blue-900">Upcoming GTM Moments</h3>
              </div>
              <ul className="space-y-2 text-sm text-blue-800">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span>Valentine's Day campaign launches (Feb 10) - expect +15-20% traffic spike</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span>New collection drop (Feb 12) - monitor conversion vs. traffic closely</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span>Competitor promo period ending - potential market share opportunity</span>
                </li>
              </ul>
            </div>

            {/* Watch List - Conditional Triggers */}
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-6">
              <div className="flex items-center gap-2 mb-4">
                <svg className="h-5 w-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <h3 className="font-semibold text-amber-900">Watch List</h3>
              </div>
              <ul className="space-y-3 text-sm text-amber-900">
                <li className="rounded bg-white p-3">
                  <p className="font-medium">IF margin drops below 60%</p>
                  <p className="mt-1 text-xs text-amber-700">→ Activate pricing review protocol</p>
                </li>
                <li className="rounded bg-white p-3">
                  <p className="font-medium">IF traffic +20% but sales flat</p>
                  <p className="mt-1 text-xs text-amber-700">→ Conversion issue - escalate to product team</p>
                </li>
                <li className="rounded bg-white p-3">
                  <p className="font-medium">IF competitor cuts prices {'>'}15%</p>
                  <p className="mt-1 text-xs text-amber-700">→ Emergency pricing strategy meeting</p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Strategic Alignment */}
        {data.anchorAlignmentNotes && (
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="font-serif text-2xl font-semibold text-primary">
                Strategic Alignment
              </h2>
              {data.salesVsFcst < -10 || data.gmVsFcst < -2 ? (
                <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
                  ⚠️ Drift Detected
                </span>
              ) : (
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                  ✓ On Track
                </span>
              )}
            </div>
            <div className="rounded-lg border border-stone-200 bg-white p-8">
              <p className="text-base leading-relaxed text-secondary whitespace-pre-wrap">
                {data.anchorAlignmentNotes}
              </p>
            </div>
          </div>
        )}

        {/* Decision Pressure with Urgency */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="font-serif text-2xl font-semibold text-primary">
              Decision Pressure
            </h2>
            <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-medium text-white">
              P0 - Critical
            </span>
          </div>
          <div className="rounded-lg border-l-4 border-red-600 bg-white p-8 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                  <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-primary">{data.reportName}</h3>
                <p className="mt-1 text-xs text-stone-500">Must decide by end of week</p>
                <div className="mt-4 whitespace-pre-wrap text-secondary leading-relaxed">
                  {formatBulletPoints(data.focusRecommendations).map((item, idx) => (
                    <div key={idx} className="mb-4">
                      <div className="flex gap-3">
                        <span className="mt-1 text-primary">•</span>
                        <div className="flex-1">
                          <p className="font-medium text-primary">{item.main}</p>
                          {item.subs.length > 0 && (
                            <ul className="mt-2 space-y-1.5 pl-4">
                              {item.subs.map((sub, subIdx) => (
                                <li key={subIdx} className="flex gap-2 text-sm text-secondary">
                                  <span className="text-accent">→</span>
                                  <span>{sub}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
{/* Open Questions for Discussion */}
{data.openQuestions && (
  <div className="mb-12">
    <div className="flex items-center gap-3 mb-6">
      <h2 className="font-serif text-2xl font-semibold text-primary">
        Open Questions
      </h2>
      <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
        Pre-Trade Discussion
      </span>
    </div>
    <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
            <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <div className="flex-1">
          <p className="text-base leading-relaxed text-blue-900 whitespace-pre-wrap">
            {data.openQuestions}
          </p>
        </div>
      </div>
    </div>
  </div>
)}
        {/* Opportunities & Risks - Compressed */}
        <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Opportunities */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl font-semibold text-primary">
                Opportunities
              </h2>
              <span className="text-sm font-medium text-green-600">
                {formatBulletPoints(data.opportunities).length} identified
              </span>
            </div>
            <div className="rounded-lg border border-green-200 bg-green-50 p-6">
              <div className="space-y-3">
                {formatBulletPoints(data.opportunities).map((item, idx) => (
                  <details key={idx} className="group">
                    <summary className="flex cursor-pointer items-start gap-3 rounded bg-white p-3 hover:bg-green-50">
                      <span className="text-green-700">•</span>
                      <span className="flex-1 font-medium text-green-900">{item.main}</span>
                      <svg className="h-5 w-5 flex-shrink-0 text-green-600 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    {item.subs.length > 0 && (
                      <ul className="mt-2 space-y-1.5 pl-10">
                        {item.subs.map((sub, subIdx) => (
                          <li key={subIdx} className="flex gap-2 text-sm text-green-800">
                            <span className="text-green-600">→</span>
                            <span>{sub}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </details>
                ))}
              </div>
            </div>
          </div>

          {/* Risks */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl font-semibold text-primary">
                Risks
              </h2>
              <span className="text-sm font-medium text-red-600">
                {formatBulletPoints(data.risks).length} identified
              </span>
            </div>
            <div className="rounded-lg border border-red-200 bg-red-50 p-6">
              <div className="space-y-3">
                {formatBulletPoints(data.risks).map((item, idx) => (
                  <details key={idx} className="group">
                    <summary className="flex cursor-pointer items-start gap-3 rounded bg-white p-3 hover:bg-red-50">
                      <span className="text-red-700">•</span>
                      <span className="flex-1 font-medium text-red-900">{item.main}</span>
                      <svg className="h-5 w-5 flex-shrink-0 text-red-600 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    {item.subs.length > 0 && (
                      <ul className="mt-2 space-y-1.5 pl-10">
                        {item.subs.map((sub, subIdx) => (
                          <li key={subIdx} className="flex gap-2 text-sm text-red-800">
                            <span className="text-red-600">→</span>
                            <span>{sub}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}