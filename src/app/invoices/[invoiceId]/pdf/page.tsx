"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { PDFDownloadLink } from "@react-pdf/renderer";
import InvoicePDF from "@/components/InvoicePDF"; // Import Server Component
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function InvoicePDFPage() {
  const { invoiceId } = useParams();
  const [invoice, setInvoice] = useState<any>(null);

  useEffect(() => {
    async function fetchInvoice() {
      const res = await fetch(`/api/invoices/${invoiceId}`);
      if (res.ok) {
        const data = await res.json();
        setInvoice(data);
      }
    }
    fetchInvoice();
  }, [invoiceId]);

  if (!invoice)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
        <p className="ml-2 text-gray-600">Loading Invoice...</p>
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50">
      <div className="bg-white shadow-lg rounded-xl p-6 max-w-lg w-full text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Invoice PDF</h1>
        <p className="text-gray-600 mb-6">Download a PDF copy of your invoice.</p>

        <PDFDownloadLink document={<InvoicePDF invoice={invoice} />} fileName={`invoice-${invoiceId}.pdf`}>
          {({ loading }) => (
            <Button className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin mr-2" /> Generating PDF...
                </>
              ) : (
                "Download Invoice PDF"
              )}
            </Button>
          )}
        </PDFDownloadLink>
      </div>
    </div>
  );
}
