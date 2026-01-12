"use client";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  return (
    <main className="p-4">
      <h2 className="text-xl font-bold mb-4 text-center">
        Login
      </h2>

      <input
        placeholder="Email"
        className="w-full border p-2 mb-3 rounded"
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full border p-2 mb-3 rounded"
      />

      <button
        onClick={() => router.push("/")}
        className="w-full bg-blue-500 text-white py-2 rounded"
      >
        Login
      </button>
            <button
        onClick={() => router.push("/")}
        className="w-full bg-green-500 text-white py-2 my-1 rounded"
      >
        Line
      </button>
                  <button
        onClick={() => router.push("/")}
        className="w-full bg-orange-500 text-white py-2 my-1 rounded"
      >
        Google
      </button>
                  <button
        onClick={() => router.push("/")}
        className="w-full bg-green-500 text-white py-2 my-1 rounded"
      >
        Email
      </button>
    </main>
  );
}
