
"use client";

import { VideoCard } from "@/components/video-card";
import { videos, watchHistory } from "@/lib/data";
import { useAuthStore } from "@/store/auth";
import { ChevronRight, History, ThumbsUp, Clock } from 'lucide-react';
import Link from 'next/link';

export default function LibraryPage() {
  const { user } = useAuthStore();
  
  const userWatchedVideoIds = watchHistory
    .filter(wh => wh.student_id === user?.id)
    .map(wh => wh.video_id);
    
  const recentlyWatchedVideos = videos.filter(v => userWatchedVideoIds.includes(v.id)).slice(0, 5);
  const likedVideos = videos.slice(2, 7);
  const watchLaterVideos = videos.slice(4, 9);

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl font-bold tracking-tight mb-8 font-headline">Library</h1>
      
      <div className="space-y-12">
        
        {/* Recently Watched */}
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
          {recentlyWatchedVideos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {recentlyWatchedVideos.map(video => <VideoCard key={video.id} video={video} />)}
            </div>
          ) : (
            <p className="text-muted-foreground">No recently watched videos.</p>
          )}
        </section>

        {/* Watch Later */}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {watchLaterVideos.map(video => <VideoCard key={video.id} video={video} />)}
          </div>
        </section>

        {/* Liked Videos */}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {likedVideos.map(video => <VideoCard key={video.id} video={video} />)}
          </div>
        </section>
      </div>
    </div>
  );
}
