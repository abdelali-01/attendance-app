'use client'

import React, { useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import {
  basePrices,
  calculatePrice,
  calculateTotalPrice,
  calculateSavings,
  durationOptions,
} from '@/data/plans'

export default function SubscribePage() {
  const searchParams = useSearchParams()
  const planKey = (searchParams.get('plan') || 'standard').toLowerCase()

  const [duration, setDuration] = useState(12)
  const [promoCode, setPromoCode] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)
  const [promoMessage, setPromoMessage] = useState('')

  const monthlyPrice = useMemo(() => calculatePrice(planKey, duration), [planKey, duration])
  const originalMonthly = useMemo(() => basePrices[planKey] || 0, [planKey])
  const total = useMemo(() => calculateTotalPrice(planKey, duration), [planKey, duration])
  const savings = useMemo(() => calculateSavings(planKey, duration), [planKey, duration])

  const isDiscounted = duration >= 12 && planKey !== 'free'
  const discountLabel = isDiscounted ? '60% OFF' : ''

  const handleApplyPromo = (e) => {
    e.preventDefault()
    // Placeholder: implement real promo validation logic here
    if (!promoCode.trim()) {
      setPromoApplied(false)
      setPromoMessage('Please enter a valid code.')
      return
    }
    setPromoApplied(true)
    setPromoMessage(`Code "${promoCode.toUpperCase()}" applied.`)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <section className="mx-auto max-w-6xl px-4 pb-20 pt-14 sm:px-6 lg:px-8">
        <div className="text-left">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Choose Duration</h1>
        </div>

        {/* Duration selector */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {durationOptions.map((opt) => {
            const selected = opt.value === duration
            const optDiscounted = opt.value >= 12 && planKey !== 'free'
            const perMonth = calculatePrice(planKey, opt.value)
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => setDuration(opt.value)}
                className={`relative rounded-[20px] bg-white p-5 text-left shadow-[0_8px_30px_rgba(16,24,40,0.08)] ring-1 ring-slate-100 transition-colors ${
                  selected ? 'outline  outline-indigo-500/80 bg-indigo-50/40' : 'hover:bg-slate-50'
                }`}
              >
                <div className="text-base font-semibold text-slate-900">{opt.label}</div>
                <div className="mt-2 text-lg font-extrabold text-[#5A57FF]">{perMonth} DA/month</div>
                {optDiscounted && (
                  <div className="mt-2 text-xs font-semibold text-emerald-600">60% OFF</div>
                )}
              </button>
            )
          })}
        </div>

        {/* Summary */}
        <div className="mt-10 rounded-[24px] bg-white p-6 shadow-[0_8px_30px_rgba(16,24,40,0.08)] ring-1 ring-slate-100">
          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              {/* Promotion code (above monthly price, full column width) */}
              <form onSubmit={handleApplyPromo}>
                <label htmlFor="promo" className="text-sm font-semibold text-slate-900">Promotion Code</label>
                <div className="mt-2 flex items-center gap-3">
                  <input
                    id="promo"
                    name="promo"
                    type="text"
                    placeholder="Enter code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="w-full rounded-[12px] border-0 bg-slate-50 px-4 py-3 text-slate-900 placeholder-slate-400 ring-1 ring-inset ring-slate-200 focus:bg-white focus:ring-2 focus:ring-[#5A57FF]"
                  />
                  <button type="submit" className="btn-outline whitespace-nowrap">Apply</button>
                </div>
                {promoMessage && (
                  <div className={`mt-3 text-sm ${promoApplied ? 'text-emerald-600' : 'text-rose-600'}`}>{promoMessage}</div>
                )}
              </form>

              <div className="mt-8 text-sm font-semibold text-slate-900">Monthly Price:</div>
              <div className="mt-2 flex items-baseline gap-3">
                {isDiscounted && (
                  <span className="text-slate-400 line-through">{originalMonthly} DA</span>
                )}
                <span className="text-lg font-extrabold text-slate-900">{monthlyPrice} DA</span>
                {discountLabel && (
                  <span className="text-xs font-semibold text-emerald-600">{discountLabel}</span>
                )}
              </div>

              <div className="mt-6 text-sm font-semibold text-slate-900">Duration:</div>
              <div className="mt-2 text-slate-700">{duration} {duration === 1 ? 'Month' : 'Months'}</div>
            </div>

            <div className="lg:text-right">
              <div className="text-sm font-extrabold uppercase tracking-wide text-slate-900">Total:</div>
              <div className="mt-2 text-3xl font-extrabold text-[#5A57FF]">{total} DA</div>
              {savings > 0 && (
                <div className="mt-2 text-sm font-semibold text-emerald-600">You save {savings} DA</div>
              )}

              <div className="mt-6 flex flex-col items-stretch gap-3 lg:items-end">
                <button className="btn-primary w-full sm:w-auto">Continue to Checkout</button>
                <a href="/pricing" className="btn-outline w-full sm:w-auto">Back to Plans</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
