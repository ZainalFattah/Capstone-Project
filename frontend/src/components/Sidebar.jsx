import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, History, Settings, Bot, X } from 'lucide-react';

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  
  const handleLinkClick = () => {
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/history', label: 'Riwayat', icon: History },
    { path: '/settings', label: 'Pengaturan', icon: Settings },
  ];

  return (
    <>
      {/* Overlay Mobile */}
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-30 transition-opacity duration-300 md:hidden ${
          isSidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Sidebar Container */}
      <aside 
        className={`fixed top-0 left-0 z-40 h-screen w-64 bg-white dark:bg-gray-800 border-r border-gray-100 dark:border-gray-700 transition-transform duration-300 ease-in-out flex flex-col
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0`} 
      >
        
        {/* A. HEADER SIDEBAR */}
        <div className="flex items-center justify-between p-6 h-24"> 
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20">
              <Bot size={24} />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-800 dark:text-white leading-tight tracking-tight">
                AI Summarizer
              </h1>
              <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">Capstone v1.0</p>
            </div>
          </div>
          
          {/* Tombol Close (Mobile Only) */}
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* B. MENU NAVIGASI */}
        <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
          <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-2">Menu Utama</p>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={handleLinkClick}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium text-sm
                ${isActive 
                  ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 shadow-sm ring-1 ring-blue-100 dark:ring-blue-800' 
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-gray-200'
                }
              `}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* C. FOOTER SIMPLE (Tanpa Upgrade/Free Plan) */}
        <div className="p-6 border-t border-gray-100 dark:border-gray-700">
          <div className="rounded-xl bg-gray-50 dark:bg-gray-700/30 p-4 text-center">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Capstone Project
            </p>
            <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">
              © 2026 Unissula
            </p>
          </div>
        </div>

      </aside>
    </>
  );
};

export default Sidebar;