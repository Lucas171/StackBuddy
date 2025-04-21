'use client'

import React, { useState } from 'react'

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
  const [activeTab, setActiveTab] = useState<'good' | 'recommended'>('good')

  return (
    <div className="rounded-xl border p-4 shadow bg-white">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold">{title}</h2>
        <div className="flex space-x-2 text-sm">
          <button
            onClick={() => setActiveTab('good')}
            className={`px-2 py-1 rounded ${
              activeTab === 'good' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Good
          </button>
          <button
            onClick={() => setActiveTab('recommended')}
            className={`px-2 py-1 rounded ${
              activeTab === 'recommended' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Recommended
          </button>
        </div>
      </div>

      {/* Tabs */}
      {activeTab === 'good' ? (
        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
          {detected.length > 0 ? (
            detected.map((item, i) => <li key={i}>{item}</li>)
          ) : (
            <p className="text-gray-500 italic">None detected</p>
          )}
        </ul>
      ) : (
        <ul className="space-y-2">
          {recommended.length > 0 ? (
            recommended.map((rec, i) => (
              <li
                key={i}
                className={`p-2 rounded text-sm ${
                  rec.priority === 'high'
                    ? 'bg-red-100 border-l-4 border-red-500'
                    : rec.priority === 'medium'
                    ? 'bg-yellow-100 border-l-4 border-yellow-500'
                    : 'bg-green-100 border-l-4 border-green-500'
                }`}
              >
                <strong>{rec.name}</strong>: {rec.reason}
              </li>
            ))
          ) : (
            <p className="text-gray-500 italic">No recommendations</p>
          )}
        </ul>
      )}
    </div>
  )
}
