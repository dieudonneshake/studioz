
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel, { EmblaCarouselType } from 'embla-carousel-react';
import { ShortsPlayer } from './shorts-player';
import { getUploader } from '@/lib/shorts-data';
import { type Short, type User } from '@/lib/types';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from '../ui/button';

interface ShortsCarouselProps {
  shorts: Short[];
  users: User[];
}

export function ShortsCarousel({ shorts, users }: ShortsCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ axis: 'y', loop: false });
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = (api: EmblaCarouselType) => {
      setActiveIndex(api.selectedScrollSnap());
    };

    emblaApi.on('select', onSelect);
    // Set initial active index
    onSelect(emblaApi);

    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  if (!shorts || shorts.length === 0) {
    return (
      <div className="h-full flex items-center justify-center bg-black text-white">
        <p>No shorts available.</p>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      <div className="h-full" ref={emblaRef}>
        <div className="h-full flex flex-col">
          {shorts.map((short, index) => {
            const uploader = getUploader(short.uploaderId, users);
            if (!uploader) {
              // In a real app, you might want to log this error or show a specific fallback UI.
              return null;
            }
            return (
              <div className="relative h-full flex-shrink-0" key={short.id}>
                <ShortsPlayer short={short} uploader={uploader} isActive={index === activeIndex} />
              </div>
            );
          })}
        </div>
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 left-4 z-10 hidden md:block">
        <Button onClick={scrollPrev} variant="ghost" size="icon" className="text-white/50 hover:text-white hover:bg-white/10 rounded-full h-12 w-12 disabled:opacity-20" disabled={activeIndex === 0}>
            <ChevronUp className="h-8 w-8" />
        </Button>
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 right-4 z-10 hidden md:block">
        <Button onClick={scrollNext} variant="ghost" size="icon" className="text-white/50 hover:text-white hover:bg-white/10 rounded-full h-12 w-12 disabled:opacity-20" disabled={activeIndex === shorts.length - 1}>
            <ChevronDown className="h-8 w-8" />
        </Button>
      </div>
    </div>
  );
}
