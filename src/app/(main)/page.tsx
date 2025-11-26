// This file is now a redirector based on auth state.
// The actual home page content is in /home
"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootPage() {
    const router = useRouter();

    useEffect(() => {
        router.replace('/home');
    }, [router]);

    return (
        <div className="flex h-screen items-center justify-center">
        <p>Loading...</p>
        </div>
    );
}
