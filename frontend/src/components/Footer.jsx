import React from 'react';
import { Bot, Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    // w-full: Memaksa lebar 100% layar
    // p-6: Padding 24px (sama persis dengan Header)
    // mt-auto: Mendorong footer ke paling bawah jika konten sedikit
    <footer className="w-full p-6 mt-auto border-t border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl transition-colors duration-300 z-20">
      
      {/* Efek Glow Garis Atas */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-50"></div>

      {/* Konten Footer */}
      <div className="flex flex-col gap-6">
        
        {/* BAGIAN ATAS */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg shadow-lg shadow-blue-500/30">
              <Bot size={18} className="text-white" />
            </div>
            <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
              Summarizer
            </span>
          </div>

          {/* Menu */}
          <nav className="flex flex-wrap justify-center gap-6 text-sm font-medium text-gray-600 dark:text-gray-400">
            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Dashboard</a>
            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">History</a>
            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Settings</a>
          </nav>

          {/* Sosmed */}
          <div className="flex gap-3">
            {[Github, Twitter, Linkedin].map((Icon, index) => (
              <a 
                key={index} 
                href="#" 
                className="p-2 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-500 hover:text-white hover:bg-blue-600 dark:hover:bg-blue-600 transition-all duration-300"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* BAGIAN BAWAH: Copyright */}
        <div className="pt-6 border-t border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-gray-400 dark:text-gray-500 uppercase tracking-wider font-medium">
          <p>&copy; 2026 Summarizer. Capstone Project.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-800 dark:hover:text-gray-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-800 dark:hover:text-gray-300 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;