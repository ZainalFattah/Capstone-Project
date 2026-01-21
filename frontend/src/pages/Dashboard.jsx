import React, { useState, useRef, useEffect } from 'react';

// Context
import { useSummary } from '../context/SummaryContext';
import { useChat } from '../context/ChatContext';
import { useHistory } from '../context/HistoryContext';

// Components
import Summarizer from '../components/dashboard/Summarizer';
import QandAChat from '../components/dashboard/QandAChat';

// Icons
import {
  FileText,
  RefreshCw,
  CheckCircle,
  Cpu,
  MessageSquare,
  ShieldCheck
} from 'lucide-react';

// Helper untuk formatting text (Bold untuk *text*)
const formatText = (text) => {
  if (!text) return null;
  // Split berdasarkan *text*
  const parts = text.split(/(\*[^*]+\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('*') && part.endsWith('*')) {
      // Hapus bintang dan render bold
      return <strong key={index} className="font-semibold text-gray-900 dark:text-white">{part.slice(1, -1)}</strong>;
    }
    return part;
  });
};

const Dashboard = () => {
  const { state: summaryState, resetSummary } = useSummary();
  // Kita butuh chatState untuk mengecek ID yang sedang aktif
  const { state: chatState, resetChat, setChatDocumentId } = useChat();
  const { addToHistory } = useHistory();

  const { summaryResult } = summaryState;

  const [lang, setLang] = useState('id');
  const fileInputRef = useRef(null);

  // --- PERBAIKAN INFINITE LOOP DISINI ---
  useEffect(() => {
    if (summaryResult && summaryResult.docId) {
      // CEK DULU: Jika ID di Chat SUDAH SAMA dengan ID Summary, JANGAN update lagi.
      // Ini mencegah looping terus menerus yang bikin browser hang.
      if (chatState.documentId !== summaryResult.docId) {
        console.log("Sync ID to Chat:", summaryResult.docId);
        setChatDocumentId(summaryResult.docId);
      }
    }
  }, [summaryResult, chatState.documentId, setChatDocumentId]);


  const handleReset = () => {
    if (summaryResult) {
      addToHistory({
        fileName: summaryResult.fileName || "Dokumen Tanpa Judul",
        summary: summaryResult.summary,
      }, chatState.chatHistory);
    }
    resetSummary();
    resetChat();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-10 pt-4">

      {/* --- AREA KERJA UTAMA --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

        {/* === KOLOM KIRI: SUMMARIZER / HASIL === */}
        <div className="space-y-6">

          {/* KONDISI 1: Belum ada hasil */}
          {!summaryResult && (
            <Summarizer
              lang={lang}
              setLang={setLang}
              fileInputRef={fileInputRef}
            />
          )}

          {/* KONDISI 2: SUDAH ada hasil */}
          {summaryResult && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden ring-1 ring-black/5 dark:ring-white/10 flex flex-col h-[600px] lg:h-[700px]">

              {/* HEADER KARTU */}
              <div className="p-5 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800 flex justify-between items-center shrink-0">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg">
                    <FileText size={20} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-gray-900 dark:text-white truncate max-w-[180px] md:max-w-xs">
                      {summaryResult.fileName}
                    </h3>
                    <p className="text-xs text-gray-500">Ringkasan Selesai</p>
                  </div>
                </div>
                <button
                  onClick={handleReset}
                  className="text-gray-400 hover:text-blue-600 transition-colors"
                  title="Ringkas Ulang"
                >
                  <RefreshCw size={20} />
                </button>
              </div>

              {/* ISI RINGKASAN */}
              <div className="flex-1 overflow-y-auto custom-scrollbar bg-white dark:bg-gray-800">
                {summaryResult.summary && Object.entries(summaryResult.summary).map(([key, value]) => (
                  <div key={key} className="relative">
                    <h4 className="sticky top-0 z-10 px-6 py-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-b border-gray-100 dark:border-gray-700 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider shadow-sm">
                      {key.replace(/_/g, ' ')}
                    </h4>
                    <div className="px-6 py-4 text-gray-700 dark:text-gray-300 text-sm leading-relaxed space-y-2 pb-6">
                      {Array.isArray(value) ? (
                        <ul className="list-disc pl-4 marker:text-gray-400 space-y-2">
                          {value.map((item, idx) => <li key={idx}>{item}</li>)}
                        </ul>
                      ) : (
                        <p className="whitespace-pre-line text-justify">{formatText(value) || 'Data tidak tersedia'}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* FOOTER KARTU */}
              <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/30 border-t border-gray-100 dark:border-gray-700 text-center shrink-0">
                <p className="text-xs text-green-600 dark:text-green-400 flex items-center justify-center gap-1 font-medium">
                  <CheckCircle size={14} /> Dokumen berhasil diproses
                </p>
              </div>
            </div>
          )}
        </div>

        {/* === KOLOM KANAN: CHAT === */}
        <div>
          <QandAChat lang={lang} />
        </div>

      </div>

      {/* --- BAGIAN FITUR --- */}
      <div className="pt-10 border-t border-gray-200 dark:border-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="group relative p-6 rounded-2xl bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 dark:hover:shadow-blue-900/20 hover:-translate-y-1 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent dark:from-blue-900/10 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                <Cpu size={26} className="text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Analisis AI Cerdas
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Algoritma NLP memahami konteks dokumen untuk hasil akurat dan ringkas.
              </p>
            </div>
          </div>

          <div className="group relative p-6 rounded-2xl bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-900/20 hover:-translate-y-1 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-transparent dark:from-indigo-900/10 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                <MessageSquare size={26} className="text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                Q&A Interaktif
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Tanyakan apa saja. Sistem RAG mencari jawaban spesifik langsung dari PDF.
              </p>
            </div>
          </div>

          <div className="group relative p-6 rounded-2xl bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 dark:hover:shadow-emerald-900/20 hover:-translate-y-1 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-transparent dark:from-emerald-900/10 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                <ShieldCheck size={26} className="text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                Aman & Privat
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Proses lokal simulasi menjamin keamanan data Anda tanpa kebocoran.
              </p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Dashboard;