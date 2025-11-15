import { VideoCard } from "@/components/video-card";
import { videos } from "@/lib/data";

export default function HomePage() {
  // For unauthenticated users, show generic lists.
  // This will be replaced with personalized content for logged-in users.
  const recommendedVideos = videos.slice(0, 4);
  const recentVideos = videos.slice(4, 8);

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
