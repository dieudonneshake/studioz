
import { Card } from "@/components/ui/card";
import Image from 'next/image';
import { Play } from 'lucide-react';
import { PlaceHolderImages } from "@/lib/placeholder-images";

const shorts = [
  { id: 1, title: "Quantum Entanglement in 60 Seconds", views: "1.2M", imageId: "thumbnail-1" },
  { id: 2, title: "The REAL reason Rome fell", views: "890K", imageId: "thumbnail-2" },
  { id: 3, title: "Math trick you NEED to know!", views: "2.5M", imageId: "thumbnail-3" },
  { id: 4, title: "Hamlet's BIG mistake", views: "500K", imageId: "thumbnail-4" },
  { id: 5, title: "What is Time Dilation?", views: "1.8M", imageId: "thumbnail-5" },
  { id: 6, title: "Da Vinci's secret", views: "3.1M", imageId: "thumbnail-6" },
  { id: 7, title: "Physics of a black hole", views: "4.2M", imageId: "thumbnail-7" },
  { id: 8, title: "How big is the ocean?", views: "950K", imageId: "thumbnail-8" },
];

export default function ShortsPage() {
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl font-bold tracking-tight mb-6 font-headline">Shorts</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {shorts.map(short => {
          const image = PlaceHolderImages.find(img => img.id === short.imageId);
          return (
            <Card key={short.id} className="aspect-[9/16] relative overflow-hidden rounded-xl group">
              {image && (
                <Image 
                    src={image.imageUrl}
                    alt={short.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    data-ai-hint={image.imageHint}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-3 text-white">
                <p className="font-bold text-sm leading-tight line-clamp-2">{short.title}</p>
                <div className="flex items-center gap-1 text-xs mt-1">
                    <Play className="h-3 w-3 fill-white" />
                    <span>{short.views}</span>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  );
}
