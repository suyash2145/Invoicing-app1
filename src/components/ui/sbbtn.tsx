"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { RotateCw } from "lucide-react";

export default function SbBtn() {
  const { pending } = useFormStatus();

  return (
    <Button 
      variant="secondary" 
      // className="bg-blue-600 text-white flex items-center gap-2"
       className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
      type="submit"
      disabled={pending}
    >
      <RotateCw className="w-4 h-auto" />
      {pending ? "Processing..." : "Refund Money"}
    </Button>
  );
}
