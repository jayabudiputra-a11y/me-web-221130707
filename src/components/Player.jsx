// src/components/Player.jsx
import React, { useState, useRef, useEffect } from "react";
import { FaBackward, FaForward, FaPause, FaPlay } from "react-icons/fa";

export default function Player({ playlist }) {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const audioRef = useRef(null);

  const current = playlist[index];

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();

    setIsPlaying(!isPlaying);
  };

  const nextSong = () => {
    setIndex((i) => (i + 1) % playlist.length);
    setIsPlaying(true);
  };

  const prevSong = () => {
    setIndex((i) => (i - 1 + playlist.length) % playlist.length);
    setIsPlaying(true);
  };

  /** Auto play each time song changes */
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  }, [index]);

  return (
    <div className="player fade-in flex flex-col items-center justify-center text-white">

      {/* Cover */}
      <img
        src={current.cover}
        className="cover-image mb-4"
        alt="cover"
      />

      {/* Title */}
      <h2 className="text-lg font-semibold">{current.title}</h2>
      <p className="text-sm text-gray-300 mb-5">{current.artist}</p>

      {/* Controls */}
      <div className="flex items-center gap-6 mt-2">
        <button
          onClick={prevSong}
          className="p-3 rounded-xl bg-gray-800 hover:bg-gray-700 transition"
        >
          <FaBackward size={18} />
        </button>

        <button
          onClick={togglePlay}
          className="p-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition shadow-lg"
        >
          {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
        </button>

        <button
          onClick={nextSong}
          className="p-3 rounded-xl bg-gray-800 hover:bg-gray-700 transition"
        >
          <FaForward size={18} />
        </button>
      </div>

      {/* Hidden audio */}
      <audio
        ref={audioRef}
        src={current.file}
        onEnded={nextSong}
      />
    </div>
  );
}
