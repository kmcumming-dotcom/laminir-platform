"use client";

import { useWeeklySummary } from "@/lib/hooks/useWeeklySummary";

export default function Home() {
  const { data, loading, error } = useWeeklySummary();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-black mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading this week's report...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="max-w-md rounded-lg border border-red-200 bg-red-50 p-6 text-center">
          <p className="font-semibold text-red-900">Error loading data</p>
          <p className="mt-2 text-sm text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="max-w-md rounded-lg border border-gray-200 bg-white p-6 text-center">
          <p className="text-gray-600">No data available</p>
        </div>
      </div>
    );
  }

  // Format numbers
  const formatCurrency = (num: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(num);
  
  const formatNumber = (num: number) => 
    new Intl.NumberFormat('en-US').format(num);
  
  const formatPercent = (num: number) => 
    `${num > 0 ? '+' : ''}${num.toFixed(1)}%`;

  return (
    <div className="w-full max-w-6xl px-5 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-serif text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
          This Week
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Week of {data.weekEnding}
        </p>
        <span
          className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-medium ${
            data.dataStatus === "complete"
              ? "bg-green-100 text-green-800"
              : data.dataStatus === "processing"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {data.dataStatus === "complete"
            ? "Data Complete"
            : data.dataStatus === "processing"
            ? "Processing"
            : "Missing Inputs"}
        </span>
      </div>

      <div className="space-y-6">
        {/* Performance Metrics Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Sales */}
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <p className="text-sm text-gray-500">Sales</p>
            <p className="mt-1 text-2xl font-semibold">{formatCurrency(data.actSales)}</p>
            <p className="mt-1 text-xs text-gray-500">Forecast: {formatCurrency(data.fcstSales)}</p>
            <p className={`mt-1 text-sm font-medium ${data.salesVsFcst >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatPercent(data.salesVsFcst)} vs forecast
            </p>
          </div>

          {/* Units */}
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <p className="text-sm text-gray-500">Units</p>
            <p className="mt-1 text-2xl font-semibold">{formatNumber(data.actUnits)}</p>
            <p className="mt-1 text-xs text-gray-500">Forecast: {formatNumber(data.fcstUnits)}</p>
            <p className={`mt-1 text-sm font-medium ${data.unitsVsFcst >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatPercent(data.unitsVsFcst)} vs forecast
            </p>
          </div>

          {/* GM% */}
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <p className="text-sm text-gray-500">Gross Margin</p>
            <p className="mt-1 text-2xl font-semibold">{(data.actGM * 100).toFixed(1)}%</p>
            <p className="mt-1 text-xs text-gray-500">Forecast: {(data.fcstGM * 100).toFixed(1)}%</p>
            <p className={`mt-1 text-sm font-medium ${data.gmVsFcst >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {data.gmVsFcst > 0 ? '+' : ''}{data.gmVsFcst.toFixed(1)}pts vs forecast
            </p>
          </div>
        </div>

        {/* Additional Metrics Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* AOV */}
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <p className="text-sm text-gray-500">Average Order Value</p>
            <p className="mt-1 text-xl font-semibold">{formatCurrency(data.actAOV)}</p>
            <p className="text-xs text-gray-500">Forecast: {formatCurrency(data.fcstAOV)}</p>
          </div>

          {/* Traffic */}
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <p className="text-sm text-gray-500">Traffic / Sessions</p>
            <p className="mt-1 text-xl font-semibold">{formatNumber(data.actTraffic)}</p>
            <p className="text-xs text-gray-500">Forecast: {formatNumber(data.fcstTraffic)}</p>
          </div>

          {/* Conversion Rate */}
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <p className="text-sm text-gray-500">Conversion Rate</p>
            <p className="mt-1 text-xl font-semibold">{(data.actConversionRate * 100).toFixed(2)}%</p>
            <p className="text-xs text-gray-500">Forecast: {(data.fcstConversionRate * 100).toFixed(2)}%</p>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="font-serif text-2xl font-semibold text-gray-900">
            Executive Summary
          </h2>
          <p className="mt-4 whitespace-pre-wrap text-gray-700 leading-relaxed">
            {data.executiveSummary || "No executive summary available"}
          </p>
        </div>

        {/* Signals Observed */}
{data.tradeNarrative && (
  <div className="rounded-lg border border-gray-200 bg-white p-6">
    <h2 className="font-serif text-2xl font-semibold text-gray-900">
      Signals Observed
    </h2>
            <p className="mt-4 whitespace-pre-wrap text-gray-700 leading-relaxed">
              {data.tradeNarrative}
            </p>
          </div>
        )}

        {/* Risk & Opportunity Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Risks */}
          {data.riskIdentification && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-6">
              <h2 className="font-serif text-xl font-semibold text-red-900">
                Risk Identification
              </h2>
              <p className="mt-4 whitespace-pre-wrap text-red-800 leading-relaxed">
                {data.riskIdentification}
              </p>
            </div>
          )}

          {/* Opportunities */}
          {data.opportunityIdentification && (
            <div className="rounded-lg border border-green-200 bg-green-50 p-6">
              <h2 className="font-serif text-xl font-semibold text-green-900">
                Opportunity Identification
              </h2>
              <p className="mt-4 whitespace-pre-wrap text-green-800 leading-relaxed">
                {data.opportunityIdentification}
              </p>
            </div>
          )}
        </div>

        {/* Decisions Captured */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="font-serif text-2xl font-semibold text-gray-900">
            Decisions Captured
          </h2>
          <p className="mt-4 whitespace-pre-wrap text-gray-700 leading-relaxed">
            {data.decisionsCaptured || "No decisions captured"}
          </p>
        </div>

        {/* Assumptions to Monitor */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="font-serif text-2xl font-semibold text-gray-900">
            Assumptions to Monitor
          </h2>
          <p className="mt-4 whitespace-pre-wrap text-gray-700 leading-relaxed">
            {data.assumptionsToMonitor || "No assumptions to monitor"}
          </p>
        </div>

        {/* Focus Recommendations (if exists) */}
        {data.exceptionReason && (
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
            <h2 className="font-serif text-xl font-semibold text-blue-900">
              Focus Recommendations
            </h2>
            <p className="mt-4 whitespace-pre-wrap text-blue-800 leading-relaxed">
              {data.exceptionReason}
            </p>
          </div>
        )}

        {/* Executive Questions */}
        {data.executiveQuestions && (
          <div className="rounded-lg border border-purple-200 bg-purple-50 p-6">
            <h2 className="font-serif text-xl font-semibold text-purple-900">
              Executive Questions
            </h2>
            <p className="mt-4 whitespace-pre-wrap text-purple-800 leading-relaxed">
              {data.executiveQuestions}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}