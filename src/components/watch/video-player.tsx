

'use client';

import { type Video } from '@/lib/types';
import { Play, Pause, Rewind, FastForward, Volume2, VolumeX, Maximize, PictureInPicture2, Volume1, Volume } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';
import { Slider } from '../ui/slider';

interface CustomVideoPlayerProps {
  video: Video;
}

function formatTime(seconds: number) {
  if (isNaN(seconds)) return '00:00';
  const roundedSeconds = Math.floor(seconds);
  const minutes = Math.floor(roundedSeconds / 60);
  const remainingSeconds = roundedSeconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export default function CustomVideoPlayer({ video }: CustomVideoPlayerProps) {
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

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
      setCurrentTime(newTime);
      setProgress(value[0]);
    }
  };
  
  const handleVolumeChange = (value: number[]) => {
    if (videoRef.current) {
        const newVolume = value[0];
        setVolume(newVolume);
        setIsMuted(newVolume === 0);
        videoRef.current.volume = newVolume;
        videoRef.current.muted = newVolume === 0;
    }
  }

  const toggleMute = () => {
      if (videoRef.current) {
          if (isMuted || volume > 0) {
              const newMutedState = !isMuted;
              setIsMuted(newMutedState);
              videoRef.current.muted = newMutedState;
              if(!newMutedState && volume === 0) {
                  setVolume(0.5); // Restore to a default volume
                  videoRef.current.volume = 0.5;
              }
          } else { // volume is 0 and not muted
            setVolume(0.5);
            videoRef.current.volume = 0.5;
            setIsMuted(false);
            videoRef.current.muted = false;
          }
      }
  }

  const handleSkip = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };
  
  const toggleFullscreen = () => {
    if (!playerContainerRef.current) return;
    
    if (!document.fullscreenElement) {
        playerContainerRef.current.requestFullscreen().catch(err => {
            alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
    } else {
        document.exitFullscreen();
    }
  };

  const togglePip = () => {
      if (videoRef.current) {
          if (document.pictureInPictureElement) {
              document.exitPictureInPicture();
          } else {
              videoRef.current.requestPictureInPicture();
          }
      }
  }
  
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);
  
  const VolumeIcon = isMuted || volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2;


  return (
    <div ref={playerContainerRef} className="group relative aspect-video w-full overflow-hidden rounded-lg bg-black shadow-lg">
      <video
        ref={videoRef}
        src={video.video_url}
        poster={video.thumbnail_path}
        className="h-full w-full object-contain"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
        onClick={togglePlay}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        {!isPlaying && <div className="p-4 bg-black/50 rounded-full"><Play className="h-12 w-12 text-white fill-white" /></div>}
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex flex-col gap-2">
            <Slider
                value={[progress]}
                onValueChange={handleProgressChange}
                className="w-full h-1 [&>span:first-child]:h-1 [&_[role=slider]]:h-3 [&_[role=slider]]:w-3 [&_[role=slider]]:border-2"
                style={{'--slider-track-bg': '#00A65A'} as React.CSSProperties}
            />

            <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-4">
                    <button onClick={togglePlay} className="focus:outline-none">
                        {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                    </button>
                    <button onClick={() => handleSkip(-10)} className="focus:outline-none">
                        <Rewind className="h-5 w-5" />
                    </button>
                    <button onClick={() => handleSkip(10)} className="focus:outline-none">
                        <FastForward className="h-5 w-5" />
                    </button>
                    <div className="flex items-center gap-2 group/volume">
                        <button onClick={toggleMute}>
                          <VolumeIcon className="h-5 w-5" />
                        </button>
                        <div className="w-0 group-hover/volume:w-24 transition-all duration-300">
                            <Slider
                                value={[isMuted ? 0 : volume * 100]}
                                onValueChange={(val) => handleVolumeChange([val[0] / 100])}
                                className="h-1 [&>span:first-child]:h-1 [&_[role=slider]]:h-3 [&_[role=slider]]:w-3 [&_[role=slider]]:border-2"
                            />
                        </div>
                    </div>
                     <div className="text-xs font-mono">
                        {formatTime(currentTime)} / {formatTime(duration)}
                    </div>
                </div>

                <div className="flex items-center gap-4">
                     {document.pictureInPictureEnabled && <button onClick={togglePip} className="focus:outline-none">
                        <PictureInPicture2 className="h-5 w-5" />
                    </button>}
                    <button onClick={toggleFullscreen} className="focus:outline-none">
                        <Maximize className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
