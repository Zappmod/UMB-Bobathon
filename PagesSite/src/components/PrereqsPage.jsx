import { useState } from 'react'

const Section = ({ number, title, children }) => (
  <div className="mb-10">
    <div className="flex items-center gap-3 mb-4">
      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-ibm-blue text-white text-sm font-bold flex items-center justify-center">
        {number}
      </span>
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
    </div>
    <div className="ml-11">{children}</div>
  </div>
)

const Step = ({ label, children }) => (
  <div className="mb-4">
    <p className="text-sm font-semibold text-gray-700 mb-1">{label}</p>
    <div className="text-sm text-gray-600 leading-relaxed">{children}</div>
  </div>
)

const CodeBlock = ({ children }) => (
  <div className="bg-gray-900 text-green-400 font-mono text-sm rounded-lg px-4 py-3 my-2 overflow-x-auto">
    <pre className="whitespace-pre-wrap">{children}</pre>
  </div>
)

const Callout = ({ type = 'tip', title, children }) => {
  const styles = {
    tip:       'border-green-500 bg-green-50 text-green-900',
    warning:   'border-yellow-400 bg-yellow-50 text-yellow-900',
    important: 'border-red-500 bg-red-50 text-red-900',
    info:      'border-ibm-blue bg-blue-50 text-blue-900',
  }
  return (
    <div className={`border-l-4 rounded px-4 py-3 my-3 text-sm ${styles[type]}`}>
      {title && <p className="font-semibold uppercase tracking-wide text-xs mb-1">{title}</p>}
      {children}
    </div>
  )
}

const OSTabs = ({ windows, mac }) => {
  const [os, setOs] = useState('windows')
  return (
    <div className="my-4">
      <div className="flex gap-0 mb-0 border-b border-gray-200">
        {['windows', 'mac'].map(tab => (
          <button
            key={tab}
            onClick={() => setOs(tab)}
            className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
              os === tab
                ? 'border-ibm-blue text-ibm-blue bg-white'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab === 'windows' ? '🪟 Windows' : '🍎 macOS / Linux'}
          </button>
        ))}
      </div>
      <div className="border border-gray-200 border-t-0 rounded-b-lg p-4 bg-white text-sm text-gray-700 leading-relaxed">
        {os === 'windows' ? windows : mac}
      </div>
    </div>
  )
}

