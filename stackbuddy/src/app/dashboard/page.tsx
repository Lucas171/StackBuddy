'use client'

import { useState } from 'react'
import FileUploader from '@/components/FileUploader'
import LanguageBreakdownCard from '@/components/dashboard/LanguageBreakdownCard'
import StackCategoryCard from '@/components/dashboard/StackCategoryCard'
import Navbar from '@/components/layout/Navbar'
import PreviousAnalysesPanel from '@/components/PreviousAnalysis'


export default function Home() {
  const [analysisResult, setAnalysisResult] = useState<null | {
    stack: {
      language: string
      frameworks: string[]
      tools: string[]
      infra: string[]
      tests: string[]
    }
    files: {
      extension: string
      lineCount: number
      relativePath: string
    }[]
  }>(null)

  // Handle result from uploader (pass this to <FileUploader />)
  const handleUploadComplete = (result: any) => {
    setAnalysisResult(result)
  }

  const getLanguageBreakdown = () => {
    const byLang: Record<string, number> = {}

    analysisResult?.files.forEach(file => {
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
    const detected = analysisResult?.stack?.[key] || []
  
    const recommended: {
      name: string
      priority: 'high' | 'medium' | 'low'
      reason: string
    }[] = [
      { name: 'Prettier', priority: 'high', reason: 'Missing formatter' },
      { name: 'Docker Compose', priority: 'medium', reason: 'Add orchestration for Docker services' },
      { name: 'CI/CD', priority: 'low', reason: 'Consider adding continuous integration pipeline' }
    ]
  
    return { detected, recommended }
  }

  return (
    <>
      <Navbar />
      
      <main className="p-6 space-y-6">
        <PreviousAnalysesPanel analyses={[]} />
        <FileUploader onComplete={handleUploadComplete} />

        {analysisResult && (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <LanguageBreakdownCard data={getLanguageBreakdown()} />
            <StackCategoryCard title="Tools" {...buildStackCardData('tools')} />
            <StackCategoryCard title="Infra" {...buildStackCardData('infra')} />
            <StackCategoryCard title="Tests" {...buildStackCardData('tests')} />
            <StackCategoryCard title="Frameworks" {...buildStackCardData('frameworks')} />
          </div>
        )}
      </main>
    </>
    
  )
}
