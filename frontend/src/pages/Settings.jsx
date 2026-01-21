import React, { useState } from 'react';
import { useHistory } from '../context/HistoryContext'; // Import context untuk fitur hapus data
import { 
  User, 
  Mail, 
  Bell, 
  Moon, 
  Save, 
  Trash2, 
  Shield, 
  CheckCircle 
} from 'lucide-react';

const Settings = () => {
  // Ambil fungsi hapus dari context
  const { clearAllHistory } = useHistory();

  // State untuk form profil
  const [profile, setProfile] = useState({
    name: "Haydar Fahri",
    email: "haydar@student.unissula.ac.id"
  });

  // State untuk notifikasi (Toggle)
  const [notifications, setNotifications] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  // Handle perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  // Simulasi Simpan Data
  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000); // Hilangkan pesan sukses setelah 3 detik
  };

  // Handle Hapus Data
  const handleClearData = () => {
    if (window.confirm("PERINGATAN: Ini akan menghapus semua riwayat ringkasan dan chat Anda. Lanjutkan?")) {
      clearAllHistory();
      alert("Semua data riwayat berhasil dibersihkan.");
    }
  };

  return (
    <div className="p-6 md:p-10 min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
          Pengaturan Akun
        </h1>

        <div className="grid grid-cols-1 gap-8">

          {/* --- KARTU 1: PROFIL PENGGUNA --- */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg">
                <User size={24} />
              </div>
              <h2 className="text-xl font-semibold">Profil Pengguna</h2>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Input Nama */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Nama Lengkap</label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <input 
                      type="text" 
                      name="name"
                      value={profile.name}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Input Email */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <input 
                      type="email" 
                      name="email"
                      value={profile.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Tombol Simpan */}
              <div className="flex items-center gap-4 pt-2">
                <button 
                  onClick={handleSave}
                  className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-lg shadow-blue-500/30"
                >
                  <Save size={18} /> Simpan Perubahan
                </button>
                
                {isSaved && (
                  <span className="flex items-center gap-2 text-green-600 dark:text-green-400 text-sm animate-fade-in">
                    <CheckCircle size={16} /> Tersimpan!
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* --- KARTU 2: PREFERENSI --- */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-lg">
                <Bell size={24} />
              </div>
              <h2 className="text-xl font-semibold">Preferensi & Tampilan</h2>
            </div>

            <div className="p-6 space-y-6">
              {/* Item: Tema */}
              <div className="flex items-start justify-between pb-6 border-b border-gray-100 dark:border-gray-700">
                <div className="flex gap-4">
                  <div className="mt-1 text-gray-400">
                    <Moon size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Mode Gelap</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-md">
                      Gunakan tombol ikon matahari/bulan di pojok kanan atas layar (Header) untuk mengubah tema aplikasi secara global.
                    </p>
                  </div>
                </div>
              </div>

              {/* Item: Notifikasi */}
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <div className="mt-1 text-gray-400">
                    <Bell size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Notifikasi Suara</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Mainkan suara "beep" ketika proses ringkasan selesai.
                    </p>
                  </div>
                </div>
                
                {/* Custom Toggle Switch */}
                <button 
                  onClick={() => setNotifications(!notifications)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    notifications ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* --- KARTU 3: ZONA BAHAYA (Data) --- */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-red-200 dark:border-red-900/50 overflow-hidden">
            <div className="p-6 border-b border-red-100 dark:border-red-900/30 flex items-center gap-3">
              <div className="p-2 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-lg">
                <Shield size={24} />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Manajemen Data</h2>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Hapus Semua Data</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Menghapus riwayat dokumen, chat, dan pengaturan lokal secara permanen. Tindakan ini tidak dapat dibatalkan.
                  </p>
                </div>
                <button 
                  onClick={handleClearData}
                  className="flex items-center gap-2 px-4 py-2 border border-red-200 dark:border-red-800 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-sm font-medium transition-colors"
                >
                  <Trash2 size={16} /> Bersihkan Data
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Settings;