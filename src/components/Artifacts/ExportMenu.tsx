'use client'

import { useState } from 'react'
import { Generation } from '@/types/generation'
import { generatePDF, downloadPDF } from '@/lib/export/pdf'
import { generateMarkdown, downloadMarkdown } from '@/lib/export/markdown'
import { copyToClipboard } from '@/lib/export/clipboard'
import { Download, Copy, CheckCircle } from 'lucide-react'

interface ExportMenuProps {
  artifact: string
  artifactName: string
  generation: Generation
}

export function ExportMenu({ artifact, artifactName, generation }: ExportMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [exporting, setExporting] = useState(false)

  const handleExportPDF = async () => {
    setExporting(true)
    try {
      const blob = generatePDF(
        generation.artifacts,
        generation.problemStatement,
        generation.category,
        artifactName
      )
      downloadPDF(blob, `${artifactName.toLowerCase().replace(/\s+/g, '-')}.pdf`)
    } catch (error) {
      console.error('PDF export failed:', error)
      alert('Failed to export PDF')
    } finally {
      setExporting(false)
      setIsOpen(false)
    }
  }

  const handleExportAllPDF = async () => {
    setExporting(true)
    try {
      const blob = generatePDF(
        generation.artifacts,
        generation.problemStatement,
        generation.category
      )
      downloadPDF(blob, 'product-plan-complete.pdf')
    } catch (error) {
      console.error('PDF export failed:', error)
      alert('Failed to export PDF')
    } finally {
      setExporting(false)
      setIsOpen(false)
    }
  }

  const handleExportMarkdown = async () => {
    setExporting(true)
    try {
      const markdown = generateMarkdown(
        generation.artifacts,
        generation.problemStatement,
        generation.category
      )
      downloadMarkdown(markdown, 'product-plan.md')
    } catch (error) {
      console.error('Markdown export failed:', error)
      alert('Failed to export Markdown')
    } finally {
      setExporting(false)
      setIsOpen(false)
    }
  }

  const handleCopyToClipboard = async () => {
    const success = await copyToClipboard(artifact)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      setIsOpen(false)
    } else {
      alert('Failed to copy to clipboard')
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={exporting}
        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors"
      >
        <Download size={16} />
        {exporting ? 'Exporting...' : 'Export'}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
          <div className="p-2 space-y-1">
            <button
              onClick={handleExportPDF}
              disabled={exporting}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors text-sm text-gray-700 dark:text-gray-300 disabled:opacity-50"
            >
              📄 Export This Artifact (PDF)
            </button>

            <button
              onClick={handleExportAllPDF}
              disabled={exporting}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors text-sm text-gray-700 dark:text-gray-300 disabled:opacity-50"
            >
              📑 Export All (PDF)
            </button>

            <button
              onClick={handleExportMarkdown}
              disabled={exporting}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors text-sm text-gray-700 dark:text-gray-300 disabled:opacity-50"
            >
              📝 Export All (Markdown)
            </button>

            <div className="border-t border-gray-200 dark:border-gray-700 my-1" />

            <button
              onClick={handleCopyToClipboard}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2"
            >
              {copied ? (
                <>
                  <CheckCircle size={16} className="text-green-600" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy size={16} />
                  Copy to Clipboard
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}
