import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { videos, getUploader } from '@/lib/data';

export function RecentActivities() {
    const recentVideos = videos.slice(0, 4);

  return (
    <div className="space-y-8">
      {recentVideos.map(video => {
        const uploader = getUploader(video.uploaded_by);
        return (
            <div className="flex items-center" key={video.id}>
                <Avatar className="h-9 w-9">
                <AvatarImage src={uploader?.profile_photo} alt="Avatar" />
                <AvatarFallback>{uploader?.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none line-clamp-1">{video.title}</p>
                <p className="text-sm text-muted-foreground">Completed quiz and scored 95%</p>
                </div>
                <div className="ml-auto font-medium text-sm">+95%</div>
            </div>
        )
      })}
    </div>
  );
}
