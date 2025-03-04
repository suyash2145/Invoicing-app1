// // components/InvoicePDF.tsx (Server Component)
// import { Invoices11 } from "@/database";
// import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";

// const styles = StyleSheet.create({
//   page: { padding: 30 },
//   header: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
// //   logo: { width: 60, height: 60 },
// logo: { 
//     width: 100,  // Increase size
//     height: 100, // Increase size
//     alignSelf: "flex-end", // Move image to the right
//     marginBottom: 10, // Optional: Adjust spacing
//   },
//   companyInfo: { textAlign: "right" },
//   table: { width: "100%", borderWidth: 1, marginBottom: 10 },
//   row: { flexDirection: "row", borderBottomWidth: 1 },
//   cell: { flex: 1, padding: 5 },
//   bold: { fontWeight: "bold" },
//   footer: { textAlign: "center", marginTop: 20 },
// });

// export default function InvoicePDF({ invoice }: { invoice: any }) {
//   return (
//     <Document>
//       <Page size="A4" style={styles.page}>
//         {/* Header */}
//         <View style={styles.header}>
//           <View>
//             <Text style={styles.bold}>Customer: {invoice?.name}</Text>
//             <Text>Email: {invoice?.email}</Text>
//           </View>
//           <View style={styles.companyInfo}>
//             <Image src="/yop.png" style={styles.logo} /> 
//             <Text style={styles.bold}>Your Company Name</Text>
//             <Text>123 Business Street</Text>
//             <Text>City, Country - ZIP</Text>
//             <Text>Email: company@email.com</Text>
//           </View>
//         </View>

// <View style={styles.table}>
//   <View style={[styles.row, styles.bold]}>
//     <Text style={styles.cell}>Description</Text>
//     <Text style={styles.cell}>Amount (Rs)</Text>
//   </View>


// <View style={styles.row}>
//   <Text style={styles.cell}>{invoice?.description || "No Description"}</Text>
//   <Text style={styles.cell}>{(invoice?.value ?? "0")/100}</Text>
// </View>


// </View>

//         {/* Summary */}
//         <View>
//           <Text>Tax: 0.00 %</Text>
//           <Text style={styles.bold}>Subtotal: Rs {(invoice?.value)/100}</Text>
//         </View>

//         {/* Footer */}
//         <Text style={styles.footer}>Thank you for paying the invoice. Have a good day!</Text>
//       </Page>
//     </Document>
//   );
// }


// components/InvoicePDF.tsx (Server Component)
// import { Invoices11 } from "@/database";
// import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";

// const styles = StyleSheet.create({
//   page: { padding: 30 },
//   header: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
// logo: { 
//     width: 100,  // Increase size
//     height: 100, // Increase size
//     alignSelf: "flex-end", // Move image to the right
//     marginBottom: 10, // Optional: Adjust spacing
//   },
//   companyInfo: { textAlign: "right" },
//   table: { width: "100%", borderWidth: 1, marginBottom: 10 },
//   row: { flexDirection: "row", borderBottomWidth: 1 },
//   cell: { flex: 1, padding: 5 },
//   bold: { fontWeight: "bold" },
//   footer: { textAlign: "center", marginTop: 20 },
// });

// export default function InvoicePDF({ invoice }: { invoice: any }) {
//   return (
//     <Document>
//       <Page size="A4" style={styles.page}>
//         {/* Header */}
//         <View style={styles.header}>
//           <View>
//             <Text style={styles.bold}>Customer: {invoice?.name}</Text>
//             <Text>Email: {invoice?.email}</Text>
//           </View>
//           <View style={styles.companyInfo}>
//             <Image src="/yop.png" style={styles.logo} /> 
//             <Text style={styles.bold}>Your Company Name</Text>
//             <Text>123 Business Street</Text>
//             <Text>City, Country - ZIP</Text>
//             <Text>Email: company@email.com</Text>
//           </View>
//         </View>

// <View style={styles.table}>
//   <View style={[styles.row, styles.bold]}>
//     <Text style={styles.cell}>Description</Text>
//     <Text style={styles.cell}>Amount (Rs)</Text>
//   </View>


// <View style={styles.row}>
//   <Text style={styles.cell}>{invoice?.description || "No Description"}</Text>
//   <Text style={styles.cell}>{(invoice?.value ?? "0")/100}</Text>
// </View>


// </View>

//         {/* Summary */}
//         <View>
//           <Text>Tax: 0.00 %</Text>
//           <Text style={styles.bold}>Subtotal: Rs {(invoice?.value)/100}</Text>
//         </View>

