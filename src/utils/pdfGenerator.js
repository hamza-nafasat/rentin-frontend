// // utils/pdfGenerator.js
// import jsPDF from 'jspdf';

// // Helper function to create manual tables
// const createTable = (doc, data, startY, options = {}) => {
//   const {
//     cellHeight = 8,
//     headerHeight = 10,
//     fontSize = 10,
//     margin = { left: 15, right: 15 },
//     columnWidths = [80, 100], // Default column widths
//   } = options;

//   const pageWidth = 210; // A4 width in mm
//   const tableWidth = pageWidth - margin.left - margin.right;

//   let currentY = startY;

//   doc.setFontSize(fontSize);

//   data.forEach((row, index) => {
//     // Check if we need a new page
//     if (currentY > 270) {
//       doc.addPage();
//       currentY = 20;
//     }

//     const [label, value] = row;

//     // Draw row background (alternate colors)
//     if (index % 2 === 0) {
//       doc.setFillColor(245, 245, 245);
//       doc.rect(margin.left, currentY - cellHeight + 2, tableWidth, cellHeight, 'F');
//     }

//     // Draw borders
//     doc.setDrawColor(200, 200, 200);
//     doc.setLineWidth(0.1);
//     doc.rect(margin.left, currentY - cellHeight + 2, columnWidths[0], cellHeight, 'S');
//     doc.rect(margin.left + columnWidths[0], currentY - cellHeight + 2, columnWidths[1], cellHeight, 'S');

//     // Add text
//     doc.setTextColor(50, 52, 60);
//     doc.setFont('helvetica', 'bold');
//     doc.text(label, margin.left + 2, currentY);

//     doc.setFont('helvetica', 'normal');
//     doc.text(String(value), margin.left + columnWidths[0] + 2, currentY);

//     currentY += cellHeight;
//   });

//   return currentY;
// };

// export const generateRentalContract = async data => {
//   try {
//     const doc = new jsPDF();

//     // Set up colors
//     const primaryColor = [2, 69, 165]; // #0245A5
//     const secondaryColor = [50, 52, 60]; // #32343C
//     const lightGray = [128, 128, 128];
//     const backgroundColor = [249, 250, 251];

//     // Add company logo with better error handling
//     try {
//       const logoImg = new Image();
//       logoImg.crossOrigin = 'anonymous';

//       await new Promise((resolve, reject) => {
//         const timeout = setTimeout(() => {
//           reject(new Error('Logo load timeout'));
//         }, 5000);

//         logoImg.onload = () => {
//           clearTimeout(timeout);
//           resolve();
//         };
//         logoImg.onerror = error => {
//           clearTimeout(timeout);
//           reject(error);
//         };
//         logoImg.src = '/images/default/logo.png';
//       });

//       doc.addImage(logoImg, 'PNG', 20, 15, 40, 15);
//     } catch (error) {
//       console.warn('Could not load logo, using text fallback:', error);
//       // Fallback to text logo
//       doc.setFillColor(...primaryColor);
//       doc.roundedRect(20, 15, 40, 15, 2, 2, 'F');
//       doc.setTextColor(255, 255, 255);
//       doc.setFontSize(12);
//       doc.setFont('helvetica', 'bold');
//       doc.text('RENTIN', 40, 25, { align: 'center' });
//     }

//     // Header
//     doc.setTextColor(...primaryColor);
//     doc.setFontSize(24);
//     doc.setFont('helvetica', 'bold');
//     doc.text('RENTAL AGREEMENT CONTRACT', 105, 40, { align: 'center' });

//     // Subtitle
//     doc.setTextColor(...secondaryColor);
//     doc.setFontSize(12);
//     doc.setFont('helvetica', 'normal');
//     doc.text('Property Rental Contract & Terms', 105, 50, { align: 'center' });

