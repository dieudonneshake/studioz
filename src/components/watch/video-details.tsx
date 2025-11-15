
import { type Video, type User } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { ThumbsUp, ThumbsDown, Share2, PlusSquare } from 'lucide-react';
import { Badge } from '../ui/badge';

interface VideoDetailsProps {
  video: Video;
  uploader?: User;
}

export default function VideoDetails({ video, uploader }: VideoDetailsProps) {
  return (
    <div className="mt-4">
      <div className="flex flex-wrap gap-2">
            <Badge variant="outline">{video.curriculum}</Badge>
            <Badge variant="outline">{video.level}</Badge>
            <Badge variant="outline">{video.subject}</Badge>
      </div>
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight font-headline mt-2">{video.title}</h1>
      <div className="mt-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {uploader && (
            <Avatar className="h-12 w-12 border">
              <AvatarImage src={uploader.profile_photo} alt={uploader.name} />
              <AvatarFallback>{uploader.name.charAt(0)}</AvatarFallback>
            </Avatar>
          )}
          <div>
            <p className="font-semibold text-lg">{uploader?.name}</p>
            <p className="text-sm text-muted-foreground">1.2M Subscribers</p>
          </div>
          <Button>Subscribe</Button>
        </div>
        <div className="flex items-center gap-2">
            <Button variant="secondary"><ThumbsUp className="mr-2 h-5 w-5" /> 12K</Button>
            <Button variant="secondary"><ThumbsDown className="h-5 w-5" /></Button>
            <Button variant="secondary"><Share2 className="mr-2 h-5 w-5" /> Share</Button>
            <Button variant="secondary"><PlusSquare className="mr-2 h-5 w-5" /> Save</Button>
        </div>
      </div>
      <div className="mt-4 bg-secondary rounded-lg p-4">
        <div className="flex items-center gap-4 text-sm font-semibold">
            <p>{video.views_count.toLocaleString()} views</p>
            <p>{new Date(video.created_at).toLocaleDateString()}</p>
        </div>
        <p className="mt-2 text-sm text-foreground/80">{video.description}</p>
      </div>
    </div>
  );
}
