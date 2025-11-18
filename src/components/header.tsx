
"use client";

import { useState, useEffect, useRef } from 'react';
import { Search, Bell, Mic, Video, Menu, X, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { SidebarTrigger } from './ui/sidebar';
import { UserNav } from './user-nav';
import Link from 'next/link';
import { useAuthStore } from '@/store/auth';
import Image from 'next/image';
import { Popover, PopoverContent, PopoverTrigger, PopoverAnchor } from '@/components/ui/popover';
import { videos } from '@/lib/data';
import { type Video as VideoType } from '@/lib/types';

export default function Header() {
  const { isAuthenticated } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<VideoType[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        const filteredVideos = videos.filter(video =>
          video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          video.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(filteredVideos);
        setIsSearchOpen(true);
        setIsLoading(false);
      }, 300); // Debounce search
      return () => clearTimeout(timer);
    } else {
      setSearchResults([]);
      setIsSearchOpen(false);
    }
  }, [searchQuery]);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setIsSearchOpen(false);
  };


  return (
    <header className="sticky top-0 z-30 flex h-14 w-full shrink-0 items-center justify-between gap-2 border-b bg-background px-2 sm:px-4">
      <div className='flex items-center gap-1 sm:gap-2'>
        <SidebarTrigger>
            <Menu />
        </SidebarTrigger>
        <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="Ederaxy Logo" width={32} height={32} className="h-8 w-8" />
            <span className="font-bold text-lg hidden sm:inline-block">Ederaxy</span>
        </Link>
      </div>
      
       <div ref={searchRef} className="flex flex-1 items-center justify-center gap-2 px-2">
         <Popover open={isSearchOpen} onOpenChange={setIsSearchOpen}>
          <PopoverAnchor className="relative w-full max-w-xl">
             <div className="relative flex items-center">
              <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
               <Input
                type="search"
                placeholder="Search"
                className="w-full rounded-full border-border bg-secondary h-10 pl-10 pr-10 sm:pl-12"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => { if(searchQuery) setIsSearchOpen(true)}}
              />
              {searchQuery && (
                <Button variant="ghost" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full" onClick={clearSearch}>
                   {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <X className="h-4 w-4" />}
                </Button>
              )}
            </div>
          </PopoverAnchor>
          <PopoverContent className="w-[var(--radix-popover-trigger-width)] mt-2 max-h-[60vh] overflow-y-auto p-0">
             {searchResults.length > 0 ? (
              <div className="flex flex-col gap-1 p-2">
                {searchResults.map(video => (
                  <Link 
                    key={video.id} 
                    href={`/watch/${video.id}`} 
                    className="flex items-center gap-3 p-2 rounded-md hover:bg-accent"
                    onClick={() => setIsSearchOpen(false)}
                  >
                    <Image src={video.thumbnail_path} alt={video.title} width={80} height={45} className="rounded-md object-cover w-20 h-[45px]" />
                    <div className="flex-1">
                      <p className="font-semibold text-sm line-clamp-1">{video.title}</p>
                      <p className="text-xs text-muted-foreground line-clamp-1">{video.shortSummary}</p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
                <div className="p-4 text-center text-sm text-muted-foreground">
                    No results found for "{searchQuery}".
                </div>
            )}
          </PopoverContent>
         </Popover>
      </div>

      <div className="flex items-center gap-2">
        {isAuthenticated ? (
          <>
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Video className="h-5 w-5" />
              <span className="sr-only">Upload Video</span>
            </Button>
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <UserNav />
          </>
        ) : (
          <div className="flex items-center gap-2">
              <Button variant="outline" asChild>
                  <Link href="/login">Log In</Link>
              </Button>
              <Button asChild className="hidden sm:flex">
                  <Link href="/signup">Sign Up</Link>
              </Button>
          </div>
        )}
      </div>
    </header>
  );
}
