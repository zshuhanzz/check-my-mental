import { NavLink } from 'react-router-dom';
import { LayoutDashboard, MessageCircle, ClipboardCheck, BookOpen, Settings, Download, LogOut } from 'lucide-react';

export default function Sidebar({ onLogout }: { onLogout: () => void }) {
  const links = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/chat', icon: MessageCircle, label: 'Talk to Luna' },
    { to: '/check-in', icon: ClipboardCheck, label: 'Check-in' },
    { to: '/journal', icon: BookOpen, label: 'Journal' },
    { to: '/export', icon: Download, label: 'Export' },
    { to: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-[#EDE5FF] h-full">
      <div className="p-6">
        <h1 className="text-xl font-bold" style={{ color: '#7E57C2' }}>
          <span className="inline-block w-8 h-8 bg-[#7E57C2] rounded-full text-center text-white text-sm leading-8 mr-2">M</span>
          My Mind
        </h1>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium ${
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
        <button onClick={onLogout} className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-gray-400 hover:bg-red-50 hover:text-red-400 w-full">
          <LogOut size={18} />
          Log out
        </button>
      </div>
    </aside>
  );
}
