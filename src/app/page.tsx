import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'

import Link from 'next/link';
import { Button } from "@/components/ui/button"

import Image from "next/image";

export default function Home() {
  return (
      <main className="flex flex-col justify-center min-h-screen text-center gap-6 max-w-5xl mx-auto">
        <h1 className="text-5xl font-bold">
          Invoice-App
          </h1>
        <p>
        <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <Button asChild>
          <Link href="/dashboard">
            Sign In
           </Link>
          </Button>
           </p>
            </main>
            
  );
}
