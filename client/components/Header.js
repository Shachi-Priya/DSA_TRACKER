import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";  

export default function Header() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout", {}, { withCredentials: true });
      router.push("/login");
    } catch (err) {
      console.error("Logout failed", err.response?.data || err.message);
    }
  };

  return (
    <header className="bg-white shadow flex justify-between items-center px-6 py-3 sticky top-0 z-20">
      <h1
        onClick={() => router.push("/")}
        className="text-xl font-bold cursor-pointer"
      >
        📘 DSA Tracker
      </h1>

      <div className="flex items-center space-x-4">
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
