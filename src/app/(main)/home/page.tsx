"use client";

import { VideoCard } from "@/components/video-card";
import { videos, watchHistory } from "@/lib/data";
import { useAuthStore } from "@/store/auth";

export default function HomePage() {
  const { isAuthenticated, user } = useAuthStore();

  // For unauthenticated users, show generic lists.
  const recommendedVideos = videos.slice(0, 4);
  const recentVideos = videos.slice(4, 8);
  
  // For authenticated users, show personalized content.
  const userWatchedVideoIds = watchHistory
    .filter(wh => wh.student_id === user?.id)
    .map(wh => wh.video_id);
    
  const recentlyWatchedVideos = videos.filter(v => userWatchedVideoIds.includes(v.id));
  const newForYouVideos = videos.filter(v => v.level === 'Diploma Year 1' && !userWatchedVideoIds.includes(v.id)).slice(0,4);


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
