'use client';

import { useMemo } from 'react';
import { VideoCard } from "@/components/video-card";
import { useUser, useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import { Video } from "@/lib/types";
import { collection, query, limit } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { HomeClientPage } from '@/components/home/home-client-page';


// This is now a Client Component that fetches its own data
export default function HomePage() {
  const firestore = useFirestore();

  // Data fetching and preparation happens on the client.
  const videosCollection = useMemoFirebase(() => collection(firestore, 'videos'), [firestore]);
  
  const allVideosQuery = useMemoFirebase(() => query(videosCollection), [videosCollection]);
  const recommendedQuery = useMemoFirebase(() => query(videosCollection, limit(8)), [videosCollection]);
  const recentQuery = useMemoFirebase(() => query(videosCollection, limit(8)), [videosCollection]);

  const { data: allVideos, isLoading: isLoadingAll } = useCollection<Video>(allVideosQuery);
  const { data: recommendedVideos, isLoading: isLoadingRecommended } = useCollection<Video>(recommendedQuery);
  const { data: recentVideos, isLoading: isLoadingRecent } = useCollection<Video>(recentQuery);
  
  const isLoading = isLoadingAll || isLoadingRecommended || isLoadingRecent;

  if (isLoading) {
      return (
          <div className="flex-1 p-4 md:p-6 lg:p-8 space-y-8">
              <div>
                <Skeleton className="h-8 w-1/3 mb-4" />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-56" />)}
                </div>
              </div>
               <div>
                <Skeleton className="h-8 w-1/3 mb-4" />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-56" />)}
                </div>
              </div>
          </div>
      )
  }
  
  // These are just placeholders for now. Real recommendations and watch history would be user-specific.
  const newForYouVideos = allVideos?.filter(v => v.level === 'Diploma Year 1').slice(0,4) ?? [];
  const recentlyWatchedVideos = allVideos?.slice(3, 7) ?? [];

  // We pass only the necessary, pre-filtered data down to the client component.
  return (
    <HomeClientPage
      allVideos={allVideos ?? []}
      recommendedVideos={recommendedVideos ?? []}
      recentVideos={recentVideos ?? []}
      newForYouVideos={newForYouVideos}
      recentlyWatchedVideos={recentlyWatchedVideos}
    />
  );
}
