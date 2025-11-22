import React from "react";

export default function Story({ text }) {
  return (
    <p className="project-text section-sub">
      {text || "Belum ada deskripsi."}
    </p>
  );
}
