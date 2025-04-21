// src/utils/readZipToTempDir.ts
import { randomUUID } from 'crypto'
import fs from 'fs-extra'
import os from 'os'
import path from 'path'
import AdmZip from 'adm-zip'

export async function readZipToTempDir(buffer: Buffer): Promise<string> {
  const tempDir = path.join(os.tmpdir(), `stackbuddy-${randomUUID()}`)
  await fs.ensureDir(tempDir)

  const zip = new AdmZip(buffer)
  const EXCLUDED = ['node_modules', '.git', '.next', 'dist', 'build', '.vscode', '__pycache__']
  
  zip.getEntries().forEach(entry => {
    const entryName = entry.entryName.toLowerCase()
    const isExcluded = EXCLUDED.some(exclude => entryName.includes(`${exclude}/`) || entryName.startsWith(`${exclude}/`))
   
    console.log(entryName)
    console.log(isExcluded)
    if (!isExcluded) {
        const targetPath = path.join(tempDir, entry.entryName)
        if (entry.isDirectory) {
        fs.ensureDirSync(targetPath)
        } else {
        fs.ensureDirSync(path.dirname(targetPath))
        fs.writeFileSync(targetPath, entry.getData())
        }
    }
    })

  return tempDir
}