//         {/* Footer */}
//         <Text style={styles.footer}>Thank you for paying the invoice. Have a good day!</Text>
//       </Page>
//     </Document>
//   );
// } 


// import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";

// const styles = StyleSheet.create({
//   page: { padding: 30 },
//   header: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
//   logo: { 
//     width: 100,  
//     height: 100, 
//     alignSelf: "flex-end", 
//     marginBottom: 10, 
//   },
//   companyInfo: { textAlign: "left", flex: 1 },  // Company info now on the left
//   customerInfo: { textAlign: "right", flex: 1 }, // Customer info now on the right
//   table: { width: "100%", borderWidth: 1, marginBottom: 10 },
//   row: { flexDirection: "row", borderBottomWidth: 1 },
//   cell: { flex: 1, padding: 5 },
//   bold: { fontWeight: "bold" },
//   footer: { textAlign: "center", marginTop: 20 },
//   summary: { textAlign: "right", marginTop: 10 }, // Align summary to the right
// });

// export default function InvoicePDF({ invoice }: { invoice: any }) {
//   return (
//     <Document>
//       <Page size="A4" style={styles.page}>

//         {/* Header */}
//         <View style={styles.header}>
//           {/* Company Information (Now on the left) */}
//           <View style={styles.companyInfo}>
//             <Text style={styles.bold}>Your Company Name</Text>
//             <Text>123 Business Street</Text>
//             <Text>City, Country - ZIP</Text>
//             <Text>Email: company@email.com</Text>
//           </View>

//           {/* Customer Information (Now on the right) */}
//           <View style={styles.customerInfo}>
//             <Text style={styles.bold}>Customer: {invoice?.name}</Text>
//             <Text>Email: {invoice?.email}</Text>
//             <Text>Phone: {invoice?.phone || "N/A"}</Text> {/* Added phone */}
//           </View>
//         </View>

//         {/* Logo (Keeping it aligned to the right, below customer details) */}
//         <Image src="/yop.png" style={[styles.logo, { alignSelf: "flex-end" }]} />

//         {/* Invoice Table */}
//         <View style={styles.table}>
//           <View style={[styles.row, styles.bold]}>
//             <Text style={styles.cell}>Description</Text>
//             <Text style={styles.cell}>Amount (Rs)</Text>
//           </View>
//           <View style={styles.row}>
//             <Text style={styles.cell}>{invoice?.description || "No Description"}</Text>
//             <Text style={styles.cell}>{(invoice?.value ?? 0) / 100}</Text>
//           </View>
//         </View>

//         {/* Summary (Aligned to the right) */}
//         <View style={styles.summary}>
//           <Text>Tax: 0.00 %</Text>
//           <Text>Discount: 0.00 %</Text> {/* Added Discount */}
//           <Text style={styles.bold}>Subtotal: Rs {(invoice?.value ?? 0) / 100}</Text>
//         </View>

//         {/* Footer */}
//         <Text style={styles.footer}>Thank you for paying the invoice. Have a good day!</Text>
//       </Page>
//     </Document>
//   );
// }



// import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";

// const styles = StyleSheet.create({
//   page: { padding: 30 },
//   header: { flexDirection: "column", marginBottom: 20 },
//   logo: { 
//     width: 100,  
//     height: 100, 
//     alignSelf: "flex-end", // Centered at the top
//     marginBottom: 10,  
//   },
//   companyInfo: { textAlign: "left", marginTop: -10 },  
//   customerInfo: { textAlign: "right", marginTop: 10 },  

//   //   companyInfo: { textAlign: "left", flex: 1 },  // Company info now on the left
// //   customerInfo: { textAlign: "right", flex: 1 }, 
//   table: { width: "100%", borderWidth: 1, marginBottom: 10 },
//   row: { flexDirection: "row", borderBottomWidth: 1, justifyContent: "space-between" },
//   cell: { flex: 1, padding: 5 },
//   rightAlignCell: { flex: 1, padding: 5, textAlign: "right" }, // Align amount to the right
//   bold: { fontWeight: "bold" },
//   footer: { textAlign: "center", marginTop: 20 },
//   summary: { textAlign: "right", marginTop: 10 },
// });

// export default function InvoicePDF({ invoice }: { invoice: any }) {
//   return (
//     <Document>
//       <Page size="A4" style={styles.page}>

//         {/* Logo at the top */}
//         <Image src="/12.png" style={styles.logo} />

