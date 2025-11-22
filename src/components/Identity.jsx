import React from "react";

export default function Identity({ profile = {} }) {
  return (
    <div className="space-y-2">
      <div><strong>Nama:</strong> {profile.nama || "-"}</div>
      <div><strong>NIM:</strong> {profile.nim || "-"}</div>
      <div><strong>Kelas:</strong> {profile.kelas || "-"}</div>
    </div>
  );
}
