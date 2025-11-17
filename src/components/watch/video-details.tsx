'use client';

import { useState } from 'react';
import { type Video, type User } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { ThumbsUp, ThumbsDown, Share2, PlusSquare, Check } from 'lucide-react';
import { Badge } from '../ui/badge';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { ShareSheet } from './share-sheet';

interface VideoDetailsProps {
  video: Video;
  uploader?: User;
}

export default function VideoDetails({ video, uploader }: VideoDetailsProps) {
  const { toast } = useToast();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [likeState, setLikeState] = useState<'liked' | 'disliked' | null>(null);
  const [likeCount, setLikeCount] = useState(12000); // Initial like count
  const [isShareSheetOpen, setIsShareSheetOpen] = useState(false);

  const handleSubscribe = () => {
    setIsSubscribed(!isSubscribed);
    toast({
      title: isSubscribed ? `Unsubscribed from ${uploader?.name}` : `Subscribed to ${uploader?.name}`,
    });
  };
  
  const handleLike = () => {
    if (likeState === 'liked') {
      setLikeState(null);
      setLikeCount(likeCount - 1);
    } else {
      if (likeState === 'disliked') {
        // If it was disliked, we remove the dislike first, then add the like.
        // For simplicity, we just switch. In a real app, you'd have dislike counts too.
      }
      setLikeState('liked');
      setLikeCount(likeCount + 1);
    }
  };

  const handleDislike = () => {
    if (likeState === 'disliked') {
      setLikeState(null);
    } else {
      if (likeState === 'liked') {
        setLikeCount(likeCount - 1);
      }
      setLikeState('disliked');
    }
  };

  return (
    <>
      <div className="mt-4">
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">{video.curriculum}</Badge>
          <Badge variant="outline">{video.level}</Badge>
          <Badge variant="outline">{video.subject}</Badge>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight font-headline mt-2">{video.title}</h1>
        <div className="mt-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {uploader && (
              <Avatar className="h-12 w-12 border">
                <AvatarImage src={uploader.profile_photo} alt={uploader.name} />
                <AvatarFallback>{uploader.name.charAt(0)}</AvatarFallback>
              </Avatar>
            )}
            <div>
              <p className="font-semibold text-lg">{uploader?.name}</p>
              <p className="text-sm text-muted-foreground">1.2M Subscribers</p>
            </div>
            <Button onClick={handleSubscribe} variant={isSubscribed ? 'secondary' : 'default'}>
                {isSubscribed && <Check className="mr-2 h-4 w-4" />}
                {isSubscribed ? 'Subscribed' : 'Subscribe'}
            </Button>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center rounded-full bg-secondary">
                <Button variant="secondary" className="rounded-r-none" onClick={handleLike}>
                    <ThumbsUp className={cn("mr-2 h-5 w-5", likeState === 'liked' && "fill-current")} />
                    {likeCount.toLocaleString()}
                </Button>
                <div className="h-6 w-px bg-border"></div>
                <Button variant="secondary" className="rounded-l-none" onClick={handleDislike}>
                    <ThumbsDown className={cn("h-5 w-5", likeState === 'disliked' && "fill-current")} />
                </Button>
            </div>
            <Button variant="secondary" onClick={() => setIsShareSheetOpen(true)}>
                <Share2 className="mr-2 h-5 w-5" /> Share
            </Button>
            <Button variant="secondary"><PlusSquare className="mr-2 h-5 w-5" /> Save</Button>
          </div>
        </div>
        <div className="mt-4 bg-secondary rounded-lg p-4 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
          <div className="flex items-center gap-4 text-sm font-semibold">
            <p>{video.views_count.toLocaleString()} views</p>
            <p>{new Date(video.created_at).toLocaleDateString()}</p>
          </div>
          <p className={cn("mt-2 text-sm text-foreground/80 whitespace-pre-wrap", !isExpanded && "line-clamp-2")}>
            {video.description}
          </p>
          <button className="font-semibold text-sm mt-2">
            {isExpanded ? 'Show less' : '...more'}
          </button>
        </div>
      </div>
      <ShareSheet 
        open={isShareSheetOpen} 
        onOpenChange={setIsShareSheetOpen}
        videoId={video.id}
      />
    </>
  );
}
