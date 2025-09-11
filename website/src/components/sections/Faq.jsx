'use client';
import React, { useState } from "react";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";

export default function Faq() {
  const faqs = [
    {
      q: "How does the attendance tracking work?",
      a: "Teachers open a session, students check-in digitally, and records are updated in real-time with analytics available instantly.",
    },
    {
      q: "Can students view their own attendance?",
      a: "Yes. Students have access to their personal dashboard with attendance, absences, and marks.",
    },
    {
      q: "Is the app available on mobile devices?",
      a: "The web app is fully responsive and works great on all modern mobile devices and tablets.",
    },
    {
      q: "How secure is the attendance data?",
      a: "We use secure sessions, hardened headers, and best practices to protect your data.",
    },
    {
      q: "Can I export attendance reports?",
      a: "Yes. Teachers can generate and share reports, and export data as needed.",
    },
    {
      q: "How much does it cost?",
      a: "Start free. Upgrade to Standard or Premium for more features and capacity.",
    },
  ];
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
      <h5 className="text-center text-xl font-extrabold text-slate-900">
        Frequently Asked Questions
      </h5>
      <p className="mx-auto mt-2 max-w-2xl text-center text-slate-500">
        Everything you need to know about our attendance management system.
      </p>

      <div className="mt-8 space-y-3">
        {faqs.map((f, i) => {
          const open = openIndex === i;
          return (
            <div
              key={i}
              className="overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200"
            >
              <button
                className="flex w-full items-center justify-between px-5 py-4 text-left"
                aria-expanded={open}
                onClick={() => setOpenIndex(open ? null : i)}
              >
                <span className="font-medium text-slate-800 mr-4">{f.q}</span>
                <span
                  className={`inline-flex h-7 w-7 items-center justify-center rounded-full ring-1 transition-colors ${
                    open
                      ? "bg-indigo-600 text-white ring-indigo-600"
                      : "text-indigo-600 ring-indigo-200"
                  }`}
                >
                  {open ? (
                    <MinusIcon className="h-4 w-4" />
                  ) : (
                    <PlusIcon className="h-4 w-4" />
                  )}
                </span>
              </button>
              {open && (
                <div className="px-5 pb-4 text-sm leading-6 text-slate-600">
                  {f.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
