import Faq from "@/components/sections/Faq";
import Link from "next/link";
import { CheckBadgeIcon, BuildingLibraryIcon, Cog6ToothIcon, UserGroupIcon, ChartBarSquareIcon, ShieldCheckIcon, DevicePhoneMobileIcon } from "@heroicons/react/24/solid";
import { MapPinIcon, CursorArrowRaysIcon, AcademicCapIcon } from "@heroicons/react/24/solid";
import { SparklesIcon } from "@heroicons/react/24/outline";
import ContactForm from "@/components/sections/ContactForm";

export default function Home() {
  // Build features then shuffle for a varied feel while keeping a tight grid
  const features = [
    { icon: CheckBadgeIcon, title: "Smart Attendance", desc: "Add, update, and delete attendance records with ease.", color: "from-emerald-400 to-teal-500" },
    { icon: BuildingLibraryIcon, title: "Class Management", desc: "Create and manage classes and student lists.", color: "from-indigo-400 to-violet-500" },
    { icon: Cog6ToothIcon, title: "Automatic Marks", desc: "Attendance marks are calculated automatically.", color: "from-sky-400 to-blue-500" },
    { icon: UserGroupIcon, title: "Student Access", desc: "Students can view their attendance and absences.", color: "from-pink-400 to-rose-500" },
    { icon: ChartBarSquareIcon, title: "Detailed Stats", desc: "Generate detailed attendance and absence statistics.", color: "from-amber-400 to-orange-500" },
    { icon: ShieldCheckIcon, title: "Role‑Based Access", desc: "Separate dashboards for teachers and students.", color: "from-cyan-400 to-teal-500" },
    { icon: DevicePhoneMobileIcon, title: "Mobile Friendly", desc: "Works great on any device.", color: "from-lime-400 to-green-500" },
  ].sort(() => Math.random() - 0.5);

  // Timeline steps
  const steps = [
    { title: "Sign Up", desc: "Create your free account as a teacher or student.", icon: AcademicCapIcon },
    { title: "Create or Join Classes", desc: "Teachers create classes, students join with a code.", icon: MapPinIcon },
    { title: "Track Attendance", desc: "Mark attendance digitally and view records instantly.", icon: CursorArrowRaysIcon },
  ];

  // Random span classes for a masonry-like effect on large screens
  const spanOptions = [
    "",
    "lg:row-span-2",
    "lg:col-span-2",
    "lg:col-span-2 lg:row-span-2",
  ];
  const spans = features.map(() => spanOptions[Math.floor(Math.random() * spanOptions.length)]);

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-b-[32px] bg-gradient-to-br from-[#5A57FF] via-indigo-500 to-indigo-400">
        <div className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pb-24">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-white/90 ring-1 ring-white/20 backdrop-blur">
            <span className="text-xs">Trusted by 1000+ Schools</span>
          </div>

          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl">Transform Your
                <br/>Classroom with
                <br/>Smart Attendance
              </h1>
              <p className="mt-5 max-w-xl text-white/90">
                Say goodbye to paper attendance sheets! Our intelligent system helps teachers track attendance in
                seconds while giving students real-time insights into their progress.
              </p>

              {/* Feature chip */}
              <div className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white/15 px-3 py-2 text-sm text-white ring-1 ring-white/20 backdrop-blur">
                <span role="img" aria-label="chart">📊</span>
                Smart Analytics
              </div>

              {/* CTAs */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link href="/signup" className="btn-primary">
                  Start Free Trial
                </Link>
                <Link href="#demo" className="inline-flex items-center gap-2 text-white/95 hover:text-white">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-sm ring-1 ring-white/30">▶</span>
                  Watch Demo
                </Link>
              </div>
            </div>

            {/* Decorative illustration */}
            <div className="relative hidden lg:block">
              <div className="absolute -right-10 top-8 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
              <div className="absolute -left-6 bottom-8 h-24 w-24 rounded-full bg-white/10 blur-xl" />
              <div className="mx-auto h-[360px] w-[360px] rounded-[32px] bg-white/10 ring-1 ring-white/20 backdrop-blur flex items-center justify-center">
                <div className="h-24 w-24 rounded-2xl bg-white/20 ring-1 ring-white/30" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-extrabold text-slate-900">Main Features</h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-slate-500">
          Everything you need to manage attendance, classes, and student engagement—beautifully simple and powerful.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
          {[
            { icon: CheckBadgeIcon, title: "Smart Attendance", desc: "Add, update, and delete attendance records with ease.", color: "from-emerald-400 to-teal-500" },
            { icon: BuildingLibraryIcon, title: "Class Management", desc: "Create and manage classes and student lists.", color: "from-indigo-400 to-violet-500" },
            { icon: Cog6ToothIcon, title: "Automatic Marks", desc: "Attendance marks are calculated automatically.", color: "from-sky-400 to-blue-500" },
            { icon: UserGroupIcon, title: "Student Access", desc: "Students can view their attendance and absences.", color: "from-pink-400 to-rose-500" },
            { icon: ChartBarSquareIcon, title: "Detailed Stats", desc: "Generate detailed attendance and absence statistics.", color: "from-amber-400 to-orange-500" },
            { icon: ShieldCheckIcon, title: "Role‑Based Access", desc: "Separate dashboards for teachers and students.", color: "from-cyan-400 to-teal-500" },
            { icon: DevicePhoneMobileIcon, title: "Mobile Friendly", desc: "Works great on any device.", color: "from-lime-400 to-green-500" },
          ].map((f, i) => (
            <div key={i} className={`group rounded-2xl bg-gradient-to-br from-slate-100 to-slate-50 p-[1px] shadow-[0_6px_24px_rgba(16,24,40,0.06)] ring-1 ring-slate-100 ${i === 0 ? "col-span-1 md:col-span-2" : ""}`}>
              <div className="flex h-full items-start gap-4 rounded-2xl bg-white p-6">
                <span className={`inline-flex h-12 w-12 items-center justify-center rounded-xl text-white shadow-md ring-1 ring-black/5 bg-gradient-to-br ${f.color}`}>
                  {/** icon */}
                  <f.icon className="h-6 w-6" />
                </span>
                <div>
                  <div className="text-base font-semibold text-slate-900">{f.title}</div>
                  <div className="mt-1 text-sm leading-6 text-slate-500">{f.desc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works - Timeline */}
      <section className="bg-slate-50/80 py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h3 className="text-center text-2xl md:text-4xl font-semibold text-slate-900">How It Works <span className="text-indigo-500">?</span> </h3>

          <div className="relative mx-auto mt-10 max-w-3xl">
            {/* vertical line */}
            <div className="pointer-events-none absolute left-6 top-0 h-full w-[3px] -translate-x-1/2 rounded-full bg-gradient-to-b from-indigo-300 via-indigo-200 to-transparent" />

            <ul className="space-y-6">
              {steps.map((s, idx) => (
                <li key={idx} className="relative">
                  <div className="flex items-start gap-4 rounded-2xl bg-white p-5 shadow-[0_6px_24px_rgba(16,24,40,0.06)] ring-1 ring-slate-100">
                    <span className="relative">
                      <span className="absolute -left-[11px] top-6 h-[3px] w-6 bg-indigo-200" />
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-400 to-violet-500 text-white shadow-md ring-1 ring-black/5">
                        <s.icon className="h-6 w-6" />
                      </span>
                    </span>
                    <div>
                      <div className="text-base font-semibold text-slate-900">{idx + 1}. {s.title}</div>
                      <div className="mt-1 text-sm leading-6 text-slate-600">{s.desc}</div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Pricing CTA (enhanced) */}
      <section className="relative py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-r from-indigo-600 to-violet-600 p-[1px] shadow-[0_18px_50px_rgba(79,70,229,0.35)]">
            <div className="relative flex flex-col items-center justify-center gap-5 rounded-[28px] bg-white px-8 py-10 sm:flex-row sm:justify-between">
              <div className="flex items-center gap-4 text-center sm:text-left">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 ring-1 ring-indigo-200">
                  <SparklesIcon className="h-6 w-6" />
                </span>
                <div>
                  <h4 className="text-xl font-extrabold text-slate-900">Simple, Transparent Pricing</h4>
                  <p className="text-sm text-slate-500">Start for free. Upgrade anytime for more features.</p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-3 sm:flex-row">
                <Link href="/pricing" className="btn-primary w-full sm:w-auto">See Pricing →</Link>
                <Link href="#features" className="btn-outline w-full sm:w-auto">Compare Features</Link>
              </div>
              <div className="pointer-events-none absolute -left-20 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-indigo-200/30 blur-2xl" />
              <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-violet-200/40 blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      <Faq/>
      <ContactForm/>
    </main>
  );
}
