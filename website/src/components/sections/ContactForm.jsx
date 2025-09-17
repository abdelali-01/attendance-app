"use client";
import React from "react";

export default function ContactForm() {
  return (
    <section
      id="contact"
      className="mx-auto max-w-6xl px-4 pb-20 pt-14 sm:px-6 lg:px-8"
    >
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          Contact Us
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-slate-500">
          We're here to help you with any questions or concerns you may have.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-3xl">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="rounded-[24px] bg-white p-6 shadow-[0_8px_30px_rgba(16,24,40,0.08)] ring-1 ring-slate-100"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="name"
                className="text-sm font-medium text-slate-700"
              >
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Jane Doe"
                className="w-full rounded-[12px] border-0 bg-slate-50 px-4 py-3 text-slate-900 placeholder-slate-400 ring-1 ring-inset ring-slate-200 focus:bg-white focus:ring-2 focus:ring-[#5A57FF]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-slate-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="jane@example.com"
                className="w-full rounded-[12px] border-0 bg-slate-50 px-4 py-3 text-slate-900 placeholder-slate-400 ring-1 ring-inset ring-slate-200 focus:bg-white focus:ring-2 focus:ring-[#5A57FF]"
              />
            </div>
          </div>

          <div className="mt-5">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="subject"
                className="text-sm font-medium text-slate-700"
              >
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                required
                placeholder="How can we help?"
                className="w-full rounded-[12px] border-0 bg-slate-50 px-4 py-3 text-slate-900 placeholder-slate-400 ring-1 ring-inset ring-slate-200 focus:bg-white focus:ring-2 focus:ring-[#5A57FF]"
              />
            </div>
          </div>

          <div className="mt-5">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="message"
                className="text-sm font-medium text-slate-700"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                placeholder="Write your message here..."
                className="w-full resize-y rounded-[12px] border-0 bg-slate-50 px-4 py-3 text-slate-900 placeholder-slate-400 ring-1 ring-inset ring-slate-200 focus:bg-white focus:ring-2 focus:ring-[#5A57FF]"
              />
            </div>
          </div>

          <div className="mt-6 items-start justify-between gap-4">
            <label className="inline-flex items-center gap-3 text-sm text-slate-600">
              <input
                type="checkbox"
                name="consent"
                className="h-4 w-4 rounded border-slate-300 text-[#5A57FF] focus:ring-[#5A57FF]"
                required
              />
              I agree to be contacted about my inquiry.
            </label>
            <div className="mt-4 rounded-[12px] bg-rose-50 p-3 text-sm text-rose-700 ring-1 ring-inset ring-rose-100">
              The App it`s under development
            </div>
            <button
              type="submit"
              className="btn-primary w-full mt-4 opacity-30 cursor-not-allowed"
              disabled={true}
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
