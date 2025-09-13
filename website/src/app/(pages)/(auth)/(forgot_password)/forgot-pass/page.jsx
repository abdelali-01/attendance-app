'use client'

import { useAuth } from '@/context/auth';
import React, { useState } from 'react'
import Link from 'next/link'
import BtnLoader from '@/components/ui/BtnLoader'

export default function ForgotPassPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);

  const { forgotPass, loading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    
    try {
      const response = await forgotPass(email);
      setResult(response);
    } catch (error) {
      setResult({
        success: false,
        message: 'An error occurred. Please try again.'
      });
    }
  }

  return (
    <div>
      <div className="text-center">
        <h1 className="text-2xl font-extrabold text-slate-900">Forgot password</h1>
        <p className="mt-2 text-sm text-slate-600">Enter your email and we'll send you a reset link.</p>
      </div>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="mt-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-medium text-slate-700">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-[12px] border-0 bg-slate-50 px-4 py-3 text-slate-900 placeholder-slate-400 ring-1 ring-inset ring-slate-200 focus:bg-white focus:ring-2 focus:ring-[#5A57FF]"
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn-primary mt-6 w-full" 
                  disabled={loading}
                >
                  {loading ? <BtnLoader /> : 'Send reset link'}
                </button>

                <div className="mt-6 text-center text-sm text-slate-600">
                  Remember your password?{' '}
                  <Link href="/login" className="font-semibold text-[#5A57FF] hover:underline">
                    Sign in
                  </Link>
                </div>
              </form>
            ) : (
              <div className="mt-6">
                {result?.success ? (
                  <div className="rounded-lg bg-green-50 p-4 text-center ring-1 ring-inset ring-green-100">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                      <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-sm font-semibold text-green-800">Check your email</h3>
                    <p className="mt-1 text-sm text-green-700">
                      If an account exists for <strong>{email}</strong>, you'll receive an email with reset instructions.
                    </p>
                    <div className="mt-4 space-y-2">
                      <p className="text-xs text-green-600">
                        • Check your spam folder if you don't see the email
                      </p>
                      <p className="text-xs text-green-600">
                        • The reset link will expire in 24 hours
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-lg bg-red-50 p-4 text-center ring-1 ring-inset ring-red-100">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                      <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                    </div>
                    <h3 className="text-sm font-semibold text-red-800">Request Failed</h3>
                    <p className="mt-1 text-sm text-red-700">
                      {result?.message || 'We couldn\'t process your request. Please try again.'}
                    </p>
                  </div>
                )}

                <div className="mt-6 space-y-3">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setResult(null);
                      setEmail('');
                    }}
                    className="btn-primary w-full"
                  >
                    Try Again
                  </button>
                  
                  <Link 
                    href="/login" 
                    className="w-full inline-flex items-center justify-center rounded-[12px] border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                  >
                    Back to Sign In
                  </Link>
                </div>
              </div>
            )}
          </div>
  )
}
