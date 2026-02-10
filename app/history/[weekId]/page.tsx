"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function WeekDetail() {
  const params = useParams();
  const weekId = params.weekId as string;
  
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Get the Portal record
        const portalUrl = `https://api.airtable.com/v0/${process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID}/Weekly%20Decision%20Portal/${weekId}`;

        const portalResponse = await fetch(portalUrl, {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_ACCESS_TOKEN}`,
          },
        });

        if (!portalResponse.ok) {
          throw new Error(`API error: ${portalResponse.status}`);
        }

        const portalRecord = await portalResponse.json();
        const tradeReportLinks = portalRecord.fields["Trade Reports"];

        if (!tradeReportLinks || tradeReportLinks.length === 0) {
          throw new Error("No Trade Report linked");
        }

        // Get the Trade Report
        const tradeReportId = tradeReportLinks[0];
        const tradeReportUrl = `https://api.airtable.com/v0/${process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID}/Trade%20Reports/${tradeReportId}`;

        const tradeReportResponse = await fetch(tradeReportUrl, {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_ACCESS_TOKEN}`,
          },
        });

        if (!tradeReportResponse.ok) {
          throw new Error(`Trade Report error: ${tradeReportResponse.status}`);
        }

        const tradeReport = await tradeReportResponse.json();
        setData({
          weekEnding: portalRecord.fields["Week Commencing"],
          ...tradeReport.fields,
        });
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [weekId]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-24">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-black mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading week details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-24 px-4">
        <div className="max-w-md rounded-lg border border-red-200 bg-red-50 p-6 text-center">
          <p className="font-semibold text-red-900">Error loading week</p>
          <p className="mt-2 text-sm text-red-700">{error}</p>
          <Link
            href="/history"
            className="mt-4 inline-block text-sm text-red-600 hover:text-red-800"
          >
            ← Back to History
          </Link>
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const formatCurrency = (num: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(num);

  const formatNumber = (num: number) => new Intl.NumberFormat("en-US").format(num);

  const formatPercent = (num: number) => `${num > 0 ? "+" : ""}${num.toFixed(1)}%`;

  return (
    <div className="min-h-screen pt-24">
      <div className="mx-auto max-w-6xl px-5 py-12">
        {/* Back Button */}
        <Link
          href="/history"
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6"
        >
          <svg
            className="mr-2 h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to History
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            Week of {data.weekEnding}
          </h1>
        </div>

        {/* Same content structure as the This Week page */}
        <div className="space-y-6">
          {/* Performance Metrics Grid */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* Sales */}
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <p className="text-sm text-gray-500">Sales</p>
              <p className="mt-1 text-2xl font-semibold">
                {formatCurrency(data["Sales Actual"]?.[0] || 0)}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Forecast: {formatCurrency(data["Sales Plan"]?.[0] || 0)}
              </p>
              <p
                className={`mt-1 text-sm font-medium ${
                  (data["Sales Var %"]?.[0] || 0) >= 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {formatPercent(data["Sales Var %"]?.[0] || 0)} vs forecast
              </p>
            </div>

            {/* Units - placeholder */}
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <p className="text-sm text-gray-500">Units</p>
              <p className="mt-1 text-2xl font-semibold">—</p>
              <p className="mt-1 text-xs text-gray-500">Not tracked</p>
            </div>

            {/* GM% */}
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <p className="text-sm text-gray-500">Gross Margin</p>
              <p className="mt-1 text-2xl font-semibold">
                {((data["Gross Margin % Actual"]?.[0] || 0) * 100).toFixed(1)}%
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Forecast: {((data["Gross Margin % Plan"]?.[0] || 0) * 100).toFixed(1)}%
              </p>
              <p
                className={`mt-1 text-sm font-medium ${
                  (data["Gross Margin % Var"]?.[0] || 0) >= 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {(data["Gross Margin % Var"]?.[0] || 0) > 0 ? "+" : ""}
                {((data["Gross Margin % Var"]?.[0] || 0) * 100).toFixed(1)}pts vs forecast
              </p>
            </div>
          </div>

          {/* Additional Metrics Grid */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* AOV */}
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <p className="text-sm text-gray-500">Average Order Value</p>
              <p className="mt-1 text-xl font-semibold">
                {formatCurrency(data["AOV Actual"]?.[0] || 0)}
              </p>
              <p className="text-xs text-gray-500">
                Forecast: {formatCurrency(data["AOV Plan"]?.[0] || 0)}
              </p>
            </div>

            {/* Traffic */}
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <p className="text-sm text-gray-500">Traffic / Sessions</p>
              <p className="mt-1 text-xl font-semibold">
                {formatNumber(data["Traffic Actual"]?.[0] || 0)}
              </p>
              <p className="text-xs text-gray-500">
                Forecast: {formatNumber(data["Traffic Plan"]?.[0] || 0)}
              </p>
            </div>

            {/* Conversion Rate */}
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <p className="text-sm text-gray-500">Conversion Rate</p>
              <p className="mt-1 text-xl font-semibold">
                {((data["Conversion Actual"]?.[0] || 0) * 100).toFixed(2)}%
              </p>
              <p className="text-xs text-gray-500">
                Forecast: {((data["Conversion Plan"]?.[0] || 0) * 100).toFixed(2)}%
              </p>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h2 className="font-serif text-2xl font-semibold text-gray-900">
              Executive Summary
            </h2>
            <p className="mt-4 whitespace-pre-wrap text-gray-700 leading-relaxed">
              {data["Executive Summary (AI)"] || "No executive summary available"}
            </p>
          </div>

          {/* Signals Observed */}
          {data["Signals Observed (AI)"] && (
            <div className="rounded-lg border border-gray-200 bg-white p-6">
              <h2 className="font-serif text-2xl font-semibold text-gray-900">
                Signals Observed
              </h2>
              <p className="mt-4 whitespace-pre-wrap text-gray-700 leading-relaxed">
                {data["Signals Observed (AI)"]}
              </p>
            </div>
          )}

          {/* Risk & Opportunity Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Risks */}
            {data["Key Risks (AI)"] && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-6">
                <h2 className="font-serif text-xl font-semibold text-red-900">
                  Risk Identification
                </h2>
                <p className="mt-4 whitespace-pre-wrap text-red-800 leading-relaxed">
                  {data["Key Risks (AI)"]}
                </p>
              </div>
            )}

            {/* Opportunities */}
            {data["Key Opportunities (AI)"] && (
              <div className="rounded-lg border border-green-200 bg-green-50 p-6">
                <h2 className="font-serif text-xl font-semibold text-green-900">
                  Opportunity Identification
                </h2>
                <p className="mt-4 whitespace-pre-wrap text-green-800 leading-relaxed">
                  {data["Key Opportunities (AI)"]}
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
              {data["Decisions Captured (Manual)"] || "No decisions captured"}
            </p>
          </div>

          {/* Assumptions to Monitor */}
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h2 className="font-serif text-2xl font-semibold text-gray-900">
              Assumptions to Monitor
            </h2>
            <p className="mt-4 whitespace-pre-wrap text-gray-700 leading-relaxed">
              {data["Assumptions to Monitor (Manual)"] || "No assumptions to monitor"}
            </p>
          </div>

          {/* Focus Recommendations */}
          {data["Focus Recommendations (AI)"] && (
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
              <h2 className="font-serif text-xl font-semibold text-blue-900">
                Focus Recommendations
              </h2>
              <p className="mt-4 whitespace-pre-wrap text-blue-800 leading-relaxed">
                {data["Focus Recommendations (AI)"]}
              </p>
            </div>
          )}

          {/* Executive Questions */}
          {data["Executive Questions (AI)"] && (
            <div className="rounded-lg border border-purple-200 bg-purple-50 p-6">
              <h2 className="font-serif text-xl font-semibold text-purple-900">
                Executive Questions
              </h2>
              <p className="mt-4 whitespace-pre-wrap text-purple-800 leading-relaxed">
                {data["Executive Questions (AI)"]}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}