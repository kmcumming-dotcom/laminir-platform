"use client";

import { useState } from "react";
import { useHistory } from "@/lib/hooks/useHistory";
import Link from "next/link";

export default function History() {
  const { data, loading, error } = useHistory();
  const [searchQuery, setSearchQuery] = useState("");
  const [marketFilter, setMarketFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-24">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-black mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading history...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-24 px-4">
        <div className="max-w-md rounded-lg border border-red-200 bg-red-50 p-6 text-center">
          <p className="font-semibold text-red-900">Error loading history</p>
          <p className="mt-2 text-sm text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-24 px-4">
        <div className="max-w-md rounded-lg border border-gray-200 bg-white p-6 text-center">
          <p className="text-gray-600">No historical data available</p>
        </div>
      </div>
    );
  }

  // Filter and search logic
  const filteredData = data.filter((week) => {
    // Search filter (by week ending date)
    const matchesSearch = week.weekEnding.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Market filter
    const matchesMarket = marketFilter === "All" || week.market === marketFilter;
    
    // Status filter
    const matchesStatus = statusFilter === "All" || week.dataStatus === statusFilter;
    
    return matchesSearch && matchesMarket && matchesStatus;
  });

  // Get unique markets for filter dropdown
  const uniqueMarkets = Array.from(new Set(data.map((w) => w.market)));

  return (
    <div className="min-h-screen bg-stone-50 pt-24 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl font-bold tracking-tight text-primary sm:text-4xl md:text-5xl">
            History
          </h1>
          <p className="mt-2 text-sm sm:text-base text-secondary">
            View past weekly trade reports and decisions
          </p>

          {/* Search and Filters */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search by week..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-stone-300 px-4 py-2 pr-10 text-sm text-primary placeholder:text-stone-400 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setMarketFilter("All");
                    setStatusFilter("All");
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

            {/* Status Filter */}
            <div className="w-full sm:w-48">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full rounded-lg border border-stone-300 px-4 py-2 text-sm text-primary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              >
                <option value="All">All Status</option>
                <option value="complete">Complete</option>
                <option value="processing">Processing</option>
                <option value="missing">Missing Data</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-4">
          <p className="text-sm text-secondary">
            Showing {filteredData.length} of {data.length} weeks
          </p>
        </div>

        {/* Weeks List */}
        <div className="space-y-3">
          {filteredData.length > 0 ? (
            filteredData.map((week) => (
              <Link
                key={week.id}
                href={`/history/${week.id}`}
                className="block rounded-lg border border-stone-200 bg-white p-6 transition-all hover:border-stone-300 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-primary">
                      Week of {week.weekEnding}
                    </h3>
                    <p className="mt-1 text-sm text-secondary">{week.market}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                        week.dataStatus === "complete"
                          ? "bg-green-100 text-green-800"
                          : week.dataStatus === "processing"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {week.dataStatus === "complete"
                        ? "Complete"
                        : week.dataStatus === "processing"
                        ? "Processing"
                        : "Missing Data"}
                    </span>
                    <svg
                      className="h-5 w-5 text-stone-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="rounded-lg border border-stone-200 bg-white p-12 text-center">
              <p className="text-secondary">No weeks match your search criteria</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setMarketFilter("All");
                  setStatusFilter("All");
                }}
                className="mt-4 text-sm text-accent hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}