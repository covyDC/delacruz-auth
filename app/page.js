import Link from 'next/link'
import AuthButtons from './components/AuthButtons'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-rose-50 flex flex-col items-center justify-center p-6">
      {/* Top Section - Branding */}
      <div className="text-center mb-12">
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center text-white text-2xl font-semibold shadow-lg mx-auto mb-6">
          DC
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800">Dela Cruz</h1>
        <p className="mt-3 text-lg text-slate-600">Full‑stack developer · Authentication demos · Firebase</p>
      </div>

      {/* Centered Auth Buttons */}
      <div className="w-full max-w-md">
        <AuthButtons />
      </div>

      {/* Bottom Links */}
      <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/about" className="inline-flex items-center justify-center px-5 py-3 border border-indigo-100 rounded-lg text-indigo-700 bg-white/60 hover:bg-white shadow transition-colors">About</Link>
        <Link href="/profile" className="inline-flex items-center justify-center px-5 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition-colors">View Profile</Link>
      </div>

      <div className="mt-8 text-sm text-slate-500">Built with Next.js + Tailwind — simple auth examples for learning.</div>
    </main>
  )
}
