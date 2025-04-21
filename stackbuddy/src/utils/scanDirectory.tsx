// src/utils/scanDirectory.ts
import fs from 'fs-extra'
import path from 'path'

export async function scanDirectory(baseDir: string) {
  const results: {
    relativePath: string
    extension: string
    lineCount: number
  }[] = []

  async function walk(currentPath: string) {
    const entries = await fs.readdir(currentPath, { withFileTypes: true })

    for (const entry of entries) {
      const fullPath = path.join(currentPath, entry.name)
      const relPath = path.relative(baseDir, fullPath)

      if (entry.isDirectory()) {
        await walk(fullPath)
      } else {
        const ext = path.extname(entry.name)
        const content = await fs.readFile(fullPath, 'utf8')
        const lines = content.split('\n').length

        results.push({
          relativePath: relPath,
          extension: ext,
          lineCount: lines,
        })
      }
    }
  }

  await walk(baseDir)
  return results
}