//     // Contract details box
//     doc.setFillColor(...backgroundColor);
//     doc.roundedRect(15, 60, 180, 30, 3, 3, 'F');
//     doc.setDrawColor(...primaryColor);
//     doc.setLineWidth(1);
//     doc.roundedRect(15, 60, 180, 30, 3, 3, 'S');

//     // Contract info
//     doc.setTextColor(...secondaryColor);
//     doc.setFontSize(10);
//     doc.setFont('helvetica', 'bold');
//     doc.text('Contract Date:', 20, 70);
//     doc.text('Property ID:', 20, 78);
//     doc.text('Contract Duration:', 20, 86);

//     doc.setFont('helvetica', 'normal');

//     const contractDate = new Date().toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//     });

//     doc.text(contractDate, 55, 70);
//     doc.text(String(data.propertyName || 'N/A'), 55, 78);

//     const moveInFormatted = data.moveInDate ? new Date(data.moveInDate).toLocaleDateString() : 'N/A';
//     const moveOutFormatted = data.moveOutDate ? new Date(data.moveOutDate).toLocaleDateString() : 'N/A';
//     doc.text(`${moveInFormatted} to ${moveOutFormatted}`, 55, 86);

//     // Property Details Section
//     let yPosition = 105;

//     // Section Header
//     doc.setFillColor(...primaryColor);
//     doc.rect(15, yPosition, 180, 8, 'F');
//     doc.setTextColor(255, 255, 255);
//     doc.setFontSize(12);
//     doc.setFont('helvetica', 'bold');
//     doc.text('PROPERTY DETAILS', 20, yPosition + 6);

//     yPosition += 15;

//     // Property info table
//     const propertyData = [
//       ['Property Name', String(data.propertyName || 'N/A')],
//       ['Property Type', String(data.propertyType || 'N/A')],
//       ['Address', String(data.address || 'N/A')],
//       ['Unit Area', String(data.unitArea || 'N/A')],
//       ['Bedrooms', String(data.bedRooms || 'N/A')],
//       ['Bathrooms', String(data.bathRooms || 'N/A')],
//     ];

//     yPosition = createTable(doc, propertyData, yPosition, {
//       columnWidths: [80, 100],
//       fontSize: 10,
//     });

//     yPosition += 15;

//     // Tenant Details Section
//     doc.setFillColor(...primaryColor);
//     doc.rect(15, yPosition, 180, 8, 'F');
//     doc.setTextColor(255, 255, 255);
//     doc.setFontSize(12);
//     doc.setFont('helvetica', 'bold');
//     doc.text('TENANT INFORMATION', 20, yPosition + 6);

//     yPosition += 15;

//     const tenantData = [
//       ['Full Name', String(data.tenantName || 'N/A')],
//       ['Email', String(data.tenantEmail || 'N/A')],
//       ['Nationality', String(data.nationality || 'N/A')],
//       ['Current City', String(data.cityOfResidence || 'N/A')],
//       ['Visa Type', String(data.visaType || 'N/A')],
//       ['Number of Occupants', String(data.numOfOccupants || 'N/A')],
//       ['Purpose of Rental', String(data.purposeOfRental || 'N/A')],
//       ['Arrival Time', String(data.arrivalTime || 'N/A')],
//     ];

//     yPosition = createTable(doc, tenantData, yPosition, {
//       columnWidths: [80, 100],
//       fontSize: 10,
//     });

//     yPosition += 15;

//     // Owner Details Section
//     doc.setFillColor(...primaryColor);
//     doc.rect(15, yPosition, 180, 8, 'F');
//     doc.setTextColor(255, 255, 255);
//     doc.setFontSize(12);
//     doc.setFont('helvetica', 'bold');
//     doc.text('PROPERTY OWNER INFORMATION', 20, yPosition + 6);

//     yPosition += 15;

//     const ownerData = [
//       ['Owner Name', String(data.ownerName || 'N/A')],
//       ['Owner Email', String(data.ownerEmail || 'N/A')],
//     ];

