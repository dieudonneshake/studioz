
'use server';

import { HomeClientPage } from "@/components/home/home-client-page";
import { initializeFirebase } from "@/firebase/server";
import { Video } from "@/lib/types";
import { Timestamp } from "firebase-admin/firestore";

function docToVideo(doc: FirebaseFirestore.DocumentSnapshot): Video {
  const data = doc.data();
  if (!data) {
    throw new Error('Document data is empty');
  }
  
  // Convert Firestore Timestamp to ISO string if it exists
  const createdAt = data.created_at as Timestamp | undefined;
  
  return {
    id: doc.id,
    title: data.title || '',
    description: data.description || '',
    shortSummary: data.shortSummary || '',
    uploaded_by: data.uploaded_by || '',
    thumbnail_path: data.thumbnail_path || '',
    video_url: data.video_url || '',
    duration_seconds: data.duration_seconds || 0,
    views_count: data.views_count || 0,
    created_at: createdAt ? createdAt.toDate().toISOString() : new Date().toISOString(),
    curriculum: data.curriculum || '',
    level: data.level || '',
    subject: data.subject || '',
    unit: data.unit || '',
  };
}


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
  
  const allVideos = allVideosSnap.docs.map(docToVideo);
  const recommendedVideos = recommendedSnap.docs.map(docToVideo);
  const recentVideos = recentSnap.docs.map(docToVideo);
  
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
