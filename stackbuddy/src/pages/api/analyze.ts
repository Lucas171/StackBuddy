import type { NextApiRequest, NextApiResponse } from 'next'
import formidable from 'formidable'
import fs from 'fs-extra'
import path from 'path'
import os from 'os'
import { randomUUID } from 'crypto'
import AdmZip from 'adm-zip'
import { scanDirectory } from '@/utils/scanDirectory'
import { detectStack } from '@/utils/detectStack'  // 👈 Import added

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' })
  }

  const form = formidable({ multiples: false })

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: 'Formidable failed', err })

    const uploadedFile = files.file?.[0]
    if (!uploadedFile) {
      return res.status(400).json({ error: 'No file uploaded' })
    }

    // 🔽 Create a temp directory
    const tempDir = path.join(os.tmpdir(), `stackbuddy-${randomUUID()}`)
    console.log('🗂️ Temp extract location:', tempDir)

    await fs.ensureDir(tempDir)

    // 🔽 Unzip file into temp directory
    const buffer = await fs.promises.readFile(uploadedFile.filepath)
    const zip = new AdmZip(buffer)
    // ⛔️ Don't extract node_modules, dist, etc.
    const EXCLUDED = ['node_modules', '.git', '.next', 'dist', 'build', '.vscode', '__pycache__']

    zip.getEntries().forEach(entry => {
      const entryName = entry.entryName.replace(/\\/g, '/').toLowerCase()

      const isExcluded = EXCLUDED.some(excluded =>
        entryName.includes(`${excluded}/`) || entryName.startsWith(`${excluded}/`)
      )

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


    // 🔍 Recursively scan files
    const scanned = await scanDirectory(tempDir)

    // 🧠 Stack detection
    const paths = scanned.map(f => f.relativePath) // 👈 Get list of relative file paths
    const stackInfo = detectStack(paths)            // 👈 Detect stack from paths

    console.log('🔍 Detected Stack:', stackInfo)

    return res.status(200).json({
      success: true,
      stack: stackInfo,       // 👈 Include in response
      files: scanned,
    })
  })
}
