
"use client";

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { VideoCard } from "@/components/video-card";
import { videos, subjects as allSubjects, levels as allLevels } from "@/lib/data";
import { Skeleton } from '@/components/ui/skeleton';

function Results() {
    const searchParams = useSearchParams();
    const subjectName = searchParams.get('subject');
    const levelName = searchParams.get('level');

    // In a real app, you would fetch this data based on the params.
    // For now, we'll just filter our mock data.
    const filteredVideos = videos.filter(video => 
        video.subject === subjectName && video.level === levelName
    );

    // If no specific videos match, show some placeholders for demonstration.
    const displayVideos = filteredVideos.length > 0 ? filteredVideos : videos.slice(0, 8);
    
    const title = subjectName && levelName 
        ? `Showing videos for ${subjectName} in ${levelName}` 
        : "Browse Results";


    return (
        <div className="container mx-auto p-4 md:p-6 lg:p-8">
            <h1 className="text-3xl font-bold tracking-tight mb-6 font-headline">{title}</h1>
            {displayVideos.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {displayVideos.map(video => (
                        <VideoCard key={video.id} video={video} />
                    ))}
                </div>
            ) : (
                <div className="flex items-center justify-center h-64 border-2 border-dashed rounded-lg">
                    <p className="text-muted-foreground">No videos found for this selection.</p>
                </div>
            )}
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
