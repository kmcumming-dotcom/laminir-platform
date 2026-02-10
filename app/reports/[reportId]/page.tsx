"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function ReportDetail() {
  const params = useParams();
  const reportId = params.reportId as string;
  
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const url = `https://api.airtable.com/v0/${process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID}/Trade%20Reports/${reportId}`;

        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_ACCESS_TOKEN}`,
          },
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const result = await response.json();
        setData(result.fields);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [reportId]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-24">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-black mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading report...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-24 px-4">
        <div className="max-w-md rounded-lg border border-red-200 bg-red-50 p-6 text-center">
          <p className="font-semibold text-red-900">Error loading report</p>
          <p className="mt-2 text-sm text-red-700">{error}</p>
          <Link
            href="/reports"
            className="mt-4 inline-block text-sm text-red-600 hover:text-red-800"
          >
            ← Back to Reports
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
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12">
        {/* Back Button */}
        <Link
          href="/reports"
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
          Back to Reports
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
            {data["Report Name"] || "Trade Report"}
          </h1>
          <div className="mt-2 flex items-center gap-3">
            <span className="text-sm text-gray-500">
              Created: {new Date(data["Report Entry Date"]).toLocaleDateString()}
            </span>
            <span
              className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                data["Status"] === "Published" || data["Status"] === "Discussed"
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {data["Status"]}
            </span>
          </div>
        </div>

        {/* Same content structure as This Week and History detail pages */}
        <div className="space-y-6">
          {/* Performance Metrics */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
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

            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <p className="text-sm text-gray-500">Gross Margin</p>
              <p className="mt-1 text-2xl font-semibold">
                {((data["Gross Margin % Actual"]?.[0] || 0) * 100).toFixed(1)}%
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Forecast: {((data["Gross Margin % Plan"]?.[0] || 0) * 100).toFixed(1)}%
              </p>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <p className="text-sm text-gray-500">Average Order Value</p>
              <p className="mt-1 text-2xl font-semibold">
                {formatCurrency(data["AOV Actual"]?.[0] || 0)}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Forecast: {formatCurrency(data["AOV Plan"]?.[0] || 0)}
              </p>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h2 className="font-serif text-2xl font-semibold text-gray-900">
              Executive Summary
            </h2>
            <p className="mt-4 whitespace-pre-wrap text-gray-700 leading-relaxed">
              {data["Executive Summary (AI)"] || "No summary available"}
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

          {/* Risks & Opportunities */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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

          {/* Decisions & Assumptions */}
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h2 className="font-serif text-2xl font-semibold text-gray-900">
              Decisions Captured
            </h2>
            <p className="mt-4 whitespace-pre-wrap text-gray-700 leading-relaxed">
              {data["Decisions Captured (Manual)"] || "No decisions captured"}
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h2 className="font-serif text-2xl font-semibold text-gray-900">
              Assumptions to Monitor
            </h2>
            <p className="mt-4 whitespace-pre-wrap text-gray-700 leading-relaxed">
              {data["Assumptions to Monitor (Manual)"] || "No assumptions"}
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