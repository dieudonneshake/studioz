
'use client';

import { useState, useRef, useEffect } from 'react';
import { type Short, type User } from '@/lib/types';
import { Heart, MessageCircle, Send, MoreVertical, Play, Pause, Music, Volume2, VolumeX } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';

interface ShortsPlayerProps {
  short: Short;
  uploader: User;
  isActive: boolean;
}

export function ShortsPlayer({ short, uploader, isActive }: ShortsPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // Start muted for autoplay

  useEffect(() => {
    if (isActive) {
      videoRef.current?.play().then(() => {
        setIsPlaying(true);
      }).catch(e => {
        // Autoplay was prevented.
        setIsPlaying(false);
      });
    } else {
      videoRef.current?.pause();
      setIsPlaying(false);
    }
  }, [isActive]);

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
  
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if(videoRef.current){
        const newMutedState = !videoRef.current.muted;
        videoRef.current.muted = newMutedState;
        setIsMuted(newMutedState);
    }
  };

  return (
    <div className="relative h-full w-full bg-black rounded-xl" onClick={togglePlay}>
      <video
        ref={videoRef}
        src={short.videoUrl}
        className="h-full w-full object-contain"
        loop
        playsInline
        muted={isMuted}
      />

      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <Play className="h-20 w-20 text-white/70 fill-white/70" />
        </div>
      )}

      {/* Header for Mute Button */}
      <div className="absolute top-4 right-4 z-10">
        <Button variant="ghost" size="icon" onClick={toggleMute} className="text-white bg-black/30 hover:bg-black/50">
          {isMuted ? <VolumeX className="h-5 w-5"/> : <Volume2 className="h-5 w-5"/> }
        </Button>
      </div>

      {/* Footer Info */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent text-white">
        <div className="flex items-center gap-2">
            <Avatar className="h-10 w-10 border-2 border-white">
                <AvatarImage src={uploader.profile_photo} />
                <AvatarFallback>{uploader.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <p className="font-semibold text-lg">@{uploader.name.split(' ').join('').toLowerCase()}</p>
            <Button size="sm" className="ml-2 bg-white text-black font-bold hover:bg-gray-200">Follow</Button>
        </div>
        <p className="mt-2 text-sm line-clamp-2">{short.title}</p>
        <div className="flex items-center gap-2 mt-2 text-sm">
            <Music className="h-4 w-4" />
            <p>Original sound - {uploader.name}</p>
        </div>
      </div>

      {/* Side Navigation */}
      <div className="absolute bottom-24 right-2 flex flex-col items-center gap-4 text-white">
        <div className="flex flex-col items-center gap-1">
          <Button variant="ghost" size="icon" className="rounded-full bg-black/30 hover:bg-black/50 h-12 w-12">
            <Heart className="h-7 w-7" />
          </Button>
          <span className="text-xs font-semibold">{short.likes}K</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Button variant="ghost" size="icon" className="rounded-full bg-black/30 hover:bg-black/50 h-12 w-12">
            <MessageCircle className="h-7 w-7" />
          </Button>
          <span className="text-xs font-semibold">{short.comments}K</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Button variant="ghost" size="icon" className="rounded-full bg-black/30 hover:bg-black/50 h-12 w-12">
            <Send className="h-7 w-7" />
          </Button>
          <span className="text-xs font-semibold">{short.shares}K</span>
        </div>
        <Button variant="ghost" size="icon" className="rounded-full bg-black/30 hover:bg-black/50 h-12 w-12">
          <MoreVertical className="h-7 w-7" />
        </Button>
         <div className="mt-2">
            <Avatar className="h-12 w-12 border-2 border-white animate-spin [animation-duration:5s]">
                <AvatarImage src={uploader.profile_photo} />
            </Avatar>
        </div>
      </div>
    </div>
  );
}
