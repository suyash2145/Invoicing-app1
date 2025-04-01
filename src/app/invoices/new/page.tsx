
// "use client";
// import { SyntheticEvent} from "react";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import SubmitButton from "@/components/SubmitButton";
// import Container from "@/components/Container";
// import { createAction } from "@/app/actions";

// import { User, Mail, Phone, FileText, IndianRupee } from "lucide-react";

// export default function Home() {

//   async function handleOnSubmit(event: SyntheticEvent) {
  
//       event.preventDefault();
    
//     return;
//   }

//   return (
//     <main className="h-full">
//       <Container className="mt-4">
//         <div className="flex justify-between mb-6">
//           <h1 className="text-3xl font-semibold">Create Invoice</h1>
//         </div>

//         {/* Invoice Form */}
//         <form action={createAction} onSubmit={handleOnSubmit} className="grid gap-4 max-w-xs">
          
//           {/* Billing Name */}
//           <div>
//             <Label htmlFor="name" className="block font-semibold mb-2 flex items-center gap-2">
//               <User className="w-5 h-5 text-gray-600" />
//               Billing Name
//             </Label>
//             <Input id="name" name="name" type="text" />
//           </div>

//           {/* Billing Email */}
//           <div>
//             <Label htmlFor="email" className="block font-semibold mb-2 flex items-center gap-2">
//               <Mail className="w-5 h-5 text-gray-600" />
//               Billing Email
//             </Label>
//             <Input id="email" name="email" type="email" />
//           </div>

//           {/* Billing Phone */}
//           <div>
//             <Label htmlFor="phone" className="block font-semibold mb-2 flex items-center gap-2">
//               <Phone className="w-5 h-5 text-gray-600" />
//               Billing Phone
//             </Label>
//             <Input id="phone" name="phone" type="text" />
//           </div>

//           {/* Value */}
//           <div>
//             <Label htmlFor="value" className="block font-semibold mb-2 flex items-center gap-2">
//               <IndianRupee className="w-5 h-5 text-gray-600" />
//               Value
//             </Label>
//             <Input id="value" name="value" type="text" />
//           </div>

//           {/* Description */}
//           <div>
//             <Label htmlFor="description" className="block font-semibold mb-2 flex items-center gap-2">
//               <FileText className="w-5 h-5 text-gray-600" />
//               Description
//             </Label>
//             <Textarea id="description" name="description"></Textarea>
//           </div>

//           {/* Submit Button */}
//           <div>
//             <SubmitButton />
//           </div>
          
//         </form>
//       </Container>
//     </main>
//   );
// }


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
    <main className="h-full">
      <Container className="mt-4">
        <div className="flex justify-between mb-6">
          <h1 className="text-3xl font-semibold">Create Invoice</h1>
        </div>

        {/* Invoice Form */}
        <form action={createAction} className="grid gap-4 max-w-xs">
          
          {/* Billing Name */}
          <div>
            <Label htmlFor="name" className="block font-semibold mb-2 flex items-center gap-2">
              <User className="w-5 h-5 text-gray-600" />
              Billing Name
            </Label>
            <Input id="name" name="name" type="text" required />
          </div>

          {/* Billing Email */}
          <div>
            <Label htmlFor="email" className="block font-semibold mb-2 flex items-center gap-2">
              <Mail className="w-5 h-5 text-gray-600" />
              Billing Email
            </Label>
            <Input id="email" name="email" type="email" required />
          </div>

          {/* Billing Phone */}
          <div>
            <Label htmlFor="phone" className="block font-semibold mb-2 flex items-center gap-2">
              <Phone className="w-5 h-5 text-gray-600" />
              Billing Phone
            </Label>
            <Input id="phone" name="phone" type="text" required />
          </div>

          {/* Value */}
          <div>
            <Label htmlFor="value" className="block font-semibold mb-2 flex items-center gap-2">
              <IndianRupee className="w-5 h-5 text-gray-600" />
              Value
            </Label>
            <Input id="value" name="value" type="number" required />
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description" className="block font-semibold mb-2 flex items-center gap-2">
              <FileText className="w-5 h-5 text-gray-600" />
              Description
            </Label>
            <Textarea id="description" name="description" required></Textarea>
          </div>

          {/* Submit Button */}
          <div>
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
