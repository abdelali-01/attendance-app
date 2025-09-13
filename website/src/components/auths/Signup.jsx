"use client";

import { useAuth } from "@/context/auth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import BtnLoader from "../ui/BtnLoader";

export default function Signup() {
  const [user, setUser] = useState({
    name: "",
    familyName: "",
    email: "",
    password: "",
    matricule: null,
    role: "",
  });
  const { loading, signup } = useAuth();
  const router = useRouter();
  const [error , setError] = useState('');


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(user, router , setError);
    console.log("Signup submit", user);
  };

  return (
    <section className="mx-auto max-w-6xl px-4 pb-20 pt-14 sm:px-6 lg:px-8">
      <div className="grid items-stretch gap-8 lg:grid-cols-2">
        {/* Left visual section */}
        <div className="relative hidden overflow-hidden rounded-[24px] bg-white shadow-[0_8px_30px_rgba(16,24,40,0.08)] ring-1 ring-slate-100 lg:block">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-violet-500/15 to-fuchsia-500/20" />
          <div className="relative z-10 p-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-indigo-700 ring-1 ring-inset ring-indigo-100 backdrop-blur">
              Create your account
            </div>
            <h2 className="mt-5 text-3xl font-extrabold leading-tight text-slate-900">
              Start organizing your classes today
            </h2>
            <p className="mt-3 max-w-md text-slate-600">
              Sign up to track attendance, share analytics, and collaborate with
              your students seamlessly.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-white/80 p-4 ring-1 ring-inset ring-slate-200 backdrop-blur">
                <div className="text-sm font-semibold text-slate-900">
                  Easy Onboarding
                </div>
                <div className="mt-1 text-xs text-slate-600">
                  Set up your classes in minutes.
                </div>
              </div>
              <div className="rounded-2xl bg-white/80 p-4 ring-1 ring-inset ring-slate-200 backdrop-blur">
                <div className="text-sm font-semibold text-slate-900">
                  Always Secure
                </div>
                <div className="mt-1 text-xs text-slate-600">
                  Your data stays protected.
                </div>
              </div>
              <div className="rounded-2xl bg-white/80 p-4 ring-1 ring-inset ring-slate-200 backdrop-blur">
                <div className="text-sm font-semibold text-slate-900">
                  Collaborative
                </div>
                <div className="mt-1 text-xs text-slate-600">
                  Invite teachers and students.
                </div>
              </div>
              <div className="rounded-2xl bg-white/80 p-4 ring-1 ring-inset ring-slate-200 backdrop-blur">
                <div className="text-sm font-semibold text-slate-900">
                  Reliable
                </div>
                <div className="mt-1 text-xs text-slate-600">
                  99.9% uptime infrastructure.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right signup form */}
        <div className="mx-auto w-full max-w-md self-center">
          <div className="rounded-[24px] bg-white p-6 shadow-[0_8px_30px_rgba(16,24,40,0.08)] ring-1 ring-slate-100">
            <div className="text-center">
              <h1 className="text-2xl font-extrabold text-slate-900">
                Create account
              </h1>
              <p className="mt-2 text-sm text-slate-600">
                It only takes a minute to get started.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-slate-700"
                  >
                    First Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Jane"
                    value={user.name}
                    onChange={handleChange}
                    className="w-full rounded-[12px] border-0 bg-slate-50 px-4 py-3 text-slate-900 placeholder-slate-400 ring-1 ring-inset ring-slate-200 focus:bg-white focus:ring-2 focus:ring-[#5A57FF]"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="familyName"
                    className="text-sm font-medium text-slate-700"
                  >
                    Last Name
                  </label>
                  <input
                    id="familyName"
                    name="familyName"
                    type="text"
                    required
                    placeholder="Doe"
                    value={user.familyName}
                    onChange={handleChange}
                    className="w-full rounded-[12px] border-0 bg-slate-50 px-4 py-3 text-slate-900 placeholder-slate-400 ring-1 ring-inset ring-slate-200 focus:bg-white focus:ring-2 focus:ring-[#5A57FF]"
                  />
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-2">
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
                  value={user.email}
                  onChange={handleChange}
                  className="w-full rounded-[12px] border-0 bg-slate-50 px-4 py-3 text-slate-900 placeholder-slate-400 ring-1 ring-inset ring-slate-200 focus:bg-white focus:ring-2 focus:ring-[#5A57FF]"
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
                  value={user.password}
                  onChange={handleChange}
                  className="w-full rounded-[12px] border-0 bg-slate-50 px-4 py-3 text-slate-900 placeholder-slate-400 ring-1 ring-inset ring-slate-200 focus:bg-white focus:ring-2 focus:ring-[#5A57FF]"
                />
              </div>

              <div className="mt-4 flex flex-col gap-2">
                <label
                  htmlFor="role"
                  className="text-sm font-medium text-slate-700"
                >
                  Role
                </label>
                <select
                  name="role"
                  id="role"
                  required
                  value={user.role}
                  onChange={handleChange}
                  className="w-full rounded-[12px] border-0 bg-slate-50 px-4 py-3 text-slate-900 ring-1 ring-inset ring-slate-200 focus:bg-white focus:ring-2 focus:ring-[#5A57FF] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <option value="" disabled>
                    Choose your role
                  </option>
                  <option value="teacher">Teacher</option>
                  <option value="student">Student</option>
                </select>
              </div>

              {user.role === "student" && (
                <div className="mt-4 flex flex-col gap-2">
                  <label
                    htmlFor="matricule"
                    className="text-sm font-medium text-slate-700"
                  >
                    Matricule Number
                  </label>
                  <input
                    value={user.matricule ?? ""}
                    onChange={handleChange}
                    id="matricule"
                    name="matricule"
                    type="number"
                    placeholder="Enter your matricule"
                    minLength="12"
                    maxLength="12"
                    required={user.role === "student"}
                    className="w-full rounded-[12px] border-0 bg-slate-50 px-4 py-3 text-slate-900 placeholder-slate-400 ring-1 ring-inset ring-slate-200 focus:bg-white focus:ring-2 focus:ring-[#5A57FF] disabled:cursor-not-allowed disabled:opacity-70"
                  />
                </div>
              )}
                            {error && (
                <div className="mt-4 rounded-[12px] bg-rose-50 p-3 text-sm text-rose-700 ring-1 ring-inset ring-rose-100">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="btn-primary mt-6 w-full"
                disabled={loading}
              >
                {loading ? <BtnLoader /> : "Create account"}
              </button>

              <div className="mt-6 text-center text-sm text-slate-600">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="font-semibold text-[#5A57FF] hover:underline"
                >
                  Log in
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
