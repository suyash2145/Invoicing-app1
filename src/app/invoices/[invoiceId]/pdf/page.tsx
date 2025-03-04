"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { PDFDownloadLink } from "@react-pdf/renderer";
import InvoicePDF from "@/components/InvoicePDF";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface Invoice {
  id: number;
  value: number;
  status: "open" | "paid" | "void" | "uncollectible";
  description?: string;
  customer?: { name: string };
}

export default function InvoicePDFPage() {
  const params = useParams();
  const invoiceId = params.invoiceId as string;
  const [invoice, setInvoice] = useState<Invoice | null>(null);

  useEffect(() => {
    async function fetchInvoice() {
      try {
        const res = await fetch(`/api/invoices/${invoiceId}`);
        if (!res.ok) throw new Error("Failed to fetch invoice");
        const data: Invoice = await res.json();
        setInvoice(data);
      } catch (error) {
        console.error("Error fetching invoice:", error);
      }
    }
    if (invoiceId) fetchInvoice();
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

        {invoice && (
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
        )}
      </div>
    </div>
  );
}
