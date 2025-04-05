
// "use client";

// import { useEffect, useState } from "react";
// import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

// export default function SummaryPage() {
//   const [summary, setSummary] = useState({
//     totalInvoices: 0,
//     totalPaidAmount: 0,
//     remainingAmount: 0,
//   });

//   useEffect(() => {
//     async function fetchSummary() {
//       try {
//         const res = await fetch("/api/summary");
//         if (!res.ok) throw new Error("Failed to fetch data");

//         const data = await res.json();
//         setSummary(data);
//       } catch (error) {
//         console.error("Error fetching summary:", error);
//       }
//     }

//     fetchSummary();
//   }, []);

//   // Prepare data for charts
//   const pieData = [
//     { name: "Paid", value: summary.totalPaidAmount },
//     { name: "Remaining", value: summary.remainingAmount },
//   ];

//   const barData = [{ name: "Invoices", total: summary.totalInvoices }];

//   const COLORS = ["#10B981", "#EF4444"]; // Green for paid, red for remaining

//   return (
//     <main className="w-full h-full">
//       <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
//         <h1 className="text-2xl font-bold mb-4">Invoice Summary</h1>

//         <div className="grid grid-cols-3 gap-6">
//           <div className="bg-blue-500 text-white p-4 rounded-lg">
//             <h2 className="text-lg font-semibold">Total Invoices</h2>
//             <p className="text-2xl">{summary.totalInvoices}</p>
//           </div>

//           <div className="bg-green-500 text-white p-4 rounded-lg">
//             <h2 className="text-lg font-semibold">Total Paid Amount</h2>
//             <p className="text-2xl">Rs {(summary.totalPaidAmount / 100).toFixed(2)}</p>
//           </div>

//           <div className="bg-red-500 text-white p-4 rounded-lg">
//             <h2 className="text-lg font-semibold">Remaining Amount</h2>
//             <p className="text-2xl">Rs {(summary.remainingAmount / 100).toFixed(2)}</p>
//           </div>
//         </div>
//       </div>

//       {/* Charts Section */}
//       <div className="max-w-4xl mx-auto mt-8 bg-white p-6 rounded-lg shadow-md">
//         <h2 className="text-xl font-semibold mb-4 text-center">Invoice Data Visualization</h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Pie Chart */}
//           <div className="flex flex-col items-center">
//             <h3 className="text-lg font-medium mb-2">Paid vs Remaining</h3>
//             <ResponsiveContainer width="100%" height={300}>
//               <PieChart>
//                 <Pie data={pieData} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value" label>
//                   {pieData.map((_, index) => (
//                     <Cell key={`cell-${index}`} fill={COLORS[index]} />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>

//           {/* Bar Chart */}
//           <div className="flex flex-col items-center">
//             <h3 className="text-lg font-medium mb-2">Total Invoices</h3>
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={barData}>
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Bar dataKey="total" fill="#3B82F6" />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }


// "use client";

// import { useEffect, useState } from "react";
// import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

// export default function SummaryPage() {
//   const [summary, setSummary] = useState({
//     totalInvoices: 0,
//     totalPaidAmount: 0,
//     remainingAmount: 0,
//   });

//   useEffect(() => {
//     async function fetchSummary() {
//       try {
//         const res = await fetch("/api/summary");
//         if (!res.ok) throw new Error("Failed to fetch data");

//         const data = await res.json();
//         setSummary(data);
//       } catch (error) {
//         console.error("Error fetching summary:", error);
//       }
//     }

//     fetchSummary();
//   }, []);

//   // ✅ Convert values to Rs format before passing to PieChart
//   const pieData = [
//     { name: "Paid", value: summary.totalPaidAmount / 100 },
//     { name: "Remaining", value: summary.remainingAmount / 100 },
//   ];

//   const barData = [{ name: "Invoices", total: summary.totalInvoices }];

//   const COLORS = ["#10B981", "#EF4444"]; // Green for paid, red for remaining

//   // ✅ Custom label function for Rs .00 format
//   const renderPieLabel = ({ name, value }) => `${name}: Rs ${value.toFixed(2)}`;

