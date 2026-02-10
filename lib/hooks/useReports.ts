"use client";

import { useState, useEffect } from "react";

interface Report {
  id: string;
  reportName: string;
  weekEnding: string;
  market: string;
  status: string;
  createdDate: string;
}

export function useReports() {
  const [data, setData] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const url = `https://api.airtable.com/v0/${process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID}/Trade%20Reports?sort%5B0%5D%5Bfield%5D=Report%20Entry%20Date&sort%5B0%5D%5Bdirection%5D=desc`;

        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_ACCESS_TOKEN}`,
          },
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const result = await response.json();

        if (!result.records) {
          throw new Error("No data found");
        }

        const reports = result.records.map((record: any) => ({
          id: record.id,
          reportName: record.fields["Report Name"] || "Untitled Report",
          weekEnding: record.fields["WMV"]?.[0] || "", // This might need adjustment based on your data
          market: extractMarket(record.fields["Report Name"] || ""),
          status: record.fields["Status"] || "Draft",
          createdDate: record.fields["Report Entry Date"] || "",
        }));

        setData(reports);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, loading, error };
}

// Helper to extract market from report name
function extractMarket(reportName: string): string {
  const match = reportName.match(/–\s*([A-Z]{2})\s*–/);
  return match ? match[1] : "Unknown";
}