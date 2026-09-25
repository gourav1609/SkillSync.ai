"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Zap, Eye, EyeOff, Lock, Mail, ArrowRight, Loader2, Sparkles } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState(false);

  const [withPassword, setWithPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const normalizedEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedEmail)) {
      setError("Please enter a valid email address (e.g., student@gmail.com).");
      return;
    }

    setLoading(true);

    try {
      const res = await signIn("credentials", {
        email: normalizedEmail,
        password: withPassword ? password : "",
        redirect: false,
      });

      if (res?.error) {
        setError("Sign-in failed. Please check your credentials or try again.");
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setError("");
    setDemoLoading(true);
    try {
      const regRes = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Alex Rivera",
          email: "alex@skillsync.ai",
          password: "password123",
        }),
      });

      if (!regRes.ok && regRes.status !== 409) {
        console.warn("Demo account setup note:", await regRes.text());
      }

      const res = await signIn("credentials", {
        email: "alex@skillsync.ai",
        password: "password123",
        redirect: false,
      });

      if (res?.error) {
        setError("Demo sign-in failed. Please try registering normally.");
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch {
      setError("Failed to initialize demo mode.");
    } finally {
      setDemoLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative z-10 text-cyan-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-2 group">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 via-sky-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/35 group-hover:scale-105 transition-transform duration-300">
            <Zap className="w-6 h-6 fill-current text-white animate-pulse" />
          </div>
          <span className="text-3xl font-extrabold text-white tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-100 to-sky-300">
            SkillSync AI
          </span>
        </Link>
        <h2 className="mt-6 text-2xl font-bold tracking-tight text-white">
          Welcome back to your learning loop
        </h2>
        <p className="mt-2 text-sm text-slate-300">
          Enter with any valid student email or use demo mode below.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-[#091226]/85 backdrop-blur-2xl py-8 px-6 shadow-2xl shadow-black/90 border border-cyan-500/25 rounded-3xl sm:px-10 transition-all hover:border-cyan-500/40">
          {/* Quick Demo Login Option */}
          <div className="mb-6 pb-6 border-b border-cyan-500/15">
            <button
              type="button"
              onClick={handleDemoLogin}
              disabled={demoLoading || loading}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-cyan-950/40 via-blue-950/30 to-black/40 hover:from-cyan-900/50 hover:to-blue-900/40 text-cyan-200 font-semibold text-sm transition-all shadow-md shadow-cyan-950/30 hover:scale-[1.01] hover:border-cyan-500/60"
            >
              {demoLoading ? (
                <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
              ) : (
                <Sparkles className="w-4 h-4 text-cyan-400 animate-bounce" />
              )}
              <span>Instant Demo Mode (Alex Rivera)</span>
            </button>
            <p className="text-[11px] text-center text-cyan-300/60 mt-2 font-medium">
              ✨ 1-click test with pre-configured 3D DBMS assessment profile
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {error && (
              <div className="p-3.5 rounded-2xl bg-rose-950/60 backdrop-blur-md border border-rose-500/40 text-rose-200 text-sm font-medium shadow-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-cyan-300 uppercase tracking-wider mb-1.5">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-cyan-400/60">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@example.com"
                  className="block w-full pl-10 pr-3.5 py-2.5 bg-[#0e1b36]/90 border border-cyan-500/20 rounded-2xl text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm transition-all shadow-inner"
                />
              </div>
            </div>

            {withPassword && (
              <div>
                <label className="block text-xs font-bold text-cyan-300 uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-cyan-400/60">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required={withPassword}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="block w-full pl-10 pr-10 py-2.5 bg-[#0e1b36]/90 border border-cyan-500/20 rounded-2xl text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm transition-all shadow-inner"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-cyan-400 hover:text-cyan-200"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between text-xs pt-1">
              <button
                type="button"
                onClick={() => setWithPassword(!withPassword)}
                className="text-cyan-400 hover:text-cyan-300 font-semibold"
              >
                {withPassword ? "← Sign in with Email only" : "🔒 Add password protection"}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading || demoLoading}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm transition-all shadow-lg shadow-cyan-500/35 disabled:opacity-50 hover:scale-[1.01]"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <span>{withPassword ? "Sign In with Password" : "Continue with Email"}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-400">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-cyan-400 hover:text-cyan-300 font-semibold">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
