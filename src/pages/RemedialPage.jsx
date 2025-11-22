import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

import Card from "../components/Card";
import Gallery from "../components/Gallery";
import Faq from "../components/Faq";
import ModernPlayer from "../components/ModernPlayer";
import Footer from "../components/Footer";

export default function RemedialPage() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const { data, error } = await supabase
      .from("info")
      .select("*")
      .order("created_at", { ascending: true });

    if (!error) {
      setRows(data || []);
      console.log("📊 Data dari Supabase:", data);
    }
    setLoading(false);
  }

  // Extract identitas utama (yang punya tentang_proyek)
  const mainProfile = rows.find((r) => r.tentang_proyek) || {};

  // Extract identitas dengan kelas (fallback)
  const classProfile = rows.find((r) => r.nama && r.nim && r.kelas) || {};

  // Merge profile
  const profile = { ...classProfile, ...mainProfile };

  // BIO / QUOTE
  const bioRow = rows
    .filter((r) => r.bio && r.bio.length > 50)
    .sort((a, b) => b.bio.length - a.bio.length)[0];

  // Gallery
  const galleryImages = rows
    .filter((r) => r.cover_url)
    .map((r) => ({
      id: r.id,
      url: r.cover_url,
      alt: r.nama || r.remedial_text || "Galeri",
    }));

  // Playlist
  const playlist = rows
    .filter((r) => r.audio_url)
    .map((r) => ({
      id: r.id,
      title: r.remedial_text || r.nama || "Track",
      artist: r.bio || r.nama || "Artist",
      file: r.audio_url,
      cover: r.cover_url || profile.cover_url,
    }));

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900">
        <div className="text-xl text-gray-600 dark:text-gray-300 animate-pulse">
          Memuat data dari Supabase...
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Navbar */}
      <nav className="w-full fixed top-0 left-0 z-50 bg-white dark:bg-slate-800 shadow-sm px-6 py-3 flex justify-between items-center">
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
        >
          ← Kembali
        </button>

        <div className="font-semibold text-gray-800 dark:text-gray-100 text-sm">
          Remedial Web • {profile.nama}
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-24 pb-12 max-w-6xl space-y-8">

        {/* Identity Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card variant="soft">
            <div className="text-xs text-gray-500 dark:text-gray-300">Nama</div>
            <div className="mt-2 font-semibold text-gray-800 dark:text-gray-100">
              {profile.nama}
            </div>
          </Card>

          <Card variant="soft">
            <div className="text-xs text-gray-500 dark:text-gray-300">NIM</div>
            <div className="mt-2 font-semibold text-gray-800 dark:text-gray-100">
              {profile.nim}
            </div>
          </Card>

          <Card variant="soft">
            <div className="text-xs text-gray-500 dark:text-gray-300">Kelas</div>
            <div className="mt-2 font-semibold text-gray-800 dark:text-gray-100">
              {profile.kelas}
            </div>
          </Card>
        </section>

        {/* Quote Bio */}
        {bioRow && bioRow.bio && (
          <div className="relative my-8">
            {/* Background gradient glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl blur-xl opacity-20 pointer-events-none"></div>

            <Card variant="glass">
              <div className="relative py-8 px-6 md:px-16">

                <blockquote>
                  <p className="text-lg md:text-2xl font-medium text-gray-800 dark:text-gray-100 leading-relaxed text-center italic px-4 md:px-8">
                    {bioRow.bio}
                  </p>
                </blockquote>

                {/* Author */}
                <div className="mt-8 text-center border-t border-gray-200 dark:border-gray-700 pt-6">
                  <p className="text-base md:text-lg font-bold text-indigo-600 dark:text-indigo-400">
                    — {bioRow.nama || profile.nama}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {profile.nim} • {profile.kelas}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Project Description */}
        {profile.tentang_proyek && (
          <Card title="📘 Tentang Proyek">
            <div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
              {profile.tentang_proyek.split("\n\n").map((paragraph, idx) => (
                <p key={idx} className="text-justify text-sm md:text-base">
                  {paragraph}
                </p>
              ))}
            </div>
          </Card>
        )}

        {/* Gallery */}
        {galleryImages.length > 0 && (
          <Card title="🖼️ Galeri">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Total:{" "}
              <strong className="text-indigo-600 dark:text-indigo-400">
                {galleryImages.length}
              </strong>{" "}
              foto
            </p>
            <Gallery images={galleryImages} />
          </Card>
        )}

        {/* FAQ */}
        <Card title="❓ FAQ">
          <Faq />
        </Card>

        {/* Music Player */}
        {playlist.length > 0 && (
          <Card title="🎵 Lagu-Lagu Saya">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
              Total:{" "}
              <strong className="text-indigo-600 dark:text-indigo-400">
                {playlist.length}
              </strong>{" "}
              lagu • Playlist otomatis dari Supabase
            </p>
            <ModernPlayer playlist={playlist} />
          </Card>
        )}

        {/* Footer */}
        <Footer name={profile.nama} />
      </main>
    </>
  );
}
