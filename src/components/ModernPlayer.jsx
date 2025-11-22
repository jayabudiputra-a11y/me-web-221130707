import React, { useState, useRef, useEffect } from "react";

export default function ModernPlayer({ playlist = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const current = playlist[currentIndex] || {};

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  const next = () => {
    setCurrentIndex((i) => (i + 1) % playlist.length);
    setIsPlaying(true);
  };

  const prev = () => {
    setCurrentIndex((i) => (i - 1 + playlist.length) % playlist.length);
    setIsPlaying(true);
  };

  const handleSeek = (e) => {
    const progressBar = e.currentTarget;
    const clickX = e.nativeEvent.offsetX;
    const width = progressBar.offsetWidth;
    const newTime = (clickX / width) * duration;
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => next();

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentIndex]);

  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.play().catch(() => {});
    }
  }, [currentIndex]);

  if (!playlist.length) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400 py-8">
        Tidak ada audio tersedia.
      </div>
    );
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="w-full">
      <div className="h-2 bg-red-400"></div>

      <div className="bg-white dark:bg-slate-800 shadow-2xl rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          
          <div className="md:w-64 flex-shrink-0">
            <img
              className="w-full h-64 md:h-full object-cover"
              src={current.cover}
              alt={current.title}
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/400?text=No+Cover";
              }}
            />
          </div>

          <div className="w-full p-6 md:p-8">
            
            <div className="flex justify-between items-start mb-6 md:mb-8">
              <div className="flex-1 pr-4">
                <h3 className="text-xl md:text-3xl text-gray-800 dark:text-gray-100 font-medium break-words">
                  {current.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {current.artist}
                </p>
              </div>
              <button className="text-red-400 hover:text-red-500 transition flex-shrink-0">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 3.22l-.61-.6a5.5 5.5 0 0 0-7.78 7.77L10 18.78l8.39-8.4a5.5 5.5 0 0 0-7.78-7.77l-.61.61z" />
                </svg>
              </button>
            </div>

            <div className="flex justify-between items-center mb-6 md:mb-8">
              
              <button className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition">
                <svg className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.59 12.83L4.4 15c-.58.58-1.59 1-2.4 1H0v-2h2c.29 0 .8-.2 1-.41l2.17-2.18 1.42 1.42zM16 4V1l4 4-4 4V6h-2c-.29 0-.8.2-1 .41l-2.17 2.18L9.4 7.17 11.6 5c.58-.58 1.59-1 2.41-1h2zm0 10v-3l4 4-4 4v-3h-2c-.82 0-1.83-.42-2.41-1l-8.6-8.59C2.8 6.21 2.3 6 2 6H0V4h2c.82 0 1.83.42 2.41 1l8.6 8.59c.2.2.7.41.99.41h2z" />
                </svg>
              </button>

              <button
                onClick={prev}
                disabled={playlist.length <= 1}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition disabled:opacity-50"
              >
                <svg className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 5h3v10H4V5zm12 0v10l-9-5 9-5z" />
                </svg>
              </button>

              <button
                onClick={togglePlay}
                className="text-white p-5 md:p-6 rounded-full bg-red-400 hover:bg-red-500 shadow-xl transition transform hover:scale-105 active:scale-95"
              >
                {isPlaying ? (
                  <svg className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 4h3v12H5V4zm7 0h3v12h-3V4z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 4l12 6-12 6V4z" />
                  </svg>
                )}
              </button>

              <button
                onClick={next}
                disabled={playlist.length <= 1}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition disabled:opacity-50"
              >
                <svg className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 5h3v10h-3V5zM4 5l9 5-9 5V5z" />
                </svg>
              </button>

              <button className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition">
                <svg className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 4a2 2 0 0 0-2 2v6H0l4 4 4-4H5V6h7l2-2H5zm10 4h-3l4-4 4 4h-3v6a2 2 0 0 1-2 2H6l2-2h7V8z" />
                </svg>
              </button>
            </div>

            <div className="px-2">
              <div className="flex justify-between text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-2">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
              <div
                className="h-2 bg-gray-300 dark:bg-gray-600 rounded-full cursor-pointer relative"
                onClick={handleSeek}
              >
                <div
                  className="h-2 bg-red-400 rounded-full relative transition-all"
                  style={{ width: `${progress}%` }}
                >
                  <span className="w-4 h-4 bg-red-500 absolute right-0 top-1/2 -translate-y-1/2 rounded-full shadow-lg"></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <audio ref={audioRef} src={current.file} preload="metadata" />
      </div>
    </div>
  );
}