
import { HomeClientPage } from "@/components/home/home-client-page";
import { homePageVideos, videos } from "@/lib/data";
import { watchHistory } from "@/lib/curricula/history";


// This is now a Server Component
export default async function HomePage() {
  // Data fetching and preparation happens on the server.
  const recommendedVideos = homePageVideos.slice(0, 4);
  const recentVideos = homePageVideos.slice(4, 8);
  const newForYouVideos = homePageVideos.filter(v => v.level === 'Diploma Year 1').slice(0,4);
  
  // Correctly look up recently watched videos from the complete video list.
  const recentlyWatchedVideoIds = watchHistory.map(wh => wh.video_id);
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
