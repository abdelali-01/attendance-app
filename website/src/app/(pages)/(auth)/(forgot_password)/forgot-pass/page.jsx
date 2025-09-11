'use client'

import React, { useState } from 'react'

export default function Page() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    // TODO: trigger forgot password email via API
    console.log('Forgot password email to:', email)
  }

  return (
    <div>
      <div className="text-center">
        <h1 className="text-2xl font-extrabold text-slate-900">Forgot password</h1>
        <p className="mt-2 text-sm text-slate-600">Enter your email and we'll send you a reset link.</p>
      </div>

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

        <button type="submit" className="btn-primary mt-6 w-full">Send reset link</button>
      </form>

      {submitted && (
        <div className="mt-4 rounded-[12px] bg-indigo-50 p-3 text-sm text-indigo-700 ring-1 ring-inset ring-indigo-100">
          If an account exists for {email}, you'll receive an email with a reset link.
        </div>
      )}
    </div>
  )
}
