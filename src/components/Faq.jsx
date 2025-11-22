import React from "react";

export default function Faq() {
  return (
    <div className="space-y-3">
      <details className="faq-item">
        <summary>Apa tujuan remedial ini?</summary>
        <p className="mt-2 text-sm">
          Untuk memperbaiki dan meningkatkan kualitas belajar Perancangan Web.
        </p>
      </details>

      <details className="faq-item">
        <summary>Mengapa menggunakan Supabase?</summary>
        <p className="mt-2 text-sm">
          Supabase menyediakan penyimpanan file, database, dan autentikasi.
        </p>
      </details>

      <details className="faq-item">
        <summary>Apa teknologi utama proyek?</summary>
        <p className="mt-2 text-sm">React + Supabase + TailwindCSS.</p>
      </details>
    </div>
  );
}
