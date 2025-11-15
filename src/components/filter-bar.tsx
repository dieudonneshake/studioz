'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface FilterBarProps {
  filters: string[];
}

export function FilterBar({ filters }: FilterBarProps) {
  const [activeFilter, setActiveFilter] = useState('All');

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2">
      {filters.map((filter) => (
        <Badge
          key={filter}
          variant={activeFilter === filter ? 'default' : 'secondary'}
          onClick={() => setActiveFilter(filter)}
          className={cn(
            'cursor-pointer whitespace-nowrap px-4 py-2 text-sm transition-colors',
            activeFilter === filter
              ? 'bg-primary text-primary-foreground hover:bg-primary/90'
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          )}
        >
          {filter}
        </Badge>
      ))}
    </div>
  );
}