//         {/* Header */}
//         <View style={styles.header}>
//           {/* Company Information (at the top-left) */}
//           <View style={styles.companyInfo}>
//             <Text style={styles.bold}>Your Company Name</Text>
//             <Text>123 Business Street</Text>
//             <Text>City, Country - ZIP</Text>
//             <Text>Email: company@email.com</Text>
//           </View>

//           {/* Customer Information (moved below company info) */}
//           <View style={styles.customerInfo}>
//             <Text style={styles.bold}>Customer: {invoice?.name}</Text>
//             <Text>Email: {invoice?.email}</Text>
//             <Text>Phone: {invoice?.phone || "N/A"}</Text>
//           </View>
//         </View>

//         {/* Invoice Table */}
//         <View style={styles.table}>
//           <View style={[styles.row, styles.bold]}>
//             <Text style={styles.cell}>Description</Text>
//             <Text style={styles.rightAlignCell}>Amount (Rs)</Text> {/* Aligned to right */}
//           </View>
//           <View style={styles.row}>
//             <Text style={styles.cell}>{invoice?.description || "No Description"}</Text>
//             <Text style={styles.rightAlignCell}>{(invoice?.value ?? 0) / 100}</Text> {/* Right aligned */}
//           </View>
//         </View>

//         {/* Summary (Aligned to the right) */}
//         <View style={styles.summary}>
//           <Text>Tax: 0.00 %</Text>
//           <Text>Discount: 0.00 %</Text> {/* Added Discount */}
//           <Text style={styles.bold}>Subtotal: Rs {(invoice?.value ?? 0) / 100}</Text>
//         </View>

//         {/* Footer */}
//         <Text style={styles.footer}>Thank you for paying the invoice. Have a good day!</Text>
//       </Page>
//     </Document>
//   );
// }



import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 40, display: "flex", flexDirection: "column", height: "100%" }, // More padding for full page
  header: { flexDirection: "column", marginBottom: 30 }, // Increased margin
  logo: { 
    width: 120,  
    height: 120, 
    alignSelf: "flex-end", // Centered at the top
    marginBottom: 15,  
  },
  companyInfo: { textAlign: "left", marginTop: -5 },  
  customerInfo: { textAlign: "right", marginTop: 15, marginBottom: 20 },  

  table: { width: "100%", borderWidth: 1, marginBottom: 20 },
  row: { 
    flexDirection: "row", 
    borderBottomWidth: 1, 
    justifyContent: "space-between",
    paddingVertical: 10, // Increased row height
  },
  cell: { flex: 1, padding: 8 },
  rightAlignCell: { flex: 1, padding: 8, textAlign: "right" }, 
  bold: { fontWeight: "bold" },
  summary: { textAlign: "right", marginTop: 30 }, // Increased spacing between table and summary
  footer: { textAlign: "center", marginTop: "auto", paddingTop: 20 }, // Moves footer to bottom
});

export default function InvoicePDF({ invoice }: { invoice: any }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>

        {/* Logo at the top */}
        <Image src="/plum.png" style={styles.logo} />

        {/* Header */}
        <View style={styles.header}>
          {/* Company Information (at the top-left) */}
          <View style={styles.companyInfo}>
            <Text style={styles.bold}>YellowPlum</Text>
            <Text>123 Business Street</Text>
            <Text>City, Country - India</Text>
            <Text>Email: ypplum@email.com</Text>
          </View>

          {/* Customer Information (moved below company info) */}
          <View style={styles.customerInfo}>
            <Text style={styles.bold}>Customer: {invoice?.name}</Text>
            <Text>Email: {invoice?.email}</Text>
            <Text>Phone: {invoice?.phone || "N/A"}</Text>
          </View>
        </View>

        {/* Invoice Table */}
        <View style={styles.table}>
          <View style={[styles.row, styles.bold]}>
            <Text style={styles.cell}>Description</Text>
            <Text style={styles.rightAlignCell}>Amount (Rs)</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cell}>{invoice?.description || "No Description"}</Text>
            <Text style={styles.rightAlignCell}>{(invoice?.value ?? 0) / 100}</Text>
          </View>
        </View>


<View style={styles.summary}>
  <Text style={{ marginBottom: 5 }}>Tax: 0.00 %</Text>
  <Text style={{ marginBottom: 5 }}>Discount: 0.00 %</Text>
  <Text style={[styles.bold, { marginTop: 10 }]}>Subtotal: Rs {(invoice?.value ?? 0) / 100}</Text>
</View>


        {/* Footer (stays at bottom) */}
        <Text style={styles.footer}>Thank you for paying the invoice. Have a good day!</Text>
      </Page>
    </Document>
  );
}
