const BASE = '/UMB-Bobathon'

const formats = [
  {
    label: 'PDF',
    file: 'lab-guide.pdf',
    icon: (
      <svg className="h-6 w-6 text-ibm-indigo" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
  },
  {
    label: 'Word (.docx)',
    file: 'lab-guide.docx',
    icon: (
      <svg className="h-6 w-6 text-ibm-indigo" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
      </svg>
    ),
  },
]

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-ibm-bg pt-12">
      <div className="max-w-3xl mx-auto px-8 py-12">

        <h1 className="text-2xl font-bold text-gray-900 mb-2">Lab Guide Download</h1>
        <p className="text-gray-500 mb-1 leading-relaxed">
          The interactive site is the recommended way to follow along — it keeps you in context as you work.
          These downloads are provided for take-home reference only.
        </p>
        <p className="text-xs text-gray-400 mb-8">Note: downloaded files will not include live updates made to the site.</p>

        <div className="flex flex-col gap-4">
          {formats.map(({ label, file, icon }) => (
            <div key={file} className="bg-white border border-ibm-border rounded-xl p-5 flex items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="shrink-0 bg-ibm-active rounded-lg p-2.5">{icon}</div>
                <p className="font-semibold text-gray-900">{label}</p>
              </div>
              <a
                href={`${BASE}/${file}`}
                download={file}
                className="shrink-0 inline-flex items-center gap-2 border border-ibm-blue text-ibm-blue px-4 py-2 rounded text-sm font-semibold hover:bg-ibm-blue hover:text-white transition-colors"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                Download
              </a>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-gray-400 mt-8">
          Created by Sophie Harrison &amp; Renate Hamrick — Application Modernization for Z team
        </p>
      </div>
    </div>
  )
}
