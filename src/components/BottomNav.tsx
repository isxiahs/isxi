import React from 'react';
import { Home, BookOpen, FileText, Mail } from 'lucide-react';
import { TabView } from '../types';

interface BottomNavProps {
  activeTab: TabView;
  onSelectTab: (tab: TabView) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onSelectTab }) => {
  const navItems: { tab: TabView; label: string; icon: React.FC<{ className?: string }> }[] = [
    { tab: 'HOME', label: 'HOME', icon: Home },
    { tab: 'BLOG', label: 'BLOG', icon: FileText },
    { tab: 'ABOUT', label: 'ABOUT', icon: BookOpen },
    { tab: 'CONTACT', label: 'CONTACT', icon: Mail },
  ];

  return (
    <nav className="sticky bottom-0 z-40 bg-[#131314]/98 backdrop-blur-md border-t border-[#262628] px-4 py-2.5">
      <div className="max-w-md mx-auto grid grid-cols-4 gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.tab;
          return (
            <button
              key={item.tab}
              onClick={() => onSelectTab(item.tab)}
              className={`flex flex-col items-center justify-center py-1 transition-colors focus:outline-none ${
                isActive ? 'text-[#F4F2EC]' : 'text-[#7E7E7E] hover:text-[#C7C7BF]'
              }`}
            >
              <Icon className={`w-4 h-4 mb-1 stroke-[1.5] ${isActive ? 'text-[#F4F2EC]' : 'text-[#7E7E7E]'}`} />
              <span className={`font-grotesk text-[10px] tracking-[0.16em] uppercase ${isActive ? 'font-medium text-[#F4F2EC]' : 'font-normal'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