//   return (
//     <main className="w-full h-full">
//       <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
//         <h1 className="text-2xl font-bold mb-4">Invoice Summary</h1>

//         <div className="grid grid-cols-3 gap-6">
//           <div className="bg-blue-500 text-white p-4 rounded-lg">
//             <h2 className="text-lg font-semibold">Total Invoices</h2>
//             <p className="text-2xl">{summary.totalInvoices}</p>
//           </div>

//           <div className="bg-green-500 text-white p-4 rounded-lg">
//             <h2 className="text-lg font-semibold">Total Paid Amount</h2>
//             <p className="text-2xl">Rs {summary.totalPaidAmount / 100}.00</p>
//           </div>

//           <div className="bg-red-500 text-white p-4 rounded-lg">
//             <h2 className="text-lg font-semibold">Remaining Amount</h2>
//             <p className="text-2xl">Rs {summary.remainingAmount / 100}.00</p>
//           </div>
//         </div>
//       </div>

//       {/* Charts Section */}
//       <div className="max-w-4xl mx-auto mt-8 bg-white p-6 rounded-lg shadow-md">
//         <h2 className="text-xl font-semibold mb-4 text-center">Invoice Data Visualization</h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Pie Chart */}
//           <div className="flex flex-col items-center">
//             <h3 className="text-lg font-medium mb-2">Paid vs Remaining</h3>
//             <ResponsiveContainer width="100%" height={300}>
//               <PieChart>
//                 <Pie
//                   data={pieData}
//                   cx="50%"
//                   cy="50%"
//                   outerRadius={100}
//                   fill="#8884d8"
//                   dataKey="value"
//                   label={renderPieLabel} // ✅ Custom Rs .00 format label
//                 >
//                   {pieData.map((_, index) => (
//                     <Cell key={`cell-${index}`} fill={COLORS[index]} />
//                   ))}
//                 </Pie>
//                 <Tooltip formatter={(value) => `Rs ${value.toFixed(2)}`} /> {/* ✅ Tooltip Rs .00 format */}
//               </PieChart>
//             </ResponsiveContainer>
//           </div>

//           {/* Bar Chart */}
//           <div className="flex flex-col items-center">
//             <h3 className="text-lg font-medium mb-2">Total Invoices</h3>
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={barData}>
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Bar dataKey="total" fill="#3B82F6" />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }



// "use client";

// import { useEffect, useState } from "react";
// import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

// export default function SummaryPage() {
//   const [summary, setSummary] = useState({
//     totalInvoices: 0,
//     totalPaidAmount: 0,
//     remainingAmount: 0,
//   });

//   useEffect(() => {
//     async function fetchSummary() {
//       try {
//         const res = await fetch("/api/summary");
//         if (!res.ok) throw new Error("Failed to fetch data");

//         const data = await res.json();
//         setSummary(data);
//       } catch (error) {
//         console.error("Error fetching summary:", error);
//       }
//     }

//     fetchSummary();
//   }, []);

//   // Prepare data for charts
//   const pieData = [
//     { name: "Paid", value: summary.totalPaidAmount / 100 },
//     { name: "Remaining", value: summary.remainingAmount / 100},
//   ];

//   const barData = [{ name: "Invoices", total: summary.totalInvoices }];

//   const COLORS = ["#10B981", "#EF4444"]; // Green for paid, red for remaining

//   return (
//     <main className="w-full h-full">
//       <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
//         <h1 className="text-2xl font-bold mb-4">Invoice Summary</h1>

//         <div className="grid grid-cols-3 gap-6">
//           <div className="bg-blue-500 text-white p-4 rounded-lg">
//             <h2 className="text-lg font-semibold">Total Invoices</h2>
//             <p className="text-2xl">{summary.totalInvoices}</p>
//           </div>

//           <div className="bg-green-500 text-white p-4 rounded-lg">
//             <h2 className="text-lg font-semibold">Total Paid Amount</h2>
//             <p className="text-2xl">Rs {(summary.totalPaidAmount / 100).toFixed(2)}</p>
//           </div>

