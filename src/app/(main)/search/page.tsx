
"use client";

import { useState } from 'react';
import { VideoCard } from "@/components/video-card";
import { videos } from "@/lib/data";
import { SearchX, Search as SearchIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function SearchPage() {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredVideos = searchQuery
        ? videos.filter(video =>
            video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            video.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : videos; // Show all videos if query is empty

    const title = searchQuery
        ? `Showing results for "${searchQuery}"`
        : "Search All Videos";

    return (
        <div className="container mx-auto p-4 md:p-6 lg:p-8">
            <h1 className="text-3xl font-bold tracking-tight mb-4 font-headline">{title}</h1>

            <div className="relative mb-6">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Start typing to filter videos..."
                    className="w-full pl-10 text-base"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {filteredVideos.length > 0 ? (
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
                      {searchQuery ? `Try adjusting your search terms for "${searchQuery}".` : 'Try searching for a topic, subject, or keyword.'}
                    </p>
                </div>
            )}
        </div>
    );
}
