import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { anchors, retailerProfileId } = body;

    if (!anchors || anchors.length === 0) {
      return NextResponse.json(
        { error: "No anchors provided" },
        { status: 400 }
      );
    }

    const airtableUrl = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Strategic%20Anchors`;

    // Create all anchors in Airtable
    const promises = anchors.map((anchor: {
      anchorName: string;
      anchorType: string;
      anchorStatement: string;
      whatThisGuides?: string[];
      confidenceLevel?: string;
      timeHorizon?: string;
    }) => {
      const fields: any = {
        "Anchor Name": anchor.anchorName,
        "Anchor Type": anchor.anchorType,
        "Anchor Statement": anchor.anchorStatement,
      };

      // Add optional fields
      if (anchor.whatThisGuides && anchor.whatThisGuides.length > 0) {
        fields["What This Guides"] = anchor.whatThisGuides;
      }
      if (anchor.confidenceLevel) fields["Confidence Level"] = anchor.confidenceLevel;
      if (anchor.timeHorizon) fields["Time Horizon"] = anchor.timeHorizon;
      if (retailerProfileId) fields["Retailer Profile"] = [retailerProfileId];
      
      // Set default status
      fields["Status"] = "Active";

      return fetch(airtableUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.AIRTABLE_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fields }),
      });
    });

    const responses = await Promise.all(promises);
    const allSuccessful = responses.every((r) => r.ok);

    if (!allSuccessful) {
      return NextResponse.json(
        { error: "Some anchors failed to save" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, count: anchors.length });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}