
"use client";

import { VideoCard } from "@/components/video-card";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useUser, useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import { collection, query, where } from "firebase/firestore";
import { Video } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";

export default function MyVideosPage() {
    const { user } = useUser();
    const firestore = useFirestore();

    const myVideosQuery = useMemoFirebase(() => {
        if (!user) return null;
        return query(collection(firestore, 'videos'), where('uploaded_by', '==', user.uid));
    }, [firestore, user]);

    const { data: myVideos, isLoading } = useCollection<Video>(myVideosQuery);

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
        <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold tracking-tight font-headline">Your Videos</h1>
            <Button asChild>
                <Link href="/upload">Upload New Video</Link>
            </Button>
        </div>
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-40 w-full" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : myVideos && myVideos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {myVideos.map(video => (
                <VideoCard key={video.id} video={video} />
            ))}
        </div>
      ) : (
         <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed rounded-lg text-center">
            <p className="text-muted-foreground mb-4">You haven't uploaded any videos yet.</p>
             <Button asChild>
                <Link href="/upload">Upload your first video</Link>
            </Button>
        </div>
      )}
    </div>
  );
}
