
import { headers } from 'next/headers'
import React from 'react'
import Container from "@/components/Container";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mt-6 mb-8">
        <Container className="flex justify-between gap-4">
            <p className="text-sm">
                Invoice-App &copy; {new Date().getFullYear()}
            </p>
            <p className="text-sm">
                created for invoices
            </p>
        </Container>
    </footer>
  )
}

export default Footer;
