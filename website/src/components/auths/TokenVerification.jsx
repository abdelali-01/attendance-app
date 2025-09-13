'use client'

import React, { useEffect, useState } from 'react'
import { useAuth } from '@/context/auth'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import BtnLoader from '../ui/BtnLoader'

export default function TokenVerification() {
  const [verificationStatus, setVerificationStatus] = useState('loading') // 'loading', 'success', 'error'
  const [message, setMessage] = useState('')
  const { verifyEmail, loading } = useAuth()
  const {token} = useParams();

  useEffect(() => {
    console.log('inside useeffect')
    const handleVerification = async () => {
      console.log('inside handleverification')
      if (!token) {
        setVerificationStatus('error')
        setMessage('Invalid verification link')
        return
      }

      try {
        const result = await verifyEmail(token);
        console.log('verification result' , result);
        if (result.success) {
          setVerificationStatus('success')
          setMessage('Your account has been verified successfully!')
        } else {
          setVerificationStatus('error')
          setMessage(result.message || 'Verification failed. Please try again.')
        }
      } catch (error) {
        setVerificationStatus('error')
        setMessage('An error occurred during verification. Please try again.')
      }
    }

    handleVerification()
  }, [])

  const getIcon = () => {
    switch (verificationStatus) {
      case 'success':
        return (
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )
      case 'error':
        return (
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <svg className="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        )
      default:
        return (
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100">
            <BtnLoader size={32} color="#4F46E5" />
          </div>
        )
    }
  }

  const getTitle = () => {
    switch (verificationStatus) {
      case 'success':
        return 'Account Verified!'
      case 'error':
        return 'Verification Failed'
      default:
        return 'Verifying Account...'
    }
  }

  const getDescription = () => {
    switch (verificationStatus) {
      case 'success':
        return 'Your account has been successfully verified. You can now sign in to your account.'
      case 'error':
        return 'We encountered an issue verifying your account. This could be due to an expired or invalid link.'
      default:
        return 'Please wait while we verify your account...'
    }
  }

  return (
    <section className="mx-auto max-w-6xl px-4 pb-20 pt-14 sm:px-6 lg:px-8">
      <div className="grid items-stretch gap-8 lg:grid-cols-2">
        {/* Left visual section */}
        <div className="relative hidden overflow-hidden rounded-[24px] bg-white shadow-[0_8px_30px_rgba(16,24,40,0.08)] ring-1 ring-slate-100 lg:block">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-violet-500/15 to-fuchsia-500/20" />
          <div className="relative z-10 p-8">
            <div className={`inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold ring-1 ring-inset backdrop-blur ${
              verificationStatus === 'success' 
                ? 'text-green-700 ring-green-100' 
                : verificationStatus === 'error'
                ? 'text-red-700 ring-red-100'
                : 'text-indigo-700 ring-indigo-100'
            }`}>
              {verificationStatus === 'success' ? 'Verified' : verificationStatus === 'error' ? 'Failed' : 'Verifying'}
            </div>
            <h2 className="mt-5 text-3xl font-extrabold leading-tight text-slate-900">
              {verificationStatus === 'success' 
                ? 'Welcome to Attendance Tracker!' 
                : verificationStatus === 'error'
                ? 'Verification Issue'
                : 'Verifying Your Account'
              }
            </h2>
            <p className="mt-3 max-w-md text-slate-600">
              {verificationStatus === 'success' 
                ? 'Your account is now active and ready to use. Start tracking attendance and managing your classes.'
                : verificationStatus === 'error'
                ? 'Don\'t worry, we\'re here to help. You can request a new verification email or contact support.'
                : 'Please wait while we confirm your email address and activate your account.'
              }
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {verificationStatus === 'success' ? (
                <>
                  <div className="rounded-2xl bg-white/80 p-4 ring-1 ring-inset ring-slate-200 backdrop-blur">
                    <div className="text-sm font-semibold text-slate-900">Ready to Start</div>
                    <div className="mt-1 text-xs text-slate-600">Your account is fully activated.</div>
                  </div>
                  <div className="rounded-2xl bg-white/80 p-4 ring-1 ring-inset ring-slate-200 backdrop-blur">
                    <div className="text-sm font-semibold text-slate-900">Sign In</div>
                    <div className="mt-1 text-xs text-slate-600">Access your dashboard now.</div>
                  </div>
                </>
              ) : verificationStatus === 'error' ? (
                <>
                  <div className="rounded-2xl bg-white/80 p-4 ring-1 ring-inset ring-slate-200 backdrop-blur">
                    <div className="text-sm font-semibold text-slate-900">Try Again</div>
                    <div className="mt-1 text-xs text-slate-600">Request a new verification email.</div>
                  </div>
                  <div className="rounded-2xl bg-white/80 p-4 ring-1 ring-inset ring-slate-200 backdrop-blur">
                    <div className="text-sm font-semibold text-slate-900">Get Help</div>
                    <div className="mt-1 text-xs text-slate-600">Contact our support team.</div>
                  </div>
                </>
              ) : (
                <>
                  <div className="rounded-2xl bg-white/80 p-4 ring-1 ring-inset ring-slate-200 backdrop-blur">
                    <div className="text-sm font-semibold text-slate-900">Processing</div>
                    <div className="mt-1 text-xs text-slate-600">Verifying your token...</div>
                  </div>
                  <div className="rounded-2xl bg-white/80 p-4 ring-1 ring-inset ring-slate-200 backdrop-blur">
                    <div className="text-sm font-semibold text-slate-900">Almost Done</div>
                    <div className="mt-1 text-xs text-slate-600">Setting up your account.</div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right verification content */}
        <div className="mx-auto w-full max-w-md self-center">
          <div className="rounded-[24px] bg-white p-6 shadow-[0_8px_30px_rgba(16,24,40,0.08)] ring-1 ring-slate-100">
            <div className="text-center">
              {getIcon()}
              <h1 className="text-2xl font-extrabold text-slate-900">{getTitle()}</h1>
              <p className="mt-2 text-sm text-slate-600">
                {getDescription()}
              </p>
            </div>

            {message && (
              <div className={`mt-4 rounded-lg p-4 ${
                verificationStatus === 'success' 
                  ? 'bg-green-50 text-green-800' 
                  : verificationStatus === 'error'
                  ? 'bg-red-50 text-red-800'
                  : 'bg-blue-50 text-blue-800'
              }`}>
                <p className="text-sm font-medium">{message}</p>
              </div>
            )}

            <div className="mt-6 space-y-4">
              {verificationStatus === 'success' && (
                <div className="text-center">
                  <p className="text-sm text-slate-600 mb-4">
                    Redirecting to login page in a few seconds...
                  </p>
                  <Link 
                    href="/login" 
                    className="btn-primary w-full inline-flex items-center justify-center"
                  >
                    Sign In Now
                  </Link>
                </div>
              )}

              {verificationStatus === 'error' && (
                <div className="space-y-3">
                  {/* <Link 
                    href="/verification" 
                    className="btn-primary w-full inline-flex items-center justify-center"
                  >
                    Request New Verification Email
                  </Link> */}
                  <Link 
                    href="/login" 
                    className="w-full inline-flex items-center justify-center rounded-[12px] border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                  >
                    Back to Sign In
                  </Link>
                </div>
              )}

              {verificationStatus === 'loading' && (
                <div className="text-center">
                  <p className="text-sm text-slate-600">
                    Please wait while we verify your account...
                  </p>
                </div>
              )}

              <div className="mt-6 text-center text-sm text-slate-600">
                Need help?{' '}
                <Link href="/contact" className="font-semibold text-[#5A57FF] hover:underline">
                  Contact Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 