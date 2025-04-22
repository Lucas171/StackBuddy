import React from 'react'

type LanguageData = {
  language: string
  lines: number
}

type Props = {
  data: LanguageData[]
}

const languageColors: Record<string, string> = {
  Python: 'bg-yellow-400',
  JavaScript: 'bg-blue-400',
  TypeScript: 'bg-sky-500',
  HTML: 'bg-pink-400',
  CSS: 'bg-purple-400',
  JSON: 'bg-green-500',
  Other: 'bg-gray-300',
}

export default function LanguageBreakdownCard({ data }: Props) {
  const totalLines = data.reduce((sum, lang) => sum + lang.lines, 0)

  return (
    <div className="rounded-xl border border-gray-200 p-4 bg-white shadow-md">
      <h2 className="text-lg font-semibold mb-4">Language Breakdown</h2>
      <div className="space-y-4">
        {data.map((lang, index) => {
          const percent = (lang.lines / totalLines) * 100
          const color = languageColors[lang.language] || languageColors['Other']

          return (
            <div key={index}>
              <div className="flex justify-between text-sm mb-1">
                <span>{lang.language}</span>
                <span className="text-gray-600">
                  {lang.lines.toLocaleString()} lines ({percent.toFixed(1)}%)
                </span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded">
                <div
                  className={`${color} h-2 rounded transition-all duration-900`}
                  style={{ width: `${percent}%` }}
                ></div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
