// src/data/demoAnalysis.ts

export const demoAnalysis = {
    stack: {
      language: 'Python',
      frameworks: ['Django'],
      tools: ['Prettier', 'Black'],
      infra: ['Docker', 'GitHub Actions'],
      tests: ['Pytest'],
    },
    files: [
      { extension: '.py', relativePath: 'app/main.py', lineCount: 320 },
      { extension: '.py', relativePath: 'app/routes/user.py', lineCount: 150 },
      { extension: '.js', relativePath: 'scripts/setup.js', lineCount: 40 },
      { extension: '.dockerfile', relativePath: 'Dockerfile', lineCount: 18 },
      { extension: '.yml', relativePath: '.github/workflows/deploy.yml', lineCount: 25 },
    ],
  }
  