// "use client";

// import {
//   ClerkProvider,
//   SignInButton,
//   SignedIn,
//   SignedOut,
//   UserButton
// } from '@clerk/nextjs'

// import Link from 'next/link';
// import { Button } from "@/components/ui/button"

// import Image from "next/image";

// export default function Home() {
//   return (
//       <main className="flex flex-col justify-center min-h-screen text-center gap-6 max-w-5xl mx-auto">
//         <h1 className="text-5xl font-bold">
//           Invoice-App
//           </h1>
//         <p>
//         <SignedOut>
//           <SignInButton/>
//           </SignedOut>
//           <SignedIn>
//             <UserButton/>
//             </SignedIn>
//             <Button asChild>
//            <Link href="/dashboard">
//             Sign In
//            </Link>
//           </Button>
//            </p>
//             </main>
            
//   );
// }


// "use client";

// import {
//   ClerkProvider,
//   SignInButton,
//   SignedIn,
//   SignedOut,
//   UserButton
// } from '@clerk/nextjs'

// import Link from 'next/link';
// import { Button } from "@/components/ui/button"
// import Image from "next/image";

// export default function Home() {
//   return (
//     <main className="flex flex-col justify-center min-h-screen text-center gap-6 max-w-5xl mx-auto">
//       <h1 className="text-5xl font-bold">Invoice-App</h1>
//       <div className="flex flex-col gap-4 items-center">
//         <SignedOut>
//           <SignInButton />
//         </SignedOut>
//         <SignedIn>
//           <UserButton />
//         </SignedIn>
//         <Button asChild>
//           <Link href="/dashboard">Sign In</Link>
//         </Button>
//       </div>
//     </main>
//   );
// }

"use client";

import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from "@clerk/nextjs";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <main className="relative flex flex-col justify-center items-center min-h-screen text-center gap-6 max-w-5xl mx-auto px-4">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/d5d097115109437.60481e35e5dd9.png" // Change this to your preferred background image
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="opacity-40"
        />
      </div>

      {/* Glassmorphism Effect */}
      <div className="bg-white/30 backdrop-blur-lg p-10 rounded-2xl shadow-lg border border-white/20">
        <h1 className="text-5xl font-extrabold text-gray-800 animate-fade-in mb-4">
          Invoice-App
        </h1>

        <p className="text-lg text-gray-600 mb-4">
          Manage your invoices effortlessly!
        </p>

        <div className="flex flex-col gap-4 items-center mt-6">
          {/* <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn> */}

          <Button asChild className="transition duration-300 transform hover:scale-105 hover:bg-indigo-600">
            <Link href="/dashboard">Get Started</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
