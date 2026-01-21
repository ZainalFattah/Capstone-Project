import React from 'react';
import { useLocation } from 'react-router-dom'; // PENTING: Untuk mendeteksi halaman aktif
import { Menu, Moon, Sun, Bell, Calendar } from 'lucide-react';
import ProfileDropdown from './ProfileDropdown';

const Header = ({ theme, toggleTheme, toggleSidebar }) => {
  const location = useLocation();

  // Logika untuk menentukan Judul Halaman
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/': return 'Dashboard Overview';
      case '/history': return 'Riwayat Ringkasan';
      case '/settings': return 'Pengaturan Akun';
      default: return 'AI Summarizer';
    }
  };

  // Mendapatkan Tanggal Hari Ini
  const today = new Date().toLocaleDateString('id-ID', { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long' 
  });

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-gray-100 bg-white/80 p-6 backdrop-blur-xl dark:border-gray-700 dark:bg-gray-900/90 transition-all duration-300">
      
      {/* --- BAGIAN KIRI: Menu & Judul Halaman --- */}
      <div className="flex h-10 items-center gap-4">
        {/* Tombol Menu Mobile */}
        <button 
          onClick={toggleSidebar} 
          className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 md:hidden transition-colors -ml-2"
        >
          <Menu size={24} />
        </button>

        {/* Judul Halaman Dinamis (Isi Kekosongan di Desktop) */}
        <div className="hidden md:block">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white leading-none">
            {getPageTitle()}
          </h2>
          <div className="flex items-center gap-2 mt-1 text-xs text-gray-500 dark:text-gray-400 font-medium">
            <Calendar size={12} className="text-blue-500" />
            <span>{today}</span>
          </div>
        </div>
      </div>

      {/* --- BAGIAN KANAN: Kontrol --- */}
      <div className="flex h-10 items-center gap-3 md:gap-5">
        
        {/* Notifikasi */}
        <button className="relative flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300 transition-colors">
          <Bell size={20} />
          <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-900 animate-pulse"></span>
        </button>

        <div className="h-8 w-px bg-gray-200 dark:bg-gray-700"></div>

        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme} 
          className="group relative flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 border border-gray-200 text-gray-500 transition-all hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-blue-400"
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        <ProfileDropdown />
        
      </div>
    </header>
  );
};

export default Header;