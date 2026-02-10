import jsPDF from "jspdf";

export function downloadReportAsPDF(data: any) {
  const doc = new jsPDF();
  let yPos = 20;
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const maxWidth = pageWidth - 2 * margin;
  const lineHeight = 5;

  // Clean text - remove special characters that don't render well
const cleanText = (text: string) => {
  if (!text) return "";
  return text
    .replace(/→/g, "->")
    .replace(/•/g, "- ")
    .replace(/!/g, "")
    .replace(/'/g, "'")
    .replace(/"/g, '"')
    .replace(/"/g, '"')
    .replace(/–/g, "-")
    .replace(/—/g, "-")
    .replace(/‑/g, "-")  // Add this line - non-breaking hyphen
    .replace(/\(/g, "(")   // Add this line
    .replace(/\)/g, ")")   // Add this line
    .replace(/\s+/g, " ")  // Add this line - normalize spaces
    .trim();
};

  // Check if we need a new page
  const checkPageBreak = (neededSpace: number = 15) => {
    if (yPos + neededSpace > 270) {
      doc.addPage();
      yPos = 20;
    }
  };

  // Add section with proper spacing and bullet point handling
const addSection = (title: string, content: string) => {
  if (!content) return;
  
  let cleanedContent = cleanText(content);
  
  // Split inline bullet points into separate lines
  // Look for patterns like "text. - " or "text. • " and split them
  cleanedContent = cleanedContent
    .replace(/\.\s*-\s+/g, '.\n- ')  // Split on ". - "
    .replace(/\.\s*•\s+/g, '.\n• ')  // Split on ". • "
    .replace(/^\s*-\s+/gm, '• ')     // Replace leading "- " with "• "
    .replace(/^\s*\*\s+/gm, '• ');   // Replace leading "* " with "• "
  
  checkPageBreak(25);
  yPos += 8;
  
  // Section title
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text(title.toUpperCase(), margin, yPos);
  yPos += 7;
  
  // Section content
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  
  // Split into lines
  const lines = cleanedContent.split('\n').filter(p => p.trim());
  
  lines.forEach((line) => {
    const trimmed = line.trim();
    
    // Check if this is a bullet point
    const isBullet = trimmed.startsWith('• ');
    
    if (isBullet) {
      // Remove the bullet marker for splitting
      const textWithoutBullet = trimmed.substring(2).trim();
      const bulletIndent = margin + 3;
      const bulletTextIndent = margin + 8;
      
      // Split the bullet text to fit width
      const wrappedLines = doc.splitTextToSize(textWithoutBullet, maxWidth - 8);
      
      wrappedLines.forEach((wrappedLine: string, index: number) => {
        checkPageBreak(6);
        
        if (index === 0) {
          // First line: add bullet point
          doc.text("•", bulletIndent, yPos);
          doc.text(wrappedLine.trim(), bulletTextIndent, yPos);
        } else {
          // Continuation lines: indent to align with bullet text
          doc.text(wrappedLine.trim(), bulletTextIndent, yPos);
        }
        
        yPos += lineHeight;
      });
      
      // Small gap after bullet
      yPos += 1.5;
    } else {
      // Regular paragraph (not a bullet)
      const wrappedLines = doc.splitTextToSize(trimmed, maxWidth);
      
      wrappedLines.forEach((wrappedLine: string) => {
        checkPageBreak(6);
        doc.text(wrappedLine.trim(), margin, yPos);
        yPos += lineHeight;
      });
      
      // Gap between paragraphs
      yPos += 3;
    }
  });
};

  // Title
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  const title = cleanText(data["Report Name"] || "Trade Report");
  doc.text(title, margin, yPos);
  yPos += 10;

  // Date and Status
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  const createdDate = new Date(data["Report Entry Date"]).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit", 
    year: "numeric"
  });
  doc.text(`Created: ${createdDate}`, margin, yPos);
  doc.text(`Status: ${data["Status"] || "N/A"}`, margin + 60, yPos);
  yPos += 12;

  // Performance Metrics
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("PERFORMANCE METRICS", margin, yPos);
  yPos += 7;

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  
  const formatCurrency = (num: number) => `$${Math.round(num).toLocaleString()}`;
  
  const salesActual = formatCurrency(data["Sales Actual"]?.[0] || 0);
  const salesPlan = formatCurrency(data["Sales Plan"]?.[0] || 0);
  const gmActual = ((data["Gross Margin % Actual"]?.[0] || 0) * 100).toFixed(1);
  const gmPlan = ((data["Gross Margin % Plan"]?.[0] || 0) * 100).toFixed(1);
  const aovActual = formatCurrency(data["AOV Actual"]?.[0] || 0);
  const aovPlan = formatCurrency(data["AOV Plan"]?.[0] || 0);
  
  doc.text(`Sales: ${salesActual} (Forecast: ${salesPlan})`, margin, yPos);
  yPos += lineHeight;
  doc.text(`Gross Margin: ${gmActual}% (Forecast: ${gmPlan}%)`, margin, yPos);
  yPos += lineHeight;
  doc.text(`AOV: ${aovActual} (Forecast: ${aovPlan})`, margin, yPos);
  yPos += 3;

  // Add all sections
  addSection("Executive Summary", data["Executive Summary (AI)"]);
  addSection("Signals Observed", data["Signals Observed (AI)"]);
  addSection("Key Risks", data["Key Risks (AI)"]);
  addSection("Key Opportunities", data["Key Opportunities (AI)"]);
  addSection("Decisions Captured", data["Decisions Captured (Manual)"]);
  addSection("Assumptions to Monitor", data["Assumptions to Monitor (Manual)"]);
  addSection("Focus Recommendations", data["Focus Recommendations (AI)"]);
  addSection("Executive Questions", data["Executive Questions (AI)"]);

  // Download
  const cleanFileName = cleanText(data["Report Name"] || "report").replace(/[^a-z0-9]/gi, '_');
  const fileName = `${cleanFileName}_${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(fileName);
}