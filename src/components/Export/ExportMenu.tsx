'use client'

import { useState } from 'react'
import { Generation } from '@/types/generation'
import { Button } from '@/components/UI/Button'
import { Card } from '@/components/UI/Card'
import { Spinner } from '@/components/UI/Spinner'
import { generateEnhancedPDF, downloadPDF } from '@/lib/export/pdf-enhanced'
import { generateDocx, downloadDocx } from '@/lib/export/docx'
import { generateMarkdown, downloadMarkdown } from '@/lib/export/markdown'

interface ExportMenuProps {
  generation: Generation
  isOpen: boolean
  onClose: () => void
}

export const ExportMenu = ({ generation, isOpen, onClose }: ExportMenuProps) => {
  const [exporting, setExporting] = useState(false)
  const [exportMessage, setExportMessage] = useState('')

  if (!isOpen) return null

  const projectName = generation.projectName || generation.problemStatement.substring(0, 50)

  const handlePDFExport = async () => {
    try {
      setExporting(true)
      setExportMessage('Generating PDF...')

      const blob = generateEnhancedPDF(
        generation.artifacts,
        generation.problemStatement,
        generation.category,
        projectName,
        { includeMetadata: true, includeTOC: true, includePageNumbers: true }
      )

      downloadPDF(blob, `${projectName.replace(/\s+/g, '-')}.pdf`)
      setExportMessage('PDF downloaded successfully!')
      setTimeout(() => {
        onClose()
        setExportMessage('')
      }, 1500)
    } catch (error) {
      console.error('PDF export failed:', error)
      setExportMessage('Failed to generate PDF')
    } finally {
      setExporting(false)
    }
  }

  const handleDocxExport = async () => {
    try {
      setExporting(true)
      setExportMessage('Generating Word document...')

      const blob = await generateDocx(
        generation.artifacts,
        generation.problemStatement,
        generation.category,
        projectName,
        { includeMetadata: true, includeTOC: true }
      )

      downloadDocx(blob, `${projectName.replace(/\s+/g, '-')}.docx`)
      setExportMessage('Word document downloaded successfully!')
      setTimeout(() => {
        onClose()
        setExportMessage('')
      }, 1500)
    } catch (error) {
      console.error('DOCX export failed:', error)
      setExportMessage('Failed to generate Word document')
    } finally {
      setExporting(false)
    }
  }

  const handleMarkdownExport = () => {
    try {
      setExporting(true)
      setExportMessage('Generating Markdown...')

      const markdown = generateMarkdown(
        generation.artifacts,
        generation.problemStatement,
        generation.category,
        projectName,
        { includeMetadata: true, includeTOC: true }
      )

      downloadMarkdown(markdown, `${projectName.replace(/\s+/g, '-')}.md`)
      setExportMessage('Markdown file downloaded successfully!')
      setTimeout(() => {
        onClose()
        setExportMessage('')
      }, 1500)
    } catch (error) {
      console.error('Markdown export failed:', error)
      setExportMessage('Failed to generate Markdown')
    } finally {
      setExporting(false)
    }
  }

  const handleCopyAll = async () => {
    try {
      setExporting(true)
      setExportMessage('Copying all artifacts...')

      let allContent = `Project: ${projectName}\n`
      allContent += `Category: ${generation.category}\n`
      allContent += `Generated: ${new Date().toLocaleDateString()}\n`
      allContent += `\n---\n\n`

      allContent += `Problem Statement:\n${generation.problemStatement}\n\n`
      allContent += `---\n\n`

      Object.entries(generation.artifacts).forEach(([_key, value]) => {
        const content = typeof value === 'string' ? value : value.content
        allContent += `${content}\n\n---\n\n`
      })

      await navigator.clipboard.writeText(allContent)
      setExportMessage('All artifacts copied to clipboard!')
      setTimeout(() => {
        onClose()
        setExportMessage('')
      }, 1500)
    } catch (error) {
      console.error('Copy failed:', error)
      setExportMessage('Failed to copy to clipboard')
    } finally {
      setExporting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <Card variant="elevated" className="w-full max-w-lg">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Export Project</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Choose how you&apos;d like to export your artifacts
          </p>
        </div>

        {exporting ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Spinner size="lg" label={exportMessage} />
          </div>
        ) : (
          <div className="space-y-3 mb-6">
            <button
              onClick={handlePDFExport}
              disabled={exporting}
              className="w-full p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-cyan-500 dark:hover:border-cyan-500 transition-all text-left hover:bg-cyan-50 dark:hover:bg-cyan-900/20"
            >
              <div className="font-semibold text-gray-900 dark:text-white mb-1">📄 PDF Document</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Professional PDF with TOC, metadata, and page numbers
              </div>
            </button>

            <button
              onClick={handleDocxExport}
              disabled={exporting}
              className="w-full p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-cyan-500 dark:hover:border-cyan-500 transition-all text-left hover:bg-cyan-50 dark:hover:bg-cyan-900/20"
            >
              <div className="font-semibold text-gray-900 dark:text-white mb-1">📝 Word Document</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Formatted .docx file ready for editing
              </div>
            </button>

            <button
              onClick={handleMarkdownExport}
              disabled={exporting}
              className="w-full p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-cyan-500 dark:hover:border-cyan-500 transition-all text-left hover:bg-cyan-50 dark:hover:bg-cyan-900/20"
            >
              <div className="font-semibold text-gray-900 dark:text-white mb-1">📋 Markdown File</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                GitHub-ready markdown with YAML front matter
              </div>
            </button>

            <button
              onClick={handleCopyAll}
              disabled={exporting}
              className="w-full p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 transition-all text-left hover:bg-gray-50 dark:hover:bg-gray-800/50"
            >
              <div className="font-semibold text-gray-900 dark:text-white mb-1">📋 Copy All Text</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Copy all artifacts to clipboard
              </div>
            </button>
          </div>
        )}

        {exportMessage && (
          <div className="mb-6 p-3 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 text-sm font-medium">
            {exportMessage}
          </div>
        )}

        {/* Close Button */}
        <div className="flex gap-2">
          <Button variant="ghost" fullWidth onClick={onClose} disabled={exporting}>
            Close
          </Button>
        </div>
      </Card>
    </div>
  )
}
