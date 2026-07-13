import { Link, useParams } from 'react-router-dom'

export default function Sidebar({ labs }) {
  const { labId } = useParams()

  return (
    <aside className="w-52 shrink-0 bg-white border-r border-ibm-border flex flex-col h-full">
      {/* Section label */}
      <div className="px-4 pt-5 pb-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Labs</p>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-2 py-1 space-y-0.5">
        {labs.map((lab, idx) => {
          const isActive = labId === lab.id
          return (
            <Link
              key={lab.id}
              to={`/lab/${lab.id}`}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-md text-sm transition-all no-underline ${
                isActive
                  ? 'bg-ibm-active text-ibm-indigo font-semibold border-l-4 border-ibm-indigo pl-2'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-l-4 border-transparent pl-2'
              }`}
            >
              <span className="text-base leading-none">{lab.icon}</span>
              <span className="leading-snug">
                <span className="block text-xs text-gray-400 font-normal">Lab {idx + 1}</span>
                <span className="block text-xs font-medium leading-tight mt-0.5">{lab.title.replace(/^Lab \d+: /, '')}</span>
              </span>
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-ibm-border">
        <div className="flex items-center gap-2 mb-2">
          <img src="/UMB-Bobathon/Bob2.png" alt="Bob" className="h-8 w-8 object-contain shrink-0" />
          <div>
            <p className="text-xs font-semibold text-gray-700 leading-none">IBM Bob</p>
            <p className="text-xs text-gray-400 leading-tight mt-0.5">Premium Package for Z</p>
          </div>
        </div>
        <p className="text-[10px] text-gray-400 leading-tight">Created by Sophie Harrison &amp; Renate Hamrick — Application Modernization for Z</p>
      </div>
    </aside>
  )
}
