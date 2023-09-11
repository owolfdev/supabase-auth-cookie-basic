"use client";

import { useSearchParams } from "next/navigation";

export default function Messages() {
  const searchParams = useSearchParams();
  // console.log("search params", searchParams);
  const error = searchParams.get("error_description");
  const message = searchParams.get("message");
  return (
    <>
      {error && (
        <p className="mt-4 p-4 border-2 border-red-400 bg-neutral-900 rounded-lg text-red-400 text-center">
          {error}
        </p>
      )}
      {message && (
        <p className="mt-4 p-4 bg-neutral-900 rounded-lg text-neutral-300 text-center">
          {message}
        </p>
      )}
    </>
  );
}
