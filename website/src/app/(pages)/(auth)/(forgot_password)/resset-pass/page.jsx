'use client'

import React, { useState } from 'react'

export default function Page() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = (e) => {
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

    // TODO: call reset password API with token
    console.log('Reset password submitted')
    setSuccess(true)
  }

  return (
    <div>
      <div className="text-center">
        <h1 className="text-2xl font-extrabold text-slate-900">Reset password</h1>
        <p className="mt-2 text-sm text-slate-600">Create a new password for your account.</p>
      </div>

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

        <button type="submit" className="btn-primary mt-6 w-full">Update password</button>
      </form>

      {success && (
        <div className="mt-4 rounded-[12px] bg-emerald-50 p-3 text-sm text-emerald-700 ring-1 ring-inset ring-emerald-100">
          Your password has been updated. You can now <a href="/login" className="font-semibold underline">log in</a>.
        </div>
      )}
    </div>
  )
}
