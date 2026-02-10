"use client";

import { useState, useEffect } from "react";

interface DashboardData {
  // Weekly Performance
  salesVsFcst: number;
  gmVsFcst: number;
  aovVsFcst: number;
  trafficVsFcst: number;
  conversionVsFcst: number;
  
  // Marketing Metrics
  mer: number; // Marketing Efficiency Ratio
  merVsPlan: number;
  roas: number; // Return on Ad Spend
  roasVsPlan: number;
  
  // Absolute values
  salesActual: number;
  salesPlan: number;
  gmActual: number;
  gmPlan: number;
  aovActual: number;
  aovPlan: number;
  trafficActual: number;
  trafficPlan: number;
  conversionActual: number;
  conversionPlan: number;
  
  // Year-over-Year comparisons
  salesVsLY: number;
  gmVsLY: number;
  
  // Executive Summary
  executiveSummary: string;
  
  // Week-over-Week
  wowSalesMovement: number;
  wowGMMovement: number;
  wowAOVMovement: number;
  
  // Risks and Opportunities
  risks: string;
  opportunities: string;
  
  // Decisions
  focusRecommendations: string;
  
  // Strategic Alignment
  anchorAlignmentNotes: string;

  // Digital Efficiency AI
  digitalEfficiencyCommentary: string;
  digitalEfficiencySignal: string;
  
  // Additional AI Insights
  confidenceDataNotes: string;
  signalsObserved: string;
  
  // Manual Inputs
  openQuestions: string;
  
  // Gross Margin Dollars
  gmDollarActual: number;
  gmDollarPlan: number;

  // Meta
  weekEnding: string;
  reportName: string;
  market: string;
  retailerProfile: string;
  
  // Historical trend data (last 8 weeks)
  salesTrend: number[];
  gmTrend: number[];
}

interface UseFilterOptions {
  channel?: string;
  market?: string;
  weekStart?: string;
}

