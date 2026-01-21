import React, { useState } from 'react';
import { UploadCloud, FileText, X, Loader2 } from 'lucide-react';
import { useSummary } from '../../context/SummaryContext';

const Summarizer = ({ lang, setLang, fileInputRef }) => {
  const { state, startSummarize } = useSummary();
  
  // Ambil isLoading dengan aman (default false jika undefined)
  const isLoading = state?.isLoading || false;
  
  // State lokal untuk file
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  // --- LOGIKA FILE ---
  const handleFileChange = (e) => {
    // Reset dulu biar input bisa mendeteksi file yang sama jika dipilih ulang
    const file = e.target.files[0];
    validateAndSetFile(file);
  };

  const validateAndSetFile = (file) => {
    if (!file) return;

    // Cek Tipe File (Bisa dilonggarkan jika perlu)
    if (file.type !== 'application/pdf') {
      alert("Mohon unggah file format PDF.");
      return;
    }

    // Sukses set file
    setSelectedFile(file);
  };

  const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = (e) => { e.preventDefault(); setIsDragging(false); };
  
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    validateAndSetFile(file);
  };

  // --- HANDLE SUBMIT (LOGIKA BARU) ---
  const handleSubmit = () => {
    // 1. Cek apakah file ada?
    if (!selectedFile) {
      alert("Silakan pilih atau upload dokumen PDF terlebih dahulu!");
      // Trigger klik input file otomatis agar user langsung bisa pilih
      if (fileInputRef.current) fileInputRef.current.click();
      return;
    }

    // 2. Jalankan Proses
    startSummarize(selectedFile, lang);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
      
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg">
          <FileText size={24} />
        </div>
        <div>
          <h3 className="font-bold text-gray-900 dark:text-white">Upload Dokumen</h3>
          <p className="text-xs text-gray-500">Hanya file PDF (Maks 10MB)</p>
        </div>
      </div>

      {/* --- AREA UPLOAD --- */}
      {!selectedFile ? (
        <div 
          className={`border-2 border-dashed rounded-xl h-48 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 
            ${isDragging 
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
              : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700/30'
            }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current && fileInputRef.current.click()}
        >
          <input 
            type="file" 
            accept="application/pdf" 
            ref={fileInputRef} 
            className="hidden" 
            onChange={handleFileChange}
          />
          <div className="p-3 bg-blue-50 dark:bg-gray-700 rounded-full text-blue-600 mb-3">
            <UploadCloud size={28} />
          </div>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
            Klik atau jatuhkan file PDF di sini
          </p>
        </div>
      ) : (
        // TAMPILAN JIKA FILE SUDAH DIPILIH
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl flex items-center justify-between animate-in fade-in zoom-in duration-200">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="h-10 w-10 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center text-red-500 shadow-sm">
              <FileText size={20} />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-gray-800 dark:text-white truncate max-w-[200px]">
                {selectedFile.name}
              </p>
              <p className="text-xs text-gray-500">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
          <button 
            onClick={handleRemoveFile}
            className="p-2 hover:bg-white dark:hover:bg-gray-800 rounded-lg text-gray-500 hover:text-red-500 transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      )}

      {/* --- KONTROL BAHASA & TOMBOL --- */}
      <div className="mt-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Toggle Bahasa */}
        <div className="flex bg-gray-100 dark:bg-gray-700 p-1 rounded-lg w-full md:w-auto">
          <button
            onClick={() => setLang('id')}
            className={`flex-1 md:flex-none px-4 py-1.5 rounded-md text-xs font-bold transition-all ${
              lang === 'id' 
                ? 'bg-white dark:bg-gray-600 text-blue-600 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'
            }`}
          >
            ID
          </button>
          <button
            onClick={() => setLang('en')}
            className={`flex-1 md:flex-none px-4 py-1.5 rounded-md text-xs font-bold transition-all ${
              lang === 'en' 
                ? 'bg-white dark:bg-gray-600 text-blue-600 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'
            }`}
          >
            EN
          </button>
        </div>

        {/* TOMBOL ACTION - PERBAIKAN UTAMA DISINI */}
        <button
          onClick={handleSubmit}
          // HANYA DISABLE JIKA LOADING. JIKA FILE KOSONG, TETAP NYALA (NANTI ALERT MUNCUL)
          disabled={isLoading} 
          className={`w-full md:w-auto px-6 py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-blue-500/25 active:scale-95
            ${isLoading
              ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed shadow-none'
              : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
        >
          {isLoading ? (
            <>
              <Loader2 size={18} className="animate-spin" /> Memproses...
            </>
          ) : (
            'Buat Ringkasan'
          )}
        </button>
      </div>
    </div>
  );
};

export default Summarizer;