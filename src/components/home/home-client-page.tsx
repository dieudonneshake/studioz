
"use client";

import { VideoCard } from "@/components/video-card";
import { useAuthStore } from "@/store/auth";
import { Video } from "@/lib/types";

interface HomeClientPageProps {
  recommendedVideos: Video[];
  recentVideos: Video[];
  newForYouVideos: Video[];
  recentlyWatchedVideos: Video[];
}

export function HomeClientPage({ 
  recommendedVideos, 
  recentVideos, 
  newForYouVideos,
  recentlyWatchedVideos,
}: HomeClientPageProps) {
  const { isAuthenticated, user } = useAuthStore();

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
                {recentlyWatchedVideos.map(video => (
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
