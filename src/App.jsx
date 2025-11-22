import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./pages/HomePage";
import RemedialPage from "./pages/RemedialPage";

export default function App() {
  return (
    <Routes>
      {/* Halaman landing/jumbotron */}
      <Route path="/" element={<HomePage />} />

      {/* Halaman utama remedial */}
      <Route path="/remedial" element={<RemedialPage />} />

      {/* Redirect unknown routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}