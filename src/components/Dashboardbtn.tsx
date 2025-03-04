"use client"; // Ensure this is a Client Component

import { useRouter } from "next/navigation";

export default function DashboardBtn() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/dashboard")}
      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
    >
      Go to Dashboard
    </button>
  );
}