//     yPosition = createTable(doc, ownerData, yPosition, {
//       columnWidths: [80, 100],
//       fontSize: 10,
//     });

//     yPosition += 15;

//     // Financial Details Section
//     doc.setFillColor(...primaryColor);
//     doc.rect(15, yPosition, 180, 8, 'F');
//     doc.setTextColor(255, 255, 255);
//     doc.setFontSize(12);
//     doc.setFont('helvetica', 'bold');
//     doc.text('FINANCIAL TERMS', 20, yPosition + 6);

//     yPosition += 15;

//     const totalRent = Number(data.totalRent) || 0;
//     const securityDeposit = Number(data.securityDeposit) || 0;
//     const contractRate = Number(data.contractRate) || 0;
//     const totalAmount = totalRent + securityDeposit;

//     const financialData = [
//       ['Monthly Rent', `$${totalRent.toLocaleString()}`],
//       ['Security Deposit', `$${securityDeposit.toLocaleString()}`],
//       ['Contract Rate', `$${contractRate.toLocaleString()}`],
//       ['Total Initial Payment', `$${totalAmount.toLocaleString()}`],
//     ];

//     yPosition = createTable(doc, financialData, yPosition, {
//       columnWidths: [80, 100],
//       fontSize: 10,
//     });

//     yPosition += 20;

//     // Terms and Conditions
//     if (yPosition > 250) {
//       doc.addPage();
//       yPosition = 20;
//     }

//     doc.setFillColor(...primaryColor);
//     doc.rect(15, yPosition, 180, 8, 'F');
//     doc.setTextColor(255, 255, 255);
//     doc.setFontSize(12);
//     doc.setFont('helvetica', 'bold');
//     doc.text('TERMS & CONDITIONS', 20, yPosition + 6);

//     yPosition += 20;

//     doc.setTextColor(...secondaryColor);
//     doc.setFontSize(10);
//     doc.setFont('helvetica', 'normal');

//     const terms = [
//       '1. The tenant agrees to pay rent on time as specified in this contract.',
//       '2. Security deposit will be refunded upon satisfactory inspection of the property.',
//       '3. The tenant must maintain the property in good condition.',
//       '4. Any damages beyond normal wear and tear will be deducted from the security deposit.',
//       '5. The tenant must notify the owner 30 days in advance before moving out.',
//       '6. Subletting is not permitted without written consent from the owner.',
//       '7. The tenant agrees to comply with all building rules and regulations.',
//       '8. This contract is legally binding upon signature by both parties.',
//     ];

//     terms.forEach(term => {
//       try {
//         const splitText = doc.splitTextToSize(term, 170);
//         doc.text(splitText, 20, yPosition);
//         yPosition += splitText.length * 5 + 5;
//       } catch (error) {
//         console.warn('Error adding term:', error);
//         doc.text(term.substring(0, 100) + (term.length > 100 ? '...' : ''), 20, yPosition);
//         yPosition += 10;
//       }
//     });

//     yPosition += 20;

//     // Signature section
//     if (yPosition > 250) {
//       doc.addPage();
//       yPosition = 20;
//     }

//     doc.setFillColor(...backgroundColor);
//     doc.roundedRect(15, yPosition, 180, 40, 3, 3, 'F');
//     doc.setDrawColor(...primaryColor);
//     doc.setLineWidth(1);
//     doc.roundedRect(15, yPosition, 180, 40, 3, 3, 'S');

//     doc.setTextColor(...primaryColor);
//     doc.setFontSize(12);
//     doc.setFont('helvetica', 'bold');
//     doc.text('SIGNATURES', 20, yPosition + 10);

//     // Signature lines
//     doc.setTextColor(...secondaryColor);
//     doc.setFontSize(10);
//     doc.setFont('helvetica', 'normal');

//     doc.text('Tenant Signature:', 20, yPosition + 25);
//     doc.line(55, yPosition + 25, 120, yPosition + 25);
//     doc.text('Date:', 125, yPosition + 25);
//     doc.line(135, yPosition + 25, 180, yPosition + 25);

