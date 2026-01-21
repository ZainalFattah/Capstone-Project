import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Context
import { useHistory } from '../context/HistoryContext';
import { useSummary } from '../context/SummaryContext';
import { useChat } from '../context/ChatContext';

// Icons & UI
import { FileText, Calendar, ArrowRight, MessageSquare, Clock, Trash2 } from 'lucide-react';

const History = () => {
  const { history, deleteItem } = useHistory();
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { restoreSummarySession } = useSummary();
  const { restoreChatSession } = useChat();

  useEffect(() => {
    if (history) {
      setLoading(false);
    }
  }, [history]);

  // Fungsi: Lanjutkan Sesi
  const handleResume = (item) => {
    // A. Restore Summary
    restoreSummarySession({
      fileName: item.filename,
      summary: item.summary,
      docId: item.id
    });

    // B. Restore Chat & Konversi Format
    const rawLogs = item.chat_logs || [];
    const formattedLogs = [];

    rawLogs.forEach(log => {
      if (log.user) {
        formattedLogs.push({
          role: 'user',
          content: log.user,
          time: log.time || 'Lama'
        });
      }
      if (log.bot) {
        formattedLogs.push({
          role: 'bot',
          content: log.bot,
          time: log.time || 'Lama'
        });
      }
    });

    // Masukkan data yang sudah rapi ke Context Chat
    restoreChatSession(formattedLogs, item.id);

    // C. Pindah ke Dashboard
    navigate('/');
  };

  // Tampilan Loading
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-gray-500 animate-pulse">Memuat Riwayat...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-10 pt-4 px-4 md:px-0">

      {/* Header Halaman */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-100 dark:border-gray-800 pb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Riwayat Aktivitas</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Daftar dokumen yang pernah Anda ringkas dan percakapan tersimpan.
          </p>
        </div>
        <div className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg text-sm font-medium border border-blue-100 dark:border-blue-800">
          Total: {history ? history.length : 0} Sesi
        </div>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 gap-4">
        {!history || history.length === 0 ? (
          // Tampilan Kosong
          <div className="text-center py-20 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText size={40} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Belum ada riwayat</h3>
            <p className="text-gray-500 mt-2 max-w-sm mx-auto">
              Dokumen yang Anda proses akan muncul di sini agar bisa diakses kembali kapan saja.
            </p>
            <button
              onClick={() => navigate('/')}
              className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
            >
              Mulai Ringkas Sekarang
            </button>
          </div>
        ) : (
          // Tampilan List Data
          history.map((item) => (
            <div
              key={item.id}
              className="group bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 flex flex-col md:flex-row gap-6 items-start md:items-center relative overflow-hidden"
            >
              {/* Dekorasi Hover */}
              <div className="absolute inset-0 bg-blue-50 dark:bg-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

              {/* Icon & Info Utama */}
              <div className="flex items-center gap-4 flex-1 relative z-10">
                <div className={`h-14 w-14 rounded-2xl flex items-center justify-center shrink-0 border 
                  ${item.filename === "Percakapan Umum"
                    ? 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-100 dark:border-indigo-800 text-indigo-600'
                    : 'bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800 text-blue-600'
                  }`}
                >
                  {item.filename === "Percakapan Umum" ? <MessageSquare size={26} /> : <FileText size={26} />}
                </div>

                <div className="min-w-0">
                  <h3 className="font-bold text-gray-900 dark:text-white text-lg line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {item.filename}
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-1.5 text-xs text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-md">
                      <Calendar size={12} />
                      {new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                    <span className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-md">
                      <Clock size={12} />
                      {new Date(item.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Statistik Chat */}
              <div className="hidden md:flex flex-col items-end gap-1 relative z-10 min-w-[100px]">
                <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  <MessageSquare size={16} className="text-gray-400" />
                  <span>{item.chat_logs ? item.chat_logs.length : 0}</span>
                  <span className="text-gray-400 font-normal text-xs">Pesan</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 w-full md:w-auto mt-2 md:mt-0 relative z-10">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (window.confirm('Apakah Anda yakin ingin menghapus riwayat ini?')) {
                      deleteItem(item.id);
                    }
                  }}
                  className="p-2.5 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-red-500 rounded-lg hover:bg-red-50 hover:border-red-200 dark:hover:bg-red-900/20 dark:hover:border-red-800 transition-all shadow-sm"
                  title="Hapus Riwayat"
                >
                  <Trash2 size={18} />
                </button>
                <button
                  onClick={() => handleResume(item)}
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg text-sm font-semibold hover:bg-blue-600 hover:text-white hover:border-blue-600 dark:hover:bg-blue-600 dark:hover:border-blue-600 transition-all shadow-sm"
                >
                  Buka Kembali <ArrowRight size={16} />
                </button>
              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
};

export default History;