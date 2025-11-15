
"use client";

import { VideoCard } from "@/components/video-card";
import { videos } from "@/lib/data";
import { useAuthStore } from "@/store/auth";
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function MyVideosPage() {
    const { user } = useAuthStore();
    const myVideos = videos.filter(v => v.uploaded_by === user?.id);

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
        <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold tracking-tight font-headline">Your Videos</h1>
            <Button asChild>
                <Link href="/upload">Upload New Video</Link>
            </Button>
        </div>
      {myVideos.length > 0 ? (
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
