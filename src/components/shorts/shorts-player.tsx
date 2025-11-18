
'use client';

import { useState, useRef, useEffect } from 'react';
import { type Short, type User } from '@/lib/types';
import { Heart, MessageCircle, Send, MoreVertical, Play, Pause, Music, Volume2, VolumeX } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { CommentsSheet } from './comments-sheet';
import { ShareSheet } from './share-sheet';
import Link from 'next/link';

interface ShortsPlayerProps {
  short: Short;
  uploader: User;
  isActive: boolean;
}

export function ShortsPlayer({ short, uploader, isActive }: ShortsPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(short.likes);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);


  useEffect(() => {
    if (isActive) {
      // Autoplay when the short becomes active
      const playPromise = videoRef.current?.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          setIsPlaying(true);
        }).catch(e => {
          // Autoplay was prevented. User might need to interact first.
          setIsPlaying(false);
        });
      }
    } else {
      // Pause and reset when the short is no longer active
      videoRef.current?.pause();
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
      }
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

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleCommentsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsCommentsOpen(true);
  };
  
  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsShareOpen(true);
  };
  
  return (
    <>
    <div className="relative h-full w-full bg-black rounded-xl snap-start" onClick={togglePlay}>
      <video
        ref={videoRef}
        src={short.videoUrl}
        className="h-full w-full object-contain"
        loop
        playsInline
        muted={isMuted}
        poster={short.thumbnail_path} 
      />

      {!isPlaying && isActive && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-black/50 p-4 rounded-full">
            <Play className="h-16 w-16 text-white/90 fill-white/90" />
          </div>
        </div>
      )}

      <div className="absolute top-4 right-4 z-10">
        <Button variant="ghost" size="icon" onClick={toggleMute} className="text-white bg-black/30 hover:bg-black/50 rounded-full h-10 w-10">
          {isMuted ? <VolumeX className="h-5 w-5"/> : <Volume2 className="h-5 w-5"/> }
        </Button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent text-white pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto">
            <Link href={`/profile/${uploader.id}`}>
              <Avatar className="h-10 w-10 border-2 border-white">
                  <AvatarImage src={uploader.profile_photo} />
                  <AvatarFallback>{uploader.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </Link>
            <Link href={`/profile/${uploader.id}`}>
              <p className="font-semibold text-lg">@{uploader.name.split(' ').join('').toLowerCase()}</p>
            </Link>
            <Button size="sm" className="ml-2 bg-white text-black font-bold hover:bg-gray-200">Follow</Button>
        </div>
        <p className="mt-2 text-sm line-clamp-2">{short.title}</p>
        <div className="flex items-center gap-2 mt-2 text-sm">
            <Music className="h-4 w-4" />
            <p>Original sound - {uploader.name}</p>
        </div>
      </div>

      <div className="absolute bottom-20 right-2 md:bottom-24 flex flex-col items-center gap-4 text-white">
        <div className="flex flex-col items-center gap-1">
          <Button variant="ghost" size="icon" onClick={handleLike} className="rounded-full bg-black/30 hover:bg-black/50 h-12 w-12">
            <Heart className={cn("h-7 w-7 transition-colors", isLiked && "fill-red-500 text-red-500")} />
          </Button>
          <span className="text-xs font-semibold">{(likeCount / 1000).toFixed(1)}K</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Button variant="ghost" size="icon" onClick={handleCommentsClick} className="rounded-full bg-black/30 hover:bg-black/50 h-12 w-12">
            <MessageCircle className="h-7 w-7" />
          </Button>
          <span className="text-xs font-semibold">{(short.comments / 1000).toFixed(1)}K</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Button variant="ghost" size="icon" onClick={handleShareClick} className="rounded-full bg-black/30 hover:bg-black/50 h-12 w-12">
            <Send className="h-7 w-7" />
          </Button>
          <span className="text-xs font-semibold">{(short.shares / 1000).toFixed(1)}K</span>
        </div>
        <Button variant="ghost" size="icon" className="rounded-full bg-black/30 hover:bg-black/50 h-12 w-12">
          <MoreVertical className="h-7 w-7" />
        </Button>
         <div className="mt-2">
            <Avatar className="h-12 w-12 border-2 border-white animate-spin [animation-duration:5s] [animation-play-state:running]">
                <AvatarImage src={uploader.profile_photo} />
            </Avatar>
        </div>
      </div>
    </div>
    <CommentsSheet open={isCommentsOpen} onOpenChange={setIsCommentsOpen} commentCount={short.comments} />
    <ShareSheet open={isShareOpen} onOpenChange={setIsShareOpen} shortId={short.id} />
    </>
  );
}
