import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const HistoryContext = createContext();

export const HistoryProvider = ({ children }) => {
  const [history, setHistory] = useState([]);

  // 1. Fetch data dari Backend
  const fetchHistory = async () => {
    try {
      const response = await axios.get('http://localhost:8000/history');
      setHistory(response.data);
    } catch (error) {
      console.error("Gagal mengambil data riwayat:", error);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  // 2. Fungsi Tambah (Add) - Refresh data karena backend sudah simpan saat summarize
  const addToHistory = (summaryData, chatData = []) => {
    fetchHistory();
  };

  // 3. Fungsi Hapus Satu Item (Delete)
  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/history/${id}`);
      setHistory(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      console.error("Gagal menghapus history:", error);
    }
  };

  // 4. Fungsi Hapus Semua (Clear All)
  const clearAllHistory = () => {
    setHistory([]);
    // Idealnya panggil API delete all jika ada
  };

  return (
    <HistoryContext.Provider value={{
      history,          // Data utama (Array)
      addToHistory,     // Fungsi tambah (refresh)
      deleteItem,       // Fungsi hapus per item
      clearAllHistory   // Fungsi hapus semua (local state only for now)
    }}>
      {children}
    </HistoryContext.Provider>
  );
};

// Custom Hook
export const useHistory = () => {
  return useContext(HistoryContext);
};