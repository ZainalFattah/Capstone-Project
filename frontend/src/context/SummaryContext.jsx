import React, { createContext, useReducer, useContext } from 'react';
import axios from 'axios';

// Initial State
const initialState = {
  summaryResult: null,
  isLoading: false,
  error: null,
};

// Reducer
const summaryReducer = (state, action) => {
  switch (action.type) {
    case 'START_LOADING':
      return { ...state, isLoading: true, error: null };
    case 'SET_SUMMARY_SUCCESS':
      return { ...state, isLoading: false, summaryResult: action.payload };
    case 'SET_ERROR':
      return { ...state, isLoading: false, error: action.payload };
    case 'RESTORE_SUMMARY':
      return { ...state, summaryResult: action.payload, isLoading: false, error: null };
    case 'RESET_SUMMARY':
      return initialState;
    default:
      return state;
  }
};

const SummaryContext = createContext();

export const SummaryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(summaryReducer, initialState);

  // --- FUNGSI UTAMA: KIRIM FILE KE BACKEND ---
  const startSummarize = async (file, lang) => {
    dispatch({ type: 'START_LOADING' });

    const formData = new FormData();
    formData.append('file', file);
    formData.append('lang', lang);

    try {
      // Pastikan URL Backend benar (Default: http://localhost:8000)
      const response = await axios.post('http://localhost:8000/summarize', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Simpan hasil ke State
      dispatch({ 
        type: 'SET_SUMMARY_SUCCESS', 
        payload: {
          fileName: file.name,
          summary: response.data.structured_summary, // Pastikan key ini sesuai response backend
          docId: response.data.document_id
        } 
      });

    } catch (err) {
      console.error("Error Summarizing:", err);
      dispatch({ 
        type: 'SET_ERROR', 
        payload: err.response?.data?.detail || "Gagal memproses dokumen. Pastikan backend aktif." 
      });
      alert("Gagal memproses dokumen. Cek koneksi backend.");
    }
  };

  const resetSummary = () => {
    dispatch({ type: 'RESET_SUMMARY' });
  };

  // Fungsi Restore Session (Dari History)
  const restoreSummarySession = (data) => {
    dispatch({ type: 'RESTORE_SUMMARY', payload: data });
  };

  return (
    <SummaryContext.Provider value={{ state, startSummarize, resetSummary, restoreSummarySession }}>
      {children}
    </SummaryContext.Provider>
  );
};

export const useSummary = () => useContext(SummaryContext);