//     doc.text('Owner Signature:', 20, yPosition + 35);
//     doc.line(55, yPosition + 35, 120, yPosition + 35);
//     doc.text('Date:', 125, yPosition + 35);
//     doc.line(135, yPosition + 35, 180, yPosition + 35);

//     // Footer
//     doc.setTextColor(...lightGray);
//     doc.setFontSize(8);
//     doc.setFont('helvetica', 'italic');
//     doc.text('Generated by Rentin Platform - www.rentin.com', 105, 285, { align: 'center' });

//     return doc;
//   } catch (error) {
//     console.error('Error in generateRentalContract:', error);
//     throw new Error(`PDF generation failed: ${error.message}`);
//   }
// };

// export const downloadRentalContract = async (data, filename = 'rental-contract.pdf') => {
//   try {
//     if (!data) {
//       throw new Error('No data provided for contract generation');
//     }

//     const doc = await generateRentalContract(data);
//     doc.save(filename);
//   } catch (error) {
//     console.error('Error in downloadRentalContract:', error);
//     throw error;
//   }
// };

// export const previewRentalContract = async data => {
//   try {
//     if (!data) {
//       throw new Error('No data provided for contract generation');
//     }

//     const doc = await generateRentalContract(data);
//     const pdfBlob = doc.output('blob');
//     const pdfUrl = URL.createObjectURL(pdfBlob);
//     window.open(pdfUrl, '_blank');

//     setTimeout(() => {
//       URL.revokeObjectURL(pdfUrl);
//     }, 1000);
//   } catch (error) {
//     console.error('Error in previewRentalContract:', error);
//     throw error;
//   }
// };

// utils/pdfGenerator.js
// utils/pdfGenerator.js
// utils/pdfGenerator.js
import jsPDF from 'jspdf';

// Helper function to load and add signature image
const addSignatureImage = async (doc, imageUrl, x, y, width = 45, height = 20) => {
  try {
    if (!imageUrl) return false;

    const img = new Image();
    img.crossOrigin = 'anonymous';

    await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('Signature image load timeout'));
      }, 10000);

      img.onload = () => {
        clearTimeout(timeout);
        resolve();
      };
      img.onerror = error => {
        clearTimeout(timeout);
        reject(error);
      };
      img.src = imageUrl;
    });

    // Add background for signature
    doc.setFillColor(255, 255, 255);
    doc.rect(x, y, width, height, 'F');

    // Add signature image
    doc.addImage(img, 'PNG', x + 2, y + 2, width - 4, height - 4);

    // Add a border around the signature
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.8);
    doc.rect(x, y, width, height, 'S');

    return true;
  } catch (error) {
    console.warn('Could not load signature image:', error);
    return false;
  }
};

// Helper function to wrap text
const wrapText = (doc, text, x, y, maxWidth, lineHeight = 5) => {
  const lines = doc.splitTextToSize(text, maxWidth);
  lines.forEach((line, index) => {
    doc.text(line, x, y + index * lineHeight);
  });
  return y + lines.length * lineHeight;
};

