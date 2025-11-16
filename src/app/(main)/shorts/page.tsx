

import { Card } from "@/components/ui/card";
import Image from 'next/image';
import { Play } from 'lucide-react';
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Link from "next/link";
import { shorts } from "@/lib/shorts-data";

export default function ShortsPage() {
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl font-bold tracking-tight mb-6 font-headline">Shorts</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {shorts.map(short => {
          const image = PlaceHolderImages.find(img => img.imageUrl === short.thumbnail_path);
          
          return (
            <Link href={`/shorts/${short.id}`} key={short.id}>
                <Card className="aspect-[9/16] relative overflow-hidden rounded-xl group">
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
                        <span>{short.likes}K</span>
                    </div>
                </div>
                </Card>
            </Link>
          )
        })}
      </div>
    </div>
  );
}
