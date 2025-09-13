'use client'

import React from 'react'
import Link from 'next/link'

export default function Verification() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-20 pt-14 sm:px-6 lg:px-8">
      <div className="grid items-stretch gap-8 lg:grid-cols-2">
        {/* Left visual section */}
        <div className="relative hidden overflow-hidden rounded-[24px] bg-white shadow-[0_8px_30px_rgba(16,24,40,0.08)] ring-1 ring-slate-100 lg:block">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-violet-500/15 to-fuchsia-500/20" />
          <div className="relative z-10 p-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-indigo-700 ring-1 ring-inset ring-indigo-100 backdrop-blur">
              Check your email
            </div>
            <h2 className="mt-5 text-3xl font-extrabold leading-tight text-slate-900">
              Verify your account to get started
            </h2>
            <p className="mt-3 max-w-md text-slate-600">
              We've sent a verification link to your email address. Please check your inbox and click the link to activate your account.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-white/80 p-4 ring-1 ring-inset ring-slate-200 backdrop-blur">
                <div className="text-sm font-semibold text-slate-900">Check Inbox</div>
                <div className="mt-1 text-xs text-slate-600">Look for our verification email.</div>
              </div>
              <div className="rounded-2xl bg-white/80 p-4 ring-1 ring-inset ring-slate-200 backdrop-blur">
                <div className="text-sm font-semibold text-slate-900">Click Link</div>
                <div className="mt-1 text-xs text-slate-600">Activate your account instantly.</div>
              </div>
              <div className="rounded-2xl bg-white/80 p-4 ring-1 ring-inset ring-slate-200 backdrop-blur">
                <div className="text-sm font-semibold text-slate-900">Spam Folder</div>
                <div className="mt-1 text-xs text-slate-600">Check if email went to spam.</div>
              </div>
              <div className="rounded-2xl bg-white/80 p-4 ring-1 ring-inset ring-slate-200 backdrop-blur">
                <div className="text-sm font-semibold text-slate-900">Need Help?</div>
                <div className="mt-1 text-xs text-slate-600">Contact support if needed.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right verification content */}
        <div className="mx-auto w-full max-w-md self-center">
          <div className="rounded-[24px] bg-white p-6 shadow-[0_8px_30px_rgba(16,24,40,0.08)] ring-1 ring-slate-100">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100">
                <svg className="h-8 w-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h1 className="text-2xl font-extrabold text-slate-900">Check your email</h1>
              <p className="mt-2 text-sm text-slate-600">
                We've sent a verification link to your email address. Please check your inbox and click the link to verify your account.
              </p>
            </div>

            <div className="mt-6 space-y-4">
              <div className="rounded-lg bg-slate-50 p-4">
                <h3 className="text-sm font-semibold text-slate-900">What's next?</h3>
                <ul className="mt-2 space-y-2 text-sm text-slate-600">
                  <li className="flex items-center gap-2">
                    <svg className="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Check your email inbox
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Click the verification link
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Start using your account
                  </li>
                </ul>
              </div>

              <div className="text-center">
                <p className="text-sm text-slate-600">
                  Didn't receive the email? Check your spam folder or{' '}
                  <button className="font-semibold text-[#5A57FF] hover:underline">
                    resend verification email
                  </button>
                </p>
              </div>

              <div className="mt-6 text-center text-sm text-slate-600">
                Remember your password?{' '}
                <Link href="/login" className="font-semibold text-[#5A57FF] hover:underline">
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 