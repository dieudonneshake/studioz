
"use client";

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { VideoCard } from "@/components/video-card";
import { videos } from "@/lib/data";
import { Skeleton } from '@/components/ui/skeleton';
import { SearchX } from 'lucide-react';

function SearchResults() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q');

    const filteredVideos = query 
        ? videos.filter(video => 
            video.title.toLowerCase().includes(query.toLowerCase()) ||
            video.description.toLowerCase().includes(query.toLowerCase())
        )
        : [];
    
    const title = query 
        ? `Search results for "${query}"`
        : "Please enter a search term";


    return (
        <div className="container mx-auto p-4 md:p-6 lg:p-8">
            <h1 className="text-3xl font-bold tracking-tight mb-6 font-headline">{title}</h1>
            
            {query && filteredVideos.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {filteredVideos.map(video => (
                        <VideoCard key={video.id} video={video} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed rounded-lg text-center">
                    <SearchX className="h-16 w-16 text-muted-foreground mb-4" />
                    <p className="text-xl font-semibold">No results found</p>
                    <p className="text-muted-foreground mt-2">
                      {query ? `Try adjusting your search terms for "${query}".` : 'Try searching for a topic, subject, or keyword.'}
                    </p>
                </div>
            )}
        </div>
    );
}

function SearchResultsSkeleton() {
    return (
        <div className="container mx-auto p-4 md:p-6 lg:p-8">
            <Skeleton className="h-9 w-1/2 mb-6" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {[...Array(10)].map((_, i) => (
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

export default function SearchPage() {
    return (
        <Suspense fallback={<SearchResultsSkeleton />}>
            <SearchResults />
        </Suspense>
    )
}
