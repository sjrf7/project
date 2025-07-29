import React from 'react';
import { User, Trophy, Users, BookOpen } from 'lucide-react';

interface HeaderProps {
  currentUser: any;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentUser, activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Trophy },
    { id: 'modules', label: 'Learn', icon: BookOpen },
    { id: 'community', label: 'Community', icon: Users },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <>
      <header className="glass-card border-b border-white/5 sticky top-0 z-50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#78dbe2] via-[#7877c6] to-[#ff77c6] flex items-center justify-center text-xl font-bold text-white">
                L3
              </div>
              <div>
                <h1 className="text-xl font-bold text-gradient-primary">CryptoLearn</h1>
                <p className="text-xs text-gray-400 font-medium">LATAM Edition</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`nav-item px-6 py-2.5 rounded-lg font-medium text-sm transition-all ${
                    activeTab === item.id
                      ? 'active text-white bg-white/10'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    {item.icon && <item.icon className="w-4 h-4" />}
                    <span>{item.label}</span>
                  </div>
                </button>
              ))}
            </nav>

            {/* User Info */}
            <div className="flex items-center space-x-4">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-semibold text-white">{currentUser.username}</p>
                <div className="flex items-center space-x-2 text-xs text-gray-400">
                  <span>Level {currentUser.level}</span>
                  <span>•</span>
                  <span>{currentUser.xp} XP</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff77c6] to-[#7877c6] flex items-center justify-center text-lg">
                {currentUser.avatar}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation fixed at bottom */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-lg border-t border-white/10 z-50 px-4 py-2">
        <nav className="flex items-center justify-between">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`nav-item flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-all ${
                activeTab === item.id
                  ? 'active text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {item.icon && <item.icon className="w-5 h-5" />}
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </>
  );
};
