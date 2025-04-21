'use client'

import { useRouter } from 'next/navigation'

export default function Navbar() {
  const router = useRouter()

  return (
    <nav className="w-full px-6 py-4 flex items-center justify-between border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
      <span
        className="text-xl font-semibold text-gray-800 cursor-pointer"
        onClick={() => router.push('/')}
      >
        StackBuddy
      </span>
      <div className="space-x-4">
        <button
          onClick={() => router.push('/signin')}
          className="text-sm text-gray-500 hover:text-gray-800 transition"
        >
          Log In
        </button>
      </div>
    </nav>
  )
}
