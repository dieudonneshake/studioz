
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { VideoCard } from "@/components/video-card";
import { users, videos } from "@/lib/data";

const subscribedTeachers = users.filter(u => u.role === 'teacher').slice(0, 2);

export default function SubscriptionsPage() {
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl font-bold tracking-tight mb-6 font-headline">Subscriptions</h1>
      
      <div className="space-y-12">
        {subscribedTeachers.map(teacher => {
            const teacherVideos = videos.filter(v => v.uploaded_by === teacher.id).slice(0, 5);
            return (
                <div key={teacher.id}>
                    <div className="flex items-center gap-4 mb-4">
                        <Avatar className="h-14 w-14 border">
                            <AvatarImage src={teacher.profile_photo} alt={teacher.name} />
                            <AvatarFallback>{teacher.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h2 className="text-xl font-bold">{teacher.name}</h2>
                            <p className="text-sm text-muted-foreground">1.2M Subscribers</p>
                        </div>
                        <Button variant="secondary" className="ml-auto">Subscribed</Button>
                    </div>
                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {teacherVideos.map(video => (
                            <VideoCard key={video.id} video={video} />
                        ))}
                    </div>
                </div>
            )
        })}
      </div>
    </div>
  );
}
