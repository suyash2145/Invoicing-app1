
"use client";

import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

// ✅ TypeScript interface for summary API response
interface InvoiceSummary {
  totalInvoices: number;
  totalAmount: number;
  totalPaidAmount: number;
  remainingAmount: number;
  totalUncollectibleAmount: number;
  totalVoidAmount: number;
  invoiceBreakdown: {
    name: string;
    count: number;
  }[];
}

// ✅ Color mapping
const PIE_COLORS = ["#10B981", "#F59E0B", "#EF4444", "#9CA3AF"];

const BAR_COLORS: Record<string, string> = {
  Paid: "#10B981",
  Unpaid: "#F59E0B",
  Uncollectible: "#EF4444",
  Void: "#9CA3AF",
};

export default function SummaryPage() {
  const [summary, setSummary] = useState<InvoiceSummary>({
    totalInvoices: 0,
    totalAmount: 0,
    totalPaidAmount: 0,
    remainingAmount: 0,
    totalUncollectibleAmount: 0,
    totalVoidAmount: 0,
    invoiceBreakdown: [],
  });

  useEffect(() => {
    async function fetchSummary() {
      try {
        const res = await fetch("/api/summary");
        if (!res.ok) throw new Error("Failed to fetch data");
        const data = await res.json();
        setSummary(data);
      } catch (error) {
        console.error("Error fetching summary:", error);
      }
    }

    fetchSummary();
  }, []);

  // ✅ Pie chart data
  const pieData = [
    { name: "Paid", value: summary.totalPaidAmount / 100 },
    { name: "Remaining", value: summary.remainingAmount / 100 },
    { name: "Loss", value: summary.totalUncollectibleAmount / 100 },
    { name: "Refund (Void)", value: summary.totalVoidAmount / 100 },
  ];

  return (
    <main className="w-full h-full">
      <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Invoice Summary</h1>

        {/* ✅ Summary Grid */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <SummaryCard title="Total Invoices" value={summary.totalInvoices.toString()} bg="bg-blue-500" />
          <SummaryCard title="Total Amount" value={`Rs ${(summary.totalAmount / 100).toFixed(2)}`} bg="bg-gray-600" />
          <SummaryCard title="Total Paid" value={`Rs ${(summary.totalPaidAmount / 100).toFixed(2)}`} bg="bg-green-500" />
          <SummaryCard title="Remaining" value={`Rs ${(summary.remainingAmount / 100).toFixed(2)}`} bg="bg-red-500" />
          <SummaryCard title="Uncollectible" value={`Rs ${(summary.totalUncollectibleAmount / 100).toFixed(2)}`} bg="bg-yellow-500" />
          <SummaryCard title="Refund (Void)" value={`Rs ${(summary.totalVoidAmount / 100).toFixed(2)}`} bg="bg-purple-500" />
        </div>
      </div>

      {/* ✅ Charts Section */}
      <div className="max-w-4xl mx-auto mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-center">Invoice Data Visualization</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ✅ Pie Chart */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-medium mb-2">Paid vs Remaining vs Loss vs Refund</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name }) => name}
                >
                  {pieData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `Rs ${(value as number).toFixed(2)}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* ✅ Bar Chart with Custom Colors */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-medium mb-2">Invoice Count by Status</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={summary.invoiceBreakdown}>
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" name="Invoices">
                  {summary.invoiceBreakdown.map((entry, index) => (
                    <Cell key={`bar-cell-${index}`} fill={BAR_COLORS[entry.name] || "#3B82F6"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </main>
  );
}

// ✅ Reusable Summary Card
function SummaryCard({ title, value, bg }: { title: string; value: string; bg: string }) {
  return (
    <div className={`${bg} text-white p-4 rounded-lg`}>
      <h2 className="text-sm font-medium">{title}</h2>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}
