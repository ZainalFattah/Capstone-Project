# 📄 Website Summarizer - AI-Powered Document Intelligence Platform

<div align="center">

![Version](https://img.shields.io/badge/version-8.3.0-blue.svg)
![Python](https://img.shields.io/badge/python-3.8+-green.svg)
![React](https://img.shields.io/badge/react-19.1.1-61dafb.svg)
![FastAPI](https://img.shields.io/badge/FastAPI-latest-009688.svg)
![License](https://img.shields.io/badge/license-MIT-orange.svg)

**Aplikasi web berbasis AI untuk meringkas dokumen PDF dan melakukan tanya jawab interaktif menggunakan teknologi RAG (Retrieval-Augmented Generation)**

[Fitur](#-fitur-utama) • [Instalasi](#-instalasi) • [Penggunaan](#-penggunaan) • [API](#-api-documentation) • [Arsitektur](#-arsitektur-sistem)

</div>

---

## 📋 Daftar Isi

- [Tentang Proyek](#-tentang-proyek)
- [Fitur Utama](#-fitur-utama)
- [Teknologi yang Digunakan](#-teknologi-yang-digunakan)
- [Arsitektur Sistem](#-arsitektur-sistem)
- [Prasyarat](#-prasyarat)
- [Instalasi](#-instalasi)
- [Konfigurasi](#-konfigurasi)
- [Penggunaan](#-penggunaan)
- [API Documentation](#-api-documentation)
- [Struktur Proyek](#-struktur-proyek)
- [Database Schema](#-database-schema)
- [Troubleshooting](#-troubleshooting)
- [Kontribusi](#-kontribusi)
- [Lisensi](#-lisensi)
- [Kontak](#-kontak)

---

## 🎯 Tentang Proyek

**Website Summarizer** adalah aplikasi web canggih yang memanfaatkan kekuatan AI untuk menganalisis dan meringkas dokumen PDF secara otomatis. Aplikasi ini menggunakan teknologi **RAG (Retrieval-Augmented Generation)** untuk memberikan ringkasan terstruktur dan menjawab pertanyaan spesifik tentang konten dokumen.

### Keunggulan Utama

- ✨ **Ringkasan Terstruktur**: Menghasilkan ringkasan dalam format JSON dengan kategori: Tujuan Penelitian, Metode, Hasil Utama, dan Kesimpulan
- 🤖 **Q&A Interaktif**: Chatbot cerdas yang dapat menjawab pertanyaan berdasarkan konteks dokumen
- 🌐 **Multi-bahasa**: Mendukung Bahasa Indonesia dan Bahasa Inggris
- 💾 **Persistent History**: Menyimpan riwayat ringkasan dan percakapan di database
- ⚡ **GPU Acceleration**: Memanfaatkan CUDA untuk pemrosesan yang lebih cepat
- 🎨 **Modern UI**: Antarmuka responsif dengan dark mode support

---

## 🚀 Fitur Utama

### 1. **Document Summarization**
- Upload dokumen PDF (hingga beberapa MB)
- Konversi otomatis PDF ke Markdown menggunakan Docling
- Chunking teks cerdas dengan overlap untuk konteks yang lebih baik
- Map-Reduce summarization untuk dokumen panjang
- Output terstruktur dalam format JSON

### 2. **Q&A Chat System**
- Tanya jawab berbasis konteks dokumen
- Dukungan untuk Q&A tanpa upload dokumen (menggunakan knowledge base)
- Session management untuk melacak percakapan
- Real-time streaming responses
- Formatting otomatis untuk jawaban (bold, list, dll)

### 3. **History Management**
- Menyimpan semua ringkasan dan chat logs
- Tampilan timeline dengan metadata lengkap
- Fitur delete untuk menghapus riwayat
- Filter dan search capabilities

### 4. **Settings & Customization**
- Pilihan bahasa (Indonesia/English)
- Dark mode toggle
- Konfigurasi model parameters
- Export/import settings

---

## 🛠 Teknologi yang Digunakan

### Backend
| Teknologi | Versi | Fungsi |
|-----------|-------|--------|
| **Python** | 3.8+ | Runtime environment |
| **FastAPI** | Latest | Web framework untuk REST API |
| **Llama.cpp** | Latest | Inference engine untuk LLM (Gemma-3-12B) |
| **Docling** | Latest | PDF to Markdown converter |
| **ChromaDB** | Latest | Vector database untuk RAG |
| **LangChain** | Latest | Framework untuk LLM applications |
| **HuggingFace** | Latest | Embedding model (BAAI/bge-m3) |
| **MySQL/MariaDB** | 8.0+ | Relational database |
| **PyTorch** | Latest | Deep learning framework |

### Frontend
| Teknologi | Versi | Fungsi |
|-----------|-------|--------|
| **React** | 19.1.1 | UI library |
| **Vite** | 7.1.12 | Build tool & dev server |
| **TailwindCSS** | 3.4.17 | Utility-first CSS framework |
| **React Router** | 7.12.0 | Client-side routing |
| **Axios** | 1.13.2 | HTTP client |
| **Lucide React** | 0.562.0 | Icon library |

### AI Models
- **LLM**: Gemma-3-12B-IT (GGUF format, Q4_K_M quantization)
- **Embedding**: BAAI/bge-m3 (Multilingual embedding model)

---

## 🏗 Arsitektur Sistem

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Dashboard   │  │   History    │  │   Settings   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│         │                  │                  │              │
│         └──────────────────┴──────────────────┘              │
│                           │                                  │
│                    React Router                              │
└───────────────────────────┼──────────────────────────────────┘
                            │
                    Axios HTTP Client
                            │
┌───────────────────────────┼──────────────────────────────────┐
│                      API LAYER (FastAPI)                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ /summarize   │  │    /qa       │  │  /history    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└───────────────────────────┼──────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
┌───────▼────────┐  ┌───────▼────────┐  ┌──────▼──────┐
│  Document      │  │   RAG Engine   │  │   Database  │
│  Converter     │  │                │  │   (MySQL)   │
│  (Docling)     │  │  - ChromaDB    │  │             │
└────────────────┘  │  - Embeddings  │  └─────────────┘
                    │  - LLM         │
                    └────────────────┘
```

### Alur Kerja Summarization

```
1. Upload PDF → 2. Convert to Markdown → 3. Clean & Chunk Text
                                                    ↓
6. Return JSON ← 5. Reduce (Final Summary) ← 4. Map (Chunk Summaries)
                                                    ↓
                                        7. Vectorize & Store in ChromaDB
                                                    ↓
                                        8. Save to MySQL Database
```

### Alur Kerja Q&A

```
1. User Question → 2. Generate Embedding → 3. Query ChromaDB
                                                    ↓
                                        4. Retrieve Relevant Chunks
                                                    ↓
                                        5. Generate Answer (LLM)
                                                    ↓
                                        6. Update Chat Logs in DB
```

---

## 📦 Prasyarat

### Hardware Requirements
- **CPU**: Multi-core processor (Intel i5/AMD Ryzen 5 atau lebih tinggi)
- **RAM**: Minimum 16GB (32GB recommended)
- **GPU**: NVIDIA GPU dengan CUDA support (8GB+ VRAM recommended)
- **Storage**: 20GB free space untuk models dan database

### Software Requirements
- **Python**: 3.8 atau lebih tinggi
- **Node.js**: 18.x atau lebih tinggi
- **npm**: 9.x atau lebih tinggi
- **MySQL/MariaDB**: 8.0 atau lebih tinggi
- **CUDA Toolkit**: 11.8+ (untuk GPU acceleration)
- **Git**: Untuk version control

---

## 💻 Instalasi

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/website-summarizer.git
cd website-summarizer
```

### 2. Setup Backend

#### a. Buat Virtual Environment

```bash
cd backend
python -m venv .venv
```

#### b. Aktivasi Virtual Environment

**Windows:**
```bash
.venv\Scripts\activate
```

**Linux/Mac:**
```bash
source .venv/bin/activate
```

#### c. Install Dependencies

```bash
pip install -r requirements.txt
```

#### d. Download Model

1. Download **Gemma-3-12B-IT GGUF** model dari HuggingFace
2. Buat folder `models/gemma-3-12b-it-GGUF/`
3. Letakkan file `gemma-3-12b-it-Q4_K_M.gguf` di folder tersebut

```bash
mkdir -p models/gemma-3-12b-it-GGUF
# Download model dan letakkan di folder tersebut
```

#### e. Setup Database

1. Buat database MySQL:

```sql
CREATE DATABASE db_summarizer;
USE db_summarizer;

CREATE TABLE history (
    id VARCHAR(36) PRIMARY KEY,
    filename VARCHAR(255) NOT NULL,
    summary TEXT,
    chat_logs TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

2. Update konfigurasi database di `main.py`:

```python
DB_CONFIG = {
    'host': 'localhost',
    'user': 'root',
    'password': 'your_password',
    'database': 'db_summarizer'
}
```

### 3. Setup Frontend

```bash
cd ../frontend
npm install
```

---

## ⚙️ Konfigurasi

### Backend Configuration

File: `backend/main.py`

```python
# Model Configuration
model_path = "./models/gemma-3-12b-it-GGUF/gemma-3-12b-it-Q4_K_M.gguf"
n_ctx = 4096          # Context window
n_gpu_layers = 45     # Number of layers to offload to GPU
temperature = 0.5     # Sampling temperature
top_p = 0.5          # Nucleus sampling

# Embedding Model
model_name = "BAAI/bge-m3"
device = "cuda"       # Use "cpu" if no GPU available

# ChromaDB
chroma_path = "./DB_PAPER"

# Chunking Parameters
chunk_size = 1000     # Characters per chunk
overlap = 150         # Overlap between chunks
```

### Frontend Configuration

File: `frontend/src/App.jsx`

```javascript
// API Base URL
const API_BASE_URL = "http://localhost:8000";

// Default Language
const DEFAULT_LANG = "id"; // "id" or "en"
```

### CORS Configuration

File: `backend/main.py`

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## 🎮 Penggunaan

### Menjalankan Aplikasi

#### 1. Start Backend Server

```bash
cd backend
.venv\Scripts\activate  # Windows
# source .venv/bin/activate  # Linux/Mac
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Server akan berjalan di: `http://localhost:8000`

#### 2. Start Frontend Development Server

```bash
cd frontend
npm run dev
```

Aplikasi akan berjalan di: `http://localhost:5173`

### Menggunakan Fitur Summarization

1. Buka aplikasi di browser
2. Klik tab **"Summarize"**
3. Pilih bahasa (Indonesia/English)
4. Upload file PDF
5. Klik **"Upload & Summarize"**
6. Tunggu proses selesai (progress bar akan muncul)
7. Hasil ringkasan akan ditampilkan dalam format terstruktur

### Menggunakan Fitur Q&A

#### Dengan Dokumen:
1. Upload dokumen terlebih dahulu di tab Summarize
2. Setelah selesai, tab Q&A akan aktif
3. Ketik pertanyaan di input box
4. Tekan Enter atau klik tombol Send
5. Bot akan menjawab berdasarkan konteks dokumen

#### Tanpa Dokumen:
1. Langsung ke tab Q&A
2. Ketik pertanyaan umum
3. Bot akan menjawab berdasarkan knowledge base

### Melihat History

1. Klik menu **"History"** di sidebar
2. Lihat daftar semua ringkasan dan chat logs
3. Klik item untuk melihat detail
4. Klik icon delete untuk menghapus riwayat

---

## 📡 API Documentation

### Base URL
```
http://localhost:8000
```

### Endpoints

#### 1. Health Check

```http
GET /
```

**Response:**
```json
{
  "message": "RAG API is running."
}
```

---

#### 2. Summarize PDF

```http
POST /summarize
```

**Request:**
- Content-Type: `multipart/form-data`
- Body:
  - `file`: PDF file (required)
  - `lang`: Language code - "id" or "en" (optional, default: "en")

**Example (cURL):**
```bash
curl -X POST "http://localhost:8000/summarize" \
  -F "file=@document.pdf" \
  -F "lang=id"
```

**Response:**
```json
{
  "filename": "document.pdf",
  "structured_summary": {
    "Tujuan Penelitian": "...",
    "Metode": "...",
    "Hasil Utama": "...",
    "Kesimpulan": "..."
  },
  "document_id": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Status Codes:**
- `200`: Success
- `400`: Invalid file type
- `500`: Processing error

---

#### 3. Question Answering

```http
POST /qa
```

**Request:**
- Content-Type: `application/json`
- Body:
```json
{
  "document_id": "550e8400-e29b-41d4-a716-446655440000",
  "question": "Apa tujuan dari penelitian ini?",
  "lang": "id"
}
```

**Response:**
```json
{
  "answer": "Tujuan dari penelitian ini adalah...",
  "document_id": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Notes:**
- `document_id` is optional. If not provided, will query main knowledge base
- If `document_id` is not provided, a new session ID will be created and returned

---

#### 4. Get History

```http
GET /history
```

**Response:**
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "filename": "document.pdf",
    "summary": {
      "Tujuan Penelitian": "...",
      "Metode": "...",
      "Hasil Utama": "...",
      "Kesimpulan": "..."
    },
    "chat_logs": [
      {
        "user": "Apa tujuan penelitian?",
        "bot": "Tujuan penelitian adalah...",
        "time": "14:30"
      }
    ],
    "created_at": "2026-01-21T09:30:00"
  }
]
```

---

#### 5. Delete History

```http
DELETE /history/{item_id}
```

**Parameters:**
- `item_id`: UUID of the history item

**Response:**
```json
{
  "message": "History deleted successfully"
}
```

**Status Codes:**
- `200`: Success
- `500`: Database error

---

## 📁 Struktur Proyek

```
website-summarizer/
├── backend/
│   ├── .venv/                      # Virtual environment
│   ├── DB_PAPER/                   # ChromaDB storage
│   ├── models/                     # LLM models
│   │   └── gemma-3-12b-it-GGUF/
│   │       └── gemma-3-12b-it-Q4_K_M.gguf
│   ├── main.py                     # FastAPI application
│   ├── requirements.txt            # Python dependencies
│   └── test_db.py                  # Database testing script
│
├── frontend/
│   ├── node_modules/               # Node dependencies
│   ├── public/                     # Static assets
│   ├── src/
│   │   ├── assets/                 # Images, fonts, etc.
│   │   ├── components/             # React components
│   │   │   ├── dashboard/
│   │   │   │   ├── DocumentUploader.jsx
│   │   │   │   ├── QandAChat.jsx
│   │   │   │   └── SummaryDisplay.jsx
│   │   │   ├── layout/
│   │   │   │   ├── Header.jsx
│   │   │   │   └── Sidebar.jsx
│   │   │   └── shared/
│   │   │       └── LoadingSpinner.jsx
│   │   ├── context/                # React Context API
│   │   │   ├── ChatContext.jsx
│   │   │   ├── HistoryContext.jsx
│   │   │   └── ThemeContext.jsx
│   │   ├── hooks/                  # Custom React hooks
│   │   │   └── useLocalStorage.js
│   │   ├── pages/                  # Page components
│   │   │   ├── Dashboard.jsx
│   │   │   ├── History.jsx
│   │   │   ├── Settings.jsx
│   │   │   └── NotFound.jsx
│   │   ├── App.jsx                 # Main App component
│   │   ├── App.css                 # Global styles
│   │   ├── index.css               # Tailwind imports
│   │   └── main.jsx                # Entry point
│   ├── .eslintrc.cjs               # ESLint configuration
│   ├── index.html                  # HTML template
│   ├── package.json                # NPM dependencies
│   ├── postcss.config.js           # PostCSS configuration
│   ├── tailwind.config.js          # Tailwind configuration
│   └── vite.config.js              # Vite configuration
│
└── README.md                       # This file
```

---

## 🗄 Database Schema

### Table: `history`

| Column | Type | Description |
|--------|------|-------------|
| `id` | VARCHAR(36) | Primary key (UUID) |
| `filename` | VARCHAR(255) | Original PDF filename or "Q&A Session" |
| `summary` | TEXT | JSON string of structured summary |
| `chat_logs` | TEXT | JSON array of chat messages |
| `created_at` | TIMESTAMP | Creation timestamp |

### Summary JSON Structure

```json
{
  "Tujuan Penelitian": "string",
  "Metode": "string",
  "Hasil Utama": "string",
  "Kesimpulan": "string"
}
```

### Chat Log JSON Structure

```json
[
  {
    "user": "User question",
    "bot": "Bot answer",
    "time": "HH:MM"
  }
]
```

---

## 🔧 Troubleshooting

### Backend Issues

#### 1. Model Loading Error

**Problem:** `FileNotFoundError: Model file not found`

**Solution:**
- Pastikan model sudah didownload
- Periksa path di `main.py`
- Pastikan nama file sesuai

#### 2. CUDA Out of Memory

**Problem:** `RuntimeError: CUDA out of memory`

**Solution:**
- Kurangi `n_gpu_layers` di konfigurasi
- Gunakan model dengan quantization lebih rendah
- Tutup aplikasi lain yang menggunakan GPU

#### 3. Database Connection Error

**Problem:** `Error connecting to MariaDB`

**Solution:**
- Pastikan MySQL/MariaDB sudah running
- Periksa kredensial di `DB_CONFIG`
- Pastikan database `db_summarizer` sudah dibuat

#### 4. ChromaDB Collection Error

**Problem:** `Collection not found`

**Solution:**
- Hapus folder `DB_PAPER` dan restart server
- Server akan membuat collection baru secara otomatis

### Frontend Issues

#### 1. API Connection Error

**Problem:** `Network Error` atau `CORS Error`

**Solution:**
- Pastikan backend server sudah running
- Periksa URL di konfigurasi frontend
- Periksa CORS settings di backend

#### 2. Build Error

**Problem:** `Module not found`

**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
```

#### 3. Port Already in Use

**Problem:** `Port 5173 is already in use`

**Solution:**
```bash
# Kill process on port 5173
npx kill-port 5173
# Or use different port
npm run dev -- --port 5174
```

---

## 🤝 Kontribusi

Kontribusi sangat diterima! Berikut cara berkontribusi:

### 1. Fork Repository

```bash
git clone https://github.com/yourusername/website-summarizer.git
cd website-summarizer
```

### 2. Buat Branch Baru

```bash
git checkout -b feature/amazing-feature
```

### 3. Commit Changes

```bash
git add .
git commit -m "Add: amazing feature"
```

### 4. Push ke Branch

```bash
git push origin feature/amazing-feature
```

### 5. Buat Pull Request

- Buka repository di GitHub
- Klik "New Pull Request"
- Pilih branch Anda
- Deskripsikan perubahan yang dibuat

### Coding Standards

- **Python**: Follow PEP 8
- **JavaScript**: Follow Airbnb Style Guide
- **Commits**: Use conventional commits (feat, fix, docs, style, refactor, test, chore)

---

## 📄 Lisensi

Proyek ini dilisensikan di bawah **MIT License**.

```
MIT License

Copyright (c) 2026 Website Summarizer

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 📞 Kontak

**Developer**: Zainal Fattah  
**Email**: zainalfattah@example.com  
**GitHub**: [@ZainalFattah](https://github.com/ZainalFattah)  
**Project Link**: [https://github.com/ZainalFattah/website_summarizer](https://github.com/ZainalFattah/website_summarizer)

---

## 🙏 Acknowledgments

- [FastAPI](https://fastapi.tiangolo.com/) - Modern web framework
- [React](https://react.dev/) - UI library
- [Llama.cpp](https://github.com/ggerganov/llama.cpp) - LLM inference
- [ChromaDB](https://www.trychroma.com/) - Vector database
- [Docling](https://github.com/DS4SD/docling) - Document converter
- [HuggingFace](https://huggingface.co/) - Model hub
- [TailwindCSS](https://tailwindcss.com/) - CSS framework

---

## 📊 Statistik Proyek

- **Total Lines of Code**: ~15,000+
- **Backend**: ~400 lines (Python)
- **Frontend**: ~3,000+ lines (JavaScript/JSX)
- **Components**: 15+ React components
- **API Endpoints**: 5 endpoints
- **Supported Languages**: 2 (ID, EN)

---

## 🔮 Roadmap

### Version 2.0 (Planned)

- [ ] Support untuk format dokumen lain (DOCX, TXT, HTML)
- [ ] Multi-document comparison
- [ ] Export summary ke PDF/DOCX
- [ ] User authentication & authorization
- [ ] Cloud deployment guide
- [ ] Docker containerization
- [ ] API rate limiting
- [ ] Caching layer untuk performa
- [ ] Real-time collaboration
- [ ] Mobile app (React Native)

### Version 2.1 (Future)

- [ ] Advanced analytics dashboard
- [ ] Custom model fine-tuning
- [ ] Batch processing
- [ ] Integration dengan cloud storage (Google Drive, Dropbox)
- [ ] Webhook support
- [ ] GraphQL API

---

## ⚡ Performance Tips

### Backend Optimization

1. **GPU Utilization**
   - Pastikan CUDA drivers ter-update
   - Monitor GPU usage dengan `nvidia-smi`
   - Adjust `n_gpu_layers` sesuai VRAM

2. **Model Selection**
   - Gunakan quantized models (Q4_K_M) untuk balance speed/quality
   - Pertimbangkan Q3_K_M untuk speed, Q5_K_M untuk quality

3. **Chunking Strategy**
   - Sesuaikan `chunk_size` berdasarkan jenis dokumen
   - Increase `overlap` untuk dokumen teknis

### Frontend Optimization

1. **Code Splitting**
   - Lazy load components
   - Use React.memo untuk prevent re-renders

2. **API Calls**
   - Implement request debouncing
   - Cache responses di localStorage

3. **Bundle Size**
   - Analyze dengan `npm run build`
   - Remove unused dependencies

---

## 🔒 Security Considerations

1. **API Security**
   - Implement rate limiting
   - Add API key authentication
   - Validate all inputs

2. **File Upload**
   - Limit file size (max 10MB recommended)
   - Validate file types
   - Scan for malware

3. **Database**
   - Use prepared statements (already implemented)
   - Regular backups
   - Encrypt sensitive data

4. **Environment Variables**
   - Never commit `.env` files
   - Use secrets management in production

---

<div align="center">

**⭐ Jika proyek ini membantu Anda, berikan star di GitHub! ⭐**

Made with ❤️ by Zainal Fattah

</div>
