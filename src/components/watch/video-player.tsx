
import Image from 'next/image';
import { type Video } from '@/lib/types';
import { Play } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface VideoPlayerProps {
  video: Video;
}

export default function VideoPlayer({ video }: VideoPlayerProps) {
  const videoImage = PlaceHolderImages.find(img => img.imageUrl === video.thumbnail_path);

  return (
    <div className="group relative aspect-video w-full cursor-pointer overflow-hidden rounded-lg bg-secondary shadow-lg">
      <Image
        src={video.thumbnail_path}
        alt={`Thumbnail for ${video.title}`}
        fill
        className="object-cover"
        data-ai-hint={videoImage?.imageHint}
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
        <button className="flex h-16 w-16 items-center justify-center rounded-full bg-black/60 backdrop-blur-sm">
            <Play className="h-10 w-10 translate-x-0.5 fill-white text-white" />
        </button>
      </div>
    </div>
  );
}
