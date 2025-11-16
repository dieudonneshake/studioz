
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { curricula, levels, subjects, cycles } from '@/lib/data';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

// A simple way to get a video for demonstration purposes
const firstVideoId = 'vid-1';

export default function BrowsePage() {
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl font-bold tracking-tight mb-6 font-headline">Browse All Content</h1>
      <div className="space-y-6">
        <Accordion type="multiple" className="w-full space-y-4">
          {curricula.map(curriculum => (
            <AccordionItem value={curriculum.id} key={curriculum.id} className="border-none">
                <Card>
                    <AccordionTrigger className="p-6 text-xl font-bold font-headline hover:no-underline">
                        {curriculum.name}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                        <p className="text-muted-foreground mb-4">{curriculum.description}</p>
                        
                        <Accordion type="multiple" className="w-full space-y-2">
                           {cycles.map(cycle => (
                             <AccordionItem value={cycle.id} key={cycle.id} className="border rounded-md">
                               <AccordionTrigger className="px-4 py-3 font-semibold hover:no-underline">
                                 {cycle.name}
                               </AccordionTrigger>
                               <AccordionContent className="p-4 bg-secondary/50">
                                   <Accordion type="multiple" className="w-full space-y-2">
                                       {levels.map(level => (
                                         <AccordionItem value={level.id} key={level.id} className="border rounded-md bg-background">
                                           <AccordionTrigger className="px-4 py-2 font-medium hover:no-underline">
                                             {level.name}
                                           </AccordionTrigger>
                                           <AccordionContent className="p-4 border-t">
                                             <div className="space-y-2">
                                               {subjects.map(subject => (
                                                 <Link href={`/watch/${firstVideoId}`} key={subject.id} className="block">
                                                   <div className="flex items-center justify-between p-3 rounded-md bg-secondary hover:bg-secondary/80 transition-colors">
                                                     <span>{subject.name}</span>
                                                     <ChevronRight className="h-4 w-4" />
                                                   </div>
                                                 </Link>
                                               ))}
                                             </div>
                                           </AccordionContent>
                                         </AccordionItem>
                                       ))}
                                   </Accordion>
                               </AccordionContent>
                             </AccordionItem>
                           ))}
                        </Accordion>
                    </AccordionContent>
                </Card>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
