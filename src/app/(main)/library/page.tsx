
"use client";

import { VideoCard } from "@/components/video-card";
import { useUser, useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import { collection } from "firebase/firestore";
import { ChevronRight, History, ThumbsUp, Clock } from 'lucide-react';
import Link from 'next/link';
import { WatchHistory, Video } from "@/lib/types";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function LibraryPage() {
  const { user } = useUser();
  const firestore = useFirestore();
  
  const watchHistoryQuery = useMemoFirebase(() => {
    if (!user) return null;
    return collection(firestore, `users/${user.uid}/watchHistory`);
  }, [user, firestore]);
  const { data: watchHistory, isLoading: isLoadingHistory } = useCollection<WatchHistory>(watchHistoryQuery);

  const likesQuery = useMemoFirebase(() => {
    if (!user) return null;
    return collection(firestore, `users/${user.uid}/likes`);
  }, [user, firestore]);
  const { data: likes, isLoading: isLoadingLikes } = useCollection<any>(likesQuery);

  // Assuming 'watch later' is a playlist or a similar collection.
  // For now, let's just create a placeholder for it.
  const watchLaterQuery = useMemoFirebase(() => {
    if (!user) return null;
    return collection(firestore, `users/${user.uid}/playlists`); // Assuming 'watch later' is a playlist
  }, [user, firestore]);
  const { data: playlists, isLoading: isLoadingPlaylists } = useCollection<any>(watchLaterQuery);
  
  const allVideosQuery = useMemoFirebase(() => collection(firestore, 'videos'), [firestore]);
  const { data: allVideos, isLoading: isLoadingVideos } = useCollection<Video>(allVideosQuery);

  const [recentlyWatchedVideos, setRecentlyWatchedVideos] = useState<Video[]>([]);
  const [likedVideos, setLikedVideos] = useState<Video[]>([]);
  const [watchLaterVideos, setWatchLaterVideos] = useState<Video[]>([]);

  useEffect(() => {
    if (watchHistory && allVideos) {
      const videoIds = watchHistory.map(wh => wh.videoId);
      setRecentlyWatchedVideos(allVideos.filter(v => videoIds.includes(v.id)).slice(0, 5));
    }
    if (likes && allVideos) {
      const videoIds = likes.map(like => like.videoId);
      setLikedVideos(allVideos.filter(v => videoIds.includes(v.id)).slice(0, 5));
    }
    if (playlists && allVideos) {
        const watchLaterPlaylist = playlists.find(p => p.name === "Watch Later");
        if (watchLaterPlaylist) {
             const videoIds = watchLaterPlaylist.videoIds || [];
             setWatchLaterVideos(allVideos.filter(v => videoIds.includes(v.id)).slice(0, 5));
        }
    }
  }, [watchHistory, likes, playlists, allVideos]);

  const isLoading = isLoadingHistory || isLoadingLikes || isLoadingPlaylists || isLoadingVideos;

  const SectionSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  );

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl font-bold tracking-tight mb-8 font-headline">Library</h1>
      
      <div className="space-y-12">
        
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <History className="h-7 w-7 text-muted-foreground" />
              <h2 className="text-2xl font-bold tracking-tight font-headline">History</h2>
            </div>
            <Link href="/history" className="flex items-center text-sm font-semibold text-primary hover:underline">
              See all <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          {isLoading ? <SectionSkeleton /> : recentlyWatchedVideos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {recentlyWatchedVideos.map(video => <VideoCard key={video.id} video={video} />)}
            </div>
          ) : (
            <p className="text-muted-foreground">No recently watched videos.</p>
          )}
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Clock className="h-7 w-7 text-muted-foreground" />
              <h2 className="text-2xl font-bold tracking-tight font-headline">Watch Later</h2>
            </div>
            <Link href="/watch-later" className="flex items-center text-sm font-semibold text-primary hover:underline">
              See all <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
           {isLoading ? <SectionSkeleton /> : watchLaterVideos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {watchLaterVideos.map(video => <VideoCard key={video.id} video={video} />)}
            </div>
          ) : (
             <p className="text-muted-foreground">You haven't saved any videos to watch later.</p>
          )}
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <ThumbsUp className="h-7 w-7 text-muted-foreground" />
              <h2 className="text-2xl font-bold tracking-tight font-headline">Liked Videos</h2>
            </div>
            <Link href="/liked-videos" className="flex items-center text-sm font-semibold text-primary hover:underline">
              See all <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          {isLoading ? <SectionSkeleton /> : likedVideos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {likedVideos.map(video => <VideoCard key={video.id} video={video} />)}
            </div>
          ) : (
             <p className="text-muted-foreground">You haven't liked any videos yet.</p>
          )}
        </section>
      </div>
    </div>
  );
}
