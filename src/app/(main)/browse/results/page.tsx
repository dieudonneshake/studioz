
"use client";

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { VideoCard } from "@/components/video-card";
import { videos, subjects as allSubjects, levels as allLevels } from "@/lib/data";
import { Skeleton } from '@/components/ui/skeleton';

function Results() {
    const searchParams = useSearchParams();
    const subjectId = searchParams.get('subject');
    const levelId = searchParams.get('level');

    // In a real app, you would fetch this data based on the params.
    // For now, we'll just filter our mock data.
    // Let's show a few videos for demonstration.
    const filteredVideos = videos.slice(0, 8);
    const subject = allSubjects.find(s => s.id === subjectId);
    const level = allLevels.find(l => l.id === levelId);
    
    const title = subject && level 
        ? `Showing videos for ${subject.name} in ${level.name}` 
        : "Browse Results";


    return (
        <div className="container mx-auto p-4 md:p-6 lg:p-8">
            <h1 className="text-3xl font-bold tracking-tight mb-6 font-headline">{title}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredVideos.map(video => (
                    <VideoCard key={video.id} video={video} />
                ))}
            </div>
        </div>
    );
}

function ResultsSkeleton() {
    return (
        <div className="container mx-auto p-4 md:p-6 lg:p-8">
            <Skeleton className="h-9 w-1/2 mb-6" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {[...Array(8)].map((_, i) => (
                     <div key={i} className="space-y-2">
                        <Skeleton className="h-40 w-full" />
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default function BrowseResultsPage() {
    return (
        <Suspense fallback={<ResultsSkeleton />}>
            <Results />
        </Suspense>
    )
}
