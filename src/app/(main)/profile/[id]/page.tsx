
"use client";

import { notFound } from 'next/navigation';
import { getUploader, users, videos } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { VideoCard } from '@/components/video-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clapperboard, Video, Check } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function ProfilePage({ params }: { params: { id: string } }) {
  const { toast } = useToast();
  const uploader = getUploader(params.id, users);
  const [isSubscribed, setIsSubscribed] = useState(false);

  if (!uploader) {
    notFound();
  }

  const handleSubscribe = () => {
    setIsSubscribed(!isSubscribed);
    toast({
      title: isSubscribed ? `Unsubscribed from ${uploader?.name}` : `Subscribed to ${uploader?.name}`,
    });
  };

  const uploaderVideos = videos.filter(v => v.uploaded_by === uploader.id);

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
        <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-primary">
          <AvatarImage src={uploader.profile_photo} alt={uploader.name} />
          <AvatarFallback className="text-4xl">{uploader.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold font-headline">{uploader.name}</h1>
          <p className="text-muted-foreground mt-1">@{uploader.name.split(' ').join('').toLowerCase()}</p>
          <p className="mt-2 text-sm text-muted-foreground">1.2M Subscribers &middot; {uploaderVideos.length} videos</p>
          <p className="mt-4 max-w-lg text-sm">{uploader.bio}</p>
          <Button className="mt-4" onClick={handleSubscribe} variant={isSubscribed ? 'secondary' : 'default'}>
            {isSubscribed && <Check className="mr-2 h-4 w-4" />}
            {isSubscribed ? 'Subscribed' : 'Subscribe'}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="videos" className="mt-8 md:mt-12">
        <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
          <TabsTrigger value="videos">
            <Video className="mr-2 h-4 w-4" />
            Videos
          </TabsTrigger>
          <TabsTrigger value="shorts">
             <Clapperboard className="mr-2 h-4 w-4" />
            Shorts
          </TabsTrigger>
        </TabsList>
        <TabsContent value="videos" className="mt-6">
          {uploaderVideos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {uploaderVideos.map(video => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-muted-foreground">
              <p>{uploader.name} hasn't uploaded any videos yet.</p>
            </div>
          )}
        </TabsContent>
        <TabsContent value="shorts" className="mt-6">
            <div className="text-center py-16 text-muted-foreground">
              <p>Shorts are coming soon!</p>
            </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
