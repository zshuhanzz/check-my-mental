import { useState } from 'react';
import { Phone, ChevronDown, ChevronUp } from 'lucide-react';
import { crisisResources } from '../../config/constants';

export default function CrisisBanner() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-[#FFE4E9] border-b border-[#FFCCD5]">
      <div className="max-w-7xl mx-auto px-4">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-center gap-2 py-2 text-sm text-gray-700"
        >
          <span>If you're in crisis, help is available. <strong className="text-red-400">Call or text 988</strong></span>
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>

        {expanded && (
          <div className="pb-4 space-y-2">
            {crisisResources.map((r) => (
              <div key={r.name} className="flex items-start gap-3 p-3 bg-white/60 rounded-xl">
                <Phone size={16} className="text-red-400 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm text-gray-900">{r.name}</p>
                  <p className="text-sm text-gray-600">{r.action}</p>
                  {r.url && (
                    <a href={r.url} target="_blank" rel="noopener noreferrer" className="text-xs text-[#7E57C2] underline">
                      Visit website
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