//           <div className="bg-red-500 text-white p-4 rounded-lg">
//             <h2 className="text-lg font-semibold">Remaining Amount</h2>
//             <p className="text-2xl">Rs {(summary.remainingAmount / 100).toFixed(2)}</p>
//           </div>
//         </div>
//       </div>

//       {/* Charts Section */}
//       <div className="max-w-4xl mx-auto mt-8 bg-white p-6 rounded-lg shadow-md">
//         <h2 className="text-xl font-semibold mb-4 text-center">Invoice Data Visualization</h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Pie Chart */}
//           <div className="flex flex-col items-center">
//             <h3 className="text-lg font-medium mb-2">Paid vs Remaining</h3>
//             <ResponsiveContainer width="100%" height={300}>
//               <PieChart>
//                 <Pie data={pieData} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value" label>
//                   {pieData.map((_, index) => (
//                     <Cell key={`cell-${index}`} fill={COLORS[index]} />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>

//           {/* Bar Chart */}
//           <div className="flex flex-col items-center">
//             <h3 className="text-lg font-medium mb-2">Total Invoices</h3>
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={barData}>
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Bar dataKey="total" fill="#3B82F6" />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }


// "use client";

// import { useEffect, useState } from "react";
// import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

// export default function SummaryPage() {
//   const [summary, setSummary] = useState({
//     totalInvoices: 0,
//     totalPaidAmount: 0,
//     remainingAmount: 0,
//     totalUncollectibleAmount: 0, // ✅ Added uncollectible amount
//   });

//   useEffect(() => {
//     async function fetchSummary() {
//       try {
//         const res = await fetch("/api/summary");
//         if (!res.ok) throw new Error("Failed to fetch data");

//         const data = await res.json();
//         setSummary(data);
//       } catch (error) {
//         console.error("Error fetching summary:", error);
//       }
//     }

//     fetchSummary();
//   }, []);

//   // ✅ Prepare data for the pie chart
//   const pieData = [
//     { name: "Paid", value: summary.totalPaidAmount / 100 },
//     { name: "Remaining", value: summary.remainingAmount / 100 },
//     { name: "Loss (Uncollectible)", value: summary.totalUncollectibleAmount / 100 },
//   ];

//   const barData = [{ name: "Invoices", total: summary.totalInvoices }];

//   const COLORS = ["#10B981", "#EF4444", "#F59E0B"]; // Green for Paid, Red for Remaining, Orange for Loss

//   return (
//     <main className="w-full h-full">
//       <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
//         <h1 className="text-2xl font-bold mb-4">Invoice Summary</h1>

//         {/* ✅ Summary Section */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//           <div className="bg-blue-500 text-white p-4 rounded-lg">
//             <h2 className="text-lg font-semibold">Total Invoices</h2>
//             <p className="text-2xl">{summary.totalInvoices}</p>
//           </div>

//           <div className="bg-green-500 text-white p-4 rounded-lg">
//             <h2 className="text-lg font-semibold">Total Paid Amount</h2>
//             <p className="text-2xl">Rs {(summary.totalPaidAmount / 100).toFixed(2)}</p>
//           </div>

//           <div className="bg-red-500 text-white p-4 rounded-lg">
//             <h2 className="text-lg font-semibold">Remaining Amount</h2>
//             <p className="text-2xl">Rs {(summary.remainingAmount / 100).toFixed(2)}</p>
//           </div>

//           <div className="bg-yellow-500 text-white p-4 rounded-lg">
//             <h2 className="text-lg font-semibold">Uncollectible Amount</h2>
//             <p className="text-2xl">Rs {(summary.totalUncollectibleAmount / 100).toFixed(2)}</p>
//           </div>
//         </div>
//       </div>

