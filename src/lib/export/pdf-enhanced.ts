import jsPDF from 'jspdf'

type ArtifactInput = Record<string, string | { content: string; editedAt?: string }>

interface PDFOptions {
  includeMetadata?: boolean
  includeTOC?: boolean
  includePageNumbers?: boolean
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

export function generateEnhancedPDF(
  artifacts: ArtifactInput,
  problemStatement: string,
  category: string,
  projectName: string = 'Product Strategy',
  options: PDFOptions = {}
): Blob {
  const {
    includeMetadata = true,
    includeTOC = true,
    includePageNumbers = true,
  } = options

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  })

  const pageHeight = doc.internal.pageSize.getHeight()
  const pageWidth = doc.internal.pageSize.getWidth()
  const margin = 20
  const textWidth = pageWidth - 2 * margin
  let yPosition = margin
  let pageNumber = 1

  // Colors
  const primaryColor = [37, 99, 235] as [number, number, number] // Blue
  const textColor = [30, 41, 59] as [number, number, number] // Dark slate
  const lightColor = [226, 232, 240] as [number, number, number] // Light slate

  // Helper to add page numbers
  const addPageNumber = () => {
    if (includePageNumbers) {
      doc.setFontSize(9)
      doc.setTextColor(148, 163, 184) // Gray
      doc.text(`Page ${pageNumber}`, pageWidth - margin - 10, pageHeight - 10, { align: 'right' })
      doc.setTextColor(...textColor)
    }
  }

  // Helper to add new page
  const newPage = () => {
    addPageNumber()
    doc.addPage()
    pageNumber++
    yPosition = margin
  }

  // Helper to add text with wrapping
  const addText = (text: string, fontSize: number = 11, options: { bold?: boolean; color?: [number, number, number] } = {}) => {
    const { bold = false, color = textColor } = options
    doc.setFontSize(fontSize)
    doc.setFont('helvetica', bold ? 'bold' : 'normal')
    doc.setTextColor(...color)

    const lines = doc.splitTextToSize(text, textWidth)
    const lineHeight = fontSize * 0.5

    for (const line of lines) {
      if (yPosition + lineHeight > pageHeight - margin - 10) {
        newPage()
      }
      doc.text(line, margin, yPosition)
      yPosition += lineHeight
    }
  }

  // Helper to add heading
  const addHeading = (text: string, level: number = 1) => {
    const sizes = { 1: 24, 2: 18, 3: 14 }
    const size = sizes[level as keyof typeof sizes] || 12
    yPosition += level === 1 ? 10 : 5

    if (yPosition + size > pageHeight - margin - 10) {
      newPage()
    }

    doc.setFontSize(size)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...primaryColor)
    doc.text(text, margin, yPosition)
    yPosition += size * 0.6
    yPosition += 5
  }

  // Helper to add horizontal line
  const addLine = () => {
    if (yPosition + 5 > pageHeight - margin - 10) {
      newPage()
    }
    doc.setDrawColor(...lightColor)
    doc.line(margin, yPosition + 2, pageWidth - margin, yPosition + 2)
    yPosition += 8
  }

  // Title Page
  doc.setFillColor(...primaryColor)
  doc.rect(0, 0, pageWidth, pageHeight, 'F')

  doc.setFontSize(36)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(255, 255, 255)
  doc.text('AI Product Copilot', pageWidth / 2, pageHeight / 3, { align: 'center' })

  doc.setFontSize(20)
  doc.setTextColor(255, 255, 255)
  doc.text(projectName, pageWidth / 2, pageHeight / 2, { align: 'center' })

  if (includeMetadata) {
    doc.setFontSize(12)
    doc.setTextColor(255, 255, 255)
    doc.text(`Category: ${category}`, pageWidth / 2, pageHeight / 2 + 30, { align: 'center' })
    doc.setFontSize(10)
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, pageWidth / 2, pageHeight - 40, { align: 'center' })
  }

  newPage()

  // Table of Contents
  if (includeTOC) {
    addHeading('Table of Contents', 1)

    const artifactKeys = Object.keys(artifacts)
    let tocYPosition = yPosition

    doc.setFontSize(11)
    doc.setTextColor(...textColor)

    artifactKeys.forEach((key, index) => {
      const title = ARTIFACT_TITLES[key] || key
      const pageRef = 2 + index + (includeMetadata ? 1 : 0)
      doc.text(`${index + 1}. ${title}`, margin + 5, tocYPosition)
      tocYPosition += 8
    })

    yPosition = tocYPosition + 10
    addLine()
    newPage()
  }

  // Problem Statement
  if (includeMetadata) {
    addHeading('Problem Statement', 1)
    addText(problemStatement)
    addLine()
    newPage()
  }

  // Artifacts
  Object.entries(artifacts).forEach(([key, value]) => {
    const title = ARTIFACT_TITLES[key] || key
    const content = typeof value === 'string' ? value : value.content

    addHeading(title, 2)

    // Add content with better formatting
    const lines = doc.splitTextToSize(content, textWidth)
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(50, 50, 50)

    lines.forEach((line: string) => {
      if (yPosition + 4 > pageHeight - margin - 10) {
        newPage()
      }
      doc.text(line, margin, yPosition)
      yPosition += 4
    })

    yPosition += 5
    addLine()
    newPage()
  })

  // Final page number
  addPageNumber()

  return doc.output('blob')
}

export function downloadPDF(blob: Blob, filename: string = 'product-strategy.pdf'): void {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
