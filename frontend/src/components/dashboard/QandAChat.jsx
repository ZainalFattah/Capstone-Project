import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '../../context/ChatContext';
import { useHistory } from '../../context/HistoryContext';
import { Send, MessageSquare, Bot, User, Loader2 } from 'lucide-react';

// Helper untuk formatting text (Bold untuk *text*)
const formatText = (text) => {
  if (!text) return null;
  // Split berdasarkan *text*
  const parts = text.split(/(\*[^*]+\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('*') && part.endsWith('*')) {
      // Hapus bintang dan render bold
      return <strong key={index} className="font-semibold">{part.slice(1, -1)}</strong>;
    }
    return part;
  });
};

const QandAChat = ({ lang }) => {
  const { state, askQuestion } = useChat();
  const { isAnswering, chatHistory } = state;
  const { addToHistory } = useHistory();

  const [question, setQuestion] = useState('');
  const chatWindowRef = useRef(null);

  const scrollToBottom = () => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTo({
        top: chatWindowRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, isAnswering]);

  const handleAskQuestion = async (e) => {
    e.preventDefault();
    if (!question.trim() || isAnswering) return;

    const currentQuestion = question;
    setQuestion('');
    // Pass addToHistory as callback to refresh history after Q&A
    await askQuestion(currentQuestion, lang, null, addToHistory);
  };

  // LOGIKA TINGGI DINAMIS:
  // Jika belum ada chat -> Tinggi sedang (500px)
  // Jika sudah ada chat -> Tinggi maksimal (700px) agar sama dengan Summarizer
  const heightClass = chatHistory.length > 0
    ? 'h-[600px] lg:h-[700px]'
    : 'h-[500px]';

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col overflow-hidden transition-all duration-500 ease-in-out ${heightClass}`}>

      {/* --- HEADER CHAT --- */}
      <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3 bg-white dark:bg-gray-800 shrink-0">
        <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 rounded-lg">
          <MessageSquare size={20} />
        </div>
        <div>
          <h3 className="font-bold text-gray-900 dark:text-white">Q&A Chat</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">Tanyakan detail dokumen</p>
        </div>
      </div>

      {/* --- AREA PESAN --- */}
      <div
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 dark:bg-gray-900/50"
        ref={chatWindowRef}
      >
        {chatHistory.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 px-6">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4 animate-pulse">
              <Bot size={32} className="opacity-50" />
            </div>
            <h3 className="text-gray-600 dark:text-gray-300 font-medium mb-1">Mulai Diskusi</h3>
            <p className="text-sm max-w-xs">
              Ketik pertanyaan Anda di bawah. Chatbot akan menjawab berdasarkan konteks dokumen PDF.
            </p>
          </div>
        ) : (
          chatHistory.map((msg, index) => (
            <div key={index} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>

              {msg.role !== 'user' && (
                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white shrink-0 mt-1 shadow-sm">
                  <Bot size={16} />
                </div>
              )}

              <div className={`max-w-[85%] px-4 py-3 text-sm shadow-sm leading-relaxed ${msg.role === 'user'
                ? 'bg-blue-600 text-white rounded-2xl rounded-tr-sm'
                : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-600 rounded-2xl rounded-tl-sm'
                }`}>
                {formatText(msg.content)}
              </div>

              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-300 shrink-0 mt-1">
                  <User size={16} />
                </div>
              )}
            </div>
          ))
        )}

        {isAnswering && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white shrink-0 shadow-sm">
              <Loader2 size={16} className="animate-spin" />
            </div>
            <div className="bg-white dark:bg-gray-700 px-4 py-3 rounded-2xl rounded-tl-sm border border-gray-200 dark:border-gray-600 flex items-center gap-1">
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
            </div>
          </div>
        )}
      </div>

      {/* --- INPUT AREA --- */}
      <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 shrink-0">
        <form onSubmit={handleAskQuestion} className="relative flex items-center">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ketik pertanyaan Anda..."
            // PERUBAHAN: Hanya disable saat sedang menjawab/loading
            disabled={isAnswering}
            className="w-full pl-5 pr-14 py-3.5 bg-gray-100 dark:bg-gray-700/50 border border-transparent focus:bg-white dark:focus:bg-gray-700 focus:border-blue-500 rounded-xl focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400"
          />
          <button
            type="submit"
            // PERUBAHAN: Tombol aktif asal ada teks, walau tanpa dokumen
            disabled={isAnswering || !question.trim()}
            className="absolute right-2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 transition-transform active:scale-95 shadow-md shadow-blue-500/20"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default QandAChat;