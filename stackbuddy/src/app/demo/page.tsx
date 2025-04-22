'use client'

import LanguageBreakdownCard from '@/components/dashboard/LanguageBreakdownCard'
import StackCategoryCard from '@/components/dashboard/StackCategoryCard'
import Navbar from '@/components/layout/Navbar'
import { demoAnalysis } from '@/data/demoAnalysis'

export default function DemoPage() {
  const getLanguageBreakdown = () => {
    const byLang: Record<string, number> = {}

    demoAnalysis.files.forEach(file => {
      const ext = file.extension
      const lang =
        ext === '.py' ? 'Python' :
        ext === '.js' ? 'JavaScript' :
        ext === '.ts' ? 'TypeScript' :
        ext === '.html' ? 'HTML' :
        ext === '.json' ? 'JSON' : 'Other'

      byLang[lang] = (byLang[lang] || 0) + file.lineCount
    })

    return Object.entries(byLang).map(([language, lines]) => ({ language, lines }))
  }

  const buildStackCardData = (key: 'tools' | 'infra' | 'frameworks' | 'tests') => {
    const detected = demoAnalysis.stack[key] || []
  
    const recommended: {
      name: string
      priority: 'high' | 'medium' | 'low' // ✅ force literal union type
      reason: string
    }[] = [
      { name: 'Prettier', priority: 'high', reason: 'Missing formatter' },
      { name: 'Docker Compose', priority: 'medium', reason: 'Recommended for container orchestration' },
      { name: 'CI/CD', priority: 'low', reason: 'Consider adding GitHub Actions or similar' }
    ]
  
    return { detected, recommended }
  }
  

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

    <Navbar /><main className="p-6 space-y-6">
      {/* <h1 className="text-2xl font-bold mb-4">📦 Demo Repo Analysis</h1> */}
      <div>
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
        {/* Project Info Block (2/3 width on large screens) */}
        <div className="lg:col-span-2 rounded-xl border border-gray-200 p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Project Name</h1>
          <p className="text-gray-600 text-sm">
            This is a brief description of the uploaded project. It includes insights into detected stacks and suggestions for improvement.
          </p>
        </div>

        {/* Language Breakdown Card (1/3 width on large screens) */}
        <LanguageBreakdownCard data={getLanguageBreakdown()} />
      </div>


      
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        <StackCategoryCard title="Tools" {...buildStackCardData('tools')} />
        <StackCategoryCard title="Infra" {...buildStackCardData('infra')} />
        <StackCategoryCard title="Tests" {...buildStackCardData('tests')} />
        <StackCategoryCard title="Frameworks" {...buildStackCardData('frameworks')} />
      </div>
    </main>
    {/* CTA Footer */}
    <div className="border-t border-gray-200 bg-white p-6 text-center mt-auto shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Ready to try it on your own project?</h2>
      <p className="text-gray-600 mb-4 text-sm">
        Upload your own codebase and get a personalized StackBuddy analysis.
      </p>
      <button
        onClick={() => window.location.href = '/signup'}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        Sign Up & Try It Free
      </button>
    </div>
    </div>
    
  )
}
