

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
