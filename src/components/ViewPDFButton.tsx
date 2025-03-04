"use client"; // ✅ Ensures it's a Client Component

import React from "react";

interface ViewPDFButtonProps {
  invoiceId: string;
}

const ViewPDFButton: React.FC<ViewPDFButtonProps> = ({ invoiceId }) => {
  const handleClick = () => {
    window.location.href = `/invoices/${invoiceId}/pdf`;
  };

  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-blue-600 transition"
    >
      Download
    </button>
  );
};

export default ViewPDFButton;
