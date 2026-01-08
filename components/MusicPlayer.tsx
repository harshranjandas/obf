'use client';

import { useState, useRef, useEffect } from 'react';
import { PlayIcon } from './icons/PlayIcon';
import { PauseIcon } from './icons/PauseIcon';
import { NextIcon } from './icons/NextIcon';

interface AudioFile {
  url: string;
  name: string;
}

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [audioFile] = useState<AudioFile>({
    url: '/audio/obf-intro.mp3',
    name: 'OFB Podcast',
  });
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const effectiveDuration = duration || 100;
  const progressPercent = Math.min(
    100,
    Math.max(0, (currentTime / effectiveDuration) * 100)
  );

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      if (!isDragging) {
        setCurrentTime(audio.currentTime);
      }
    };
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [audioFile, isDragging]);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleRewind = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(
        0,
        audioRef.current.currentTime - 10
      );
    }
  };

  const handleForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(
        duration,
        audioRef.current.currentTime + 10
      );
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (!isNaN(newTime) && duration > 0) {
      setCurrentTime(newTime);
      if (audioRef.current) {
        audioRef.current.currentTime = newTime;
      }
    }
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="relative rounded-lg bg-white/40 w-[220px] backdrop-blur-md border border-[#E6E6E6]/60 border-solid">
      <div className="relative rounded-lg  pt-[14px] px-[14px] pb-[16px]">
        <div className="mb-3 relative h-1">
          <div className="absolute inset-0 rounded-lg bg-white" />
          <div
            className="absolute inset-0 rounded-lg pointer-events-none"
            style={{
              width: `${progressPercent}%`,
              background: 'linear-gradient(90deg, #FF671F 3.31%, #FFA377 100%)',
            }}
          />
          <input
            type="range"
            min="0"
            max={duration || 100}
            step="0.1"
            value={currentTime}
            onChange={handleProgressChange}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchEnd={handleMouseUp}
            className="relative w-full appearance-none cursor-pointer bg-transparent top-[-7px]"
            style={{ height: '16px' }}
          />
        </div>

        <div className="flex items-center gap-3 justify-center">
          <button
            onClick={handleRewind}
            className="w-8 h-8 flex -rotate-180 items-center justify-center"
          >
            <NextIcon />
          </button>

          <button
            onClick={togglePlayPause}
            className="w-8 h-8 flex items-center justify-center rounded-full text-white"
            style={{
              background:
                'linear-gradient(213.5deg, #FFA377 11.35%, #FF671F 86.53%)',
              boxShadow:
                '2px 6px 20px 0px rgba(255, 103, 31, 0.5) inset, 0px 6px 20px 0px rgba(255, 103, 31, 0.4)',
            }}
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>

          <button
            onClick={handleForward}
            className="w-8 h-8 flex items-center justify-center"
          >
            <NextIcon />
          </button>
        </div>

        <audio ref={audioRef} src={audioFile.url} />
      </div>
    </div>
  );
};

export default MusicPlayer;
