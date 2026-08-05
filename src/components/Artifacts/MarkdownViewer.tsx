'use client'

interface MarkdownViewerProps {
  content: string
}

export function MarkdownViewer({ content }: MarkdownViewerProps) {
  const renderMarkdown = (markdown: string) => {
    // Simple markdown to JSX conversion
    const lines = markdown.split('\n')
    const elements: React.ReactNode[] = []

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]

      // Headers
      if (line.startsWith('# ')) {
        elements.push(
          <h1 key={i} className="text-4xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">
            {line.slice(2)}
          </h1>
        )
      } else if (line.startsWith('## ')) {
        elements.push(
          <h2 key={i} className="text-3xl font-bold mt-6 mb-3 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
            {line.slice(3)}
          </h2>
        )
      } else if (line.startsWith('### ')) {
        elements.push(
          <h3 key={i} className="text-xl font-semibold mt-4 mb-2 text-gray-900 dark:text-white">
            {line.slice(4)}
          </h3>
        )
      }
      // Horizontal rule
      else if (line.startsWith('---') || line.startsWith('***')) {
        elements.push(<hr key={i} className="my-6 border-gray-200 dark:border-gray-700" />)
      }
      // Code block
      else if (line.startsWith('```')) {
        const codeLines: string[] = []
        let j = i + 1
        while (j < lines.length && !lines[j].startsWith('```')) {
          codeLines.push(lines[j])
          j++
        }
        elements.push(
          <pre key={i} className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4 overflow-x-auto">
            <code className="text-gray-800 dark:text-gray-200 text-sm font-mono">
              {codeLines.join('\n')}
            </code>
          </pre>
        )
        i = j
      }
      // Unordered list
      else if (line.startsWith('- ')) {
        const listItems: string[] = [line.slice(2)]
        let j = i + 1
        while (j < lines.length && lines[j].startsWith('- ')) {
          listItems.push(lines[j].slice(2))
          j++
        }
        elements.push(
          <ul key={i} className="list-disc list-inside my-4 space-y-2 text-gray-700 dark:text-gray-300">
            {listItems.map((item, idx) => (
              <li key={idx}>{formatInline(item)}</li>
            ))}
          </ul>
        )
        i = j - 1
      }
      // Ordered list
      else if (line.match(/^\d+\. /)) {
        const listItems: string[] = [line.replace(/^\d+\. /, '')]
        let j = i + 1
        while (j < lines.length && lines[j].match(/^\d+\. /)) {
          listItems.push(lines[j].replace(/^\d+\. /, ''))
          j++
        }
        elements.push(
          <ol key={i} className="list-decimal list-inside my-4 space-y-2 text-gray-700 dark:text-gray-300">
            {listItems.map((item, idx) => (
              <li key={idx}>{formatInline(item)}</li>
            ))}
          </ol>
        )
        i = j - 1
      }
      // Tables (basic support)
      else if (line.includes('|')) {
        const tableLines: string[] = [line]
        let j = i + 1
        while (j < lines.length && lines[j].includes('|')) {
          tableLines.push(lines[j])
          j++
        }
        elements.push(renderTable(tableLines, i.toString()))
        i = j - 1
      }
      // Blockquote
      else if (line.startsWith('> ')) {
        elements.push(
          <blockquote key={i} className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 my-4 italic text-gray-700 dark:text-gray-300">
            {line.slice(2)}
          </blockquote>
        )
      }
      // Paragraph
      else if (line.trim()) {
        elements.push(
          <p key={i} className="text-gray-700 dark:text-gray-300 my-4 leading-relaxed">
            {formatInline(line)}
          </p>
        )
      }
    }

    return elements
  }

  return (
    <div className="prose dark:prose-invert max-w-none text-gray-900 dark:text-gray-100">
      {renderMarkdown(content)}
    </div>
  )
}

function formatInline(text: string): React.ReactNode {
  // Bold
  text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  // Italic
  text = text.replace(/\*(.*?)\*/g, '<em>$1</em>')
  // Inline code
  text = text.replace(/`(.*?)`/g, '<code>$1</code>')

  const parts: React.ReactNode[] = []
  const regex = /(<strong>.*?<\/strong>|<em>.*?<\/em>|<code>.*?<\/code>)/g
  let lastIndex = 0
  let match

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index))
    }

    if (match[0].startsWith('<strong>')) {
      parts.push(
        <strong key={parts.length} className="font-semibold text-gray-900 dark:text-white">
          {match[0].slice(8, -9)}
        </strong>
      )
    } else if (match[0].startsWith('<em>')) {
      parts.push(
        <em key={parts.length} className="italic">
          {match[0].slice(4, -5)}
        </em>
      )
    } else if (match[0].startsWith('<code>')) {
      parts.push(
        <code key={parts.length} className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono text-gray-800 dark:text-gray-200">
          {match[0].slice(6, -7)}
        </code>
      )
    }

    lastIndex = regex.lastIndex
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex))
  }

  return parts.length > 0 ? parts : text
}

function renderTable(lines: string[], key: string): React.ReactNode {
  const rows = lines
    .filter((line) => line.trim())
    .map((line) =>
      line
        .split('|')
        .map((cell) => cell.trim())
        .filter((cell) => cell && !cell.match(/^[-:\s]+$/))
    )

  if (rows.length < 2) return null

  const headers = rows[0]
  const body = rows.slice(2)

  return (
    <div key={key} className="overflow-x-auto my-4">
      <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-800">
            {headers.map((header, idx) => (
              <th
                key={idx}
                className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left font-semibold text-gray-900 dark:text-white"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((row, rowIdx) => (
            <tr key={rowIdx} className="hover:bg-gray-50 dark:hover:bg-gray-800">
              {row.map((cell, cellIdx) => (
                <td
                  key={cellIdx}
                  className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-700 dark:text-gray-300"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
