"use client"

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const user = false; // TODO: wire with auth state
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/pricing", label: "Pricing" },
    { href: "/about", label: "About Us" },
  ];

  // Shared styles (desktop + mobile)
  const linkBase = "inline-flex items-center gap-1 text-[17px] font-semibold tracking-tight transition-colors";
  const linkActive = "text-indigo-600";
  const linkInactive = "text-slate-800 hover:text-indigo-600";
  const linkPill = "rounded-md px-3 py-2"; // mobile hit target

  const isActive = (href) => (pathname === href ? linkActive : linkInactive);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <span className="inline-block h-9 w-9 rounded-lg bg-gradient-to-tr from-indigo-500 to-violet-500" />
              <span className="text-xl font-extrabold text-slate-900">Attendance</span>
            </Link>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex md:items-center md:gap-14">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className={`${linkBase} ${isActive(l.href)}`}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex md:items-center md:gap-4">
            {user ? (
              <Link href="/dashboard" className="btn-primary">
                Dashboard
              </Link>
            ) : (
              <>
                <Link href="/signup" className="btn-outline">
                  Start For Free
                </Link>
                <Link href="/login" className="btn-primary">
                  Login
                </Link>
              </>
            )}
          </div>

          {/* Mobile burger */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            className="inline-flex items-center justify-center rounded-md p-2 text-slate-700 hover:bg-slate-100 md:hidden"
          >
            <span className="sr-only">Open main menu</span>
            <svg className={`h-6 w-6 transition ${open ? "opacity-0" : "opacity-100"}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
            </svg>
            <svg className={`absolute h-6 w-6 transition ${open ? "opacity-100" : "opacity-0"}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${open ? "max-h-96" : "max-h-0"} overflow-hidden border-t border-slate-100 transition-[max-height] duration-300 md:hidden`}>
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-2">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`${linkPill} ${linkBase} ${isActive(l.href)} hover:bg-slate-50`}
              >
                {l.label}
              </Link>
            ))}

            <div className="mt-2 flex flex-col gap-3">
              {user ? (
                <Link href="/dashboard" onClick={() => setOpen(false)} className="btn-primary">
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link href="/signup" onClick={() => setOpen(false)} className="btn-outline">
                    Start For Free
                  </Link>
                  <Link href="/login" onClick={() => setOpen(false)} className="btn-primary">
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
