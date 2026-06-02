import React from 'react';
import { Home, Pizza, Award, User } from 'lucide-react';
import { motion } from 'motion/react';

interface BottomNavProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
}

export default function BottomNav({ currentScreen, onNavigate }: BottomNavProps) {
  // Only display BottomNav on primary navigational views
  const isNavigableScreen = ['home', 'menu', 'rewards', 'profile'].includes(currentScreen);
  if (!isNavigableScreen) return null;

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'menu', label: 'Menu', icon: Pizza },
    { id: 'rewards', label: 'Rewards', icon: Award },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-md border-t border-gray-100 z-50 pt-2 pb-safe-bottom shadow-lg md:hidden">
      <div className="flex justify-around items-center h-14 px-2">
        {navItems.map((item) => {
          const isActive = currentScreen === item.id;
          const IconComponent = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center flex-1 py-1 px-2 rounded-xl transition-all duration-200 cursor-pointer relative ${
                isActive ? 'text-[#af101a] font-bold' : 'text-[#5f5e5e]'
              }`}
            >
              <div className="relative">
                <IconComponent 
                  size={22} 
                  strokeWidth={isActive ? 2.5 : 2}
                  className="transition-transform duration-200" 
                />
                
                {/* Active indicator dot */}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#af101a] rounded-full"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </div>
              <span className="font-sans text-[11px] mt-1 tracking-tight">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
