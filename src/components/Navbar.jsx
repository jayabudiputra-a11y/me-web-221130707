import React from "react";

export default function Navbar() {
  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-white shadow-sm px-6 py-3 flex justify-between items-center">
      <a href="/remedial" className="btn btn-primary">Kembali</a>

      <div className="font-semibold text-gray-800 text-sm">
        Remedial Web • Budi
      </div>
    </nav>
  );
}
