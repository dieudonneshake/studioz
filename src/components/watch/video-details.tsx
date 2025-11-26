
'use client';

import { useState, useEffect } from 'react';
import { type Video, type User } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { ThumbsUp, ThumbsDown, Share2, PlusSquare, Check } from 'lucide-react';
import { Badge } from '../ui/badge';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { ShareSheet } from './share-sheet';
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { doc, collection, setDoc, deleteDoc, writeBatch } from 'firebase/firestore';

interface VideoDetailsProps {
  video: Video;
  uploader?: User;
}

export default function VideoDetails({ video, uploader }: VideoDetailsProps) {
  const { toast } = useToast();
  const { user } = useUser();
  const firestore = useFirestore();

  const [isExpanded, setIsExpanded] = useState(false);
  const [likeState, setLikeState] = useState<'liked' | 'disliked' | null>(null);
  const [isShareSheetOpen, setIsShareSheetOpen] = useState(false);
  
  // Subscription state
  const subscriptionsQuery = useMemoFirebase(() => {
    if (!user || !uploader) return null;
    return collection(firestore, `users/${user.uid}/subscriptions`);
  }, [user, uploader, firestore]);
  const { data: subscriptions } = useCollection<{teacherId: string}>(subscriptionsQuery);
  const isSubscribed = useMemo(() => subscriptions?.some(s => s.teacherId === uploader?.id), [subscriptions, uploader]);

  // Like state
  const likesCollectionRef = useMemoFirebase(() => user ? collection(firestore, `users/${user.uid}/likes`) : null, [user, firestore]);
  const { data: userLikes } = useCollection<{videoId: string}>(likesCollectionRef);

  useEffect(() => {
      if (userLikes?.some(l => l.videoId === video.id)) {
          setLikeState('liked');
      } else {
          setLikeState(null);
      }
  }, [userLikes, video.id]);

  // Save (Watch Later) state
  const watchLaterQuery = useMemoFirebase(() => {
      if (!user) return null;
      return collection(firestore, `users/${user.uid}/playlists`);
  }, [user, firestore]);
  const { data: playlists } = useCollection<any>(watchLaterQuery);
  const watchLaterPlaylist = useMemo(() => playlists?.find(p => p.name === "Watch Later"), [playlists]);
  const isSaved = useMemo(() => watchLaterPlaylist?.videoIds?.includes(video.id), [watchLaterPlaylist, video.id]);


  const handleSubscribe = async () => {
    if (!user || !uploader) {
      toast({ variant: "destructive", title: "You must be logged in to subscribe."});
      return;
    }
    const subscriptionRef = doc(firestore, `users/${user.uid}/subscriptions`, uploader.id);
    if (isSubscribed) {
      await deleteDoc(subscriptionRef);
      toast({ title: `Unsubscribed from ${uploader.name}` });
    } else {
      await setDoc(subscriptionRef, { teacherId: uploader.id });
      toast({ title: `Subscribed to ${uploader.name}` });
    }
  };
  
  const handleLike = async () => {
    if (!user) return;
    const likeRef = doc(firestore, `users/${user.uid}/likes`, video.id);
    if (likeState === 'liked') {
        await deleteDoc(likeRef);
        setLikeState(null);
    } else {
        await setDoc(likeRef, { videoId: video.id });
        setLikeState('liked');
    }
  };

  const handleSave = async () => {
      if (!user) return;
      
      const playlistRef = doc(firestore, `users/${user.uid}/playlists`, 'watch-later');
      const currentVideoIds = watchLaterPlaylist?.videoIds || [];

      if (isSaved) {
          const newVideoIds = currentVideoIds.filter((id: string) => id !== video.id);
          await setDoc(playlistRef, { name: "Watch Later", videoIds: newVideoIds }, { merge: true });
          toast({ title: 'Removed from Watch Later' });
      } else {
          const newVideoIds = [...currentVideoIds, video.id];
          await setDoc(playlistRef, { name: "Watch Later", videoIds: newVideoIds }, { merge: true });
          toast({ title: 'Saved to Watch Later' });
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
            <Button onClick={handleSubscribe} variant={isSubscribed ? 'secondary' : 'default'} size="sm">
                {isSubscribed && <Check className="mr-2 h-4 w-4" />}
                {isSubscribed ? 'Subscribed' : 'Subscribe'}
            </Button>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center rounded-full bg-secondary">
                <Button size="sm" variant="secondary" className="rounded-r-none" onClick={handleLike}>
                    <ThumbsUp className={cn("mr-2 h-4 w-4", likeState === 'liked' && "fill-current")} />
                    {video.views_count.toLocaleString()}
                </Button>
                 <div className="h-6 w-px bg-border"></div>
                <Button size="sm" variant="secondary" className="rounded-l-none" onClick={() => toast({title: "Dislike functionality coming soon!"})}>
                    <ThumbsDown className={cn("h-4 w-4", likeState === 'disliked' && "fill-current")} />
                </Button>
            </div>
            <Button size="sm" variant="secondary" onClick={() => setIsShareSheetOpen(true)}>
                <Share2 className="mr-2 h-4 w-4" /> Share
            </Button>
            <Button size="sm" variant="secondary" onClick={handleSave}>
                {isSaved ? <Check className="mr-2 h-4 w-4" /> : <PlusSquare className="mr-2 h-4 w-4" />}
                <span className="hidden sm:inline">{isSaved ? 'Saved' : 'Save'}</span>
            </Button>
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
