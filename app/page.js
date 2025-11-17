import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-rose-50 flex items-center justify-center p-6">
      <section className="max-w-4xl w-full bg-white/70 backdrop-blur-md rounded-2xl shadow-xl border border-white/60 p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-shrink-0">
          <div className="w-36 h-36 rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center text-white text-3xl font-semibold shadow-lg">
            DC
          </div>
        </div>

        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800">Dela Cruz</h1>
          <p className="mt-3 text-lg text-slate-600">Full‑stack developer · Authentication demos · Firebase</p>

          <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-start gap-3">
            <Link href="/profile" className="inline-flex items-center justify-center px-5 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700">View Profile</Link>
            <Link href="/about" className="inline-flex items-center justify-center px-5 py-3 border border-indigo-100 rounded-lg text-indigo-700 bg-white/60 hover:bg-white">About</Link>
          </div>

          <div className="mt-6 text-sm text-slate-500">Built with Next.js + Tailwind — simple auth examples for learning.</div>
        </div>
      </section>
    </main>
  )
}
