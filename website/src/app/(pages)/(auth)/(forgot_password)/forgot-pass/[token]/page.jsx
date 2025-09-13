'use client'

import React, { useState } from 'react'
import { useAuth } from '@/context/auth'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import BtnLoader from '@/components/ui/BtnLoader'

export default function Page() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [result, setResult] = useState(null)

  const { submitNewPass, loading } = useAuth()
  const { token } = useParams()
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.')
      return
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    try {
      const response = await submitNewPass(password , token)
      setResult(response)
      
      if (response.success) {
        setSuccess(true)
        // Redirect to login after 3 seconds
        setTimeout(() => {
          router.push('/login')
        }, 3000)
      }
    } catch (error) {
      setResult({
        success: false,
        message: 'An error occurred. Please try again.'
      })
    }
  }

  return (
    <div>
      <div className="text-center">
        <h1 className="text-2xl font-extrabold text-slate-900">Reset password</h1>
        <p className="mt-2 text-sm text-slate-600">Create a new password for your account.</p>
      </div>

      {!success ? (
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm font-medium text-slate-700">New password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-[12px] border-0 bg-slate-50 px-4 py-3 text-slate-900 placeholder-slate-400 ring-1 ring-inset ring-slate-200 focus:bg-white focus:ring-2 focus:ring-[#5A57FF]"
            />
          </div>

          <div className="mt-4 flex flex-col gap-2">
            <label htmlFor="confirmPassword" className="text-sm font-medium text-slate-700">Confirm password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-[12px] border-0 bg-slate-50 px-4 py-3 text-slate-900 placeholder-slate-400 ring-1 ring-inset ring-slate-200 focus:bg-white focus:ring-2 focus:ring-[#5A57FF]"
            />
          </div>

          {error && (
            <div className="mt-4 rounded-[12px] bg-rose-50 p-3 text-sm text-rose-700 ring-1 ring-inset ring-rose-100">
              {error}
            </div>
          )}

          {result && !result.success && (
            <div className="mt-4 rounded-[12px] bg-rose-50 p-3 text-sm text-rose-700 ring-1 ring-inset ring-rose-100">
              {result.message}
            </div>
          )}

          <button 
            type="submit" 
            className="btn-primary mt-6 w-full" 
            disabled={loading}
          >
            {loading ? <BtnLoader /> : 'Update password'}
          </button>
        </form>
      ) : (
        <div className="mt-6">
          <div className="rounded-[12px] bg-emerald-50 p-3 text-sm text-emerald-700 ring-1 ring-inset ring-emerald-100">
            <div className="flex items-center gap-2">
              <svg className="h-4 w-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="font-semibold">Password Updated Successfully!</span>
            </div>
            <p className="mt-1">
              Your password has been updated. Redirecting to login page in a few seconds...
            </p>
          </div>
          
          <div className="mt-4 text-center">
            <Link 
              href="/login" 
              className="text-sm font-semibold text-[#5A57FF] hover:underline"
            >
              Sign in now
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
