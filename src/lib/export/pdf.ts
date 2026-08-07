import jsPDF from 'jspdf'

type ArtifactInput = Record<string, string | { content: string; editedAt?: string }>

export function generatePDF(
  artifacts: ArtifactInput,
  problemStatement: string,
  category: string,
  artifactName?: string
): Blob {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  })

  const pageHeight = doc.internal.pageSize.getHeight()
  const pageWidth = doc.internal.pageSize.getWidth()
  const margin = 15
  const textWidth = pageWidth - 2 * margin
  let yPosition = margin

  // Helper function to add text with wrapping
  const addWrappedText = (text: string, fontSize: number, isBold: boolean = false) => {
    doc.setFontSize(fontSize)
    doc.setFont('helvetica', isBold ? 'bold' : 'normal')

    const lines = doc.splitTextToSize(text, textWidth)
    const lineHeight = fontSize * 0.35

    for (const line of lines) {
      if (yPosition + lineHeight > pageHeight - margin) {
        doc.addPage()
        yPosition = margin
      }
      doc.text(line, margin, yPosition)
      yPosition += lineHeight
    }
  }

  // Title page
  addWrappedText('AI Product Copilot', 24, true)
  yPosition += 5

  if (artifactName) {
    addWrappedText(artifactName, 18, true)
  } else {
    addWrappedText('Complete Product Plan', 18, true)
  }

  yPosition += 10
  addWrappedText(`Category: ${category}`, 12)
  addWrappedText(`Generated: ${new Date().toLocaleDateString()}`, 12)

  yPosition += 10
  doc.setDrawColor(200)
  doc.line(margin, yPosition, pageWidth - margin, yPosition)
  yPosition += 5

  addWrappedText('Problem Statement', 14, true)
  yPosition += 2
  addWrappedText(problemStatement, 11)
  yPosition += 10

  // Add artifacts
  const artifactEntries = artifactName
    ? Object.entries(artifacts).filter(([key]) => key === artifactName.toLowerCase().replace(/\s/g, '').split('(')[0].slice(0, 3))
    : Object.entries(artifacts)

  for (const [key, value] of artifactEntries) {
    if (yPosition > pageHeight - 40) {
      doc.addPage()
      yPosition = margin
    }

    doc.setDrawColor(200)
    doc.line(margin, yPosition, pageWidth - margin, yPosition)
    yPosition += 5

    const title = key.charAt(0).toUpperCase() + key.slice(1)
    addWrappedText(title, 14, true)
    yPosition += 5

    const content = typeof value === 'string' ? value : value.content
    addWrappedText(content, 10)
    yPosition += 10
  }

  return doc.output('blob')
}

export function downloadPDF(
  blob: Blob,
  filename: string = 'product-artifacts.pdf'
): void {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
