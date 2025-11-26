
"use client";

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function RecentActivities() {
    // This is now mock data. In a real application, this would be fetched from Firestore.
    const recentActivities = [
        { studentName: 'Alex Johnson', studentAvatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d', videoTitle: "Introduction to Quantum Mechanics", score: 95 },
        { studentName: 'Alex Johnson', studentAvatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d', videoTitle: "The Battle of Hastings", score: 88 },
        { studentName: 'Alex Johnson', studentAvatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d', videoTitle: "Algebra Basics: Solving for X", score: 92 },
        { studentName: 'Alex Johnson', studentAvatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d', videoTitle: "The Renaissance Painters", score: 76 },
    ];


  return (
    <div className="space-y-6">
      {recentActivities.map((activity, i) => {
        return (
            <div className="flex items-start gap-4" key={i}>
                <Avatar className="h-9 w-9 flex-shrink-0 border">
                  <AvatarImage src={activity.studentAvatar} alt="Avatar" />
                  <AvatarFallback>{activity.studentName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 grid gap-1">
                  <p className="text-sm font-medium leading-none line-clamp-2">
                      <span className="font-bold">{activity.studentName}</span> completed the quiz for "{activity.videoTitle}"
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
