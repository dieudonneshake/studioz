
'use client';

import { useParams, notFound } from 'next/navigation';
import VideoDetails from '@/components/watch/video-details';
import ContentTabs from '@/components/watch/content-tabs';
import { VideoCard } from '@/components/video-card';
import CustomVideoPlayer from '@/components/watch/video-player';
import { useFirestore, useDoc, useCollection, useMemoFirebase } from '@/firebase';
import { doc, collection, query, where, limit } from 'firebase/firestore';
import { Video, User } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

function WatchPageContent() {
  const params = useParams();
  const id = params.id as string;
  const firestore = useFirestore();

  const videoRef = useMemoFirebase(() => doc(firestore, 'videos', id), [firestore, id]);
  const { data: video, isLoading: isLoadingVideo } = useDoc<Video>(videoRef);

  const uploaderRef = useMemoFirebase(() => {
    if (!video?.uploaded_by) return null;
    return doc(firestore, 'users', video.uploaded_by);
  }, [firestore, video?.uploaded_by]);
  const { data: uploader, isLoading: isLoadingUploader } = useDoc<User>(uploaderRef);

  const relatedVideosQuery = useMemoFirebase(() => {
    if (!video) return null;
    return query(
      collection(firestore, 'videos'),
      where('subject', '==', video.subject),
      where('__name__', '!=', video.id),
      limit(4)
    );
  }, [firestore, video]);
  const { data: relatedVideos, isLoading: isLoadingRelated } = useCollection<Video>(relatedVideosQuery);

  const isLoading = isLoadingVideo || isLoadingUploader || isLoadingRelated;

  if (isLoading) {
    return (
      <div className="mx-auto max-w-screen-2xl p-4 md:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <Skeleton className="aspect-video w-full" />
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-24 w-full" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-8 w-1/3" />
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-40 w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!video) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <CustomVideoPlayer video={video} />
          <VideoDetails video={video} uploader={uploader ?? undefined} />
          <div className="mt-8">
            <ContentTabs video={video} />
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-xl font-bold tracking-tight font-headline">Related Videos</h2>
          {relatedVideos && relatedVideos.map(relatedVideo => (
            <VideoCard key={relatedVideo.id} video={relatedVideo} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function WatchPage() {
    return <WatchPageContent />;
}
