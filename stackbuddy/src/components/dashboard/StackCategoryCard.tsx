'use client'

import React from 'react'

type Recommendation = {
  name: string
  priority: 'high' | 'medium' | 'low'
  reason: string
}

type StackCategoryCardProps = {
  title: string
  detected: string[]
  recommended: Recommendation[]
}

export default function StackCategoryCard({ title, detected, recommended }: StackCategoryCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-md p-4 space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Left: 1/4 width */}
        <div className="md:col-span-1">
          <h3 className="text-sm font-medium text-blue-700 mb-2">Detected in Project</h3>
          {detected.length > 0 ? (
            <ul className="space-y-2 text-sm">
              {detected.map((item, i) => (
                <li key={i} className="p-2 rounded border-l-4 bg-blue-50 border-blue-500">
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-400 italic">None detected</p>
          )}
        </div>

        {/* Right: Good + Recommendations */}
        <div className="md:col-span-3 space-y-4">
          <div>
            <h3 className="text-sm font-medium text-green-700 mb-1">✅ What's Good?</h3>
            {detected.length > 0 ? (
              <ul className="space-y-2 text-sm">
                {detected.map((item, i) => (
                  <li key={i} className="p-2 rounded border-l-4 bg-green-50 border-green-500">
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-400 italic">No good matches</p>
            )}
          </div>

          <div>
            <h3 className="text-sm font-medium text-red-700 mb-1">🛠️ Recommendations</h3>
            {recommended.length > 0 ? (
              <ul className="space-y-2 text-sm">
                {recommended.map((rec, i) => (
                  <li
                    key={i}
                    className={`p-2 rounded border-l-4 ${
                      rec.priority === 'high'
                        ? 'bg-red-50 border-red-500'
                        : rec.priority === 'medium'
                        ? 'bg-yellow-50 border-yellow-500'
                        : 'bg-green-50 border-green-500'
                    }`}
                  >
                    <strong>{rec.name}</strong>: {rec.reason}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-400 italic">No recommendations</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
