import Image from 'next/image';
import { type Video } from '@/lib/types';
import { PlayCircle } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface VideoPlayerProps {
  video: Video;
}

export default function VideoPlayer({ video }: VideoPlayerProps) {
  const videoImage = PlaceHolderImages.find(img => img.imageUrl === video.thumbnail_path);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-secondary shadow-lg">
      <Image
        src={video.thumbnail_path}
        alt={`Thumbnail for ${video.title}`}
        fill
        className="object-cover"
        data-ai-hint={videoImage?.imageHint}
      />
      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
        <PlayCircle className="h-20 w-20 text-white/70 hover:text-white transition-colors cursor-pointer" />
      </div>
    </div>
  );
}
