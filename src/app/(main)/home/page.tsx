
'use server';

import { HomeClientPage } from "@/components/home/home-client-page";
import { initializeFirebase } from "@/firebase/server";
import { Video } from "@/lib/types";

// This is now a Server Component
export default async function HomePage() {
  const { firestore } = await initializeFirebase();

  // Data fetching and preparation happens on the server.
  const videosCollection = firestore.collection('videos');
  
  const allVideosQuery = videosCollection;
  const recommendedQuery = videosCollection.limit(8);
  const recentQuery = videosCollection.limit(8);

  const [allVideosSnap, recommendedSnap, recentSnap] = await Promise.all([
    allVideosQuery.get(),
    recommendedQuery.get(),
    recentQuery.get()
  ]);
  
  const allVideos = allVideosSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Video[];
  const recommendedVideos = recommendedSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Video[];
  const recentVideos = recentSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Video[];
  
  // These are just placeholders for now. Real recommendations and watch history would be user-specific.
  const newForYouVideos = allVideos.filter(v => v.level === 'Diploma Year 1').slice(0,4);
  const recentlyWatchedVideos = allVideos.slice(3, 7);

  // We pass only the necessary, pre-filtered data down to the client component.
  return (
    <HomeClientPage
      allVideos={allVideos}
      recommendedVideos={recommendedVideos}
      recentVideos={recentVideos}
      newForYouVideos={newForYouVideos}
      recentlyWatchedVideos={recentlyWatchedVideos}
    />
  );
}
