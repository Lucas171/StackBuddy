import FileUploader from '@/components/FileUploader'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type Analysis = {
    id: string
    name: string
    description: string
    languageStack: string[]
  }
  
  type Props = {
    analyses: Analysis[] // Pass this from a parent or fetch inside here
  }

export default function PreviousAnalysesPanel({ analyses }: Props) {
  const router = useRouter()
  const [open, setOpen] = useState(true)

  const handleNavigate = (id: string) => {
    router.push(`/dashboard/${id}`)
  }

  return (
    <div className={`fixed top-0 right-0 h-full w-96 bg-white shadow-lg border-l transition-transform duration-300 z-50 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">Previous Analyses</h2>
        <button onClick={() => setOpen(false)} className="text-sm text-gray-500 hover:text-gray-700">✕</button>
      </div>

      <div className="flex flex-col h-full">
        <div className="p-4 flex-1 overflow-y-auto space-y-4">
          {analyses.length > 0 ? (
            analyses.map((item) => (
              <div
                key={item.id}
                className="border rounded-lg p-3 cursor-pointer hover:bg-gray-50 transition"
                onClick={() => handleNavigate(item.id)}
              >
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.description}</p>
                <div className="mt-2 text-xs text-gray-600 flex flex-wrap gap-1">
                  {item.languageStack.map((lang, i) => (
                    <span key={i} className="bg-gray-100 px-2 py-0.5 rounded">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-sm text-gray-600">
              <p className="mb-2">You have no previous analyses.</p>
              <p>Use the uploader below to get started!</p>
            </div>
          )}
        </div>

        <div className="border-t p-4">
          <FileUploader
            onComplete={(res) => {
              setOpen(false)
              router.push('/dashboard') // or dynamically open new result
            }}
          />
        </div>
      </div>
    </div>
  )
}
