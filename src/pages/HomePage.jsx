import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import '../index.css';
import '../App.css';

export default function HomePage() {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    const { data, error } = await supabase
      .from("info")
      .select("*")
      .order("created_at", { ascending: true });

    if (!error && data) {
      console.log("📊 All data:", data);
      
      // CARI YANG PUNYA tentang_proyek (ini identitas utama Anda)
      // Berdasarkan SQL, row dengan tentang_proyek = id '456e4d29'
      const mainIdentity = data.find((r) => r.tentang_proyek);
      
      console.log("👤 Main identity (with tentang_proyek):", mainIdentity);
      
      // Jika tidak ada tentang_proyek, fallback ke yang punya nama + nim + kelas
      const fallback = data.find((r) => r.nama && r.nim && r.kelas);
      
      const identity = mainIdentity || fallback || {};
      
      console.log("✅ Final profile:", identity);
      setProfile(identity);
    } else if (error) {
      console.error("❌ Error:", error);
    }
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
        <div className="text-white text-2xl animate-pulse">Memuat...</div>
      </div>
    );
  }

  return (
    <section
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: profile.cover_url ? `url(${profile.cover_url})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "#4b5563",
      }}
    >
      {profile.cover_url && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/55 to-black/70 backdrop-blur-sm"></div>
      )}

      <div className="relative z-20 text-center px-6">
        <div className="rounded-3xl p-10 md:p-12 max-w-xl mx-auto shadow-2xl backdrop-blur-md bg-white/30 dark:bg-black/30 border border-white/40">
          
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-wide text-white drop-shadow-2xl mb-4">
            Selamat Datang 👋
          </h1>

          <p className="text-xl md:text-2xl font-medium mb-8 text-white/95 drop-shadow-lg">
            {profile.nama && `Saya ${profile.nama}`}
          </p>

          <button
            onClick={() => navigate("/remedial")}
            className="px-8 py-3 text-lg font-semibold rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 shadow-[0_8px_30px_rgba(99,102,241,0.5)] transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Masuk ke Halaman Utama
          </button>
        </div>
      </div>

      <div className="absolute inset-0 backdrop-blur-[1px] opacity-50 pointer-events-none"></div>
    </section>
  );
}