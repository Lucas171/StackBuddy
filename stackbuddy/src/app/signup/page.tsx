'use client'

import { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'

export default function SignupPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <><Navbar />
    
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow p-6 rounded w-full max-w-sm space-y-4">
        <h2 className="text-xl font-bold">Create your account</h2>

        <input
          className="border px-3 py-2 w-full rounded"
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          className="border px-3 py-2 w-full rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button
          onClick={handleSignup}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Sign Up
        </button>

        <button className="w-full border py-2 rounded text-gray-500" disabled>
          Sign up with Google (Coming Soon)
        </button>
        <button className="w-full border py-2 rounded text-gray-500" disabled>
          Sign up with GitHub (Coming Soon)
        </button>

        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    </div>
    </>
  )
}
