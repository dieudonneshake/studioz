
'use client';

import { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export function GlobalLoader() {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // On a new route, we assume loading has started.
    // We'll then set a short timeout to turn it off, just in case
    // the page is cached or loads instantly, so the loader doesn't get stuck.
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Failsafe: hide after 1 second

    return () => {
      clearTimeout(timer);
      setLoading(false);
    };
  }, [pathname, searchParams]);

  // This effect handles the browser's loading indicator, which is a more reliable
  // source for when the page has actually finished rendering.
  useEffect(() => {
    const handleComplete = () => setLoading(false);

    // This is a bit of a workaround since Next.js App Router doesn't have
    // simple router events like the Pages Router. We listen to DOM events.
    // A more robust solution might involve a global state manager.
    if (document.readyState === 'complete') {
        handleComplete();
    } else {
        window.addEventListener('load', handleComplete);
        return () => window.removeEventListener('load', handleComplete);
    }
  }, [pathname, searchParams]);


  if (!loading) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <Loader2 className="h-16 w-16 animate-spin text-primary" />
    </div>
  );
}