export function useDashboard(filters?: UseFilterOptions) {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [availableRetailers, setAvailableRetailers] = useState<string[]>([]);
  const [availableMarkets, setAvailableMarkets] = useState<string[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        // Build filter formula - simplified
let filterParams = "";

if (filters?.channel && filters?.market) {
  filterParams = `&filterByFormula=AND({Channel}="${filters.channel}",{Market}="${filters.market}")`;
} else if (filters?.channel) {
  filterParams = `&filterByFormula={Channel}="${filters.channel}"`;
} else if (filters?.market) {
  filterParams = `&filterByFormula={Market}="${filters.market}"`;
}

// Get latest week from Portal
const portalUrl = `https://api.airtable.com/v0/${process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID}/Weekly%20Decision%20Portal?maxRecords=1&sort%5B0%5D%5Bfield%5D=Week%20Commencing&sort%5B0%5D%5Bdirection%5D=desc${filterParams}`;

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
          throw new Error("No data found for selected filters");
        }

        const portalRecord = portalResult.records[0];
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
        const fields = tradeReport.fields;

        // Fetch historical data for trends (last 8 weeks)
        const historicalUrl = `https://api.airtable.com/v0/${process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID}/Trade%20Reports?maxRecords=8&sort%5B0%5D%5Bfield%5D=Report%20Entry%20Date&sort%5B0%5D%5Bdirection%5D=desc`;
        
        const historicalResponse = await fetch(historicalUrl, {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_ACCESS_TOKEN}`,
          },
        });

        let salesTrend: number[] = [];
        let gmTrend: number[] = [];

        if (historicalResponse.ok) {
  const historicalData = await historicalResponse.json();
  
  console.log('📊 Historical Data Debug:');
  console.log('Total records fetched:', historicalData.records.length);
  console.log('Records:', historicalData.records.map((r: any) => ({
    name: r.fields["Report Name"],
    salesVar: r.fields["Sales Var %"],
    date: r.fields["Report Entry Date"]
  })));
  
  salesTrend = historicalData.records.map((r: any) => (r.fields["Sales Var %"]?.[0] || 0) * 100).reverse();
  gmTrend = historicalData.records.map((r: any) => (r.fields["Gross Margin % Var"]?.[0] || 0) * 100).reverse();
  
  console.log('Sales Trend array:', salesTrend);
  console.log('GM Trend array:', gmTrend);
}

        // Fetch available channels and markets for filters
const allPortalUrl = `https://api.airtable.com/v0/${process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID}/Weekly%20Decision%20Portal?fields%5B%5D=Channel&fields%5B%5D=Market`;
const allPortalResponse = await fetch(allPortalUrl, {
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_ACCESS_TOKEN}`,
  },
});

if (allPortalResponse.ok) {
  const allPortalData = await allPortalResponse.json();
  const channels = Array.from(new Set(allPortalData.records.map((r: any) => r.fields["Channel"]).filter(Boolean)));
const markets = Array.from(new Set(allPortalData.records.map((r: any) => r.fields["Market"]).filter(Boolean)));
  setAvailableRetailers(channels as string[]); // Reusing same state var, will rename
  setAvailableMarkets(markets as string[]);
}

        setData({
          // Performance vs Forecast
          salesVsFcst: (fields["Sales Var %"]?.[0] || 0) * 100,
          gmVsFcst: (fields["Gross Margin % Var"]?.[0] || 0) * 100,
          aovVsFcst: (fields["AOV Var %"]?.[0] || 0) * 100,
          trafficVsFcst: (fields["Traffic Var %"]?.[0] || 0) * 100,
          conversionVsFcst: fields["Conversion Var (pts)"] || 0,
          
          // Marketing Metrics
          mer: fields["MER Actual"]?.[0] || 0,
          merVsPlan: ((fields["MER Actual"]?.[0] || 0) - (fields["MER Plan"]?.[0] || 0)) / (fields["MER Plan"]?.[0] || 1) * 100,
          roas: fields["ROAS Actual"]?.[0] || 0,
          roasVsPlan: ((fields["ROAS Actual"]?.[0] || 0) - (fields["ROAS Plan"]?.[0] || 0)) / (fields["ROAS Plan"]?.[0] || 1) * 100,
          
          // Absolute values
          salesActual: fields["Sales Actual"]?.[0] || 0,
          salesPlan: fields["Sales Plan"]?.[0] || 0,
          gmActual: fields["Gross Margin % Actual"]?.[0] || 0,
          gmPlan: fields["Gross Margin % Plan"]?.[0] || 0,
          aovActual: fields["AOV Actual"]?.[0] || 0,
          aovPlan: fields["AOV Plan"]?.[0] || 0,
          trafficActual: fields["Traffic Actual"]?.[0] || 0,
          trafficPlan: fields["Traffic Plan"]?.[0] || 0,
          conversionActual: fields["Conversion Actual"]?.[0] || 0,
          conversionPlan: fields["Conversion Plan"]?.[0] || 0,
          
          // Year-over-Year (placeholder - add to Airtable if available)
          salesVsLY: 0, // TODO: Add LY comparison fields
          gmVsLY: 0,
          
          // Narrative
          executiveSummary: fields["Executive Summary (AI)"] || "",
          
          // Week-over-Week
          wowSalesMovement: (fields["WoW Sales Gap Movement"] || 0) * 100,
          wowGMMovement: (fields["WoW GM Gap Movement"] || 0) * 100,
          wowAOVMovement: (fields["WoW AOV Gap Movement"] || 0) * 100,
          
          // Risks and Opportunities
          risks: fields["Key Risks (AI)"] || "",
          opportunities: fields["Key Opportunities (AI)"] || "",
          
          // Decisions
          focusRecommendations: fields["Focus Recommendations (AI)"] || "",
          
          // Strategic Alignment
          anchorAlignmentNotes: fields["Anchor Alignment Notes (AI)"] || "",
          
          // Digital Efficiency AI
digitalEfficiencyCommentary: fields["Digital Efficiency Commentary (AI)"] || "",
digitalEfficiencySignal: fields["Digital Efficiency Signal (AI)"] || "",

// Additional AI Insights
confidenceDataNotes: fields["Confidence & Data Notes (AI)"] || "",
signalsObserved: fields["Signals Observed (AI)"] || "",

// Manual Inputs
openQuestions: fields["Open Questions (Manual)"] || "",

// Gross Margin Dollars
gmDollarActual: fields["Gross Margin $ Actual"]?.[0] || 0,
gmDollarPlan: fields["Gross Margin $ Plan"]?.[0] || 0,

          // Meta
          weekEnding: portalRecord.fields["Week Commencing"] || "",
          reportName: fields["Report Name"] || "",
          market: portalRecord.fields["Market"] || "",
          retailerProfile: portalRecord.fields["Retailer Profile"]?.[0] || "",
          
          // Trends
          salesTrend,
          gmTrend,
        });
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [filters?.channel, filters?.market, filters?.weekStart]);

  return { 
    data, 
    loading, 
    error, 
    availableChannels: availableRetailers, // Renamed for clarity
    availableMarkets 
  };
}