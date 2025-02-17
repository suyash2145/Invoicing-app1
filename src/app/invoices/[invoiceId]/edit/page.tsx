// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function EditInvoicePage({ params }: { params: { invoiceId: string } }) {
//     const router = useRouter();
//     const [value, setValue] = useState("");
//     const [description, setDescription] = useState("");

//     async function handleSubmit(event: React.FormEvent) {
//         event.preventDefault();

//         const response = await fetch(`/api/invoices/${params.invoiceId}`, {
//             method: "PUT",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 value: Number(value) * 100, // Convert to cents
//                 description,
//             }),
//         });

//         if (response.ok) {
//             router.push("/dashboard"); // Redirect to dashboard
//         }
//     }

//     return (
//         <main className="h-full max-w-3xl mx-auto my-12">
//             <h1 className="text-2xl font-semibold mb-6">Edit Invoice</h1>

//             <form onSubmit={handleSubmit} className="space-y-4">
//                 <div>
//                     <label className="block font-medium">Amount (Rs)</label>
//                     <input
//                         type="number"
//                         value={value}
//                         onChange={(e) => setValue(e.target.value)}
//                         className="border rounded-md p-2 w-full"
//                         required
//                     />
//                 </div>

//                 <div>
//                     <label className="block font-medium">Description</label>
//                     <textarea
//                         value={description}
//                         onChange={(e) => setDescription(e.target.value)}
//                         className="border rounded-md p-2 w-full"
//                         required
//                     />
//                 </div>

//                 <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-md">
//                     Save
//                 </button>
//             </form>
//         </main>
//     );
// }

// "use client";

// import { useSearchParams } from "next/navigation";
// import { useState } from "react";
// import { useRouter } from "next/navigation";

// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import SubmitButton from "@/components/SubmitButton";
// import Container from "@/components/Container";

// export default function EditInvoicePage({ params }: { params: { invoiceId: string } }) {
//     const router = useRouter();
//     const searchParams = useSearchParams();

//     // Get predefined values from URL query parameters
//     const [name, setName] = useState(searchParams.get("name") || "");
//     const [email, setEmail] = useState(searchParams.get("email") || "");
//     const [phone, setPhone] = useState(searchParams.get("phone") || "");
//     const [value, setValue] = useState(searchParams.get("value") || "");
//     const [description, setDescription] = useState(searchParams.get("description") || "");

//     async function handleSubmit(event: React.FormEvent) {
//         event.preventDefault();

//         const response = await fetch(`/api/invoices/${params.invoiceId}`, {
//             method: "PUT",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 name,
//                 email,
//                 phone,
//                 value: Number(value) * 100, // Convert to cents
//                 description,
//             }),
//         });

//         if (response.ok) {
//             router.push("/dashboard"); // Redirect to dashboard after saving
//         }
//     }

//     return (
//         <main className="h-full">
//             <Container>
//                 <h1 className="text-3xl font-semibold mb-6">Edit Invoice</h1>

//                 <form onSubmit={handleSubmit} className="grid gap-4 max-w-xs">
//                     <div>
//                         <Label htmlFor="name">Billing Name</Label>
//                         <Input id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
//                     </div>
//                     <div>
//                         <Label htmlFor="email">Billing Email</Label>
//                         <Input id="email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//                     </div>
//                     <div>
//                         <Label htmlFor="phone">Billing Phone</Label>
//                         <Input id="phone" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
//                     </div>
//                     <div>
//                         <Label htmlFor="value">Value</Label>
//                         <Input id="value" name="value" type="text" value={value} onChange={(e) => setValue(e.target.value)} required />
//                     </div>
//                     <div>
//                         <Label htmlFor="description">Description</Label>
//                         <Textarea id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
//                     </div>
//                     <div>
//                         <SubmitButton />
//                     </div>
//                 </form>
//             </Container>
//         </main>
//     );
// }

// "use client";

// import { useEffect, useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";

// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import SubmitButton from "@/components/SubmitButton";
// import Container from "@/components/Container";

// export default function EditInvoicePage({ params }: { params: { invoiceId: string } }) {
//     const router = useRouter();
//     const searchParams = useSearchParams();

//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [phone, setPhone] = useState("");
//     const [value, setValue] = useState("");
//     const [description, setDescription] = useState("");

//     // Initialize state when the component mounts
//     useEffect(() => {
//         setName(searchParams.get("name") || "");
//         setEmail(searchParams.get("email") || "");
//         setPhone(searchParams.get("phone") || "");
//         setValue(searchParams.get("value") || "");
//         setDescription(searchParams.get("description") || "");
//     }, [searchParams]); // Runs whenever the query parameters change

//     async function handleSubmit(event: React.FormEvent) {
//         event.preventDefault();

//         const response = await fetch(`/api/invoices/${params.invoiceId}`, {
//             method: "PUT",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 name,
//                 email,
//                 phone,
//                 value: Number(value) * 100, // Convert to cents
//                 description,
//             }),
//         });

//         if (response.ok) {
//             router.push("/dashboard"); // Redirect to dashboard after saving
//         }
//     }

//     return (
//         <main className="h-full">
//             <Container>
//                 <h1 className="text-3xl font-semibold mb-6">Edit Invoice</h1>

