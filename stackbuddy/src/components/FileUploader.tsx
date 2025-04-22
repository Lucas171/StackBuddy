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

    if (onComplete) onComplete(data)
  }

  return (
    <div className="max-w-md w-full mx-auto p-6 rounded-xl shadow-md border border-gray-200 bg-white space-y-4">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold text-gray-800">Analyze Your Repo</h2>
        <p className="text-gray-500 text-sm">Upload a .zip file of your project repo to detect stack info and suggestions.</p>
      </div>

      <div className="flex flex-col space-y-2">
        <input
          type="file"
          accept=".zip"
          onChange={handleChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
        />

        <button
          onClick={handleUpload}
          disabled={!file || loading}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          {loading ? 'Analyzing...' : 'Analyze Repo'}
        </button>
      </div>

      {response && (
        <div className="bg-gray-50 p-4 rounded-md border border-gray-200 space-y-2 max-h-80 overflow-y-auto text-sm">
          <div className="flex justify-between items-center">
            <p className="font-medium text-gray-700">Raw JSON Response</p>
            <a
              href={`data:application/json;charset=utf-8,${encodeURIComponent(
                JSON.stringify(response, null, 2)
              )}`}
              download="stackbuddy-analysis.json"
              className="text-xs text-blue-600 hover:underline"
            >
              Download JSON
            </a>
          </div>

          <pre className="whitespace-pre-wrap text-gray-700">
            {JSON.stringify(response, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}
