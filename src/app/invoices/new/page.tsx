
"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SubmitButton from "@/components/SubmitButton";
import Container from "@/components/Container";
import { createAction } from "@/app/actions";
import { User, Mail, Phone, FileText, IndianRupee } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen w-full">
      <Container className="mt-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold">Create Invoice</h1>
        </div>

        <form
          action={createAction}
          className="grid gap-6 max-w-md bg-white p-6 rounded-2xl shadow-md"
        >
          {/* Billing Name */}
          <div className="grid gap-1.5">
            <Label
              htmlFor="name"
              className="flex items-center gap-2 font-medium text-sm text-gray-700"
            >
              <User className="w-5 h-5 text-gray-600" />
              Billing Name
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Enter Name Here ..."
              required
            />
          </div>

          {/* Billing Email */}
          <div className="grid gap-1.5">
            <Label
              htmlFor="email"
              className="flex items-center gap-2 font-medium text-sm text-gray-700"
            >
              <Mail className="w-5 h-5 text-gray-600" />
              Billing Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter mail here..."
              required
            />
          </div>

          {/* Billing Phone */}
          <div className="grid gap-1.5">
            <Label
              htmlFor="phone"
              className="flex items-center gap-2 font-medium text-sm text-gray-700"
            >
              <Phone className="w-5 h-5 text-gray-600" />
              Billing Phone
            </Label>
            <Input
              id="phone"
              name="phone"
              type="text"
              placeholder="Enter Your Phone Here"
              required
            />
          </div>

          {/* Value */}
          <div className="grid gap-1.5">
            <Label
              htmlFor="value"
              className="flex items-center gap-2 font-medium text-sm text-gray-700"
            >
              <IndianRupee className="w-5 h-5 text-gray-600" />
              Value (Rs)
            </Label>
            <Input
              id="value"
              name="value"
              type="number"
              placeholder="Enter Value Here"
              min="0"
              required
            />
          </div>

          {/* Description */}
          <div className="grid gap-1.5">
            <Label
              htmlFor="description"
              className="flex items-center gap-2 font-medium text-sm text-gray-700"
            >
              <FileText className="w-5 h-5 text-gray-600" />
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Write invoice details here..."
              required
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <SubmitButton />
          </div>
        </form>
      </Container>
    </main>
  );
}


















// "use client";
// import { SyntheticEvent, useState } from "react";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import SubmitButton from "@/components/SubmitButton";
// import Container from "@/components/Container";
// import { User, Mail, Phone, FileText, IndianRupee } from "lucide-react";

// export default function Home() {
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   async function handleOnSubmit(event: SyntheticEvent) {
//     event.preventDefault();
//     setLoading(true);
//     setMessage("");

//     const formData = new FormData(event.target as HTMLFormElement);
//     const data = Object.fromEntries(formData);

//     try {
//       const response = await fetch("/api/invoices", {
//         method: "POST",
//         body: JSON.stringify(data),
//         headers: { "Content-Type": "application/json" },
//       });

//       if (response.ok) {
//         setMessage("Invoice submitted successfully!");
//         (event.target as HTMLFormElement).reset();
//       } else {
//         setMessage("Error submitting invoice.");
//       }
//     } catch (error) {
//       setMessage("Network error. Please try again.");
//     }

//     setLoading(false);
//   }

//   return (
//     <main className="h-full">
//       <Container className="mt-4">
//         <div className="flex justify-between mb-6">
//           <h1 className="text-3xl font-semibold">Create Invoice</h1>
//         </div>

//         {/* Invoice Form */}
//         <form onSubmit={handleOnSubmit} className="grid gap-4 max-w-xs">
          
//           {/* Billing Name */}
//           <div>
//             <Label htmlFor="name" className="block font-semibold mb-2 flex items-center gap-2">
//               <User className="w-5 h-5 text-gray-600" />
//               Billing Name
//             </Label>
//             <Input id="name" name="name" type="text" required />
//           </div>

//           {/* Billing Email */}
//           <div>
//             <Label htmlFor="email" className="block font-semibold mb-2 flex items-center gap-2">
//               <Mail className="w-5 h-5 text-gray-600" />
//               Billing Email
//             </Label>
//             <Input id="email" name="email" type="email" required />
//           </div>

//           {/* Billing Phone */}
//           <div>
//             <Label htmlFor="phone" className="block font-semibold mb-2 flex items-center gap-2">
//               <Phone className="w-5 h-5 text-gray-600" />
//               Billing Phone
//             </Label>
//             <Input id="phone" name="phone" type="text" required />
//           </div>

//           {/* Value */}
//           <div>
//             <Label htmlFor="value" className="block font-semibold mb-2 flex items-center gap-2">
//               <IndianRupee className="w-5 h-5 text-gray-600" />
//               Value
//             </Label>
//             <Input id="value" name="value" type="number" required />
//           </div>

//           {/* Description */}
//           <div>
//             <Label htmlFor="description" className="block font-semibold mb-2 flex items-center gap-2">
//               <FileText className="w-5 h-5 text-gray-600" />
//               Description
//             </Label>
//             <Textarea id="description" name="description" required></Textarea>
//           </div>

//           {/* Submit Button */}
//           <div>
//             <SubmitButton />
//           </div>

//           {/* Message */}
//           {message && <p className="text-center text-sm text-gray-700">{message}</p>}
//         </form>
//       </Container>
//     </main>
//   );
// }
