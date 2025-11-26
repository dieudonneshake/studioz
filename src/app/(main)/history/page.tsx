
"use client";

import { VideoCard } from "@/components/video-card";
import { useUser, useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import { collection } from "firebase/firestore";
import { WatchHistory, Video } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";

export default function HistoryPage() {
    const { user } = useUser();
    const firestore = useFirestore();
    
    const watchHistoryQuery = useMemoFirebase(() => {
        if (!user) return null;
        return collection(firestore, `users/${user.uid}/watchHistory`);
    }, [user, firestore]);

    const { data: watchHistory, isLoading: isLoadingHistory } = useCollection<WatchHistory>(watchHistoryQuery);
    
    const allVideosQuery = useMemoFirebase(() => collection(firestore, 'videos'), [firestore]);
    const { data: allVideos, isLoading: isLoadingVideos } = useCollection<Video>(allVideosQuery);

    const [watchedVideos, setWatchedVideos] = useState<Video[]>([]);
    
    useEffect(() => {
        if (watchHistory && allVideos) {
            const userWatchedVideoIds = watchHistory.map(wh => wh.videoId);
            const filtered = allVideos.filter(v => userWatchedVideoIds.includes(v.id));
            setWatchedVideos(filtered);
        }
    }, [watchHistory, allVideos]);

    const isLoading = isLoadingHistory || isLoadingVideos;

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl font-bold tracking-tight mb-6 font-headline">Watch History</h1>
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-40 w-full" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : watchedVideos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {watchedVideos.map(video => (
                <VideoCard key={video.id} video={video} />
            ))}
        </div>
      ) : (
         <div className="flex items-center justify-center h-64 border-2 border-dashed rounded-lg">
            <p className="text-muted-foreground">You haven't watched any videos yet.</p>
        </div>
      )}
    </div>
  );
}
