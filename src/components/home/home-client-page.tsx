
"use client";

import { useEffect, useMemo, useState } from 'react';
import { VideoCard } from "@/components/video-card";
import { useAuthStore } from "@/store/auth";
import { Video } from "@/lib/types";
import { useSearchStore } from '@/store/search';
import { SearchX } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface HomeClientPageProps {
  allVideos: Video[];
  recommendedVideos: Video[];
  recentVideos: Video[];
  newForYouVideos: Video[];
  recentlyWatchedVideos: Video[];
}

export function HomeClientPage({ 
  allVideos,
  recommendedVideos, 
  recentVideos, 
  newForYouVideos,
  recentlyWatchedVideos,
}: HomeClientPageProps) {
  const { isAuthenticated, user } = useAuthStore();
  const { searchQuery, setSearchQuery } = useSearchStore();
  const pathname = usePathname();

  // Clear search query when navigating away from the home page
  useEffect(() => {
    return () => {
      if (pathname !== '/home') {
        setSearchQuery('');
      }
    };
  }, [pathname, setSearchQuery]);
  
  const filteredVideos = useMemo(() => {
    if (!searchQuery) return [];
    return allVideos.filter(video =>
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, allVideos]);

  // If there's a search query, show search results
  if (searchQuery) {
    return (
        <main className="flex-1 p-4 md:p-6 lg:p-8">
            <h1 className="text-3xl font-bold tracking-tight mb-4 font-headline">
                Results for "{searchQuery}"
            </h1>
            {filteredVideos.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {filteredVideos.map(video => (
                        <VideoCard key={video.id} video={video} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed rounded-lg text-center">
                    <SearchX className="h-16 w-16 text-muted-foreground mb-4" />
                    <p className="text-xl font-semibold">No results found</p>
                    <p className="text-muted-foreground mt-2">
                        Try adjusting your search terms.
                    </p>
                </div>
            )}
        </main>
    );
  }

  // If the user is not authenticated, show generic recommendations.
  if (!isAuthenticated) {
     return (
        <div className="flex h-full flex-col">
          <main className="flex-1 p-4 md:p-6 lg:p-8">
            <div className="mt-6">
              <h2 className="text-2xl font-bold tracking-tight font-headline">Recommended Videos</h2>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {recommendedVideos.map(video => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-bold tracking-tight font-headline">Recently Uploaded</h2>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {recentVideos.map(video => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            </div>
          </main>
        </div>
      );
  }

  // If the user is authenticated, show personalized content.
  return (
    <div className="flex h-full flex-col">
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        {recentlyWatchedVideos.length > 0 && (
            <div className="mt-6">
            <h2 className="text-2xl font-bold tracking-tight font-headline">Recently Watched</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {recentlyWatchedVideos.slice(0, 4).map(video => (
                  <VideoCard key={video.id} video={video} />
                ))}
            </div>
            </div>
        )}

        <div className="mt-8">
          <h2 className="text-2xl font-bold tracking-tight font-headline">New for You - IB Diploma Year 1</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {newForYouVideos.map(video => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
