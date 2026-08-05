import { Artifacts } from '@/types/generation'

export function generateMarkdown(
  artifacts: Artifacts,
  problemStatement: string,
  category: string
): string {
  let markdown = ''

  markdown += `# Product Development Plan\n\n`
  markdown += `**Category:** ${category}\n`
  markdown += `**Generated:** ${new Date().toLocaleDateString()}\n\n`
  markdown += `---\n\n`

  markdown += `## Problem Statement\n\n${problemStatement}\n\n---\n\n`

  const artifactTitles: Record<keyof Artifacts, string> = {
    canvas: 'Product Canvas',
    prd: 'Product Requirements Document',
    gtm: 'Go-to-Market Strategy',
    features: 'Feature Specification',
    validation: 'Validation Plan',
  }

  for (const [key, content] of Object.entries(artifacts)) {
    const title = artifactTitles[key as keyof Artifacts]
    markdown += `\n## ${title}\n\n${content}\n\n---\n`
  }

  markdown += `\n_Generated with AI Product Copilot_\n`

  return markdown
}

export function downloadMarkdown(
  markdown: string,
  filename: string = 'product-plan.md'
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
