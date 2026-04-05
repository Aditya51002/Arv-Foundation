import jsPDF from "jspdf";

export const generateCertificatePDF = (req) => {
  const doc = new jsPDF("landscape", "mm", "a4");
  
  // Outer Border
  doc.setLineWidth(2);
  doc.setDrawColor(34, 197, 94); // emerald
  doc.rect(10, 10, 277, 190);
  
  // Inner Border
  doc.setLineWidth(0.5);
  doc.setDrawColor(251, 191, 36); // amber
  doc.rect(12, 12, 273, 186);

  // Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(36);
  doc.setTextColor(11, 20, 17); // dark #0b1411
  doc.text("CERTIFICATE", 148, 50, { align: "center" });

  doc.setFontSize(16);
  doc.setTextColor(100, 100, 100);
  doc.text("OF COMPLETION", 148, 60, { align: "center" });

  // Body
  doc.setFont("helvetica", "normal");
  doc.setFontSize(14);
  doc.setTextColor(50, 50, 50);
  doc.text("This is proudly presented to", 148, 85, { align: "center" });

  // Name
  doc.setFont("helvetica", "bold");
  doc.setFontSize(28);
  doc.setTextColor(34, 197, 94); // emerald
  doc.text(req.userName.toUpperCase(), 148, 105, { align: "center" });

  // Line under name
  doc.setLineWidth(0.5);
  doc.line(90, 110, 206, 110);

  // Description area
  doc.setFont("helvetica", "normal");
  doc.setFontSize(14);
  doc.setTextColor(50, 50, 50);
  doc.text(`For their outstanding contribution as a ${req.certificateType}`, 148, 125, { align: "center" });
  if (req.description) {
    doc.setFont("helvetica", "italic");
    doc.setFontSize(12);
    doc.text(`"${req.description}"`, 148, 135, { align: "center" });
  }

  // Footer/Signatures
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("ARV Foundation Team", 60, 175, { align: "center" });
  doc.line(40, 170, 80, 170);

  doc.text(new Date(req.issuedAt || Date.now()).toLocaleDateString(), 230, 175, { align: "center" });
  doc.line(210, 170, 250, 170);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text("Date of Issue", 230, 180, { align: "center" });

  // Save
  doc.save(`${req.userName.replace(/\s+/g, '_')}_Certificate.pdf`);
};