// Enhanced table creation with better text wrapping
const createTable = (doc, data, startY, options = {}) => {
  const { cellHeight = 12, fontSize = 10, margin = { left: 15, right: 15 }, columnWidths = [70, 110] } = options;

  const pageWidth = 210;
  const tableWidth = pageWidth - margin.left - margin.right;

  let currentY = startY;

  doc.setFontSize(fontSize);

  data.forEach((row, index) => {
    // Check if we need a new page
    if (currentY > 260) {
      doc.addPage();
      currentY = 20;
    }

    const [label, value] = row;

    // Calculate actual cell height based on content
    const maxWidth = columnWidths[1] - 4;
    const wrappedValue = doc.splitTextToSize(String(value), maxWidth);
    const actualCellHeight = Math.max(cellHeight, wrappedValue.length * 5 + 4);

    // Draw row background (alternate colors)
    if (index % 2 === 0) {
      doc.setFillColor(248, 250, 252);
      doc.rect(margin.left, currentY, tableWidth, actualCellHeight, 'F');
    }

    // Draw borders
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.3);
    doc.rect(margin.left, currentY, columnWidths[0], actualCellHeight, 'S');
    doc.rect(margin.left + columnWidths[0], currentY, columnWidths[1], actualCellHeight, 'S');

    // Add label text
    doc.setTextColor(51, 65, 85);
    doc.setFont('helvetica', 'bold');
    doc.text(label, margin.left + 3, currentY + 8);

    // Add value text with wrapping
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);

    if (wrappedValue.length === 1) {
      doc.text(String(value), margin.left + columnWidths[0] + 3, currentY + 8);
    } else {
      wrappedValue.forEach((line, lineIndex) => {
        doc.text(line, margin.left + columnWidths[0] + 3, currentY + 8 + lineIndex * 5);
      });
    }

    currentY += actualCellHeight;
  });

  return currentY;
};

// Helper function to check if we need a new page
const checkPageBreak = (doc, currentY, requiredSpace = 40) => {
  if (currentY + requiredSpace > 280) {
    doc.addPage();
    return 20;
  }
  return currentY;
};

