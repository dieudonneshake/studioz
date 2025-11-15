
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { curricula, levels, subjects, videos } from '@/lib/data';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function BrowsePage() {
  const firstVideoId = videos[0]?.id || '';

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl font-bold tracking-tight mb-6 font-headline">Browse Curricula</h1>
      <div className="space-y-8">
        {curricula.map(curriculum => (
          <Card key={curriculum.id}>
            <CardHeader>
              <CardTitle className="font-headline">{curriculum.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{curriculum.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {levels.map(level => (
                  <div key={level.id}>
                    <h3 className="font-semibold mb-2">{level.name}</h3>
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
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
