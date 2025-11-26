
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { type Video, type User } from '@/lib/types';
import { Clock, Eye } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { Skeleton } from './ui/skeleton';

interface VideoCardProps {
  video: Video;
}

function formatDuration(seconds: number) {
  if (isNaN(seconds) || seconds < 0) return '0:00';
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function formatViews(views: number) {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(0)}K`;
    return views;
}

export function VideoCard({ video }: VideoCardProps) {
  const firestore = useFirestore();
  
  const uploaderRef = useMemoFirebase(() => {
    if (!video.uploaded_by) return null;
    return doc(firestore, 'users', video.uploaded_by);
  }, [firestore, video.uploaded_by]);

  const { data: uploader, isLoading: isLoadingUploader } = useDoc<User>(uploaderRef);

  const uploaderImage = PlaceHolderImages.find(img => img.id === `user-avatar-${uploader?.id?.slice(-1)}`);
  const videoImage = PlaceHolderImages.find(img => img.id === `thumbnail-${video.id.slice(-1)}`);


  return (
    <Link href={`/watch/${video.id}`} className="group">
      <Card className="overflow-hidden h-full flex flex-col">
        <div className="relative aspect-video">
          <Image
            src={video.thumbnail_path || (videoImage?.imageUrl ?? '/placeholder.png')}
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
                {isLoadingUploader ? (
                    <Skeleton className="h-10 w-10 rounded-full" />
                ) : uploader ? (
                    <Avatar className="h-10 w-10 border">
                        <AvatarImage src={uploader.profile_photo} alt={uploader.name} data-ai-hint={uploaderImage?.imageHint} />
                        <AvatarFallback>{uploader.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                ) : null}
                <div className="flex-1">
                    <p className="font-bold text-base leading-tight font-headline line-clamp-2">{video.title}</p>
                    {isLoadingUploader ? (
                        <Skeleton className="h-5 w-24 mt-1" />
                    ) : (
                        <p className="text-sm text-muted-foreground mt-1">{uploader?.name}</p>
                    )}
                    <div className="text-xs text-muted-foreground mt-1 space-y-0.5">
                      <p><span className="font-semibold">Grade:</span> {video.level}</p>
                      <p><span className="font-semibold">Lesson:</span> {video.subject}</p>
                      {video.unit && <p><span className="font-semibold">Unit:</span> {video.unit}</p>}
                    </div>
                     <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2 pt-2 border-t">
                        <div className="flex items-center gap-1">
                            <Eye className="w-3 h-3"/>
                            <span>{formatViews(video.views_count)} views</span>
                        </div>
                        <span>•</span>
                        <span>{new Date(video.created_at).toLocaleDateString()}</span>
                    </div>
                </div>
            </div>
        </CardContent>
      </Card>
    </Link>
  );
}
