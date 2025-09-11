import React from 'react'

export default function Footer() {
  return (
    <footer className="mt-20 bg-slate-50/70">
      {/* Main footer */}
      <div className="border-t border-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="text-lg font-extrabold text-slate-900">Attendance App</div>
              <p className="mt-2 max-w-xs text-sm text-slate-600">
                Simple, reliable tools that help educators focus on teaching, not paperwork.
              </p>
            </div>

            <div>
              <div className="text-sm font-semibold text-slate-900">Company</div>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li><a className="hover:text-slate-900" href="/about">About</a></li>
                <li><a className="hover:text-slate-900" href="/pricing">Pricing</a></li>
                <li><a className="hover:text-slate-900" href="/subscribe">Subscribe</a></li>
              </ul>
            </div>

            <div>
              <div className="text-sm font-semibold text-slate-900">Resources</div>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li><a className="hover:text-slate-900" href="#contact">Contact</a></li>
                <li><a className="hover:text-slate-900" href="#">Status</a></li>
                <li><a className="hover:text-slate-900" href="#">Help Center</a></li>
              </ul>
            </div>

            <div>
              <div className="text-sm font-semibold text-slate-900">Follow</div>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li><a className="hover:text-slate-900" href="#">LinkedIn</a></li>
                <li><a className="hover:text-slate-900" href="#">Twitter</a></li>
                <li><a className="hover:text-slate-900" href="#">YouTube</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-6 text-sm text-slate-500 sm:flex-row">
            <p>© {new Date().getFullYear()} Attendance App. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-slate-900">Privacy</a>
              <span aria-hidden>•</span>
              <a href="#" className="hover:text-slate-900">Terms</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
