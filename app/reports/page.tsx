"use client";

import { useReports } from "@/lib/hooks/useReports";
import Link from "next/link";
import { downloadReportAsPDF } from "@/lib/utils/downloadReport";
import { useState } from "react";

export default function Reports() {
  const { data, loading, error } = useReports();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [marketFilter, setMarketFilter] = useState("All");

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-24">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-black mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading reports...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-24 px-4">
        <div className="max-w-md rounded-lg border border-red-200 bg-red-50 p-6 text-center">
          <p className="font-semibold text-red-900">Error loading reports</p>
          <p className="mt-2 text-sm text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-24 px-4">
        <div className="max-w-md rounded-lg border border-gray-200 bg-white p-6 text-center">
          <p className="text-gray-600">No reports available</p>
        </div>
      </div>
    );
  }

  // Filter and search logic
  const filteredData = data.filter((report) => {
    // Search filter
    const matchesSearch = report.reportName.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Status filter
    const matchesStatus = statusFilter === "All" || report.status === statusFilter;
    
    // Market filter
    const matchesMarket = marketFilter === "All" || report.market === marketFilter;
    
    return matchesSearch && matchesStatus && matchesMarket;
  });

  // Get unique markets for filter dropdown
  const uniqueMarkets = Array.from(new Set(data.map((r) => r.market)));

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-stone-50 pt-24 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl font-bold tracking-tight text-primary sm:text-4xl md:text-5xl">
            Reports
          </h1>
          <p className="mt-2 text-sm sm:text-base text-secondary">
            View and download weekly trade reports
          </p>
          {/* Search and Filters */}
<div className="mt-6 flex flex-col sm:flex-row gap-4">
  {/* Search */}
<div className="flex-1 relative">
  <input
    type="text"
    placeholder="Search reports..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="w-full rounded-lg border border-stone-300 px-4 py-2 pr-10 text-sm text-primary placeholder:text-stone-400 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
  />
  {searchQuery && (
    <button
      onClick={() => {
        setSearchQuery("");
        setStatusFilter("All");
        setMarketFilter("All");
      }}
      className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
      aria-label="Clear search"
    >
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  )}
</div>

  {/* Status Filter */}
  <div className="w-full sm:w-48">
    <select
      value={statusFilter}
      onChange={(e) => setStatusFilter(e.target.value)}
      className="w-full rounded-lg border border-stone-300 px-4 py-2 text-sm text-primary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
    >
      <option value="All">All Status</option>
      <option value="Published">Published</option>
      <option value="Discussed">Discussed</option>
      <option value="Draft">Draft</option>
    </select>
  </div>

  {/* Market Filter */}
  <div className="w-full sm:w-48">
    <select
      value={marketFilter}
      onChange={(e) => setMarketFilter(e.target.value)}
      className="w-full rounded-lg border border-stone-300 px-4 py-2 text-sm text-primary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
    >
      <option value="All">All Markets</option>
      {uniqueMarkets.map((market: string) => (
        <option key={market} value={market}>
          {market}
        </option>
      ))}
    </select>
  </div>
</div>
        </div>

        {/* Summary Stats - Mobile Friendly */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
  <div className="rounded-lg border border-stone-200 bg-white p-4">
    <p className="text-xs font-medium uppercase tracking-wide text-stone-500">
      {searchQuery || statusFilter !== "All" || marketFilter !== "All" ? "Filtered" : "Total"} Reports
    </p>
    <p className="mt-2 font-serif text-3xl font-semibold text-primary">
      {filteredData.length}
    </p>
  </div>
  <div className="rounded-lg border border-stone-200 bg-white p-4">
    <p className="text-xs font-medium uppercase tracking-wide text-stone-500">
      Published
    </p>
    <p className="mt-2 font-serif text-3xl font-semibold text-primary">
      {filteredData.filter((r) => r.status === "Published" || r.status === "Discussed").length}
    </p>
  </div>
  <div className="rounded-lg border border-stone-200 bg-white p-4">
    <p className="text-xs font-medium uppercase tracking-wide text-stone-500">
      Drafts
    </p>
    <p className="mt-2 font-serif text-3xl font-semibold text-primary">
      {filteredData.filter((r) => r.status === "Draft").length}
    </p>
  </div>
</div>

        {/* Desktop Table View - Hidden on Mobile */}
        <div className="hidden md:block overflow-hidden rounded-lg border border-stone-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-stone-200">
            <thead className="bg-stone-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-stone-500">
                  Report Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-stone-500">
                  Market
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-stone-500">
                  Created Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-stone-500">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-stone-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 bg-white">
              {filteredData.map((report) => (
                <tr key={report.id} className="hover:bg-stone-50 transition-colors">
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm font-medium text-primary">
                      {report.reportName}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm text-secondary">{report.market}</div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm text-secondary">
                      {formatDate(report.createdDate)}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                        report.status === "Published" || report.status === "Discussed"
                          ? "bg-green-100 text-green-800"
                          : report.status === "Draft"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-stone-100 text-stone-800"
                      }`}
                    >
                      {report.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                    <div className="flex justify-end gap-3">
                      <Link
                        href={`/reports/${report.id}`}
                        className="text-primary hover:text-accent transition-colors"
                      >
                        View
                      </Link>
                      <button
                        onClick={async () => {
                          const url = `https://api.airtable.com/v0/${process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID}/Trade%20Reports/${report.id}`;
                          const response = await fetch(url, {
                            headers: {
                              Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_ACCESS_TOKEN}`,
                            },
                          });
                          const result = await response.json();
                          downloadReportAsPDF(result.fields);
                        }}
                        className="text-secondary hover:text-accent transition-colors"
                      >
                        Download
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View - Hidden on Desktop */}
        <div className="md:hidden space-y-4">
          {filteredData.map((report) => (
            <div
              key={report.id}
              className="rounded-lg border border-stone-200 bg-white p-4 shadow-sm"
            >
              {/* Report Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-medium text-primary">{report.reportName}</h3>
                  <p className="mt-1 text-sm text-secondary">
                    {report.market} • {formatDate(report.createdDate)}
                  </p>
                </div>
                <span
                  className={`ml-2 inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                    report.status === "Published" || report.status === "Discussed"
                      ? "bg-green-100 text-green-800"
                      : report.status === "Draft"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-stone-100 text-stone-800"
                  }`}
                >
                  {report.status}
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-3 border-t border-stone-100">
                <Link
                  href={`/reports/${report.id}`}
                  className="flex-1 text-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-accent transition-colors"
                >
                  View Report
                </Link>
                <button
                  onClick={async () => {
                    const url = `https://api.airtable.com/v0/${process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID}/Trade%20Reports/${report.id}`;
                    const response = await fetch(url, {
                      headers: {
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_ACCESS_TOKEN}`,
                      },
                    });
                    const result = await response.json();
                    downloadReportAsPDF(result.fields);
                  }}
                  className="flex-1 text-center rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-secondary hover:border-accent hover:text-accent transition-colors"
                >
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}