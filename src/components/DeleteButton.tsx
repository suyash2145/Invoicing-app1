// "use client";

// type DeleteButtonProps = {
//   onDelete: () => void;
// };

// export default function DeleteButton({ onDelete }: DeleteButtonProps) {
//   return <button onClick={onDelete}>Delete</button>;
// }

"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

type DeleteButtonProps = {
  onDelete: () => Promise<void>;
};

export default function DeleteButton({ onDelete }: DeleteButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      await onDelete();
      alert("Invoice deleted successfully!"); // Show success message
      router.push("/dashboard"); // Redirect to dashboard
    });
  };

  return (
    <button
      onClick={handleClick}
      className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 disabled:opacity-50"
      disabled={isPending}
    >
      {isPending ? "Deleting..." : "Delete"}
    </button>
  );
}
