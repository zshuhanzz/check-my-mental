import { NavLink } from 'react-router-dom';
import { X, LayoutDashboard, MessageCircle, ClipboardCheck, BookOpen, Settings, Download, LogOut } from 'lucide-react';

const links = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/chat', icon: MessageCircle, label: 'Talk to Luna' },
  { to: '/check-in', icon: ClipboardCheck, label: 'Check-in' },
  { to: '/journal', icon: BookOpen, label: 'Journal' },
  { to: '/export', icon: Download, label: 'Export' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export default function MobileNav({ isOpen, onClose, onLogout }: { isOpen: boolean; onClose: () => void; onLogout: () => void }) {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-40 lg:hidden" onClick={onClose} />
      <div className="fixed left-0 top-0 bottom-0 w-72 bg-white shadow-lg z-50 lg:hidden flex flex-col">
        <div className="p-6 flex items-center justify-between">
          <h1 className="text-xl font-bold" style={{ color: '#7E57C2' }}>My Mind</h1>
          <button onClick={onClose} className="p-2 rounded-full text-gray-400 hover:bg-gray-100">
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 px-3 space-y-1">
          {links.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${
                  isActive ? 'bg-[#F5F0FF] text-[#7E57C2]' : 'text-gray-500 hover:bg-[#F5F0FF]'
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="p-3 border-t border-[#EDE5FF]">
          <button
            onClick={() => { onLogout(); onClose(); }}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-400 hover:bg-red-50 hover:text-red-400 w-full"
          >
            <LogOut size={18} />
            Log out
          </button>
        </div>
      </div>
    </>
  );
}
