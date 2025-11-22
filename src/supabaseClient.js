// src/supabaseClient.js

import { createClient } from "@supabase/supabase-js";

// Mengambil variabel lingkungan sesuai standar VITE
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Kunci otentikasi (sb_publishable_...) Anda dimasukkan ke dalam file .env.local

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Kesalahan: Supabase URL atau Anon Key tidak ditemukan. Pastikan Anda telah mengatur VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY di file .env.local.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);