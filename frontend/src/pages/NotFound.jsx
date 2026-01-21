import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', paddingTop: '4rem' }}>
      <h1 className="page-title">404 - Halaman Tidak Ditemukan</h1>
      <p>Maaf, halaman yang Anda cari tidak ada.</p>
      <Link to="/" className="summarize-btn" style={{ textDecoration: 'none', display: 'inline-block', width: 'auto' }}>
        Kembali ke Dashboard
      </Link>
    </div>
  );
};

export default NotFound;