//       {/* ✅ Charts Section */}
//       <div className="max-w-4xl mx-auto mt-8 bg-white p-6 rounded-lg shadow-md">
//         <h2 className="text-xl font-semibold mb-4 text-center">Invoice Data Visualization</h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* ✅ Pie Chart (Paid vs Remaining vs Loss) */}
//           <div className="flex flex-col items-center">
//             <h3 className="text-lg font-medium mb-2">Paid vs Remaining vs Loss</h3>
//             <ResponsiveContainer width="100%" height={300}>
//               <PieChart>
//                 <Pie
//                   data={pieData}
//                   cx="50%"
//                   cy="50%"
//                   outerRadius={100}
//                   fill="#8884d8"
//                   dataKey="value"
//                   // label={({ name, value }) => `${name}: Rs ${value.toFixed(2)}`}
//                   //  // ✅ Show Rs .00 format
//                   // labelLine={false}
//                   label={({ name }) => name} 
//                 >
//                   {pieData.map((_, index) => (
//                     <Cell key={`cell-${index}`} fill={COLORS[index]} />
//                   ))}
//                 </Pie>
//                 {/* <Tooltip formatter={(value) => `Rs ${value.toFixed(2)}`} />
//                  */}
//                  <Tooltip formatter={(value) => (typeof value === "number" ? `Rs ${value.toFixed(2)}` : "Rs 0.00")} />

//               </PieChart>
//             </ResponsiveContainer>
//           </div>

//           {/* ✅ Bar Chart */}
//           <div className="flex flex-col items-center">
//             <h3 className="text-lg font-medium mb-2">Total Invoices</h3>
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={barData}>
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Bar dataKey="total" fill="#3B82F6" />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }


// "use client";

// import { useEffect, useState } from "react";
// import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

// export default function SummaryPage() {
//   const [summary, setSummary] = useState({
//     totalInvoices: 0,
//     totalAmount: 0, // ✅ Added total amount column
//     totalPaidAmount: 0,
//     remainingAmount: 0,
//     totalUncollectibleAmount: 0, 
//   });

//   useEffect(() => {
//     async function fetchSummary() {
//       try {
//         const res = await fetch("/api/summary");
//         if (!res.ok) throw new Error("Failed to fetch data");

//         const data = await res.json();
//         setSummary(data);
//       } catch (error) {
//         console.error("Error fetching summary:", error);
//       }
//     }

//     fetchSummary();
//   }, []);

//   // ✅ Prepare data for the pie chart (excluding Total Amount)
//   const pieData = [
//     { name: "Paid", value: summary.totalPaidAmount / 100 },
//     { name: "Remaining", value: summary.remainingAmount / 100 },
//     { name: "Loss (Uncollectible)", value: summary.totalUncollectibleAmount / 100 },
//   ];

//   const barData = [{ name: "Invoices", total: summary.totalInvoices }];

//   const COLORS = ["#10B981", "#EF4444", "#F59E0B"]; // Green: Paid, Red: Remaining, Orange: Loss

//   return (
//     <main className="w-full h-full">
//       <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">
//         <h1 className="text-2xl font-bold mb-4">Invoice Summary</h1>

//         {/* ✅ Summary Section (Now includes Total Amount) */}
//         <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
//           <div className="bg-blue-500 text-white p-4 rounded-lg">
//             <h2 className="text-lg font-semibold">Total Invoices    </h2>
//             <p className="text-2xl">{summary.totalInvoices}</p>
//           </div>

//           <div className="bg-gray-600 text-white p-4 rounded-lg">
//             <h2 className="text-lg font-semibold">Total Amount        </h2>
//             <p className="text-2xl">Rs {(summary.totalAmount / 100).toFixed(2)}</p>
//           </div>

//           <div className="bg-green-500 text-white p-4 rounded-lg">
//             <h2 className="text-lg font-semibold">Total Paid Amount</h2>
//             <p className="text-2xl">Rs {(summary.totalPaidAmount / 100).toFixed(2)}</p>
//           </div>

//           <div className="bg-red-500 text-white p-4 rounded-lg">
//             <h2 className="text-lg font-semibold">Remaining Amount</h2>
//             <p className="text-2xl">Rs {(summary.remainingAmount / 100).toFixed(2)}</p>
//           </div>

//           <div className="bg-yellow-500 text-white p-4 rounded-lg">
//             <h2 className="text-lg font-semibold">Uncollectible Amount</h2>
//             <p className="text-2xl">Rs {(summary.totalUncollectibleAmount / 100).toFixed(2)}</p>
//           </div>
//         </div>
//       </div>

