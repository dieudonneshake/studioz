
'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { type Quiz } from '@/lib/types';
import QuizView from './quiz-view';
import { ScrollArea } from '../ui/scroll-area';

interface ContentTabsProps {
  summary: { en: string; fr: string; notes: string };
  quiz: Quiz;
}

export default function ContentTabs({ summary, quiz }: ContentTabsProps) {
  return (
    <Tabs defaultValue="quiz" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="quiz">AI Quiz</TabsTrigger>
        <TabsTrigger value="summary">Summary</TabsTrigger>
        <TabsTrigger value="notes">Lesson Notes</TabsTrigger>
      </TabsList>
      <TabsContent value="quiz">
        <QuizView quiz={quiz} />
      </TabsContent>
      <TabsContent value="summary">
        <ScrollArea className="h-[500px] rounded-md border p-4">
            <h3 className="font-bold text-lg font-headline mb-2">English Summary</h3>
            <p className="text-sm text-muted-foreground mb-6">{summary.en}</p>
            <h3 className="font-bold text-lg font-headline mb-2">Résumé Français</h3>
            <p className="text-sm text-muted-foreground">{summary.fr}</p>
        </ScrollArea>
      </TabsContent>
      <TabsContent value="notes">
      <ScrollArea className="h-[500px] rounded-md border p-4">
            <h3 className="font-bold text-lg font-headline mb-2">Lesson Notes</h3>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">{summary.notes}</p>
        </ScrollArea>
      </TabsContent>
    </Tabs>
  );
}
