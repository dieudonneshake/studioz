
"use client";

import { VideoCard } from "@/components/video-card";
import { useUser, useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import { collection } from "firebase/firestore";
import { Video } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";

export default function WatchLaterPage() {
    const { user } = useUser();
    const firestore = useFirestore();

    const watchLaterQuery = useMemoFirebase(() => {
        if (!user) return null;
        // Assuming 'Watch Later' is a specific playlist. A more robust solution might use a dedicated collection.
        return collection(firestore, `users/${user.uid}/playlists`);
    }, [user, firestore]);
    const { data: playlists, isLoading: isLoadingPlaylists } = useCollection<any>(watchLaterQuery);
    
    const allVideosQuery = useMemoFirebase(() => collection(firestore, 'videos'), [firestore]);
    const { data: allVideos, isLoading: isLoadingVideos } = useCollection<Video>(allVideosQuery);

    const [watchLaterVideos, setWatchLaterVideos] = useState<Video[]>([]);

    useEffect(() => {
        if (playlists && allVideos) {
            const watchLaterPlaylist = playlists.find(p => p.name === "Watch Later");
            if (watchLaterPlaylist) {
                const videoIds = watchLaterPlaylist.videoIds || [];
                setWatchLaterVideos(allVideos.filter(v => videoIds.includes(v.id)));
            }
        }
    }, [playlists, allVideos]);

    const isLoading = isLoadingPlaylists || isLoadingVideos;

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl font-bold tracking-tight mb-6 font-headline">Watch Later</h1>
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
      ) : watchLaterVideos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {watchLaterVideos.map(video => (
                <VideoCard key={video.id} video={video} />
            ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-64 border-2 border-dashed rounded-lg">
            <p className="text-muted-foreground">You haven't added any videos to your Watch Later list.</p>
        </div>
      )}
    </div>
  );
}
