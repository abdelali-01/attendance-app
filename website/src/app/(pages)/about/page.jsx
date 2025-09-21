import ContactForm from "@/components/sections/ContactForm";

export default function AboutPage() {
  const stats = [
    { label: 'Teachers using our app', value: '120+' },
    { label: 'Students tracked', value: '4k+' },
    { label: 'Average uptime', value: '99.9%' },
    { label: 'Support satisfaction', value: '4.9/5' },
  ]

  const team = [
    {
      name: 'ARIBI Abdelali',
      role: 'Founder & Full-stack Developer',
      bio: 'Product-focused engineer building reliable classroom tools end-to-end.',
      links: { linkedin: 'https://www.linkedin.com/in/abdelalideveloper/', email: 'mailto:abdelalideveloper1@gmail.com' },
    },
    // {
    //   name: 'Derrar Abdelillah',
    //   role: 'Frontend Developer',
    //   bio: 'Creates polished, accessible interfaces that teachers love to use.',
    //   links: { linkedin: '#', email: '#' },
    // },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pb-12 pt-16 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900">
              We make attendance effortless
            </h1>
            <p className="mt-4 max-w-xl text-slate-600">
              Our mission is to help educators focus on teaching, not paperwork. We
              build simple, reliable tools that save time and surface insights.
            </p>
            <div className="mt-6 flex gap-3">
              <a href="/pricing" className="btn-primary">See Pricing</a>
              <a href="#contact" className="btn-outline">Get in Touch</a>
            </div>
          </div>
          <div className="lg:justify-self-end w-full">
            <div className="relative h-64 w-full overflow-hidden rounded-[24px] bg-white shadow-[0_8px_30px_rgba(16,24,40,0.08)] ring-1 ring-slate-100 sm:h-80">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/15 via-violet-500/10 to-fuchsia-500/15" />
              <div className="absolute inset-0 grid place-items-center">
                <div className="rounded-2xl bg-white/70 px-5 py-3 text-center text-sm font-semibold text-slate-700 ring-1 ring-slate-200 backdrop-blur">
                  Product preview area
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company blurb + stats */}
      <section className="mx-auto max-w-6xl px-4 pb-20 pt-6 sm:px-6 lg:px-8">
        <div className="rounded-[24px] bg-white p-6 shadow-[0_8px_30px_rgba(16,24,40,0.08)] ring-1 ring-slate-100">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-slate-900">Built for modern classrooms</h2>
              <p className="mt-3 text-slate-600">
                From small tutoring groups to large schools, our platform scales with you.
                We obsess over details so attendance, analytics, and communication feel
                fast and intuitive.
              </p>
              <p className="mt-3 text-slate-600">
                Privacy and reliability are at the core of everything we ship. Your data
                is protected with enterprise‑grade practices and our team is here for you.
              </p>
            </div>
            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-2 lg:gap-5">
              {stats.map((s) => (
                <li key={s.label} className="rounded-2xl bg-slate-50 p-4 ring-1 ring-inset ring-slate-200">
                  <div className="text-2xl font-extrabold text-indigo-600">{s.value}</div>
                  <div className="mt-1 text-xs font-medium text-slate-500">{s.label}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="mx-auto max-w-6xl px-4 pb-24 pt-0 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Meet the Team</h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-500">
            A small, dedicated team crafting tools for educators.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m) => (
            <div
              key={m.name}
              className="group relative rounded-[24px] bg-white p-6 text-center shadow-[0_8px_30px_rgba(16,24,40,0.08)] ring-1 ring-slate-100 transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(16,24,40,0.10)]"
            >
              <div className="mx-auto h-20 w-20 overflow-hidden rounded-full ring-2 ring-indigo-200">
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-indigo-500/20 to-fuchsia-500/20 text-lg font-bold text-indigo-700">
                  {m.name.split(' ').map((n) => n[0]).join('')}
                </div>
              </div>

              <div className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-[12px] font-semibold text-indigo-700 ring-1 ring-inset ring-indigo-100">
                {m.role}
              </div>

              <h3 className="mt-3 text-base font-semibold text-slate-900">{m.name}</h3>
              {m.bio && (
                <p className="mt-2 text-sm text-slate-500">{m.bio}</p>
              )}

              {/* Skills removed as requested */}

              <div className="mt-5 flex justify-center gap-3 text-sm">
                <a href={m.links?.linkedin || '#'} className="text-[#5A57FF] hover:underline">LinkedIn</a>
                <span className="text-slate-300">•</span>
                <a href={m.links?.email || '#'} className="text-[#5A57FF] hover:underline">Email</a>
              </div>

              <div className="pointer-events-none absolute inset-x-0 -bottom-4 mx-auto h-12 w-[70%] rounded-full bg-gradient-to-t from-slate-200/60 to-transparent opacity-0 blur-xl transition-opacity duration-200 group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </section>

      <ContactForm/>
    </main>
  )
}
