import React, { createContext, useReducer, useContext } from 'react';
import axios from 'axios';

// Initial State
const initialState = {
  chatHistory: [],
  isAnswering: false,
  documentId: null,
};

// Reducer
const chatReducer = (state, action) => {
  switch (action.type) {
    case 'SET_DOCUMENT_ID':
      return { ...state, documentId: action.payload };
    case 'ADD_USER_MESSAGE':
      return { ...state, chatHistory: [...state.chatHistory, action.payload], isAnswering: true };
    case 'ADD_BOT_MESSAGE':
      return { ...state, chatHistory: [...state.chatHistory, action.payload], isAnswering: false };
    case 'RESTORE_CHAT':
      return {
        ...state,
        chatHistory: action.payload.history || [],
        documentId: action.payload.docId
      };
    case 'RESET_CHAT':
      return initialState;
    default:
      return state;
  }
};

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  // --- FUNGSI BARU: Manual Set ID (Dipanggil Dashboard saat sukses summarize) ---
  const setChatDocumentId = (id) => {
    dispatch({ type: 'SET_DOCUMENT_ID', payload: id });
  };

  // --- FUNGSI KIRIM CHAT ---
  const askQuestion = async (question, lang, docIdFromSummary, onHistoryUpdate) => {

    // 1. Prioritas ID: Parameter > State
    // PENTING: Jika tidak ada document_id, kirim null ke backend
    // Backend akan membuat entry baru dengan UUID dan mengembalikannya
    let currentDocId = docIdFromSummary || state.documentId;

    const userMsg = { role: 'user', content: question, time: new Date().toLocaleTimeString() };
    dispatch({ type: 'ADD_USER_MESSAGE', payload: userMsg });

    try {
      const response = await axios.post('http://localhost:8000/qa', {
        question: question,
        document_id: currentDocId || null, // Kirim null jika tidak ada ID
        lang: lang || 'id'
      });

      const botMsg = { role: 'bot', content: response.data.answer, time: new Date().toLocaleTimeString() };
      dispatch({ type: 'ADD_BOT_MESSAGE', payload: botMsg });

      // PENTING: Simpan document_id yang dikembalikan backend
      // Ini memastikan pertanyaan selanjutnya masuk ke sesi yang sama
      if (response.data.document_id && !state.documentId) {
        dispatch({ type: 'SET_DOCUMENT_ID', payload: response.data.document_id });
      }

      // Refresh history setelah Q&A berhasil
      if (onHistoryUpdate && typeof onHistoryUpdate === 'function') {
        onHistoryUpdate();
      }

    } catch (error) {
      console.error("Chat Error:", error);
      dispatch({
        type: 'ADD_BOT_MESSAGE',
        payload: { role: 'bot', content: "Gagal menyimpan chat ke server.", time: "Now" }
      });
    }
  };

  const resetChat = () => {
    dispatch({ type: 'RESET_CHAT' });
  };

  const restoreChatSession = (history, docId) => {
    dispatch({ type: 'RESTORE_CHAT', payload: { history, docId } });
  };

  return (
    // JANGAN LUPA MASUKKAN setChatDocumentId KE SINI
    <ChatContext.Provider value={{ state, askQuestion, resetChat, restoreChatSession, setChatDocumentId }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);