
// import { headers } from 'next/headers'
// import React from 'react'
// import Container from "@/components/Container";
// import Link from "next/link";

// const Footer = () => {
//   return (
//     <footer className="mt-6 mb-8">
//         <Container className="flex justify-between gap-4">
//             <p className="text-sm">
//                 Invoice-App &copy; {new Date().getFullYear()}
//             </p>
//             <p className="text-sm">
//                 created for invoices
//             </p>
//         </Container>
//     </footer>
//   )
// }

// export default Footer;


import React from "react";
import Container from "@/components/Container";

const Footer: React.FC = () => {
  return (
    <footer className="mt-12 bg-gray-900 text-white py-6 shadow-lg">
      <Container className="flex justify-between items-center text-sm">
        <p className="text-gray-400">
          Invoice-App &copy; {new Date().getFullYear()}
        </p>
        <p className="text-gray-400">Created for managing invoices</p>
      </Container>
    </footer>
  );
};

export default Footer;
