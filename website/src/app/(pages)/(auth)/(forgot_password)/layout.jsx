import React from 'react'

export const metadata = {
  title: 'Forgot Password | Attendance Tracker',
  description: 'Forgot Password to your account to manage your attendance',
}

export default function layout({children}) {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-20 pt-14 sm:px-6 lg:px-8">
      <div className="grid items-stretch gap-8 lg:grid-cols-2">
        {/* Left visual section */}
        <div className="relative hidden overflow-hidden rounded-[24px] bg-white shadow-[0_8px_30px_rgba(16,24,40,0.08)] ring-1 ring-slate-100 lg:block">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-violet-500/15 to-fuchsia-500/20" />
          <div className="relative z-10 p-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-indigo-700 ring-1 ring-inset ring-indigo-100 backdrop-blur">
              Reset your password
            </div>
            <h2 className="mt-5 text-3xl font-extrabold leading-tight text-slate-900">
              Securely recover your account
            </h2>
            <p className="mt-3 max-w-md text-slate-600">
              We’ll guide you through verifying your email and setting a new password.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-white/80 p-4 ring-1 ring-inset ring-slate-200 backdrop-blur">
                <div className="text-sm font-semibold text-slate-900">Email Verification</div>
                <div className="mt-1 text-xs text-slate-600">Receive a secure reset link.</div>
              </div>
              <div className="rounded-2xl bg-white/80 p-4 ring-1 ring-inset ring-slate-200 backdrop-blur">
                <div className="text-sm font-semibold text-slate-900">Strong Password</div>
                <div className="mt-1 text-xs text-slate-600">Create a safe new password.</div>
              </div>
              <div className="rounded-2xl bg-white/80 p-4 ring-1 ring-inset ring-slate-200 backdrop-blur">
                <div className="text-sm font-semibold text-slate-900">Fast Process</div>
                <div className="mt-1 text-xs text-slate-600">Finish in a couple of steps.</div>
              </div>
              <div className="rounded-2xl bg-white/80 p-4 ring-1 ring-inset ring-slate-200 backdrop-blur">
                <div className="text-sm font-semibold text-slate-900">Privacy‑First</div>
                <div className="mt-1 text-xs text-slate-600">Your data stays protected.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right steps container */}
        <div className="mx-auto w-full max-w-md self-center">
          <div className="rounded-[24px] bg-white p-6 shadow-[0_8px_30px_rgba(16,24,40,0.08)] ring-1 ring-slate-100">
            {children}
          </div>
        </div>
      </div>
    </section>
  )
}
