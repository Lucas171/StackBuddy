'use client'

import LanguageBreakdownCard from '@/components/dashboard/LanguageBreakdownCard'
import StackCategoryCard from '@/components/dashboard/StackCategoryCard'
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
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">📦 Demo Repo Analysis</h1>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <LanguageBreakdownCard data={getLanguageBreakdown()} />
        <StackCategoryCard title="Tools" {...buildStackCardData('tools')} />
        <StackCategoryCard title="Infra" {...buildStackCardData('infra')} />
        <StackCategoryCard title="Tests" {...buildStackCardData('tests')} />
        <StackCategoryCard title="Frameworks" {...buildStackCardData('frameworks')} />
      </div>
    </main>
  )
}