//                 <form onSubmit={handleSubmit} className="grid gap-4 max-w-xs">
//                     <div>
//                         <Label htmlFor="name">Billing Name</Label>
//                         <Input id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
//                     </div>
//                     <div>
//                         <Label htmlFor="email">Billing Email</Label>
//                         <Input id="email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//                     </div>
//                     <div>
//                         <Label htmlFor="phone">Billing Phone</Label>
//                         <Input id="phone" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
//                     </div>
//                     <div>
//                         <Label htmlFor="value">Value</Label>
//                         <Input id="value" name="value" type="text" value={value} onChange={(e) => setValue(e.target.value)} required />
//                     </div>
//                     <div>
//                         <Label htmlFor="description">Description</Label>
//                         <Textarea id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
//                     </div>
//                     <div>
//                         <SubmitButton />
//                     </div>
//                 </form>
//             </Container>
//         </main>
//     );
// }


// "use client";

// import { useEffect, useState } from "react";
// import { useRouter, useSearchParams, useParams } from "next/navigation";

// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import SubmitButton from "@/components/SubmitButton";
// import Container from "@/components/Container";

// export default function EditInvoicePage() {
//     const router = useRouter();
//     const searchParams = useSearchParams();
//     const params = useParams(); // ✅ Correct way to get params
//     const invoiceId = params.invoiceId as string; // Ensure it's a string

//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [phone, setPhone] = useState("");
//     const [value, setValue] = useState("");
//     const [description, setDescription] = useState("");

//     // Initialize state when the component mounts
//     useEffect(() => {
//         setName(searchParams.get("name") || "");
//         setEmail(searchParams.get("email") || "");
//         setPhone(searchParams.get("phone") || "");
//         setValue(searchParams.get("value") || "");
//         setDescription(searchParams.get("description") || "");
//     }, [searchParams]); // Runs whenever the query parameters change

//     async function handleSubmit(event: React.FormEvent) {
//         event.preventDefault();

//         const response = await fetch(`/api/invoices/${invoiceId}`, {
//             method: "PUT",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 name,
//                 email,
//                 phone,
//                 value: Number(value) * 100, // Convert to cents
//                 description,
//             }),
//         });

//         if (response.ok) {
//             router.push("/dashboard"); // Redirect to dashboard after saving
//         }
//     }

//     return (
//         <main className="h-full">
//             <Container>
//                 <h1 className="text-3xl font-semibold mb-6">Edit Invoice</h1>

//                 <form onSubmit={handleSubmit} className="grid gap-4 max-w-xs">
//                     <div>
//                         <Label htmlFor="name">Billing Name</Label>
//                         <Input id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
//                     </div>
//                     <div>
//                         <Label htmlFor="email">Billing Email</Label>
//                         <Input id="email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//                     </div>
//                     <div>
//                         <Label htmlFor="phone">Billing Phone</Label>
//                         <Input id="phone" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
//                     </div>
//                     <div>
//                         <Label htmlFor="value">Value</Label>
//                         <Input id="value" name="value" type="text" value={value} onChange={(e) => setValue(e.target.value)} required />
//                     </div>
//                     <div>
//                         <Label htmlFor="description">Description</Label>
//                         <Textarea id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
//                     </div>
//                     <div>
//                         <SubmitButton />
//                     </div>
//                 </form>

                

//             </Container>
//         </main>
//     );
// }




"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SubmitButton from "@/components/SubmitButton";
import Container from "@/components/Container";

export default function EditInvoicePage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const params = useParams(); // ✅ Correct way to get params
    const invoiceId = params.invoiceId as string; // Ensure it's a string

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [value, setValue] = useState("");
    const [description, setDescription] = useState("");
    const [submissionStatus, setSubmissionStatus] = useState<string | null>(null); // To track success/error message

    // Initialize state when the component mounts
    useEffect(() => {
        setName(searchParams.get("name") || "");
        setEmail(searchParams.get("email") || "");
        setPhone(searchParams.get("phone") || "");
        setValue(searchParams.get("value") || "");
        setDescription(searchParams.get("description") || "");
    }, [searchParams]); // Runs whenever the query parameters change

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        const response = await fetch(`/api/invoices/${invoiceId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                email,
                phone,
                value: Number(value) * 100, // Convert to cents
                description,
            }),
        });

        if (response.ok) {
            setSubmissionStatus("Record saved successfully!");
            setTimeout(() => router.push("/dashboard"), 2000); // Redirect after 2 seconds
        } else {
            setSubmissionStatus("Failed to save record. Please try again.");
        }
    }

    return (
        <main className="h-full">
            <Container>
                <h1 className="text-3xl font-semibold mb-6">Edit Invoice</h1>

                <form onSubmit={handleSubmit} className="grid gap-4 max-w-xs">
                    <div>
                        <Label htmlFor="name">Billing Name</Label>
                        <Input id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div>
                        <Label htmlFor="email">Billing Email</Label>
                        <Input id="email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div>
                        <Label htmlFor="phone">Billing Phone</Label>
                        <Input id="phone" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                    </div>
                    <div>
                        <Label htmlFor="value">Value</Label>
                        <Input id="value" name="value" type="text" value={value} onChange={(e) => setValue(e.target.value)} required />
                    </div>
                    <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                    </div>
                    <div>
                        <SubmitButton />
                    </div>
                </form>

                {submissionStatus && (
                    <div className="mt-4 text-center">
                        <p className={`text-lg ${submissionStatus.includes("success") ? "text-green-500" : "text-red-500"}`}>
                            {submissionStatus}
                        </p>
                    </div>
                )}
            </Container>
        </main>
    );
}
