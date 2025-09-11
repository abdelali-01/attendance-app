import React from 'react'
import { CheckCircleIcon, XCircleIcon, StarIcon } from '@heroicons/react/24/solid'
import { allFeatures, featureAvailability, basePrices, calculatePrice } from '@/data/plans'
import Link from 'next/link'

export default function Pricing() {
    const plans = [
        {
          key: 'free',
          name: 'Free',
          highlight: false,
          badge: '',
          // Free plan price
          price: 0,
          subtitle: 'Perfect for getting started'
        },
        {
          key: 'standard',
          name: 'Standard',
          highlight: true,
          badge: '',
          // Show 12-month discounted per-month price (0.4 * base)
          price: calculatePrice('standard', 12),
          subtitle: 'Great for growing classes'
        },
        {
          key: 'premium',
          name: 'Premium',
          highlight: false,
          badge: 'Most Popular',
          price: calculatePrice('premium', 12),
          subtitle: 'For professional educators'
        }
      ]

    const renderFeature = (planKey, feature) => {
        const value = featureAvailability[planKey][feature]
        const isAvailable = value === true || typeof value === 'string'
    
        return (
          <li key={feature} className="flex items-start gap-3 py-2">
            {isAvailable ? (
              <CheckCircleIcon className="h-5 w-5 text-emerald-500" />
            ) : (
              <XCircleIcon className="h-5 w-5 text-rose-500" />
            )}
            <span className={`text-sm ${isAvailable ? 'text-slate-700' : 'text-slate-400 line-through'}`}>
              {feature}{typeof value === 'string' ? ': ' : ''}
              {typeof value === 'string' ? <strong>{' '}{value}</strong> : null}
            </span>
          </li>
        )
      }
    
  return (
    <section className="mx-auto max-w-6xl px-4 pb-20 pt-14 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Choose Your Plan</h1>
          <p className="mx-auto mt-3 max-w-2xl text-slate-500">
            Start with our free plan and upgrade as your needs grow. All plans include our core attendance tracking features.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((p) => (
            <div key={p.key} className={`relative rounded-[24px] bg-white p-6 shadow-[0_8px_30px_rgba(16,24,40,0.08)] ring-1 ring-slate-100 ${p.highlight ? 'lg:-translate-y-1' : ''}`}>
              {p.badge && (
                <div className="absolute left-1/2 top-0 -translate-y-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-500 px-3 py-1 text-xs font-semibold text-white shadow">
                    <StarIcon className="h-4 w-4" /> {p.badge}
                  </span>
                </div>
              )}

              <div className="text-center">
                <h3 className="text-lg font-semibold text-slate-900">{p.name}</h3>
                <div className="mt-3 flex items-end justify-center gap-1">
                  <span className="text-3xl font-extrabold text-indigo-600">{p.price} DA</span>
                  <span className="text-xs text-slate-500">{p.key === 'free' ? '/forever' : '/per month'}</span>
                </div>
                <p className="mt-2 text-xs text-slate-500">{p.subtitle}</p>
              </div>

              {/* Feature list */}
              <ul className="mt-5 border-t border-slate-100 pt-4">
                {/* Promote the two limits first */}
                {renderFeature(p.key, 'Class Limit')}
                {renderFeature(p.key, 'Student Limit')}
                {/* Rest of features */}
                {allFeatures
                  .filter((f) => f !== 'Class Limit' && f !== 'Student Limit')
                  .map((f) => renderFeature(p.key, f))}
              </ul>

              {/* CTA */}
              <div className="mt-6">
                {p.key === 'free' ? (
                  <Link href="/signup" className="btn-outline w-full">Get Started</Link>
                ) : (
                  <Link href={`/subcribe?plan=${p.key}`} className="btn-primary w-full">Subscribe Now</Link>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer help */}
        <div className="mt-16 text-center">
          <h4 className="text-base font-semibold text-slate-900">Questions? We're here to help</h4>
          <p className="mt-2 text-sm text-slate-500"> <Link href={'mailto:support@attendance-tracker.com'} className='text-[#5A57FF] hover:underline'>Contact our support team</Link> for any questions about our pricing plans.</p>
        </div>
      </section>
  )
}
