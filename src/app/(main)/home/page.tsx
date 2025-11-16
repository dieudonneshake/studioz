import { HomeClientPage } from "@/components/home/home-client-page";
import { homePageVideos, videos, watchHistory } from "@/lib/data";


// This is now a Server Component
export default async function HomePage() {
  // Data fetching and preparation happens on the server.
  // We now fetch only the data that's actually needed for the initial view
  // by using a smaller, dedicated video array.
  const recommendedVideos = homePageVideos.slice(0, 4);
  const recentVideos = homePageVideos.slice(4, 8);
  const newForYouVideos = homePageVideos.filter(v => v.level === 'Diploma Year 1').slice(0,4);
  const recentlyWatchedVideoIds = watchHistory.map(wh => wh.video_id);
  // We still need the full video list here to find a match by ID.
  const recentlyWatchedVideos = videos.filter(v => recentlyWatchedVideoIds.includes(v.id));

  // We pass only the necessary, pre-filtered data down to the client component.
  return (
    <HomeClientPage
      recommendedVideos={recommendedVideos}
      recentVideos={recentVideos}
      newForYouVideos={newForYouVideos}
      recentlyWatchedVideos={recentlyWatchedVideos}
    />
  );
}
