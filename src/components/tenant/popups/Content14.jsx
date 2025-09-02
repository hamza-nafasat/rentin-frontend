'use client';
import React, { useState } from 'react';
import Buttons from './Buttons';
import Image from 'next/image';

function Content14() {
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [pdfError, setPdfError] = useState(null);

  const handleDownloadContract = async () => {
    if (!bookingRequestData) {
      alert('No booking data available to generate contract');
      return;
    }

    try {
      setIsGeneratingPdf(true);
      setPdfError(null);

      // Validate essential data
      if (!bookingRequestData.tenantName) {
        throw new Error('Tenant name is required for contract generation');
      }

      const safeFileName = (bookingRequestData.tenantName || 'tenant').replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();

      const filename = `rental-contract-${safeFileName}-${new Date().toISOString().split('T')[0]}.pdf`;

      await downloadRentalContract(bookingRequestData, filename);

      // Show success message
      const successDiv = document.createElement('div');
      successDiv.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50';
      successDiv.textContent = 'Contract downloaded successfully!';
      document.body.appendChild(successDiv);
      setTimeout(() => {
        document.body.removeChild(successDiv);
      }, 3000);
    } catch (error) {
      console.error('Error generating PDF:', error);
      const errorMessage = error.message || 'Failed to generate PDF. Please try again.';
      setPdfError(errorMessage);
      alert(errorMessage);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handlePreviewContract = async () => {
    if (!bookingRequestData) {
      alert('No booking data available to generate contract');
      return;
    }

    try {
      setIsGeneratingPdf(true);
      setPdfError(null);

      // Validate essential data
      if (!bookingRequestData.tenantName) {
        throw new Error('Tenant name is required for contract generation');
      }

      await previewRentalContract(bookingRequestData);
    } catch (error) {
      console.error('Error previewing PDF:', error);
      const errorMessage = error.message || 'Failed to preview PDF. Please try again.';
      setPdfError(errorMessage);
      alert(errorMessage);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div>
      <p className="px-2 text-[14px] text-[#32343C]">
        Congratulations! Your property booking has been confirmed. You will receive further details via email and can
        check your booking status on your dashboard.
      </p>
      {/* PDF Error Display */}
      {pdfError && (
        <div className="mt-3 rounded-md bg-red-50 p-4">
          <div className="text-sm text-red-700">PDF Error: {pdfError}</div>
        </div>
      )}
      <div className="mt-3">
        <p className="text-[16px] font-semibold text-[#32343C]">Click to view the contract file</p>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <div className="basis-[100%] bg-[#ECECECB2] sm:basis-[59%]">
            <button
              onClick={handlePreviewContract}
              disabled={isGeneratingPdf}
              className="flex w-full items-center gap-3 px-5 py-3 text-[16px] font-medium text-[#374151] transition-colors hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Image src="/images/default/pdf.png" width={30} height={31} alt="icon" />
              {isGeneratingPdf ? 'Generating Preview...' : 'Contract File.pdf'}
            </button>
          </div>
          <div>
            <button
              onClick={handleDownloadContract}
              disabled={isGeneratingPdf}
              className="flex cursor-pointer items-center gap-3 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <div className="flex gap-2">
                <p className="rounded-[2px] bg-[#0245A5] px-4 py-3.5 text-[14px] text-white transition-colors hover:bg-blue-600 disabled:bg-gray-400">
                  {isGeneratingPdf ? 'Generating...' : 'Download Contract'}
                </p>
                <span>
                  <Image src="/images/default/download.png" width={'49'} height={'49'} alt="icon" />
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <Buttons text1={'Go to Dashboard'} cn={'!bg-[#5390E0] hover:!bg-blue-400'} text2={'View Booking Details'} />
      </div>
    </div>
  );
}

export default Content14;
