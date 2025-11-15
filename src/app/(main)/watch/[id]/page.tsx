import { notFound } from 'next/navigation';
import { getVideo, getUploader, getQuiz, getSummary } from '@/lib/data';
import VideoPlayer from '@/components/watch/video-player';
import VideoDetails from '@/components/watch/video-details';
import ContentTabs from '@/components/watch/content-tabs';
import { VideoCard } from '@/components/video-card';
import { videos } from '@/lib/data';

export default function WatchPage({ params }: { params: { id: string } }) {
  const video = getVideo(params.id);
  
  if (!video) {
    notFound();
  }

  const uploader = getUploader(video.uploaded_by);
  const quiz = getQuiz(video.id);
  const summary = getSummary(video.id);

  const relatedVideos = videos.filter(v => v.id !== video.id && v.subject === video.subject).slice(0, 4);

  return (
    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <VideoPlayer video={video} />
          <VideoDetails video={video} uploader={uploader} />
          <div className="lg:hidden mt-8">
            {summary && quiz && <ContentTabs summary={summary} quiz={quiz} />}
          </div>
          <div className="mt-8">
            <h2 className="text-2xl font-bold tracking-tight font-headline">Related Videos</h2>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedVideos.map(relatedVideo => (
                <VideoCard key={relatedVideo.id} video={relatedVideo} />
              ))}
            </div>
          </div>
        </div>
        <div className="hidden lg:block">
          {summary && quiz && <ContentTabs summary={summary} quiz={quiz} />}
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return videos.map((video) => ({
    id: video.id,
  }));
}
