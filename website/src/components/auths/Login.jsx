"use client";

import { useAuth } from "@/context/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import BtnLoader from "../ui/BtnLoader";

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error , setError] = useState('The App it`s under development');
  const { login, loading } = useAuth();
  const router = useRouter();

  // reset error 
  // useEffect(()=>{
  //   setError('');
  // },[credentials]);

  return (
    <section className="mx-auto max-w-6xl px-4 pb-20 pt-14 sm:px-6 lg:px-8">
      <div className="grid items-stretch gap-8 lg:grid-cols-2">
        {/* Left visual section */}
        <div className="relative hidden overflow-hidden rounded-[24px] bg-white shadow-[0_8px_30px_rgba(16,24,40,0.08)] ring-1 ring-slate-100 lg:block">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-violet-500/15 to-fuchsia-500/20" />
          <div className="relative z-10 p-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-indigo-700 ring-1 ring-inset ring-indigo-100 backdrop-blur">
              Welcome back
            </div>
            <h2 className="mt-5 text-3xl font-extrabold leading-tight text-slate-900">
              Sign in to manage your classes
            </h2>
            <p className="mt-3 max-w-md text-slate-600">
              Track attendance, view analytics, and keep your class organized.
              Your data is secured with enterprise‑grade practices.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-white/80 p-4 ring-1 ring-inset ring-slate-200 backdrop-blur">
                <div className="text-sm font-semibold text-slate-900">
                  Fast Attendance
                </div>
                <div className="mt-1 text-xs text-slate-600">
                  Mark students present in seconds.
                </div>
              </div>
              <div className="rounded-2xl bg-white/80 p-4 ring-1 ring-inset ring-slate-200 backdrop-blur">
                <div className="text-sm font-semibold text-slate-900">
                  Smart Insights
                </div>
                <div className="mt-1 text-xs text-slate-600">
                  Spot trends and engage early.
                </div>
              </div>
              <div className="rounded-2xl bg-white/80 p-4 ring-1 ring-inset ring-slate-200 backdrop-blur">
                <div className="text-sm font-semibold text-slate-900">
                  Secure by Design
                </div>
                <div className="mt-1 text-xs text-slate-600">
                  Privacy-first, reliable uptime.
                </div>
              </div>
              <div className="rounded-2xl bg-white/80 p-4 ring-1 ring-inset ring-slate-200 backdrop-blur">
                <div className="text-sm font-semibold text-slate-900">
                  Works Anywhere
                </div>
                <div className="mt-1 text-xs text-slate-600">
                  Responsive on any device.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right login form */}
        <div className="mx-auto w-full max-w-md self-center">
          <div className="rounded-[24px] bg-white p-6 shadow-[0_8px_30px_rgba(16,24,40,0.08)] ring-1 ring-slate-100">
            <div className="text-center">
              <h1 className="text-2xl font-extrabold text-slate-900">Log in</h1>
              <p className="mt-2 text-sm text-slate-600">
                Welcome back! Please enter your details.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                login(credentials, router , setError);
              }}
              className="mt-6"
            >
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-slate-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="w-full rounded-[12px] border-0 bg-slate-50 px-4 py-3 text-slate-900 placeholder-slate-400 ring-1 ring-inset ring-slate-200 focus:bg-white focus:ring-2 focus:ring-[#5A57FF]"
                  value={credentials.email}
                  onChange={(e) =>
                    setCredentials((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="mt-4 flex flex-col gap-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-slate-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full rounded-[12px] border-0 bg-slate-50 px-4 py-3 text-slate-900 placeholder-slate-400 ring-1 ring-inset ring-slate-200 focus:bg-white focus:ring-2 focus:ring-[#5A57FF]"
                  value={credentials.password}
                  onChange={(e) =>
                    setCredentials((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                />
              </div>

              {error && (
                <div className="mt-4 rounded-[12px] bg-rose-50 p-3 text-sm text-rose-700 ring-1 ring-inset ring-rose-100">
                  {error}
                </div>
              )}

              <div className="mt-4 flex items-center justify-end">
                <a
                  // href="/forgot-pass"
                  href="#"
                  className="text-sm font-semibold text-[#5A57FF] hover:underline"
                >
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="btn-primary mt-6 w-full opacity-30 cursor-not-allowed"
                disabled
                // disabled={loading}
              >
                {loading ? <BtnLoader /> : "Sign In"}
              </button>

              <div className="mt-6 text-center text-sm text-slate-600">
                Don't have an account?{" "}
                <a
                  href="/signup"
                  className="font-semibold text-[#5A57FF] hover:underline"
                >
                  Sign up
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
