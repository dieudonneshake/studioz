
'use client';

import { type Video } from '@/lib/types';
import { Play, Pause, Rewind, FastForward, Volume2, Maximize, PictureInPicture2 } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';
import { Slider } from '../ui/slider';

interface CustomVideoPlayerProps {
  video: Video;
}

function formatTime(seconds: number) {
  const roundedSeconds = Math.floor(seconds);
  const minutes = Math.floor(roundedSeconds / 60);
  const remainingSeconds = roundedSeconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export default function CustomVideoPlayer({ video }: CustomVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleProgressChange = (value: number[]) => {
     if (videoRef.current) {
      const newTime = (value[0] / 100) * duration;
      videoRef.current.currentTime = newTime;
      setProgress(value[0]);
    }
  };

  const handleSkip = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  return (
    <div className="group relative aspect-video w-full overflow-hidden rounded-lg bg-black shadow-lg">
      <video
        ref={videoRef}
        src={video.video_url}
        poster={video.thumbnail_path}
        className="h-full w-full object-cover"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onClick={togglePlay}
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" onClick={togglePlay}>
        {!isPlaying && <Play className="h-16 w-16 text-white fill-white" />}
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex flex-col gap-2">
            <Slider
                value={[progress]}
                onValueChange={handleProgressChange}
                className="w-full h-1 [&>span:first-child]:h-1 [&_[role=slider]]:h-3 [&_[role=slider]]:w-3 [&_[role=slider]]:border-2"
                style={{'--slider-track-bg': '#00A65A'} as React.CSSProperties}
            />

            <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-4">
                    <button onClick={togglePlay}>
                        {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                    </button>
                    <button onClick={() => handleSkip(-10)}>
                        <Rewind className="h-5 w-5" />
                    </button>
                    <button onClick={() => handleSkip(10)}>
                        <FastForward className="h-5 w-5" />
                    </button>
                    <div className="flex items-center gap-2">
                        <Volume2 className="h-5 w-5" />
                    </div>
                     <div className="text-xs font-mono">
                        {formatTime(currentTime)} / {formatTime(duration)}
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button>
                        <PictureInPicture2 className="h-5 w-5" />
                    </button>
                    <button>
                        <Maximize className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
