import React from "react";

export default function Gallery({ images = [] }) {
  if (!images.length)
    return <div className="text-gray-500">Tidak ada gambar.</div>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
      {images.map((img) => (
        <div key={img.id} className="rounded-lg overflow-hidden">
          <img
            src={img.url}
            alt={img.alt}
            className="w-full h-40 object-cover zoom-hover"
          />
        </div>
      ))}
    </div>
  );
}
