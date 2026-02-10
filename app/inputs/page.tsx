"use client";

import { useState, useEffect, useRef } from "react";
import { downloadForecastTemplate, downloadActualsTemplate, downloadGTMTemplate } from "@/lib/utils/generateTemplates";
import { validateForecastFile, validateActualsFile, validateGTMFile } from "@/lib/utils/validateUpload";

// Get env variables
const AIRTABLE_BASE_ID = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID;
const AIRTABLE_TOKEN = process.env.NEXT_PUBLIC_AIRTABLE_ACCESS_TOKEN;

interface Anchor {
  anchorName: string;
  anchorType: string;
  anchorStatement: string;
  whatThisGuides: string[];
  confidenceLevel: string;
  timeHorizon: string;
  effectiveFrom: string;
}

export default function Inputs() {
  const [activeTab, setActiveTab] = useState(0);
  // Force scroll tabs to start on mobile
useEffect(() => {
  if (tabsRef.current) {
    tabsRef.current.scrollLeft = 0;
  }
}, []);
  const [saving, setSaving] = useState(false);
  const tabsRef = useRef<HTMLDivElement>(null);
  // Message states for each section
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [forecastMessage, setForecastMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [actualsMessage, setActualsMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [gtmMessage, setGtmMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  // Retailer Profile State
  const [retailerName, setRetailerName] = useState("");
  const [retailerCode, setRetailerCode] = useState("");
  const [segment, setSegment] = useState("");
  const [primaryMarkets, setPrimaryMarkets] = useState<string[]>([]);
  const [planningCategories, setPlanningCategories] = useState<string[]>([]);
  const [marginPosture, setMarginPosture] = useState("");
  const [promoPosture, setPromoPosture] = useState("");
  const [retailOperatingModel, setRetailOperatingModel] = useState("");
  const [weeklyTradeCadence, setWeeklyTradeCadence] = useState("");
  const [primaryExecReviewDay, setPrimaryExecReviewDay] = useState("");
  const [growthFocus, setGrowthFocus] = useState<string[]>([]);

  // Available Retailer Profiles for linking
  const [availableRetailers, setAvailableRetailers] = useState<Array<{id: string, name: string}>>([]);
  const [selectedRetailerId, setSelectedRetailerId] = useState("");

  // Strategic Anchors State
  const [anchors, setAnchors] = useState<Anchor[]>([{
    anchorName: "",
    anchorType: "",
    anchorStatement: "",
    whatThisGuides: [],
    confidenceLevel: "",
    timeHorizon: "",
    effectiveFrom: "",
  }]);

  // File Upload State
  const [forecastFile, setForecastFile] = useState<File | null>(null);
  const [actualsFile, setActualsFile] = useState<File | null>(null);
  const [gtmFile, setGtmFile] = useState<File | null>(null);

  // Fetch available Retailer Profiles
  useEffect(() => {
    const fetchRetailers = async () => {
      try {
        const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Retailer%20Profiles?fields%5B%5D=Retailer%20Name`;
        const response = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${AIRTABLE_TOKEN}`,
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          const retailers = data.records.map((r: any) => ({
            id: r.id,
            name: r.fields["Retailer Name"] || "Unnamed",
          }));
          setAvailableRetailers(retailers);
        }
      } catch (error) {
        console.error('Error fetching retailers:', error);
      }
    };
    
    fetchRetailers();
  }, []);

  const tabs = [
    "Retailer Profile",
    "Strategic Anchors",
    "Forecast & Actuals Upload",
    "GTM Calendar Upload",
  ];

  // Handle Retailer Profile Save
  const handleSaveRetailerProfile = async () => {
    if (!retailerName) {
      setMessage({ type: 'error', text: 'Retailer Name is required' });
      return;
    }

    setSaving(true);
    setMessage(null);

    try {
      // Call Airtable directly from browser
      const fields: Record<string, any> = {
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

      const airtableUrl = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Retailer%20Profiles`;

      const response = await fetch(airtableUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${AIRTABLE_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fields }),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Retailer profile saved successfully!' });
        // Clear form
        setRetailerName("");
        setRetailerCode("");
        setSegment("");
        setPrimaryMarkets([]);
        setPlanningCategories([]);
        setMarginPosture("");
        setPromoPosture("");
        setRetailOperatingModel("");
        setWeeklyTradeCadence("");
        setPrimaryExecReviewDay("");
        setGrowthFocus([]);
      } else {
        const errorData = await response.json();
        console.error('Airtable error:', errorData);
        setMessage({ type: 'error', text: errorData.error?.message || 'Failed to save retailer profile' });
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setSaving(false);
    }
  };

  // Handle Strategic Anchors Save
  const handleSaveAnchors = async () => {
    const validAnchors = anchors.filter(a => a.anchorName && a.anchorType && a.anchorStatement);
    
    if (validAnchors.length === 0) {
      setMessage({ type: 'error', text: 'Please complete at least one anchor with name, type, and statement' });
      return;
    }

    setSaving(true);
    setMessage(null);

    try {
      const airtableUrl = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Strategic%20Anchors`;

      // Create all anchors in Airtable
      const promises = validAnchors.map((anchor: Anchor) => {
        const fields: Record<string, any> = {
          "Anchor Name": anchor.anchorName,
          "Anchor Type": anchor.anchorType,
          "Anchor Statement": anchor.anchorStatement,
          "Status": "Active",
        };

        // Add optional fields
        if (anchor.whatThisGuides && anchor.whatThisGuides.length > 0) {
          fields["What This Guides"] = anchor.whatThisGuides;
        }
        if (anchor.confidenceLevel) fields["Confidence Level"] = anchor.confidenceLevel;
        if (anchor.timeHorizon) fields["Time Horizon"] = anchor.timeHorizon;
        if (anchor.effectiveFrom) fields["Effective From"] = anchor.effectiveFrom;

        // Link to Retailer Profile if selected
        if (selectedRetailerId) {
          fields["Retailer Profile"] = [selectedRetailerId];
        }

        return fetch(airtableUrl, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${AIRTABLE_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ fields }),
        });
      });

      const responses = await Promise.all(promises);
      const allSuccessful = responses.every((r) => r.ok);

      if (allSuccessful) {
        setMessage({ type: 'success', text: `${validAnchors.length} strategic anchor(s) saved successfully!` });
        // Reset form
        setAnchors([{
          anchorName: "",
          anchorType: "",
          anchorStatement: "",
          whatThisGuides: [],
          confidenceLevel: "",
          timeHorizon: "",
          effectiveFrom: "",
        }]);
        setSelectedRetailerId("");
      } else {
        setMessage({ type: 'error', text: 'Some anchors failed to save' });
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setSaving(false);
    }
  };

  // Handle File Upload (Forecast)
const handleForecastUpload = async () => {
  alert('Forecast handler called!');
  
  if (!forecastFile) {
    setForecastMessage({ type: 'error', text: 'Please select a file first' });
    return;
  }

  setSaving(true);
  setForecastMessage(null);

  try {
    console.log('Starting validation for:', forecastFile.name);
    const validation = await validateForecastFile(forecastFile);
    console.log('Validation result:', validation);

    if (!validation.isValid) {
      const errorList = validation.errors.join('\n• ');
      console.log('Errors found:', errorList);
      setForecastMessage({ 
        type: 'error', 
        text: `File validation failed:\n• ${errorList}` 
      });
      setSaving(false);
      return;
    }

    if (validation.warnings.length > 0) {
      console.warn('Validation warnings:', validation.warnings);
    }

    setForecastMessage({ 
      type: 'success', 
      text: `File validated successfully! ${validation.data?.length || 0} rows ready to upload. (Upload to Airtable coming soon)` 
    });
    
  } catch (error) {
    console.error('Upload error:', error);
    setForecastMessage({ type: 'error', text: 'Failed to process file. Please try again.' });
  } finally {
    setSaving(false);
  }
};

// Handle File Upload (Actuals)
const handleActualsUpload = async () => {
  alert('Actuals handler called!');
  
  if (!actualsFile) {
    setActualsMessage({ type: 'error', text: 'Please select a file first' });
    return;
  }

  setSaving(true);
  setActualsMessage(null);

  try {
    console.log('Starting validation for:', actualsFile.name);
    const validation = await validateActualsFile(actualsFile);
    console.log('Validation result:', validation);

    if (!validation.isValid) {
      const errorList = validation.errors.join('\n• ');
      console.log('Errors found:', errorList);
      setActualsMessage({ 
        type: 'error', 
        text: `File validation failed:\n• ${errorList}` 
      });
      setSaving(false);
      return;
    }

    if (validation.warnings.length > 0) {
      console.warn('Validation warnings:', validation.warnings);
    }

    setActualsMessage({ 
      type: 'success', 
      text: `File validated successfully! ${validation.data?.length || 0} rows ready to upload. (Upload to Airtable coming soon)` 
    });
    
  } catch (error) {
    console.error('Upload error:', error);
    setActualsMessage({ type: 'error', text: 'Failed to process file. Please try again.' });
  } finally {
    setSaving(false);
  }
};

// Handle File Upload (GTM)
const handleGTMUpload = async () => {
  alert('GTM handler called!');
  
  if (!gtmFile) {
    setGtmMessage({ type: 'error', text: 'Please select a file first' });
    return;
  }

  setSaving(true);
  setGtmMessage(null);

  try {
    console.log('Starting validation for:', gtmFile.name);
    const validation = await validateGTMFile(gtmFile);
    console.log('Validation result:', validation);

    if (!validation.isValid) {
      const errorList = validation.errors.join('\n• ');
      console.log('Errors found:', errorList);
      setGtmMessage({ 
        type: 'error', 
        text: `File validation failed:\n• ${errorList}` 
      });
      setSaving(false);
      return;
    }

    if (validation.warnings.length > 0) {
      console.warn('Validation warnings:', validation.warnings);
    }

    setGtmMessage({ 
      type: 'success', 
      text: `File validated successfully! ${validation.data?.length || 0} rows ready to upload. (Upload to Airtable coming soon)` 
    });
    
  } catch (error) {
    console.error('Upload error:', error);
    setGtmMessage({ type: 'error', text: 'Failed to process file. Please try again.' });
  } finally {
    setSaving(false);
  }
};

  const addAnchor = () => {
    setAnchors([...anchors, {
      anchorName: "",
      anchorType: "",
      anchorStatement: "",
      whatThisGuides: [],
      confidenceLevel: "",
      timeHorizon: "",
      effectiveFrom: "",
    }]);
  };

  const removeAnchor = (index: number) => {
    setAnchors(anchors.filter((_, i) => i !== index));
  };

  const updateAnchor = (index: number, field: keyof Anchor, value: any) => {
    const updated = [...anchors];
    updated[index][field] = value as never;
    setAnchors(updated);
  };

  const toggleMarket = (market: string) => {
    setPrimaryMarkets(prev =>
      prev.includes(market) ? prev.filter(m => m !== market) : [...prev, market]
    );
  };

  const toggleCategory = (category: string) => {
    setPlanningCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const toggleGrowthFocus = (focus: string) => {
    setGrowthFocus(prev =>
      prev.includes(focus) ? prev.filter(f => f !== focus) : [...prev, focus]
    );
  };

  const toggleGuide = (index: number, guide: string) => {
    const updated = [...anchors];
    const current = updated[index].whatThisGuides;
    updated[index].whatThisGuides = current.includes(guide)
      ? current.filter(g => g !== guide)
      : [...current, guide];
    setAnchors(updated);
  };

  return (
    <div className="min-h-screen bg-stone-50 pt-24 pb-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <h1 className="mb-8 font-serif text-4xl font-bold text-primary">
          Inputs
        </h1>
        
  {/* Tabs */}
<div className="mb-8">
  {/* Desktop: Horizontal tabs */}
  <div className="hidden md:flex gap-3 border-b border-stone-200">
    {tabs.map((tab, index) => (
      <button
        key={tab}
        onClick={() => {
          setActiveTab(index);
          setMessage(null);
          setForecastMessage(null);
          setActualsMessage(null);
          setGtmMessage(null);
        }}
        className={`whitespace-nowrap px-4 py-3 text-sm font-medium transition-colors ${
          activeTab === index
            ? "border-b-2 border-accent text-accent -mb-px"
            : "text-secondary hover:text-accent"
        }`}
      >
        {tab}
      </button>
    ))}
  </div>

  {/* Mobile: Vertical stacked tabs */}
  <div className="md:hidden space-y-2">
    {tabs.map((tab, index) => (
      <button
        key={tab}
        onClick={() => {
          setActiveTab(index);
          setMessage(null);
          setForecastMessage(null);
          setActualsMessage(null);
          setGtmMessage(null);
        }}
        className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
          activeTab === index
            ? "bg-accent text-white"
            : "bg-stone-100 text-secondary hover:bg-stone-200"
        }`}
      >
        {tab}
      </button>
    ))}
  </div>
</div>
        {/* Tab Content */}
        <div className="rounded-lg border border-stone-200 bg-white p-8">
          {/* Tab 1: Retailer Profile */}
          {activeTab === 0 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-primary">
                    Retailer Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={retailerName}
                    onChange={(e) => setRetailerName(e.target.value)}
                    className="w-full rounded-lg border border-stone-300 px-4 py-2 text-primary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    placeholder="e.g., UNTLD"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-primary">
                    Retailer Code
                  </label>
                  <input
                    type="text"
                    value={retailerCode}
                    onChange={(e) => setRetailerCode(e.target.value)}
                    className="w-full rounded-lg border border-stone-300 px-4 py-2 text-primary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    placeholder="e.g., UNTLD-AU"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-primary">
                    Segment / Positioning
                  </label>
                  <select
                    value={segment}
                    onChange={(e) => setSegment(e.target.value)}
                    className="w-full rounded-lg border border-stone-300 px-4 py-2 text-primary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  >
                    <option value="">Select segment</option>
                    <option value="Luxury">Luxury</option>
                    <option value="Premium">Premium</option>
                    <option value="Contemporary">Contemporary</option>
                    <option value="Fast Fashion">Fast Fashion</option>
                    <option value="Value">Value</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-primary">
                    Retail Operating Model
                  </label>
                  <select
                    value={retailOperatingModel}
                    onChange={(e) => setRetailOperatingModel(e.target.value)}
                    className="w-full rounded-lg border border-stone-300 px-4 py-2 text-primary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  >
                    <option value="">Select model</option>
                    <option value="DTC">DTC</option>
                    <option value="Omnichannel (Online & Instore)">Omnichannel (Online & Instore)</option>
                    <option value="Marketplace">Marketplace</option>
                    <option value="Wholesale Only">Wholesale Only</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-primary">
                  Primary Markets
                </label>
                <div className="flex flex-wrap gap-2">
                  {["AU", "US", "UK", "EU", "ROW"].map(market => (
                    <button
                      key={market}
                      type="button"
                      onClick={() => toggleMarket(market)}
                      className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                        primaryMarkets.includes(market)
                          ? "border-accent bg-accent text-white"
                          : "border-stone-300 text-secondary hover:border-accent"
                      }`}
                    >
                      {market}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-primary">
                  Planning Categories
                </label>
                <div className="flex flex-wrap gap-2">
                  {["Tops", "Bottoms", "Jackets", "Footwear", "Accessories", "Homewares"].map(category => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => toggleCategory(category)}
                      className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                        planningCategories.includes(category)
                          ? "border-accent bg-accent text-white"
                          : "border-stone-300 text-secondary hover:border-accent"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-primary">
                    Margin Posture
                  </label>
                  <select
                    value={marginPosture}
                    onChange={(e) => setMarginPosture(e.target.value)}
                    className="w-full rounded-lg border border-stone-300 px-4 py-2 text-primary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  >
                    <option value="">Select posture</option>
                    <option value="Protect Margin">Protect Margin</option>
                    <option value="Balanced">Balanced</option>
                    <option value="Growth-led">Growth-led</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-primary">
                    Promo Posture
                  </label>
                  <select
                    value={promoPosture}
                    onChange={(e) => setPromoPosture(e.target.value)}
                    className="w-full rounded-lg border border-stone-300 px-4 py-2 text-primary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  >
                    <option value="">Select posture</option>
                    <option value="Promo-light">Promo-light</option>
                    <option value="Promo-normal">Promo-normal</option>
                    <option value="Promo-heavy">Promo-heavy</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-primary">
                    Weekly Trade Cadence
                  </label>
                  <select
                    value={weeklyTradeCadence}
                    onChange={(e) => setWeeklyTradeCadence(e.target.value)}
                    className="w-full rounded-lg border border-stone-300 px-4 py-2 text-primary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  >
                    <option value="">Select cadence</option>
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Fortnightly">Fortnightly</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-primary">
                    Primary Exec Review Day
                  </label>
                  <select
                    value={primaryExecReviewDay}
                    onChange={(e) => setPrimaryExecReviewDay(e.target.value)}
                    className="w-full rounded-lg border border-stone-300 px-4 py-2 text-primary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  >
                    <option value="">Select day</option>
                    <option value="Mon">Monday</option>
                    <option value="Tue">Tuesday</option>
                    <option value="Wed">Wednesday</option>
                    <option value="Thu">Thursday</option>
                    <option value="Fri">Friday</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-primary">
                  Growth Focus (Next 6-12 Months)
                </label>
                <div className="flex flex-wrap gap-2">
                  {["Revenue", "Margin", "Inventory Efficiency", "New Markets", "Brand Elevation"].map(focus => (
                    <button
                      key={focus}
                      type="button"
                      onClick={() => toggleGrowthFocus(focus)}
                      className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                        growthFocus.includes(focus)
                          ? "border-accent bg-accent text-white"
                          : "border-stone-300 text-secondary hover:border-accent"
                      }`}
                    >
                      {focus}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleSaveRetailerProfile}
                  disabled={saving}
                  className="rounded-lg bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Retailer Profile'}
                </button>
              </div>
            </div>
          )}

          {/* Tab 2: Strategic Anchors */}
{activeTab === 1 && (
  <div className="space-y-6">
    {/* Retailer Profile Selection */}
    <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
      <label className="mb-2 block text-sm font-medium text-primary">
        Link to Retailer Profile (Optional)
      </label>
      <select
        value={selectedRetailerId}
        onChange={(e) => setSelectedRetailerId(e.target.value)}
        className="w-full rounded-lg border border-stone-300 bg-white px-4 py-2 text-primary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent md:w-1/2"
      >
        <option value="">None selected</option>
        {availableRetailers.map((retailer) => (
          <option key={retailer.id} value={retailer.id}>
            {retailer.name}
          </option>
        ))}
      </select>
      <p className="mt-2 text-xs text-blue-800">
        All anchors saved in this session will be linked to the selected retailer profile
      </p>
    </div>

    {anchors.map((anchor, index) => (
                <div key={index} className="rounded-lg border border-stone-200 bg-stone-50 p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="font-medium text-primary">Anchor {index + 1}</h3>
                    {anchors.length > 1 && (
                      <button
                        onClick={() => removeAnchor(index)}
                        className="text-sm text-red-600 hover:text-red-700"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-primary">
                        Anchor Name <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        value={anchor.anchorName}
                        onChange={(e) => updateAnchor(index, "anchorName", e.target.value)}
                        className="w-full rounded-lg border border-stone-300 px-4 py-2 text-primary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                        placeholder="e.g., Margin Protection Strategy"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-primary">
                        Anchor Type <span className="text-red-600">*</span>
                      </label>
                      <select
                        value={anchor.anchorType}
                        onChange={(e) => updateAnchor(index, "anchorType", e.target.value)}
                        className="w-full rounded-lg border border-stone-300 px-4 py-2 text-primary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                      >
                        <option value="">Select type</option>
                        <option value="Brand & Customer Relevance">Brand & Customer Relevance</option>
                        <option value="Commercial Intent">Commercial Intent</option>
                        <option value="Portfolio & Growth Focus">Portfolio & Growth Focus</option>
                        <option value="Go-To-Market Intent">Go-To-Market Intent</option>
                        <option value="Market & Channel Focus">Market & Channel Focus</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-primary">
                        Anchor Statement <span className="text-red-600">*</span>
                      </label>
                      <textarea
                        value={anchor.anchorStatement}
                        onChange={(e) => updateAnchor(index, "anchorStatement", e.target.value)}
                        rows={4}
                        className="w-full rounded-lg border border-stone-300 px-4 py-2 text-primary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                        placeholder="Enter the strategic anchor statement..."
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-primary">
                        What This Guides
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {["Product", "Pricing", "Marketing", "Trade", "Stock", "GTM Timing", "Channel Mix"].map(guide => (
                          <button
                            key={guide}
                            type="button"
                            onClick={() => toggleGuide(index, guide)}
                            className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
                              anchor.whatThisGuides.includes(guide)
                                ? "border-accent bg-accent text-white"
                                : "border-stone-300 text-secondary hover:border-accent"
                            }`}
                          >
                            {guide}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-primary">
                          Confidence Level
                        </label>
                        <select
                          value={anchor.confidenceLevel}
                          onChange={(e) => updateAnchor(index, "confidenceLevel", e.target.value)}
                          className="w-full rounded-lg border border-stone-300 px-4 py-2 text-primary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                        >
                          <option value="">Select level</option>
                          <option value="High conviction">High conviction</option>
                          <option value="Medium conviction">Medium conviction</option>
                          <option value="Actively being tested">Actively being tested</option>
                        </select>
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-primary">
                          Time Horizon
                        </label>
                        <select
                          value={anchor.timeHorizon}
                          onChange={(e) => updateAnchor(index, "timeHorizon", e.target.value)}
                          className="w-full rounded-lg border border-stone-300 px-4 py-2 text-primary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                        >
                          <option value="">Select horizon</option>
                          <option value="Ongoing">Ongoing</option>
                          <option value="Season">Season</option>
                          <option value="FY">FY</option>
                          <option value="Strategic (multi-year)">Strategic (multi-year)</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
  

  </div>

<div>
  <label className="mb-2 block text-sm font-medium text-primary">
    Effective From
  </label>
  <input
    type="date"
    value={anchor.effectiveFrom}
    onChange={(e) => updateAnchor(index, "effectiveFrom", e.target.value)}
    className="w-full rounded-lg border border-stone-300 px-4 py-2 text-primary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent md:w-1/2"
  />
</div>
                  </div>
                </div>
              ))}

              <button
                onClick={addAnchor}
                className="rounded-lg border border-stone-300 bg-white px-6 py-3 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent"
              >
                + Add Another Anchor
              </button>

              <div className="pt-4">
                <button
                  onClick={handleSaveAnchors}
                  disabled={saving}
                  className="rounded-lg bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Anchors'}
                </button>
              </div>
            </div>
          )}

          {/* Tab 3: Forecast & Actuals Upload */}
{activeTab === 2 && (
  <div className="space-y-8">
    {/* Forecast Template Section */}
    <div>
      <h3 className="mb-4 font-serif text-xl font-semibold text-primary">
        Weekly Forecast Upload
      </h3>
      {/* Forecast Message Display */}
      {forecastMessage && (
        <div className={`mb-4 rounded-lg border p-4 ${
          forecastMessage.type === 'success' 
            ? 'border-green-200 bg-green-50 text-green-800' 
            : 'border-red-200 bg-red-50 text-red-800'
        }`}>
          <div className="whitespace-pre-line">{forecastMessage.text}</div>
        </div>
      )}

      <p className="mb-4 text-sm text-secondary">
        Upload your planned/forecasted metrics for upcoming weeks
      </p>
      
      <div className="rounded-lg border-2 border-dashed border-stone-300 bg-stone-50 p-12 text-center">
        <input
          type="file"
          accept=".csv,.xlsx"
          onChange={(e) => setForecastFile(e.target.files?.[0] || null)}
          className="hidden"
          id="forecast-upload"
        />
        <label
          htmlFor="forecast-upload"
          className="cursor-pointer"
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-stone-200">
            <svg className="h-8 w-8 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <p className="mt-4 text-sm font-medium text-primary">
            Click to upload or drag and drop
          </p>
          <p className="mt-2 text-xs text-secondary">
            Forecast data - CSV or XLSX (max 5MB)
          </p>
        </label>
        {forecastFile && (
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-primary">
            <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>{forecastFile.name}</span>
            <button
              onClick={() => setForecastFile(null)}
              className="ml-2 text-red-600 hover:text-red-700"
            >
              Remove
            </button>
          </div>
        )}
      </div>

      <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-4">
        <p className="text-sm text-blue-900">
          📊 Need a template?{" "}
          <button 
            onClick={() => downloadForecastTemplate()}
            className="font-medium underline hover:text-blue-700"
          >
            Download Forecast Template
          </button>
        </p>
      </div>

      <button
        onClick={handleForecastUpload}
        disabled={saving || !forecastFile}
        className="mt-4 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent disabled:opacity-50"
      >
        {saving ? 'Uploading...' : 'Upload Forecast'}
      </button>
    </div>

    {/* Divider */}
    <div className="border-t border-stone-300"></div>

    {/* Actuals Template Section */}
    <div>
      <h3 className="mb-4 font-serif text-xl font-semibold text-primary">
        Weekly Actuals Upload
      </h3>
      {/* Actuals Message Display */}
  {actualsMessage && (
    <div className={`mb-4 rounded-lg border p-4 ${
      actualsMessage.type === 'success' 
        ? 'border-green-200 bg-green-50 text-green-800' 
        : 'border-red-200 bg-red-50 text-red-800'
    }`}>
      <div className="whitespace-pre-line">{actualsMessage.text}</div>
    </div>
  )}

      <p className="mb-4 text-sm text-secondary">
        Upload actual performance data after the week completes
      </p>
      
      <div className="rounded-lg border-2 border-dashed border-stone-300 bg-stone-50 p-12 text-center">
        <input
          type="file"
          accept=".csv,.xlsx"
          onChange={(e) => setActualsFile(e.target.files?.[0] || null)}
          className="hidden"
          id="actuals-upload"
        />
        <label
          htmlFor="actuals-upload"
          className="cursor-pointer"
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-stone-200">
            <svg className="h-8 w-8 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <p className="mt-4 text-sm font-medium text-primary">
            Click to upload or drag and drop
          </p>
          <p className="mt-2 text-xs text-secondary">
            Actuals data - CSV or XLSX (max 5MB)
          </p>
        </label>
        {actualsFile && (
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-primary">
            <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>{actualsFile.name}</span>
            <button
              onClick={() => setActualsFile(null)}
              className="ml-2 text-red-600 hover:text-red-700"
            >
              Remove
            </button>
          </div>
        )}
      </div>

      <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-4">
        <p className="text-sm text-blue-900">
          📊 Need a template?{" "}
          <button 
            onClick={() => downloadActualsTemplate()}
            className="font-medium underline hover:text-blue-700"
          >
            Download Actuals Template
          </button>
        </p>
      </div>

      <button
        onClick={handleActualsUpload}
        disabled={saving || !actualsFile}
        className="mt-4 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent disabled:opacity-50"
      >
        {saving ? 'Uploading...' : 'Upload Actuals'}
      </button>
    </div>
  </div>
)}

          {/* Tab 4: GTM Calendar Upload */}
          {activeTab === 3 && (
            <div className="space-y-6">
              <div className="rounded-lg border-2 border-dashed border-stone-300 bg-stone-50 p-12 text-center">
                <input
                  type="file"
                  accept=".csv,.xlsx"
                  onChange={(e) => setGtmFile(e.target.files?.[0] || null)}
                  className="hidden"
                  id="gtm-upload"
                />
                <label
                  htmlFor="gtm-upload"
                  className="cursor-pointer"
                >
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-stone-200">
                    <svg className="h-8 w-8 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <p className="mt-4 text-sm font-medium text-primary">
                    Click to upload or drag and drop
                  </p>
                  <p className="mt-2 text-xs text-secondary">
                    CSV or XLSX (max 2MB)
                  </p>
                </label>
                {gtmFile && (
                  <div className="mt-4 flex items-center justify-center gap-2 text-sm text-primary">
                    <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{gtmFile.name}</span>
                    <button
                      onClick={() => setGtmFile(null)}
                      className="ml-2 text-red-600 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                <p className="text-sm text-blue-900">
                  📅 Need a template?{" "}
                  <button 
  onClick={() => downloadGTMTemplate()}
  className="font-medium underline hover:text-blue-700"
>
  Download Template
</button>
                </p>
              </div>

              <button
                onClick={handleGTMUpload}
                disabled={saving || !gtmFile}
                className="rounded-lg bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent disabled:opacity-50"
              >
                {saving ? 'Uploading...' : 'Upload GTM Calendar'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}