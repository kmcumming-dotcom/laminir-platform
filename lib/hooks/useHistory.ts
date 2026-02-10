"use client";

import { useState, useEffect } from "react";

interface HistoryWeek {
  id: string;
  weekEnding: string;
  market: string;
  dataStatus: string;
}

export function useHistory() {
  const [data, setData] = useState<HistoryWeek[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const url = `https://api.airtable.com/v0/${process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID}/Weekly%20Decision%20Portal?sort%5B0%5D%5Bfield%5D=Week%20Commencing&sort%5B0%5D%5Bdirection%5D=desc`;

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

        const weeks = result.records.map((record: any) => ({
          id: record.id,
          weekEnding: record.fields["Week Commencing"] || "",
          market: record.fields["Market"] || "",
          dataStatus: determineDataStatus(record.fields),
        }));

        setData(weeks);
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

function determineDataStatus(fields: any): string {
  const tradeReports = fields["Trade Reports"];
  const wmv = fields["Weekly Market View 2"];

  if (tradeReports && tradeReports.length > 0 && wmv && wmv.length > 0) {
    return "complete";
  } else if (!tradeReports && !wmv) {
    return "missing_inputs";
  } else {
    return "processing";
  }
}