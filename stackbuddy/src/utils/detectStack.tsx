// src/utils/detectStack.ts

export type DetectedStack = {
    language: string
    frameworks: string[]
    tools: string[]
    infra: string[]
    tests: string[]
  }
  
  export function detectStack(filePaths: string[]): DetectedStack {
    const files = filePaths.map(f => f.toLowerCase())
  
    const stack: DetectedStack = {
      language: '',
      frameworks: [],
      tools: [],
      infra: [],
      tests: [],
    }
  
    // 🧠 Language
    if (files.some(f => f.endsWith('.py'))) stack.language = 'Python'
    if (files.some(f => f.endsWith('.js'))) stack.language = 'JavaScript'
    if (files.some(f => f.endsWith('.ts'))) stack.language = 'TypeScript'

    // 🧩 Frameworks
    if (files.some(f => f.includes('django/'))) stack.frameworks.push('Django')
    if (files.some(f => f.includes('fastapi'))) stack.frameworks.push('FastAPI')
    if (files.includes('package.json') && files.some(f => f.includes('next'))) stack.frameworks.push('Next.js')
    if (files.includes('vite.config.js') || files.includes('vite.config.ts')) stack.frameworks.push('Vite')
    if (files.includes('angular.json')) stack.frameworks.push('Angular')
    if (files.includes('vue.config.js')) stack.frameworks.push('Vue')

    // 🔧 Tools
    if (files.includes('pyproject.toml')) stack.tools.push('Poetry')
    if (files.includes('poetry.lock')) stack.tools.push('Poetry')
    if (files.includes('requirements.txt')) stack.tools.push('pip')
    if (files.includes('environment.yml')) stack.tools.push('conda')
    if (files.includes('package.json')) stack.tools.push('npm/yarn')
    if (files.includes('makefile')) stack.tools.push('Make')
    if (files.includes('.pre-commit-config.yaml')) stack.tools.push('pre-commit')
    if (files.includes('ruff.toml')) stack.tools.push('Ruff')
    if (files.includes('.eslintrc') || files.includes('.eslintrc.json') || files.includes('.eslintrc.js')) stack.tools.push('ESLint')
    if (files.includes('.prettierrc') || files.includes('.prettierrc.js') || files.includes('.prettierrc.json')) stack.tools.push('Prettier')
    if (files.includes('babel.config.js') || files.includes('.babelrc')) stack.tools.push('Babel')
    if (files.includes('tsconfig.json')) stack.tools.push('TypeScript')
    if (files.includes('webpack.config.js')) stack.tools.push('Webpack')
    if (files.includes('rollup.config.js')) stack.tools.push('Rollup')
    if (files.includes('husky.config.js') || files.some(f => f.startsWith('.husky/'))) stack.tools.push('Husky')

    // 🐳 Infra
    if (files.some(f => f.endsWith('/dockerfile') || f.endsWith('\\dockerfile'))) stack.infra.push('Docker')
    if (files.includes('docker-compose.yml')) stack.infra.push('Docker Compose')
    if (files.includes('terraform.tf') || files.some(f => f.endsWith('.tf'))) stack.infra.push('Terraform')
    if (files.includes('pulumi.yaml')) stack.infra.push('Pulumi')
    if (files.includes('template.yaml') || files.includes('samconfig.toml')) stack.infra.push('AWS SAM')
    if (files.includes('serverless.yml') || files.includes('serverless.ts')) stack.infra.push('Serverless Framework')
    if (files.includes('Procfile')) stack.infra.push('Heroku')
    if (files.includes('netlify.toml')) stack.infra.push('Netlify')
    if (files.includes('vercel.json')) stack.infra.push('Vercel')
    if (files.includes('playbook.yml') || files.includes('ansible.cfg')) stack.infra.push('Ansible')
    if (files.includes('Jenkinsfile')) stack.infra.push('Jenkins')
    if (files.includes('Chart.yaml') || files.includes('values.yaml')) stack.infra.push('Helm')
    if (files.includes('.circleci/config.yml')) stack.infra.push('CircleCI')

    // 🧪 Test Tools
    if (files.includes('pytest.ini') || files.includes('conftest.py')) stack.tests.push('Pytest')
    if (files.includes('jest.config.js') || files.includes('jest.config.ts')) stack.tests.push('Jest')
    if (files.includes('vitest.config.ts') || files.includes('vitest.config.js')) stack.tests.push('Vitest')
    if (files.includes('cypress.config.ts') || files.includes('cypress.json')) stack.tests.push('Cypress')
    if (files.includes('playwright.config.ts')) stack.tests.push('Playwright')
    if (files.includes('selenium') || files.some(f => f.includes('selenium'))) stack.tests.push('Selenium')
    if (files.includes('testcontainers') || files.some(f => f.includes('testcontainers'))) stack.tests.push('Testcontainers')
    if (files.some(f => f.endsWith('.postman_collection.json'))) stack.tests.push('Postman')

    // ⚙️ CI/CD
    if (files.some(f => f.startsWith('.github/workflows/'))) stack.tools.push('GitHub Actions')
    if (files.includes('.gitlab-ci.yml')) stack.tools.push('GitLab CI')
    if (files.includes('.travis.yml')) stack.tools.push('Travis CI')
    if (files.includes('azure-pipelines.yml')) stack.tools.push('Azure Pipelines')
    if (files.includes('bitbucket-pipelines.yml')) stack.tools.push('Bitbucket Pipelines')

    // 🧠 AI / LLM / NLP Indicators
    if (files.some(f => f.includes('llm') || f.includes('openai'))) stack.tools.push('OpenAI')
    if (files.includes('transformers')) stack.tools.push('HuggingFace Transformers')

  
    return stack
  }
  