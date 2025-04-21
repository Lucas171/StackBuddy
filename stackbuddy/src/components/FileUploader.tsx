'use client'

import { useState } from 'react'

type FileUploaderProps = {
  onComplete?: (result: any) => void
}

export default function FileUploader({ onComplete }: FileUploaderProps) {
  const [file, setFile] = useState<File | null>(null)
  const [response, setResponse] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!file) return
    setLoading(true)

    const formData = new FormData()
    formData.append('file', file)

    const res = await fetch('/api/analyze', {
      method: 'POST',
      body: formData,
    })

    const data = await res.json()
    setResponse(data)
    setLoading(false)

    // 🔔 Notify parent if onComplete is passed
    if (onComplete) onComplete(data)
  }

  return (
    <div className="p-4 border rounded w-full max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-2">Upload ZIP of your Repo</h2>
      <input type="file" accept=".zip" onChange={handleChange} className="mb-4" />
      <button
        onClick={handleUpload}
        disabled={!file || loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? 'Analyzing...' : 'Analyze Repo'}
      </button>

      {response && (
        <pre className="mt-4 p-2 bg-gray-100 rounded max-h-64 overflow-y-auto text-sm">
          {JSON.stringify(response, null, 2)}
        </pre>
      )}
    </div>
  )
}
