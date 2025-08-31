// pages/register.js
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import jwt from "jsonwebtoken";


axios.defaults.withCredentials = true; // always send cookies

export async function getServerSideProps({ req }) {
  const token = req.cookies?.token || null;

  if (token) {
    try {
      jwt.verify(token, process.env.JWT_SECRET);
      return {
        redirect: { destination: "/", permanent: false },
      };
    } catch {
      return { props: {} };
    }
  }

  return { props: {} };
}

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setErr(""); setLoading(true);
    try {
      await axios.post("/api/auth/register", { email, password });
      router.push("/");
    } catch (err) {
      setErr(e?.response?.data?.msg || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left hero */}
      <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 p-10">
        <div className="max-w-md text-white">
          <h1 className="text-4xl font-bold mb-4">Join the journey 🚀</h1>
          <p className="opacity-90">
            Build consistency. Track progress. Ace interviews.
          </p>
        </div>
      </div>

      {/* Right form */}
      <div className="flex items-center justify-center p-6">
        <form
          onSubmit={handleRegister}
          className="w-full max-w-sm bg-white shadow-xl rounded-2xl p-6"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Create account</h2>

          {err && (
            <div className="mb-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded p-2">
              {err}
            </div>
          )}

          <label className="text-sm font-medium">Email</label>
          <input
            className="border rounded-lg w-full p-2 mt-1 mb-4 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            placeholder="you@example.com"
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="text-sm font-medium">Password</label>
          <div className="relative">
            <input
              className="border rounded-lg w-full p-2 mt-1 mb-4 pr-10 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              placeholder="Create a strong password"
              type={showPw ? "text" : "password"}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPw((s) => !s)}
              className="absolute right-2 top-2.5 text-sm text-gray-500 hover:text-gray-700"
            >
              {showPw ? "Hide" : "Show"}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg transition disabled:opacity-60"
          >
            {loading ? "Creating..." : "Register"}
          </button>

          <p className="text-sm mt-4 text-center">
            Already have an account?{" "}
            <a href="/login" className="text-emerald-600 hover:underline">
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
