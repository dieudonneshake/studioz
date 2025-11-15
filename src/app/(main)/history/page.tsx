
"use client";

import { VideoCard } from "@/components/video-card";
import { videos, watchHistory } from "@/lib/data";
import { useAuthStore } from "@/store/auth";

export default function HistoryPage() {
    const { user } = useAuthStore();
    const userWatchedVideoIds = watchHistory
    .filter(wh => wh.student_id === user?.id)
    .map(wh => wh.video_id);

    const watchedVideos = videos.filter(v => userWatchedVideoIds.includes(v.id));

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl font-bold tracking-tight mb-6 font-headline">Watch History</h1>
      {watchedVideos.length > 0 ? (
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
