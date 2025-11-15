import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { type Video } from '@/lib/types';
import { getUploader, users } from '@/lib/data';
import { Clock, Eye } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface VideoCardProps {
  video: Video;
}

function formatDuration(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function formatViews(views: number) {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(0)}K`;
    return views;
}

export function VideoCard({ video }: VideoCardProps) {
  const uploader = getUploader(video.uploaded_by, users);
  const uploaderImage = PlaceHolderImages.find(img => img.imageUrl === uploader?.profile_photo);
  const videoImage = PlaceHolderImages.find(img => img.imageUrl === video.thumbnail_path);


  return (
    <Link href={`/watch/${video.id}`} className="group">
      <Card className="overflow-hidden h-full flex flex-col">
        <div className="relative aspect-video">
          <Image
            src={video.thumbnail_path}
            alt={video.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            data-ai-hint={videoImage?.imageHint ?? 'video thumbnail'}
          />
          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md">
            {formatDuration(video.duration_seconds)}
          </div>
        </div>
        <CardContent className="p-4 flex-1 flex flex-col">
            <div className="flex items-start gap-4">
                {uploader && uploaderImage && (
                    <Avatar className="h-10 w-10 border">
                        <AvatarImage src={uploader.profile_photo} alt={uploader.name} data-ai-hint={uploaderImage.imageHint} />
                        <AvatarFallback>{uploader.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                )}
                <div className="flex-1">
                    <p className="font-bold text-base leading-tight font-headline line-clamp-2">{video.title}</p>
                    <p className="text-sm text-muted-foreground mt-1">{uploader?.name}</p>
                    {video.subject && video.unit && (
                      <p className="text-xs text-muted-foreground mt-1">{video.subject} &bull; {video.unit}</p>
                    )}
                     <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                        <div className="flex items-center gap-1">
                            <Eye className="w-3 h-3"/>
                            <span>{formatViews(video.views_count)} views</span>
                        </div>
                        <span>•</span>
                        <span>{video.created_at.substring(0,10)}</span>
                    </div>
                </div>
            </div>
        </CardContent>
      </Card>
    </Link>
  );
}
