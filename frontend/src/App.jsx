import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Providers
import { HistoryProvider } from './context/HistoryContext';
import { SummaryProvider } from './context/SummaryContext';
import { ChatProvider } from './context/ChatContext';

// Components
import Sidebar from './components/Sidebar'; 
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import Dashboard from './pages/Dashboard';
import History from './pages/History';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Efek Theme
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <Router>
      <HistoryProvider>
        <SummaryProvider>
          <ChatProvider>
            
            {/* CONTAINER UTAMA (Layout Flex) */}
            <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 font-sans overflow-hidden transition-colors duration-300">
              
              {/* SIDEBAR (Tetap Fixed di Kiri) */}
              <Sidebar 
                isSidebarOpen={isSidebarOpen} 
                setIsSidebarOpen={setIsSidebarOpen} 
              />

              {/* KOLOM KANAN (Header + Konten + Footer) */}
              <div className="relative flex flex-col flex-1 h-full md:ml-64 transition-all duration-300">
                
                {/* HEADER (Sticky/Fixed di dalam kolom kanan) */}
                <Header 
                  theme={theme} 
                  toggleTheme={toggleTheme} 
                  toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
                />

                {/* AREA SCROLLABLE (Membungkus Main & Footer) */}
                {/* flex-1: Mengambil sisa tinggi setelah Header */}
                {/* overflow-y-auto: Scrollbar ada di sini */}
                <div className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden scroll-smooth">
                  
                  {/* MAIN CONTENT */}
                  {/* Padding (p-4) dan Max-Width (max-w-7xl) HANYA diterapkan di sini */}
                  {/* flex-1: Agar footer terdorong ke bawah jika konten sedikit */}
                  <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-6">
                    <div className="min-h-[80vh]">
                      <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/history" element={<History />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </div>
                  </main>
                  
                  {/* FOOTER */}
                  {/* Diletakkan DI LUAR <main> yang ber-padding, tapi masih di dalam area scroll */}
                  {/* Tidak ada 'p-4' atau 'max-w' di wrapper ini, jadi dia akan Full Width */}
                  <Footer />
                  
                </div>

              </div>
            </div>

          </ChatProvider>
        </SummaryProvider>
      </HistoryProvider>
    </Router>
  );
}

export default App;