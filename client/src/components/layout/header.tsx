import { useState } from 'react';
import { Menu } from 'lucide-react';
import MobileNav from './mobile-nav';

export default function Header({ displayName, onLogout }: { displayName: string; onLogout: () => void }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  // figure out greeting based on time
  const hour = new Date().getHours();
  let greeting = 'Hey there';
  if (hour >= 5 && hour < 12) greeting = 'Good morning';
  else if (hour >= 12 && hour < 17) greeting = 'Good afternoon';
  else if (hour >= 17 && hour < 21) greeting = 'Good evening';

  return (
    <>
      <header className="bg-white border-b border-[#EDE5FF] px-4 lg:px-8 py-4 sticky top-0 z-30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setMobileOpen(true)} className="lg:hidden p-2 rounded-xl text-gray-500 hover:bg-[#F5F0FF]">
              <Menu size={20} />
            </button>
            <div>
              <p className="text-sm text-gray-400">{greeting}</p>
              <p className="font-bold text-gray-900">{displayName}</p>
            </div>
          </div>
        </div>
      </header>
      <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} onLogout={onLogout} />
    </>
  );
}
