"use client";

import { useState, useEffect } from "react";

interface WeeklySummary {
  weekEnding: string;
  
  // From Trade Reports
  executiveSummary: string;
  decisionsCaptured: string;
  assumptionsToMonitor: string;
  tradeNarrative: string;
  riskIdentification: string;
  opportunityIdentification: string;
  exceptionReason: string;
  executiveQuestions: string;
  
  // Performance metrics
  fcstSales: number;
  fcstUnits: number;
  fcstGM: number;
  fcstAOV: number;
  fcstTraffic: number;
  fcstConversionRate: number;
  
  actSales: number;
  actUnits: number;
  actGM: number;
  actAOV: number;
  actTraffic: number;
  actConversionRate: number;
  
  // Variances
  salesVsFcst: number;
  unitsVsFcst: number;
  gmVsFcst: number;
  
  dataStatus: string;
  recordId: string;
  tradeReportId: string;
}

export function useWeeklySummary() {
  const [data, setData] = useState<WeeklySummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Step 1: Get latest week from Portal
        const portalUrl = `https://api.airtable.com/v0/${process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID}/Weekly%20Decision%20Portal?maxRecords=1&sort%5B0%5D%5Bfield%5D=Week%20Commencing&sort%5B0%5D%5Bdirection%5D=desc`;

        const portalResponse = await fetch(portalUrl, {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_ACCESS_TOKEN}`,
          },
        });

        if (!portalResponse.ok) {
          throw new Error(`Portal API error: ${portalResponse.status}`);
        }

        const portalResult = await portalResponse.json();

        if (!portalResult.records || portalResult.records.length === 0) {
          throw new Error("No weeks found in Portal");
        }

        const portalRecord = portalResult.records[0];
        const tradeReportLinks = portalRecord.fields["Trade Reports"];

        if (!tradeReportLinks || tradeReportLinks.length === 0) {
          throw new Error("No Trade Report linked for this week");
        }

        // Step 2: Get the full Trade Report
        const tradeReportId = tradeReportLinks[0];
        const tradeReportUrl = `https://api.airtable.com/v0/${process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID}/Trade%20Reports/${tradeReportId}`;

        const tradeReportResponse = await fetch(tradeReportUrl, {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_ACCESS_TOKEN}`,
          },
        });

        if (!tradeReportResponse.ok) {
          throw new Error(`Trade Report API error: ${tradeReportResponse.status}`);
        }

        const tradeReport = await tradeReportResponse.json();
        const fields = tradeReport.fields;

        setData({
          weekEnding: portalRecord.fields["Week Commencing"] || "",
          
          // AI-generated content (correct field names from your Airtable)
          executiveSummary: fields["Executive Summary (AI)"] || "",
          decisionsCaptured: fields["Decisions Captured (Manual)"] || "",
          assumptionsToMonitor: fields["Assumptions to Monitor (Manual)"] || "",
          tradeNarrative: fields["Signals Observed (AI)"] || "",
          riskIdentification: fields["Key Risks (AI)"] || "",
          opportunityIdentification: fields["Key Opportunities (AI)"] || "",
          exceptionReason: fields["Focus Recommendations (AI)"] || "",
          executiveQuestions: fields["Executive Questions (AI)"] || "",
          
          // Performance metrics (these look correct based on your data)
          fcstSales: fields["Sales Plan"]?.[0] || 0,
          fcstUnits: 0, // Not in output - we'll handle this
          fcstGM: fields["Gross Margin % Plan"]?.[0] || 0,
          fcstAOV: fields["AOV Plan"]?.[0] || 0,
          fcstTraffic: fields["Traffic Plan"]?.[0] || 0,
          fcstConversionRate: fields["Conversion Plan"]?.[0] || 0,
          
          actSales: fields["Sales Actual"]?.[0] || 0,
          actUnits: 0, // Not in output - we'll handle this
          actGM: fields["Gross Margin % Actual"]?.[0] || 0,
          actAOV: fields["AOV Actual"]?.[0] || 0,
          actTraffic: fields["Traffic Actual"]?.[0] || 0,
          actConversionRate: fields["Conversion Actual"]?.[0] || 0,
          
          // Variances
          salesVsFcst: fields["Sales Var %"]?.[0] || 0,
          unitsVsFcst: 0, // Not in output
          gmVsFcst: fields["Gross Margin % Var"]?.[0] || 0,
          
          dataStatus: determineDataStatus(portalRecord.fields),
          recordId: portalRecord.id,
          tradeReportId: tradeReport.id,
        });
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