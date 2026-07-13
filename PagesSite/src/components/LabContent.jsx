import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import mermaid from 'mermaid'

mermaid.initialize({ startOnLoad: false, theme: 'neutral', securityLevel: 'loose' })

const BASE = '/UMB-Bobathon'

// Pre-process Quarto callout syntax → HTML divs react-markdown can render
function preprocessCallouts(md) {
  return md.replace(
    /:::\s*\{\.callout-(tip|warning|important)\}\s*\n##\s*(.+?)\n([\s\S]*?):::/g,
    (_, type, title, body) =>
      `<div class="callout callout-${type}"><strong>${title}</strong>\n\n${body.trim()}</div>`
  )
}

// Pre-process ACTION: lines → styled action-block divs
function preprocessActions(md) {
  return md.replace(
    /^ACTION:\s*(.+)$/gm,
    (_, rest) =>
      `<div class="action-block"><span class="action-label">ACTION:</span> ${rest}</div>`
  )
}

function MermaidBlock({ code }) {
  const ref = useRef(null)
  const id = useRef(`mermaid-${Math.random().toString(36).slice(2)}`)

  useEffect(() => {
    if (!ref.current) return
    mermaid.render(id.current, code).then(({ svg }) => {
      if (ref.current) ref.current.innerHTML = svg
    }).catch(() => {
      if (ref.current) ref.current.innerHTML = `<pre>${code}</pre>`
    })
  }, [code])

  return <div className="mermaid-wrapper" ref={ref} />
}

function CodeBlock({ className, children }) {
  const [copied, setCopied] = useState(false)
  const lang = (className || '').replace('language-', '')
  const code = String(children).replace(/\n$/, '')

  if (lang === 'mermaid' || lang === '{mermaid}') {
    return <MermaidBlock code={code} />
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="code-block-wrapper">
      <button className="copy-btn" onClick={handleCopy}>
        {copied ? '✓ Copied' : 'Copy'}
      </button>
      <pre><code>{code}</code></pre>
    </div>
  )
}

function LabImage({ src, alt }) {
  // Rewrite relative image paths to the correct public URL
  const resolved = src && !src.startsWith('http')
    ? `${BASE}/lab-instructions/${src}`
    : src
  return (
    <img
      src={resolved}
      alt={alt || ''}
      className="rounded-lg shadow-md max-w-full my-4 border border-gray-100"
    />
  )
}

export default function LabContent({ lab }) {
  const [markdown, setMarkdown] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!lab) return
    setLoading(true)
    fetch(`${BASE}/lab-instructions/${lab.file}`)
      .then(r => r.text())
      .then(text => {
        let processed = preprocessCallouts(text)
        processed = preprocessActions(processed)
        setMarkdown(processed)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [lab])

  if (!lab) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        Select a lab from the sidebar to get started.
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-8 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <Link to="/" className="hover:text-ibm-blue transition-colors">Labs</Link>
        <span>/</span>
        <span className="text-gray-700 font-medium">{lab.title}</span>
      </div>

      {/* Badges */}
      <div className="flex items-center gap-2 mb-6">
        <span className="text-xs bg-ibm-active text-ibm-indigo font-medium px-2.5 py-1 rounded-full">⏱ {lab.duration}</span>
        <span className="text-xs bg-gray-100 text-gray-600 font-medium px-2.5 py-1 rounded-full">{lab.difficulty}</span>
      </div>

      {loading ? (
        <div className="space-y-4 animate-pulse">
          {[100, 80, 60, 90, 70].map((w, i) => (
            <div key={i} className={`h-4 bg-gray-200 rounded`} style={{ width: `${w}%` }} />
          ))}
        </div>
      ) : (
        <div className="prose prose-gray max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              code({ className, children }) {
                const isInline = !String(children).includes('\n') && !className
                if (isInline) {
                  return <code className="bg-gray-100 text-ibm-indigo px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>
                }
                return <CodeBlock className={className}>{children}</CodeBlock>
              },
              img({ src, alt }) {
                return <LabImage src={src} alt={alt} />
              },
            }}
          >
            {markdown}
          </ReactMarkdown>
        </div>
      )}
    </div>
  )
}
