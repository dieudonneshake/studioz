import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { users, videos } from '@/lib/data';

export function RecentActivities() {
    const recentActivities = [
        { studentId: 'user-3', videoId: 'vid-1', score: 95 },
        { studentId: 'user-3', videoId: 'vid-3', score: 88 },
        { studentId: 'user-3', videoId: 'vid-5', score: 92 },
    ];


  return (
    <div className="space-y-8">
      {recentActivities.map((activity, i) => {
        const student = users.find(u => u.id === activity.studentId);
        const video = videos.find(v => v.id === activity.videoId);
        return (
            <div className="flex items-center" key={i}>
                <Avatar className="h-9 w-9">
                <AvatarImage src={student?.profile_photo} alt="Avatar" />
                <AvatarFallback>{student?.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none line-clamp-2">
                    {student?.name} completed the quiz for "{video?.title}"
                </p>
                <p className="text-sm text-muted-foreground">2 hours ago</p>
                </div>
                <div className="ml-auto font-medium text-sm text-primary">+{activity.score}%</div>
            </div>
        )
      })}
    </div>
  );
}
