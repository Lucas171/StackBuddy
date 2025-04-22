'use client'

import { useState } from 'react'
import FileUploader from '@/components/FileUploader'

export default function PreviousAnalysesPanel() {
  const [open, setOpen] = useState(true)

  return (
    <div
      className={`fixed top-0 right-0 h-full w-96 bg-white shadow-lg border-l z-50 transition-transform duration-300 ${
        open ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">Upload a Repo</h2>
        <button
          onClick={() => setOpen(false)}
          className="text-sm text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>
      </div>

      <div className="p-4 h-full overflow-y-auto">
        <FileUploader onComplete={(res) => setOpen(false)} />
      </div>
    </div>
  )
}
