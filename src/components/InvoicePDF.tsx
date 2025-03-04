"use client";
import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

interface Invoice {
  id: number;
  value: number;
  status: "open" | "paid" | "void" | "uncollectible";
  description?: string;
  customer?: { name: string };
}

const styles = StyleSheet.create({
  page: { padding: 30 },
  section: { marginBottom: 10 },
  text: { fontSize: 14 },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
});

export default function InvoicePDF({ invoice }: { invoice: Invoice }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Invoice</Text>
          <Text style={styles.text}>Invoice ID: {invoice.id}</Text>
          <Text style={styles.text}>Amount: ${invoice.value}</Text>
          <Text style={styles.text}>Status: {invoice.status}</Text>
          {invoice.customer && <Text style={styles.text}>Customer: {invoice.customer.name}</Text>}
          {invoice.description && <Text style={styles.text}>Description: {invoice.description}</Text>}
        </View>
      </Page>
    </Document>
  );
}
