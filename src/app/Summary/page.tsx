
"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

export default function SummaryPage() {
  const [summary, setSummary] = useState({
    totalInvoices: 0,
    totalPaidAmount: 0,
    remainingAmount: 0,
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

  // Prepare data for charts
  const pieData = [
    { name: "Paid", value: summary.totalPaidAmount },
    { name: "Remaining", value: summary.remainingAmount },
  ];

  const barData = [{ name: "Invoices", total: summary.totalInvoices }];

  const COLORS = ["#10B981", "#EF4444"]; // Green for paid, red for remaining

  return (
    <main className="w-full h-full">
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Invoice Summary</h1>

        <div className="grid grid-cols-3 gap-6">
          <div className="bg-blue-500 text-white p-4 rounded-lg">
            <h2 className="text-lg font-semibold">Total Invoices</h2>
            <p className="text-2xl">{summary.totalInvoices}</p>
          </div>

          <div className="bg-green-500 text-white p-4 rounded-lg">
            <h2 className="text-lg font-semibold">Total Paid Amount</h2>
            <p className="text-2xl">Rs {(summary.totalPaidAmount / 100).toFixed(2)}</p>
          </div>

          <div className="bg-red-500 text-white p-4 rounded-lg">
            <h2 className="text-lg font-semibold">Remaining Amount</h2>
            <p className="text-2xl">Rs {(summary.remainingAmount / 100).toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="max-w-4xl mx-auto mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-center">Invoice Data Visualization</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pie Chart */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-medium mb-2">Paid vs Remaining</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value" label>
                  {pieData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-medium mb-2">Total Invoices</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </main>
  );
}
