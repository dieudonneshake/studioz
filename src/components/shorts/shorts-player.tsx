
'use client';

import { useState, useRef, useEffect } from 'react';
import { type Short, type User } from '@/lib/types';
import { Heart, MessageCircle, Send, MoreVertical, Play, Pause, Music, Volume2, VolumeX } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface ShortsPlayerProps {
  short: Short;
  uploader: User;
  isActive: boolean;
}

export function ShortsPlayer({ short, uploader, isActive }: ShortsPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // Start muted for autoplay
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(short.likes);


  useEffect(() => {
    if (isActive) {
      // Attempt to play the video when it becomes active
      videoRef.current?.play().then(() => {
        setIsPlaying(true);
      }).catch(e => {
        // Autoplay was likely prevented by the browser
        setIsPlaying(false);
      });
    } else {
      // Pause the video when it's no longer active
      videoRef.current?.pause();
      videoRef.current?.currentTime && (videoRef.current.currentTime = 0);
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
    e.stopPropagation(); // Prevent toggling play/pause when clicking the mute button
    if(videoRef.current){
        const newMutedState = !videoRef.current.muted;
        videoRef.current.muted = newMutedState;
        setIsMuted(newMutedState);
    }
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };
  
  const handleShowToast = (e: React.MouseEvent, message: string) => {
    e.stopPropagation();
    toast({
        title: "Coming Soon!",
        description: message,
    });
  };

  return (
    <div className="relative h-full w-full bg-black rounded-xl snap-start" onClick={togglePlay}>
      <video
        ref={videoRef}
        src={short.videoUrl}
        className="h-full w-full object-contain"
        loop
        playsInline
        muted={isMuted}
        // Poster helps with visual appearance before video loads
        poster={short.thumbnail_path} 
      />

      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-black/50 p-4 rounded-full">
            <Play className="h-16 w-16 text-white/90 fill-white/90" />
          </div>
        </div>
      )}

      {/* Header for Mute Button */}
      <div className="absolute top-4 right-4 z-10">
        <Button variant="ghost" size="icon" onClick={toggleMute} className="text-white bg-black/30 hover:bg-black/50 rounded-full h-10 w-10">
          {isMuted ? <VolumeX className="h-5 w-5"/> : <Volume2 className="h-5 w-5"/> }
        </Button>
      </div>

      {/* Footer Info */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent text-white pointer-events-none">
        <div className="flex items-center gap-2">
            <Avatar className="h-10 w-10 border-2 border-white">
                <AvatarImage src={uploader.profile_photo} />
                <AvatarFallback>{uploader.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <p className="font-semibold text-lg">@{uploader.name.split(' ').join('').toLowerCase()}</p>
            <Button size="sm" className="ml-2 bg-white text-black font-bold hover:bg-gray-200 pointer-events-auto">Follow</Button>
        </div>
        <p className="mt-2 text-sm line-clamp-2">{short.title}</p>
        <div className="flex items-center gap-2 mt-2 text-sm">
            <Music className="h-4 w-4" />
            <p>Original sound - {uploader.name}</p>
        </div>
      </div>

      {/* Side Navigation */}
      <div className="absolute bottom-20 right-2 md:bottom-24 flex flex-col items-center gap-4 text-white">
        <div className="flex flex-col items-center gap-1">
          <Button variant="ghost" size="icon" onClick={handleLike} className="rounded-full bg-black/30 hover:bg-black/50 h-12 w-12">
            <Heart className={cn("h-7 w-7 transition-colors", isLiked && "fill-red-500 text-red-500")} />
          </Button>
          <span className="text-xs font-semibold">{(likeCount / 1000).toFixed(1)}K</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Button variant="ghost" size="icon" onClick={(e) => handleShowToast(e, "The comment section is under construction.")} className="rounded-full bg-black/30 hover:bg-black/50 h-12 w-12">
            <MessageCircle className="h-7 w-7" />
          </Button>
          <span className="text-xs font-semibold">{(short.comments / 1000).toFixed(1)}K</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Button variant="ghost" size="icon" onClick={(e) => handleShowToast(e, "Sharing features will be available soon.")} className="rounded-full bg-black/30 hover:bg-black/50 h-12 w-12">
            <Send className="h-7 w-7" />
          </Button>
          <span className="text-xs font-semibold">{(short.shares / 1000).toFixed(1)}K</span>
        </div>
        <Button variant="ghost" size="icon" onClick={(e) => handleShowToast(e, "More options are coming!")} className="rounded-full bg-black/30 hover:bg-black/50 h-12 w-12">
          <MoreVertical className="h-7 w-7" />
        </Button>
         <div className="mt-2">
            <Avatar className="h-12 w-12 border-2 border-white animate-spin [animation-duration:5s] [animation-play-state:running]">
                <AvatarImage src={uploader.profile_photo} />
            </Avatar>
        </div>
      </div>
    </div>
  );
}