export const generateRentalContract = async data => {
  try {
    const doc = new jsPDF();

    // Enhanced color palette
    const colors = {
      primary: [2, 69, 165],
      secondary: [51, 65, 85],
      accent: [59, 130, 246],
      success: [34, 197, 94],
      text: [71, 85, 105],
      lightText: [148, 163, 184],
      background: [248, 250, 252],
      border: [226, 232, 240],
    };

    // Add company logo with better error handling
    try {
      const logoImg = new Image();
      logoImg.crossOrigin = 'anonymous';

      await new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error('Logo load timeout'));
        }, 5000);

        logoImg.onload = () => {
          clearTimeout(timeout);
          resolve();
        };
        logoImg.onerror = error => {
          clearTimeout(timeout);
          reject(error);
        };
        logoImg.src = '/images/default/logo.png';
      });

      doc.addImage(logoImg, 'PNG', 15, 10, 45, 18);
    } catch (error) {
      console.warn('Could not load logo, using enhanced text fallback:', error);
      // Enhanced text logo fallback
      doc.setFillColor(...colors.primary);
      doc.roundedRect(15, 10, 45, 18, 3, 3, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('RENTIN', 37.5, 22, { align: 'center' });
    }

    // Contract number and date (top right)
    doc.setTextColor(...colors.lightText);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text('Contract No: RC-' + Date.now().toString().slice(-6), 150, 15);
    doc.text('Generated: ' + new Date().toLocaleDateString(), 150, 20);

    // Main Header with solid background
    doc.setFillColor(...colors.primary);
    doc.rect(15, 35, 180, 25, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(26);
    doc.setFont('helvetica', 'bold');
    doc.text('RENTAL AGREEMENT CONTRACT', 105, 50, { align: 'center' });

    // Subtitle
    doc.setTextColor(...colors.text);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('Legally Binding Property Rental Agreement', 105, 70, { align: 'center' });

    // Contract summary box with enhanced design
    doc.setFillColor(...colors.background);
    doc.roundedRect(15, 80, 180, 35, 4, 4, 'F');
    doc.setDrawColor(...colors.border);
    doc.setLineWidth(1);
    doc.roundedRect(15, 80, 180, 35, 4, 4, 'S');

    // Contract info with better layout
    doc.setTextColor(...colors.secondary);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');

    const contractDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    // Left column
    doc.text('Contract Date:', 20, 92);
    doc.text('Property:', 20, 100);
    doc.text('Duration:', 20, 108);

    // Right column values
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...colors.text);
    doc.text(contractDate, 65, 92);

    // Handle long property names
    const propertyName = String(data.propertyName || 'N/A');
    if (propertyName.length > 25) {
      const wrappedProperty = doc.splitTextToSize(propertyName, 120);
      wrappedProperty.forEach((line, index) => {
        doc.text(line, 65, 100 + index * 4);
      });
    } else {
      doc.text(propertyName, 65, 100);
    }

    const moveInFormatted = data.moveInDate ? new Date(data.moveInDate).toLocaleDateString() : 'N/A';
    const moveOutFormatted = data.moveOutDate ? new Date(data.moveOutDate).toLocaleDateString() : 'N/A';
    doc.text(`${moveInFormatted} to ${moveOutFormatted}`, 65, 108);

    let yPosition = 125;

    // Property Details Section with enhanced header
    yPosition = checkPageBreak(doc, yPosition, 60);

    doc.setFillColor(...colors.primary);
    doc.rect(15, yPosition, 180, 12, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('PROPERTY DETAILS', 20, yPosition + 8);

    yPosition += 18;

    const propertyData = [
      ['Property Name', String(data.propertyName || 'N/A')],
      ['Property Type', String(data.propertyType || 'N/A').toUpperCase()],
      ['Full Address', String(data.address || 'N/A')],
      ['Unit Area', String(data.unitArea || 'N/A')],
      ['Bedrooms', String(data.bedRooms || 'N/A')],
      ['Bathrooms', String(data.bathRooms || 'N/A')],
    ];

    yPosition = createTable(doc, propertyData, yPosition, {
      columnWidths: [70, 110],
      fontSize: 10,
      cellHeight: 12,
    });

    yPosition += 20;

    // Tenant Details Section
    yPosition = checkPageBreak(doc, yPosition, 80);

    doc.setFillColor(...colors.accent);
    doc.rect(15, yPosition, 180, 12, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('TENANT INFORMATION', 20, yPosition + 8);

    yPosition += 18;

    const tenantData = [
      ['Full Name', String(data.tenantName || 'N/A')],
      ['Email Address', String(data.tenantEmail || 'N/A')],
      ['Nationality', String(data.nationality || 'N/A')],
      ['Current City', String(data.cityOfResidence || 'N/A')],
      ['Visa Type', String(data.visaType || 'N/A')],
      ['Number of Occupants', String(data.numOfOccupants || 'N/A')],
      ['Purpose of Rental', String(data.purposeOfRental || 'N/A')],
      ['Arrival Time', String(data.arrivalTime || 'N/A')],
    ];

    yPosition = createTable(doc, tenantData, yPosition, {
      columnWidths: [70, 110],
      fontSize: 10,
      cellHeight: 12,
    });

    yPosition += 20;

    // Owner Details Section
    yPosition = checkPageBreak(doc, yPosition, 40);

    doc.setFillColor(...colors.success);
    doc.rect(15, yPosition, 180, 12, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('PROPERTY OWNER INFORMATION', 20, yPosition + 8);

    yPosition += 18;

    const ownerData = [
      ['Owner Name', String(data.ownerName || 'N/A')],
      ['Contact Email', String(data.ownerEmail || 'N/A')],
    ];

    yPosition = createTable(doc, ownerData, yPosition, {
      columnWidths: [70, 110],
      fontSize: 10,
      cellHeight: 12,
    });

    yPosition += 20;

    // Financial Details Section with enhanced styling
    yPosition = checkPageBreak(doc, yPosition, 60);

    doc.setFillColor(34, 197, 94); // Green for financial section
    doc.rect(15, yPosition, 180, 12, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('FINANCIAL TERMS', 20, yPosition + 8);

    yPosition += 18;

    const totalRent = Number(data.totalRent) || 0;
    const securityDeposit = Number(data.securityDeposit) || 0;
    const contractRate = Number(data.contractRate) || 0;
    const totalAmount = totalRent + securityDeposit;

    const financialData = [
      ['Monthly Rent', `$${totalRent.toLocaleString()}`],
      ['Security Deposit', `$${securityDeposit.toLocaleString()}`],
      ['Contract Rate', `$${contractRate.toLocaleString()}`],
      ['Total Initial Payment', `$${totalAmount.toLocaleString()}`],
    ];

    yPosition = createTable(doc, financialData, yPosition, {
      columnWidths: [70, 110],
      fontSize: 11,
      cellHeight: 14,
    });

    // Highlight total amount with solid background
    doc.setFillColor(240, 253, 244); // Light green background
    doc.rect(15, yPosition - 14, 180, 14, 'F');
    doc.setDrawColor(34, 197, 94);
    doc.setLineWidth(1);
    doc.rect(15, yPosition - 14, 180, 14, 'S');

    yPosition += 25;

    // Terms and Conditions
    yPosition = checkPageBreak(doc, yPosition, 80);

    doc.setFillColor(...colors.primary);
    doc.rect(15, yPosition, 180, 12, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('TERMS & CONDITIONS', 20, yPosition + 8);

    yPosition += 20;

    doc.setTextColor(...colors.text);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');

    const terms = [
      '1. The tenant agrees to pay rent on time as specified in this contract.',
      '2. Security deposit will be refunded upon satisfactory inspection of the property at move-out.',
      '3. The tenant must maintain the property in good condition and report any damages immediately.',
      '4. Any damages beyond normal wear and tear will be deducted from the security deposit.',
      '5. The tenant must notify the owner 30 days in advance before moving out.',
      '6. Subletting or unauthorized occupancy is strictly prohibited without written consent.',
      '7. The tenant agrees to comply with all building rules, regulations, and local laws.',
      '8. This contract is legally binding upon signature by both parties and governed by local law.',
    ];

    terms.forEach(term => {
      yPosition = checkPageBreak(doc, yPosition, 15);
      try {
        const splitText = doc.splitTextToSize(term, 170);
        splitText.forEach((line, index) => {
          doc.text(line, 20, yPosition + index * 5);
        });
        yPosition += splitText.length * 5 + 3;
      } catch (error) {
        console.warn('Error adding term:', error);
        doc.text(term.substring(0, 100) + (term.length > 100 ? '...' : ''), 20, yPosition);
        yPosition += 8;
      }
    });

    yPosition += 25;

    // Enhanced Signature section
    yPosition = checkPageBreak(doc, yPosition, 80);

    // Signature section background
    doc.setFillColor(...colors.background);
    doc.roundedRect(15, yPosition, 180, 75, 4, 4, 'F');
    doc.setDrawColor(...colors.primary);
    doc.setLineWidth(1.5);
    doc.roundedRect(15, yPosition, 180, 75, 4, 4, 'S');

    // Signature header
    doc.setTextColor(...colors.primary);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('DIGITAL SIGNATURES', 20, yPosition + 12);

    // Two-column layout for signatures
    const leftColumnX = 25;
    const rightColumnX = 105;
    const signatureY = yPosition + 25;

    // Tenant signature (left side)
    doc.setTextColor(...colors.secondary);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('TENANT SIGNATURE', leftColumnX, signatureY);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(...colors.text);

    // Wrap tenant name if too long
    const tenantName = String(data.tenantName || 'N/A');
    if (tenantName.length > 15) {
      const wrappedName = doc.splitTextToSize(tenantName, 70);
      wrappedName.forEach((line, index) => {
        doc.text(line, leftColumnX, signatureY + 8 + index * 4);
      });
    } else {
      doc.text(tenantName, leftColumnX, signatureY + 8);
    }

    // Tenant signature image
    const tenantSigAdded = await addSignatureImage(doc, data.tenantSignature, leftColumnX, signatureY + 15, 45, 20);
    if (!tenantSigAdded) {
      // Enhanced fallback
      doc.setFillColor(255, 255, 255);
      doc.rect(leftColumnX, signatureY + 15, 45, 20, 'F');
      doc.setDrawColor(...colors.border);
      doc.setLineWidth(1);
      doc.rect(leftColumnX, signatureY + 15, 45, 20, 'S');
      doc.setTextColor(...colors.lightText);
      doc.setFontSize(8);
      doc.text('Digital signature', leftColumnX + 2, signatureY + 22);
      doc.text('not available', leftColumnX + 2, signatureY + 28);
    }

    // Tenant date
    doc.setTextColor(...colors.text);
    doc.setFontSize(9);
    doc.text('Date: ' + new Date().toLocaleDateString(), leftColumnX, signatureY + 40);

    // Owner signature (right side)
    doc.setTextColor(...colors.secondary);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('OWNER SIGNATURE', rightColumnX, signatureY);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(...colors.text);

    // Wrap owner name if too long
    const ownerName = String(data.ownerName || 'N/A');
    if (ownerName.length > 15) {
      const wrappedOwnerName = doc.splitTextToSize(ownerName, 70);
      wrappedOwnerName.forEach((line, index) => {
        doc.text(line, rightColumnX, signatureY + 8 + index * 4);
      });
    } else {
      doc.text(ownerName, rightColumnX, signatureY + 8);
    }

    // Owner signature image
    const ownerSigAdded = await addSignatureImage(doc, data.ownerSignature, rightColumnX, signatureY + 15, 45, 20);
    if (!ownerSigAdded) {
      // Enhanced fallback
      doc.setFillColor(255, 255, 255);
      doc.rect(rightColumnX, signatureY + 15, 45, 20, 'F');
      doc.setDrawColor(...colors.border);
      doc.setLineWidth(1);
      doc.rect(rightColumnX, signatureY + 15, 45, 20, 'S');
      doc.setTextColor(...colors.lightText);
      doc.setFontSize(8);
      doc.text('Digital signature', rightColumnX + 2, signatureY + 22);
      doc.text('not available', rightColumnX + 2, signatureY + 28);
    }

    // Owner date
    doc.setTextColor(...colors.text);
    doc.setFontSize(9);
    doc.text('Date: ' + new Date().toLocaleDateString(), rightColumnX, signatureY + 40);

    // Legal disclaimer
    yPosition += 85;
    doc.setTextColor(...colors.lightText);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'italic');
    const disclaimer =
      'This document constitutes a legally binding agreement between the parties. Both parties acknowledge they have read, understood, and agree to all terms stated herein.';
    const wrappedDisclaimer = doc.splitTextToSize(disclaimer, 170);
    wrappedDisclaimer.forEach((line, index) => {
      doc.text(line, 20, yPosition + index * 4);
    });

    yPosition += wrappedDisclaimer.length * 4 + 10;

    // Enhanced Footer with contact info
    doc.setFillColor(...colors.primary);
    doc.rect(0, 285, 210, 12, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text('Generated by Rentin Platform | www.rentin.com | support@rentin.com', 105, 292, { align: 'center' });

    return doc;
  } catch (error) {
    console.error('Error in generateRentalContract:', error);
    throw new Error(`PDF generation failed: ${error.message}`);
  }
};

export const downloadRentalContract = async (data, filename = 'rental-contract.pdf') => {
  try {
    if (!data) {
      throw new Error('No data provided for contract generation');
    }

    const doc = await generateRentalContract(data);
    doc.save(filename);
  } catch (error) {
    console.error('Error in downloadRentalContract:', error);
    throw error;
  }
};

export const previewRentalContract = async data => {
  try {
    if (!data) {
      throw new Error('No data provided for contract generation');
    }

    const doc = await generateRentalContract(data);
    const pdfBlob = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl, '_blank');

    setTimeout(() => {
      URL.revokeObjectURL(pdfUrl);
    }, 1000);
  } catch (error) {
    console.error('Error in previewRentalContract:', error);
    throw error;
  }
};
