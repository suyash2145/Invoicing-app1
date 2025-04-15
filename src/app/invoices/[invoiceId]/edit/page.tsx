
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function EditInvoicePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const invoiceId = params.invoiceId as string;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState<string | null>(null);

  useEffect(() => {
    setName(searchParams.get("name") || "");
    setEmail(searchParams.get("email") || "");
    setPhone(searchParams.get("phone") || "");
    setValue(searchParams.get("value") || "");
    setDescription(searchParams.get("description") || "");
  }, [searchParams]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const response = await fetch(`/api/invoices/${invoiceId}/edit-invoice`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        phone,
        value: Number(value),
        description,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      setSubmissionStatus("✅ Record saved successfully!");
      setTimeout(() => {
        router.refresh();
        router.push(`/invoices/${invoiceId}`);
      }, 2000);
    } else {
      setSubmissionStatus(`⚠️ Error: ${data.error}`);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-gray-900 to-black px-4 py-8">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-xl md:max-w-2xl p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-semibold mb-6 text-center text-gray-800">
          Edit Invoice
        </h1>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <div>
            <Label htmlFor="name">Billing Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <Label htmlFor="email">Billing Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <Label htmlFor="phone">Billing Phone</Label>
            <Input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <Label htmlFor="value">Value</Label>
            <Input
              id="value"
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              required
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </div>
        </form>

        {submissionStatus && (
          <div className="mt-4 text-center">
            <p
              className={`text-base font-medium ${
                submissionStatus.includes("success")
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {submissionStatus}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
