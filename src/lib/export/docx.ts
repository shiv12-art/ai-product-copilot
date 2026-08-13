import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  PageBreak,
  Table,
  TableRow,
  TableCell,
  UnderlineType,
} from 'docx'

type ArtifactInput = Record<string, string | { content: string; editedAt?: string }>

interface DocxOptions {
  includeMetadata?: boolean
  includeTOC?: boolean
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

export async function generateDocx(
  artifacts: ArtifactInput,
  problemStatement: string,
  category: string,
  projectName: string = 'Product Strategy',
  options: DocxOptions = {}
): Promise<Blob> {
  const { includeMetadata = true, includeTOC = true } = options

  const sections = []

  // Title Page
  const titlePageContent = [
    new Paragraph({
      text: 'AI Product Copilot',
      heading: HeadingLevel.HEADING_1,
      themeColor: 'accent1',
      size: 72,
      bold: true,
      spacing: { after: 200 },
    }),
    new Paragraph({
      text: projectName,
      heading: HeadingLevel.HEADING_2,
      size: 48,
      spacing: { after: 400 },
    }),
  ]

  if (includeMetadata) {
    titlePageContent.push(
      new Paragraph({
        text: `Category: ${category}`,
        size: 24,
        spacing: { after: 100 },
      }),
      new Paragraph({
        text: `Generated: ${new Date().toLocaleDateString()}`,
        size: 22,
      })
    )
  }

  titlePageContent.push(new PageBreak())

  // Table of Contents
  let tocContent = []
  if (includeTOC) {
    tocContent = [
      new Paragraph({
        text: 'Table of Contents',
        heading: HeadingLevel.HEADING_1,
        spacing: { after: 200 },
      }),
    ]

    Object.entries(artifacts).forEach(([_key, _value], index) => {
      const title = ARTIFACT_TITLES[_key] || _key
      tocContent.push(
        new Paragraph({
          text: `${index + 1}. ${title}`,
          spacing: { after: 100 },
          indent: { left: 200 },
        })
      )
    })

    tocContent.push(new PageBreak())
  }

  // Problem Statement
  let problemContent = []
  if (includeMetadata) {
    problemContent = [
      new Paragraph({
        text: 'Problem Statement',
        heading: HeadingLevel.HEADING_1,
        spacing: { after: 200 },
      }),
      new Paragraph({
        text: problemStatement,
        spacing: { after: 400 },
        alignment: 'justified',
      }),
      new PageBreak(),
    ]
  }

  // Artifacts
  const artifactsContent = []
  Object.entries(artifacts).forEach(([key, value]) => {
    const title = ARTIFACT_TITLES[key] || key
    const content = typeof value === 'string' ? value : value.content

    artifactsContent.push(
      new Paragraph({
        text: title,
        heading: HeadingLevel.HEADING_2,
        spacing: { after: 200 },
      })
    )

    // Split content by lines for better formatting
    const lines = content.split('\n')
    lines.forEach((line) => {
      if (line.trim()) {
        artifactsContent.push(
          new Paragraph({
            text: line,
            spacing: { after: 100 },
            alignment: 'justified',
          })
        )
      }
    })

    artifactsContent.push(
      new Paragraph({
        text: '',
        spacing: { after: 200 },
      })
    )
  })

  // Footer
  const footerContent = [
    new Paragraph({
      text: '_Generated with AI Product Copilot_',
      italics: true,
      size: 20,
      spacing: { before: 200 },
    }),
  ]

  const allContent = [
    ...titlePageContent,
    ...tocContent,
    ...problemContent,
    ...artifactsContent,
    ...footerContent,
  ]

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: allContent,
      },
    ],
  })

  const blob = await Packer.toBlob(doc)
  return blob
}

export function downloadDocx(blob: Blob, filename: string = 'product-strategy.docx'): void {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
