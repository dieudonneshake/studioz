import { FilterBar } from "@/components/filter-bar";
import { VideoCard } from "@/components/video-card";
import { videos } from "@/lib/data";

export default function HomePage() {
  const filters = ["All", "Physics", "History", "Mathematics", "IB", "A-Levels"];
  
  const recommendedVideos = videos.slice(0, 4);
  const recentVideos = videos.slice(4, 8);

  return (
    <div className="flex h-full min-h-screen flex-col">
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <FilterBar filters={filters} />
        <div className="mt-6">
          <h2 className="text-2xl font-bold tracking-tight font-headline">Recommended for You</h2>
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
