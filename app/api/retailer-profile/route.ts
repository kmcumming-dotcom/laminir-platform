import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      retailerName,
      retailerCode,
      segment,
      primaryMarkets,
      planningCategories,
      marginPosture,
      promoPosture,
      retailOperatingModel,
      weeklyTradeCadence,
      primaryExecReviewDay,
      growthFocus,
    } = body;

    // Validate required fields
    if (!retailerName) {
      return NextResponse.json(
        { error: "Retailer Name is required" },
        { status: 400 }
      );
    }

    // Create record in Airtable
    const airtableUrl = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Retailer%20Profiles`;

    const fields: any = {
      "Retailer Name": retailerName,
    };

    // Add optional fields only if provided
    if (retailerCode) fields["Retailer Code"] = retailerCode;
    if (segment) fields["Segment / Positioning"] = segment;
    if (primaryMarkets && primaryMarkets.length > 0) fields["Primary Markets"] = primaryMarkets;
    if (planningCategories && planningCategories.length > 0) fields["Planning Categories"] = planningCategories;
    if (marginPosture) fields["Margin Posture"] = marginPosture;
    if (promoPosture) fields["Promo Posture"] = promoPosture;
    if (retailOperatingModel) fields["Retail Operating Model"] = retailOperatingModel;
    if (weeklyTradeCadence) fields["Weekly Trade Cadence"] = weeklyTradeCadence;
    if (primaryExecReviewDay) fields["Primary Exec Review Day"] = primaryExecReviewDay;
    if (growthFocus && growthFocus.length > 0) fields["Growth Focus (Next 6-12 Months)"] = growthFocus;

    const response = await fetch(airtableUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fields }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Airtable error:", errorData);
      return NextResponse.json(
        { error: "Failed to save to Airtable" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}