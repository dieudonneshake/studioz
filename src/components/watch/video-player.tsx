

import { type Video } from '@/lib/types';
import { PlayIcon } from 'lucide-react';

interface VideoPlayerProps {
  video: Video;
}

export default function VideoPlayer({ video }: VideoPlayerProps) {
  return (
    <div className="group relative aspect-video w-full overflow-hidden rounded-lg bg-black shadow-lg">
      <video
        src={video.video_url}
        poster={video.thumbnail_path}
        controls
        className="h-full w-full object-cover"
      />
    </div>
  );
}
