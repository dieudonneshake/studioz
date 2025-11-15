
import { VideoCard } from "@/components/video-card";
import { videos } from "@/lib/data";

export default function LikedVideosPage() {
    const likedVideos = videos.slice(0, 4);

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl font-bold tracking-tight mb-6 font-headline">Liked Videos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {likedVideos.map(video => (
                <VideoCard key={video.id} video={video} />
            ))}
        </div>
    </div>
  );
}
