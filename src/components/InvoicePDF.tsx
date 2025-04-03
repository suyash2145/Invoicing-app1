
"use client";
import React from "react";
import { Document, Page, Text, View, Image, StyleSheet } from "@react-pdf/renderer";

interface Invoice {
  id: number;
  value: number;
  status: "open" | "paid" | "void" | "uncollectible";
  description?: string;
  name?: string;
  phone?: string;
  email?: string;
}

const COMPANY_DETAILS = {
  name: "YellowPlum",
  address: "123 Business Street, City, Country",
  phone: "+91 98765 43210",
  email: "info@yourcompany.com",
  logo: "/plum.png",
};

const TAX_RATE = 0;

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 12 },
  header: { flexDirection: "row", justifyContent: "space-between", marginBottom: 30 },
  logo: { width: 80, height: 80, marginBottom: 10 },
  section: { marginBottom: 30 },
  textBold: { fontWeight: "bold" },
  companyInfo: { textAlign: "right" },
  customerInfo: { textAlign: "left" },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 15 },
  table: { width: "100%", marginBottom: 30 },
  tableRow: { flexDirection: "row", borderBottom: "1px solid #000", paddingVertical: 8 },
  tableHeader: { fontWeight: "bold", flex: 1, textAlign: "left" },
  tableCell: { flex: 1, textAlign: "left" },
  summarySection: { alignSelf: "flex-end", width: "40%", marginTop: 30 },
  summaryRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
  label: { fontWeight: "bold" },
  footer: { textAlign: "center", marginTop: 50, fontSize: 14, fontWeight: "bold" },
});

export default function InvoicePDF({ invoice }: { invoice: Invoice }) {
  const subtotal = invoice.value / 100;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header - Company & Customer Details */}
        <View style={styles.header}>
          <View style={styles.customerInfo}>
            <Text style={styles.title}>Customer Details</Text>
            <Text><Text style={styles.textBold}>Name:</Text> {invoice.name || "N/A"}</Text>
            <Text><Text style={styles.textBold}>Email:</Text> {invoice.email || "N/A"}</Text>
            <Text><Text style={styles.textBold}>Phone:</Text> {invoice.phone || "N/A"}</Text>
          </View>

          <View style={styles.companyInfo}>
            <Image src={COMPANY_DETAILS.logo} style={styles.logo} />
            <Text style={styles.title}>{COMPANY_DETAILS.name}</Text>
            <Text>{COMPANY_DETAILS.address}</Text>
            <Text>Phone: {COMPANY_DETAILS.phone}</Text>
            <Text>Email: {COMPANY_DETAILS.email}</Text>
          </View>
        </View>

        {/* Invoice Details */}
        <View style={styles.section}>
          <Text style={styles.title}>Invoice Details</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={[styles.tableHeader, { flex: 3 }]}>Description</Text>
              <Text style={styles.tableHeader}>Amount (Rs)</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={[styles.tableCell, { flex: 3 }]}>{invoice.description || "N/A"}</Text>
              <Text style={styles.tableCell}>{subtotal.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        {/* Summary Section */}
        <View style={styles.summarySection}>
          <View style={styles.summaryRow}>
            <Text style={styles.label}>Subtotal:</Text>
            <Text>Rs {subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.label}>Tax (0%):</Text>
            <Text>Rs {tax.toFixed(2)}</Text>
          </View>
          <View style={[styles.summaryRow, { borderTop: "1px solid #000", paddingTop: 5 }]}>
            <Text style={styles.label}>Total:</Text>
            <Text>Rs {total.toFixed(2)}</Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>Thank you for paying the invoice, {invoice.name || "Customer"}. Have a great day!</Text>
        </View>
      </Page>
    </Document>
  );
}