export default function PrereqsPage() {
  return (
    <div className="min-h-screen bg-ibm-bg pt-12">
      <div className="max-w-3xl mx-auto px-8 py-12">

        {/* Page header */}
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-ibm-indigo mb-2">Before You Begin</p>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Prerequisites</h1>
          <p className="text-gray-500 leading-relaxed">
            Complete these steps on your laptop before the Workshop. Each lab relies on Java 21 and Maven being installed and available on your system PATH. The whole setup takes about 10–15 minutes.
          </p>
        </div>

        {/* Checklist overview */}
        <div className="bg-white border border-ibm-border rounded-xl p-6 mb-10">
          <p className="text-sm font-semibold text-gray-700 mb-3">What you'll install</p>
          <ul className="space-y-2 text-sm text-gray-600">
            {[
              ['Java 21 (JDK)', 'Required by IBM Z Open Editor and the lab build scripts'],
              ['Apache Maven 3.9+', 'Required to build and package the GenApp sample project'],
              ['PATH configuration', 'Makes java and mvn available from any terminal'],
              ['JAVA_HOME (optional)', 'Needed if IBM Z Open Editor cannot auto-detect Java'],
            ].map(([item, desc]) => (
              <li key={item} className="flex items-start gap-3">
                <svg className="h-4 w-4 text-green-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span>
                  <span className="font-medium text-gray-800">{item}</span> — {desc}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Section 1: Java 21 ── */}
        <Section number="1" title="Install Java 21 (JDK)">
          <p className="text-sm text-gray-600 mb-4 leading-relaxed">
            IBM Z Open Editor requires a 64-bit Java 21 JDK. The recommended distribution is{' '}
            <a
              href="https://developer.ibm.com/languages/java/semeru-runtimes/downloads/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ibm-blue underline hover:text-blue-700"
            >
              IBM Semeru Runtimes ↗
            </a>
            , IBM's free, open-source OpenJ9-based JDK available for all platforms.
          </p>
          <Callout type="info" title="Which JDK?">
            Either the <strong>JDK</strong> (Java Development Kit) or <strong>JRE</strong> (Java Runtime Environment) works for running the extension,
            but the labs use Maven which requires the full <strong>JDK</strong>. Download the JDK.
          </Callout>
          <OSTabs
            windows={
              <>
                <Step label="Step 1 — Download the installer">
                  Go to{' '}
                  <a href="https://developer.ibm.com/languages/java/semeru-runtimes/downloads/" target="_blank" rel="noopener noreferrer" className="text-ibm-blue underline">
                    IBM Semeru Runtimes Downloads ↗
                  </a>
                  {' '}and select <strong>Version 21</strong>, <strong>Windows</strong>, <strong>x64</strong>, then download the <strong>.msi</strong> installer.
                </Step>
                <Step label="Step 2 — Run the installer">
                  Double-click the <code className="bg-gray-100 px-1 rounded">.msi</code> file. When prompted, check both:
                  <ul className="list-disc ml-5 mt-1 space-y-0.5">
                    <li><strong>Add to PATH</strong></li>
                    <li><strong>Set JAVA_HOME variable</strong></li>
                  </ul>
                  This saves you from doing it manually in Step 3.
                </Step>
                <Step label="Step 3 — Verify">
                  Open a <strong>new</strong> Command Prompt or PowerShell window and run:
                  <CodeBlock>java -version</CodeBlock>
                  You should see output like: <code className="bg-gray-100 px-1 rounded">openjdk version "21.x.x"</code>
                </Step>
              </>
            }
            mac={
              <>
                <Step label="Option A — Homebrew (recommended)">
                  If you have{' '}
                  <a href="https://brew.sh" target="_blank" rel="noopener noreferrer" className="text-ibm-blue underline">Homebrew ↗</a>
                  {' '}installed:
                  <CodeBlock>brew install --cask ibm-semeru-open-jdk21</CodeBlock>
                  Homebrew sets up the PATH automatically.
                </Step>
                <Step label="Option B — Manual installer">
                  Go to{' '}
                  <a href="https://developer.ibm.com/languages/java/semeru-runtimes/downloads/" target="_blank" rel="noopener noreferrer" className="text-ibm-blue underline">
                    IBM Semeru Runtimes Downloads ↗
                  </a>
                  {' '}and select <strong>Version 21</strong>, <strong>macOS</strong>, then download the <strong>.pkg</strong> file for your chip (x64 for Intel, aarch64 for Apple Silicon). Run the installer and follow the prompts.
                </Step>
                <Step label="Verify">
                  Open a new Terminal window and run:
                  <CodeBlock>java -version</CodeBlock>
                  You should see: <code className="bg-gray-100 px-1 rounded">openjdk version "21.x.x"</code>
                </Step>
              </>
            }
          />
        </Section>

        {/* ── Section 2: Maven ── */}
        <Section number="2" title="Install Apache Maven">
          <p className="text-sm text-gray-600 mb-4 leading-relaxed">
            Maven is the build tool used to compile and package the GenApp sample project. Download the latest 3.9.x binary from the{' '}
            <a
              href="https://maven.apache.org/download.cgi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ibm-blue underline hover:text-blue-700"
            >
              Apache Maven download page ↗
            </a>.
          </p>
          <OSTabs
            windows={
              <>
                <Step label="Step 1 — Download">
                  From{' '}
                  <a href="https://maven.apache.org/download.cgi" target="_blank" rel="noopener noreferrer" className="text-ibm-blue underline">maven.apache.org ↗</a>
                  , download the <strong>Binary zip archive</strong> (e.g. <code className="bg-gray-100 px-1 rounded">apache-maven-3.9.x-bin.zip</code>).
                </Step>
                <Step label="Step 2 — Extract">
                  Extract the zip to a permanent location, such as:
                  <CodeBlock>C:\Program Files\Maven\apache-maven-3.9.x</CodeBlock>
                  Avoid paths with spaces if possible.
                </Step>
                <Step label="Step 3 — Add to PATH">
                  <ol className="list-decimal ml-5 space-y-1 mt-1">
                    <li>Press <strong>Win + S</strong>, search for <em>"Edit the system environment variables"</em> and open it.</li>
                    <li>Click <strong>Environment Variables…</strong></li>
                    <li>Under <em>System variables</em>, find <strong>Path</strong> and click <strong>Edit…</strong></li>
                    <li>Click <strong>New</strong> and add: <code className="bg-gray-100 px-1 rounded">C:\Program Files\Maven\apache-maven-3.9.x\bin</code></li>
                    <li>Click <strong>OK</strong> on all dialogs.</li>
                  </ol>
                </Step>
                <Step label="Step 4 — Verify">
                  Open a <strong>new</strong> Command Prompt and run:
                  <CodeBlock>mvn -version</CodeBlock>
                  Expected output: <code className="bg-gray-100 px-1 rounded">Apache Maven 3.9.x</code>
                </Step>
              </>
            }
            mac={
              <>
                <Step label="Option A — Homebrew (recommended)">
                  <CodeBlock>brew install maven</CodeBlock>
                  Homebrew handles PATH automatically.
                </Step>
                <Step label="Option B — Manual install">
                  Download the <strong>Binary tar.gz archive</strong> from{' '}
                  <a href="https://maven.apache.org/download.cgi" target="_blank" rel="noopener noreferrer" className="text-ibm-blue underline">maven.apache.org ↗</a>
                  , then:
                  <CodeBlock>{`tar -xzf apache-maven-3.9.x-bin.tar.gz\nsudo mv apache-maven-3.9.x /opt/maven`}</CodeBlock>
                  Then add to your shell profile (see Section 3 below).
                </Step>
                <Step label="Verify">
                  Open a new Terminal and run:
                  <CodeBlock>mvn -version</CodeBlock>
                </Step>
              </>
            }
          />
        </Section>

        {/* ── Section 3: PATH ── */}
        <Section number="3" title="Configure the System PATH">
          <p className="text-sm text-gray-600 mb-4 leading-relaxed">
            If you used installers or Homebrew in Steps 1–2, your PATH is already set — skip to the verification step. If you extracted manually, follow the steps below.
          </p>
          <OSTabs
            windows={
              <>
                <Step label="Verify both tools are on the PATH">
                  Open a <strong>new</strong> Command Prompt (important — existing windows won't see changes) and run both:
                  <CodeBlock>{`java -version\nmvn -version`}</CodeBlock>
                  Both should print version numbers without "not recognized" errors.
                </Step>
                <Callout type="warning" title="New window required">
                  Environment variable changes only take effect in <strong>newly opened</strong> terminal windows. Close and reopen your terminal after editing variables.
                </Callout>
              </>
            }
            mac={
              <>
                <Step label="Add Maven to your shell profile (manual install only)">
                  Open your shell profile in a text editor. For <strong>zsh</strong> (default on macOS 10.15+):
                  <CodeBlock>nano ~/.zshrc</CodeBlock>
                  Add these two lines at the bottom:
                  <CodeBlock>{`export M2_HOME=/opt/maven\nexport PATH=$M2_HOME/bin:$PATH`}</CodeBlock>
                  Save the file (<kbd className="bg-gray-100 px-1 rounded text-xs">Ctrl+O</kbd>, <kbd className="bg-gray-100 px-1 rounded text-xs">Enter</kbd>, <kbd className="bg-gray-100 px-1 rounded text-xs">Ctrl+X</kbd>), then reload:
                  <CodeBlock>source ~/.zshrc</CodeBlock>
                </Step>
                <Step label="Verify">
                  <CodeBlock>{`java -version\nmvn -version`}</CodeBlock>
                  Both should print version numbers.
                </Step>
              </>
            }
          />
        </Section>

        {/* ── Section 4: JAVA_HOME in VS Code ── */}
        <Section number="4" title="Set JAVA_HOME in IBM Z Open Editor (if needed)">
          <p className="text-sm text-gray-600 mb-4 leading-relaxed">
            IBM Z Open Editor will try to detect Java automatically. If the Java prerequisite check in the extension shows a <span className="text-red-600 font-medium">red ✗</span> instead of a green ✓, follow these steps to point it at your Java installation manually.
          </p>
          <Callout type="tip" title="Check the prerequisite first">
            Open the IBM Z Open Editor welcome page and look at the prerequisite checklist. If Java shows a green checkmark, you can skip this section entirely.
          </Callout>
          <Step label="Step 1 — Open the Extensions panel">
            Press <kbd className="bg-gray-100 px-1 rounded text-xs font-mono">Ctrl+Shift+X</kbd> (Windows/Linux) or <kbd className="bg-gray-100 px-1 rounded text-xs font-mono">Cmd+Shift+X</kbd> (macOS) and locate <strong>IBM Z Open Editor</strong> under INSTALLED.
          </Step>
          <Step label="Step 2 — Open its Settings">
            Click the <strong>gear icon</strong> on the IBM Z Open Editor extension entry (or right-click it) and choose <strong>Settings</strong>.
          </Step>
          <Step label="Step 3 — Set the JAVA_HOME path">
            In the Settings search box, type <code className="bg-gray-100 px-1 rounded">java</code>. Find the setting{' '}
            <strong>Zopeneditor: JAVA_HOME</strong> and enter the full path to your 64-bit Java install — for example:
            <OSTabs
              windows={<CodeBlock>C:\Program Files\IBM\ibm-semeru-open-21</CodeBlock>}
              mac={<CodeBlock>/Library/Java/JavaVirtualMachines/ibm-semeru-open-21.jdk/Contents/Home</CodeBlock>}
            />
            <Callout type="important" title="Do not include \bin\java">
              The path must point to the <strong>Java folder itself</strong> — do <em>not</em> include the <code className="bg-gray-100 px-1 rounded">\bin\java</code> suffix.
            </Callout>
          </Step>
          <Step label="Step 4 — Restart VS Code">
            The setting applies to all profiles and takes effect after you fully restart the editor.
          </Step>
        </Section>

        {/* ── Helpful links ── */}
        <div className="bg-white border border-ibm-border rounded-xl p-6 mb-10">
          <p className="text-sm font-semibold text-gray-700 mb-4">Helpful Links</p>
          <ul className="space-y-3 text-sm">
            {[
              ['IBM Semeru Runtimes Downloads', 'https://developer.ibm.com/languages/java/semeru-runtimes/downloads/', "IBM's free OpenJ9-based Java 21 JDK — all platforms"],
              ['Apache Maven Download', 'https://maven.apache.org/download.cgi', 'Latest Maven binary archives'],
              ['Maven Install Guide', 'https://maven.apache.org/install.html', 'Official step-by-step Maven installation instructions'],
              ['IBM Z Open Editor docs', 'https://ibm.github.io/zopeneditor-about/', 'Official documentation including Java requirements'],
              ['Homebrew (macOS)', 'https://brew.sh', 'Package manager for macOS — simplest way to install Java & Maven'],
            ].map(([label, href, desc]) => (
              <li key={href} className="flex items-start gap-3">
                <svg className="h-4 w-4 text-ibm-blue mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
                <span>
                  <a href={href} target="_blank" rel="noopener noreferrer" className="text-ibm-blue underline hover:text-blue-700 font-medium">{label} ↗</a>
                  <span className="text-gray-500 ml-1">— {desc}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-center text-xs text-gray-400 mt-8">
          Created by Sophie Harrison &amp; Renate Hamrick — Application Modernization for Z team
        </p>
      </div>
    </div>
  )
}
