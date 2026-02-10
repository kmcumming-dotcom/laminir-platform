import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const url = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Weekly%20Decision%20Portal?maxRecords=1&sort%5B0%5D%5Bfield%5D=Week%20Commencing&sort%5B0%5D%5Bdirection%5D=desc`;
    
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_ACCESS_TOKEN}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Airtable API error:", response.status, errorText);
      return NextResponse.json(
        { error: `Airtable API error: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    if (!data.records || data.records.length === 0) {
      return NextResponse.json(
        { error: "No data found" },
        { status: 404 }
      );
    }

    const record = data.records[0];

    // Format the response
    const result = {
      weekEnding: record.fields["Week Commencing"],
      executiveSummary: record.fields["Executive Summary (Portal)"] || "",
      decisionsCaptured: record.fields["Decisions (Portal)"] || "",
      assumptionsToMonitor: record.fields["Assumptions (Portal)"] || "",
      dataStatus: determineDataStatus(record.fields),
      recordId: record.id,
    };

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch data", details: error.message },
      { status: 500 }
    );
  }
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