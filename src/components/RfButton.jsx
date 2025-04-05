// "use client";

// import { useFormStatus } from "react-dom";
// import { Button } from "@/components/ui/button";
// import { RotateCw } from "lucide-react";

// export function SbBtn() {
//   const { pending } = useFormStatus();

//   return (
//     <Button 
//       variant="secondary" 
//       className="bg-blue-600 "
//       type="submit"
//       disabled={pending}
//     >
//       <RotateCw className="w-4 h-auto" />
//       {pending ? "Processing..." : "Refund Money"}
//     </Button>
//   );
// }


"use client";

import { useFormStatus } from "react-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { RotateCw } from "lucide-react";

export function SbBtn() {
  const { pending } = useFormStatus();
  const [message, setMessage] = useState("Refund Money");

  useEffect(() => {
    let timeout;

    if (pending) {
      setMessage("Money refund initiated...");
    //    setMessage("Money refunded successfully ✅");
    } else {
      timeout = setTimeout(() => {
        // setMessage("Money refunded successfully ✅");

        // Optional: reset to original after 3s
        setTimeout(() => setMessage("Refund Money"), 3000);
      }, 500);
    }

    return () => clearTimeout(timeout);
  }, [pending]);

  return (
    <Button
      variant="secondary"
    //   className="bg-blue-600 text-white flex items-center gap-2"
    className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
      type="submit"
      disabled={pending}
    >
      <RotateCw className="w-4 h-auto" />
      {message}
    </Button>
  );
}
