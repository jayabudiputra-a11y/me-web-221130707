import React from "react";

export default function Footer({ name }) {
  return (
    <footer className="text-center text-sm text-gray-600 dark:text-gray-400 py-6 border-t border-gray-200 dark:border-gray-700">
      <p className="mb-1">
        © 2025 • <strong>{name}</strong>
      </p>
      <p className="text-xs">
        Remedial Perancangan Web • Universitas Mikroskil
      </p>
      <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
        Built with React + Supabase + Tailwind CSS
      </p>
    </footer>
  );
}