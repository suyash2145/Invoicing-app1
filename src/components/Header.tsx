
// import {
//     ClerkProvider,
//     OrganizationSwitcher,
//     SignInButton,
//     SignedIn,
//     SignedOut,
//     UserButton
//   } from "@clerk/nextjs";
  
// import { headers } from 'next/headers'
// import React from 'react'
// import Container from "@/components/Container";
// import Link from "next/link";

// const Header = () => {
//   return (
//     <header className="mt-8 mb-12">
//         <Container>
//         <div className="flex justify-between items-center gap-4">
//           <div className="flex items-center gap-4">
//         <p className="font-bold">
//             <Link href="/dashboard">
//             Invoice-App
//             </Link>
//             </p>
//             <span className="text-slate-300">/</span>
//             <SignedIn>
//               <span className="-ml-2">
//             <OrganizationSwitcher 
//             afterCreateOrganizationUrl="/dashboard"
//             />
//             </span>
//             </SignedIn>
//             </div>
//         <div>
//         <SignedOut>
//             <SignInButton />
//           </SignedOut>
//           <SignedIn>
//             <UserButton />
//           </SignedIn>
//         </div>
//         </div>
//         </Container>
//     </header>
//   )
// }

// export default Header


import {
  ClerkProvider,
  OrganizationSwitcher,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import React from "react";
import Link from "next/link";
import Container from "@/components/Container";

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-700 to-blue-500 shadow-md py-4">
      <Container>
        <div className="flex justify-between items-center gap-4 text-white">
          <div className="flex items-center gap-4">
            <p className="text-lg font-semibold">
              <Link href="/dashboard" className="hover:text-gray-200 transition">
                Invoice-App
              </Link>
            </p>
            <span className="text-gray-300">/</span>
            <SignedIn>
              <span className="-ml-2">
                <OrganizationSwitcher afterCreateOrganizationUrl="/dashboard" />
              </span>
            </SignedIn>
          </div>
          <div>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
