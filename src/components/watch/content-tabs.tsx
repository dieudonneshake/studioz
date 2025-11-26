
'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { type Video } from '@/lib/types';
import QuizView from './quiz-view';
import { ScrollArea } from '../ui/scroll-area';
import { useEffect, useState, useMemo } from 'react';
import { generateVideoSummary } from '@/ai/flows/generate-video-summary';
import { Skeleton } from '../ui/skeleton';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, limit } from 'firebase/firestore';
import { type Note } from '@/lib/types';

interface ContentTabsProps {
  video: Video;
}

export default function ContentTabs({ video }: ContentTabsProps) {
  const [summary, setSummary] = useState<{ en: string; fr: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const firestore = useFirestore();

  const notesQuery = useMemoFirebase(() => {
    if (!video.id) return null;
    return query(collection(firestore, `videos/${video.id}/notes`), limit(1));
  }, [firestore, video.id]);

  const { data: notes, isLoading: isLoadingNotes } = useCollection<Note>(notesQuery);

  const noteText = useMemo(() => notes?.[0]?.textExtracted, [notes]);

  const handleTabChange = async (value: string) => {
    if (value === 'summary' && !summary && noteText) {
      setIsLoading(true);
      try {
        const result = await generateVideoSummary({ notesText: noteText });
        setSummary({ en: result.summary_en, fr: result.summary_fr });
      } catch (error) {
        console.error("Failed to generate summary:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Tabs defaultValue="quiz" className="w-full" onValueChange={handleTabChange}>
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="quiz">AI Quiz</TabsTrigger>
        <TabsTrigger value="summary">AI Summary</TabsTrigger>
        <TabsTrigger value="notes">Lesson Notes</TabsTrigger>
      </TabsList>
      <TabsContent value="quiz">
        <QuizView video={video} />
      </TabsContent>
      <TabsContent value="summary">
        <ScrollArea className="h-[500px] rounded-md border p-4">
          {isLoading && (
            <div className="space-y-4">
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <div className="pt-6">
                <Skeleton className="h-6 w-1/4" />
                <Skeleton className="h-4 w-full mt-4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          )}
          {summary && (
            <>
              <h3 className="font-bold text-lg font-headline mb-2">English Summary</h3>
              <p className="text-sm text-muted-foreground mb-6">{summary.en}</p>
              <h3 className="font-bold text-lg font-headline mb-2">Résumé Français</h3>
              <p className="text-sm text-muted-foreground">{summary.fr}</p>
            </>
          )}
          {!summary && !isLoading && (
            <p className="text-muted-foreground">Click the tab again to generate the summary.</p>
          )}
        </ScrollArea>
      </TabsContent>
      <TabsContent value="notes">
      <ScrollArea className="h-[500px] rounded-md border p-4">
            <h3 className="font-bold text-lg font-headline mb-2">Lesson Notes (Downloadable)</h3>
            {isLoadingNotes ? (
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5" />
                </div>
            ) : noteText ? (
                 <p className="text-sm text-muted-foreground whitespace-pre-wrap">{noteText}</p>
            ) : (
                <p className="text-muted-foreground">No notes available for this lesson.</p>
            )}
        </ScrollArea>
      </TabsContent>
    </Tabs>
  );
}
