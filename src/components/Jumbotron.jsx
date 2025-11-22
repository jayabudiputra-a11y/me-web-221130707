import React from "react";

export default function Jumbotron({ name, cover, onEnter }) {
  return (
    <section
      className="
        relative w-full h-screen 
        flex items-center justify-center
        overflow-hidden fade-in
      "
      style={{
        backgroundImage: `url(${cover})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >

      {/* === DARK OVERLAY === */}
      <div
        className="
          absolute inset-0 
          bg-gradient-to-b 
          from-black/40 via-black/55 to-black/70
          dark:from-black/60 dark:via-black/70 dark:to-black/80
          backdrop-blur-sm
        "
      ></div>

      {/* === CONTENT BOX === */}
      <div className="relative z-20 text-center px-6">
        <div
          className="
            rounded-3xl p-10 md:p-12 max-w-xl mx-auto 
            shadow-2xl backdrop-blur-xl
            bg-white/20 dark:bg-black/20
            border border-white/30 dark:border-white/10
          "
        >
          {/* TITLE */}
          <h1
            className="
              text-4xl md:text-6xl font-extrabold tracking-wide 
              text-white drop-shadow-xl
              mb-4
            "
          >
            Selamat Datang 👋
          </h1>

          {/* SUBTITLE */}
          <p
            className="
              text-xl md:text-2xl font-medium mb-7
              text-white/90 drop-shadow
            "
          >
            {name ? `Saya ${name}` : "Profil Mahasiswa"}
          </p>

          {/* BUTTON MASUK */}
          <button
            onClick={onEnter}
            className="
              px-8 py-3 text-lg font-semibold rounded-xl
              bg-indigo-600 text-white
              hover:bg-indigo-700
              shadow-[0_6px_24px_rgba(99,102,241,0.45)]
              transition-all duration-300
              hover:scale-105 active:scale-95
            "
          >
            Masuk ke Halaman Utama
          </button>

        </div>
      </div>

      {/* === ADDITIONAL BLUR (DEPTH EFFECT) === */}
      <div
        className="
          absolute inset-0 
          backdrop-blur-[1px] opacity-50
          pointer-events-none
        "
      ></div>

    </section>
  );
}
