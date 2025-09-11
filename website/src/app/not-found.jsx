import Link from "next/link";
import { HomeIcon, ArrowPathIcon } from "@heroicons/react/24/solid";

export default function NotFound() {
  return (
    <main className="relative min-h-[80vh] overflow-hidden bg-gradient-to-b from-slate-50 to-white">
      {/* subtle blobs */}
      <div className="pointer-events-none absolute -left-10 top-10 h-40 w-40 rounded-full bg-indigo-200/40 blur-2xl" />
      <div className="pointer-events-none absolute -right-16 bottom-10 h-56 w-56 rounded-full bg-violet-200/40 blur-3xl" />

      <section className="relative mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 py-20 text-center sm:px-6 lg:px-8">
        <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600 ring-1 ring-indigo-100">
          <ArrowPathIcon className="h-4 w-4" /> Page not found
        </div>

        <h1 className="text-6xl font-extrabold tracking-tight text-slate-900 sm:text-7xl">404</h1>
        <p className="max-w-2xl text-slate-500">
          Sorry, the page you are looking for does not exist or has been moved. Check the URL or navigate using the buttons below.
        </p>

        <div className="mt-2 flex flex-col items-center gap-3 sm:flex-row">
          <Link href="/" className="btn-primary inline-flex items-center gap-2">
            <HomeIcon className="h-5 w-5" /> Go Home
          </Link>
          <Link href="/pricing" className="btn-outline">View Pricing</Link>
        </div>
      </section>
    </main>
  );
} 