//       {/* ✅ Charts Section */}
//       <div className="max-w-4xl mx-auto mt-8 bg-white p-6 rounded-lg shadow-md">
//         <h2 className="text-xl font-semibold mb-4 text-center">Invoice Data Visualization</h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* ✅ Pie Chart (Paid vs Remaining vs Loss) */}
//           <div className="flex flex-col items-center">
//             <h3 className="text-lg font-medium mb-2">Paid vs Remaining vs Loss</h3>
//             <ResponsiveContainer width="100%" height={300}>
//               <PieChart>
//                 <Pie
//                   data={pieData}
//                   cx="50%"
//                   cy="50%"
//                   outerRadius={100}
//                   fill="#8884d8"
//                   dataKey="value"
//                   label={({ name }) => name} // ✅ Show only name in pie labels
//                 >
//                   {pieData.map((_, index) => (
//                     <Cell key={`cell-${index}`} fill={COLORS[index]} />
//                   ))}
//                 </Pie>
//                 {/* <Tooltip formatter={(value) => `Rs ${value.toFixed(2)}`} />
//                  */}
//                  <Tooltip formatter={(value) => (typeof value === "number" ? `Rs ${value.toFixed(2)}` : "Rs 0.00")} />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>

//           {/* ✅ Bar Chart */}
//           <div className="flex flex-col items-center">
//             <h3 className="text-lg font-medium mb-2">Total Invoices</h3>
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={barData}>
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Bar dataKey="total" fill="#3B82F6" />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }


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

export default function SummaryPage() {
  const [summary, setSummary] = useState({
    totalInvoices: 0,
    totalAmount: 0,
    totalPaidAmount: 0,
    remainingAmount: 0,
    totalUncollectibleAmount: 0,
    totalVoidAmount: 0, // ✅ Refund Amount
    monthlyChartData: [], // in case you use it later
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

  // ✅ Prepare pie chart data including Refund (Void)
  const pieData = [
    { name: "Paid", value: summary.totalPaidAmount / 100 },
    { name: "Remaining", value: summary.remainingAmount / 100 },
    { name: "Loss", value: summary.totalUncollectibleAmount / 100 },
    { name: "Refund (Void)", value: summary.totalVoidAmount / 100 },
  ];

  const barData = [{ name: "Invoices", total: summary.totalInvoices }];

  const COLORS = ["#10B981", "#EF4444", "#F59E0B", "#8B5CF6"]; // Green, Red, Yellow, Purple

  return (
    <main className="w-full h-full">
      <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Invoice Summary</h1>

        {/* ✅ Summary Grid */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <div className="bg-blue-500 text-white p-4 rounded-lg">
            <h2 className="text-lg font-semibold">Total Invoices</h2>
            <p className="text-2xl">{summary.totalInvoices}</p>
          </div>

          <div className="bg-gray-600 text-white p-4 rounded-lg">
            <h2 className="text-lg font-semibold">Total Amount</h2>
            <p className="text-2xl">Rs {(summary.totalAmount / 100).toFixed(2)}</p>
          </div>

          <div className="bg-green-500 text-white p-4 rounded-lg">
            <h2 className="text-lg font-semibold">Total Paid</h2>
            <p className="text-2xl">Rs {(summary.totalPaidAmount / 100).toFixed(2)}</p>
          </div>

          <div className="bg-red-500 text-white p-4 rounded-lg">
            <h2 className="text-lg font-semibold">Remaining</h2>
            <p className="text-2xl">Rs {(summary.remainingAmount / 100).toFixed(2)}</p>
          </div>

          <div className="bg-yellow-500 text-white p-4 rounded-lg">
            <h2 className="text-lg font-semibold">Uncollectible</h2>
            <p className="text-2xl">Rs {(summary.totalUncollectibleAmount / 100).toFixed(2)}</p>
          </div>

          <div className="bg-purple-500 text-white p-4 rounded-lg">
            <h2 className="text-lg font-semibold">Refund (Void)</h2>
            <p className="text-2xl">Rs {(summary.totalVoidAmount / 100).toFixed(2)}</p>
          </div>
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
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => (typeof value === "number" ? `Rs ${value.toFixed(2)}` : "Rs 0.00")} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* ✅ Bar Chart */}
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
