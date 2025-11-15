
"use client";

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { videos } from '@/lib/data';
import { useAuthStore } from '@/store/auth';

export function RecentActivities() {
    const { users } = useAuthStore();
    const recentActivities = [
        { studentId: 'user-3', videoId: 'vid-1', score: 95 },
        { studentId: 'user-3', videoId: 'vid-3', score: 88 },
        { studentId: 'user-3', videoId: 'vid-5', score: 92 },
        { studentId: 'user-3', videoId: 'vid-6', score: 76 },
    ];


  return (
    <div className="space-y-6">
      {recentActivities.map((activity, i) => {
        const student = users.find(u => u.id === activity.studentId);
        const video = videos.find(v => v.id === activity.videoId);
        return (
            <div className="flex items-start gap-4" key={i}>
                <Avatar className="h-9 w-9 flex-shrink-0 border">
                  <AvatarImage src={student?.profile_photo} alt="Avatar" />
                  <AvatarFallback>{student?.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 grid gap-1">
                  <p className="text-sm font-medium leading-none line-clamp-2">
                      <span className="font-bold">{student?.name}</span> completed the quiz for "{video?.title}"
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                    <div className="font-medium text-sm text-primary">Score: {activity.score}%</div>
                  </div>
                </div>
            </div>
        )
      })}
    </div>
  );
}
