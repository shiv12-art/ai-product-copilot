type ArtifactInput = Record<string, string | { content: string; editedAt?: string }>

interface MarkdownOptions {
  includeMetadata?: boolean
  includeTOC?: boolean
  projectName?: string
}

const ARTIFACT_TITLES: Record<string, string> = {
  canvas: 'Product Canvas',
  prd: 'Product Requirements Document',
  gtm: 'Go-to-Market Strategy',
  features: 'Feature Specification',
  validation: 'Validation Plan',
  competitive: 'Competitive Analysis',
  metrics: 'Success Metrics & KPIs',
}

export function generateMarkdown(
  artifacts: ArtifactInput,
  problemStatement: string,
  category: string,
  projectName: string = 'Product Strategy',
  options: MarkdownOptions = {}
): string {
  const { includeMetadata = true, includeTOC = true } = options

  let markdown = ''

  // YAML Front Matter
  if (includeMetadata) {
    markdown += `---\n`
    markdown += `title: "${projectName}"\n`
    markdown += `category: "${category}"\n`
    markdown += `generated: "${new Date().toISOString()}"\n`
    markdown += `generator: "AI Product Copilot"\n`
    markdown += `---\n\n`
  }

  // Title
  markdown += `# ${projectName}\n\n`

  // Metadata
  if (includeMetadata) {
    markdown += `**Category:** ${category}  \n`
    markdown += `**Generated:** ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}\n\n`
  }

  // Problem Statement
  markdown += `## Problem Statement\n\n${problemStatement}\n\n`

  // Table of Contents
  if (includeTOC) {
    markdown += `## Table of Contents\n\n`
    const artifactKeys = Object.keys(artifacts)
    artifactKeys.forEach((key, index) => {
      const title = ARTIFACT_TITLES[key] || key
      const anchor = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
      markdown += `${index + 1}. [${title}](#${anchor})\n`
    })
    markdown += `\n---\n\n`
  }

  // Artifacts
  Object.entries(artifacts).forEach(([key, value]) => {
    const title = ARTIFACT_TITLES[key] || key
    const content = typeof value === 'string' ? value : value.content

    markdown += `## ${title}\n\n`
    markdown += `${content}\n\n`
    markdown += `---\n\n`
  })

  // Footer
  markdown += `_Generated with [AI Product Copilot](https://ai-product-copilot.vercel.app)_\n`

  return markdown
}

export function downloadMarkdown(
  markdown: string,
  filename: string = 'product-strategy.md'
): void {
  const blob = new Blob([markdown], { type: 'text/markdown' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
