
'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { users } from "@/lib/data";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Send } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";

interface CommentsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  commentCount: number;
}

const mockComments = [
    { id: 1, userId: 'user-3', text: 'This is such a cool explanation!', timestamp: '2h ago' },
    { id: 2, userId: 'user-2', text: 'Mind blown! 🤯', timestamp: '1h ago' },
    { id: 3, userId: 'user-1', text: 'I never thought about it that way. Thanks!', timestamp: '45m ago'},
    { id: 4, userId: 'user-3', text: 'Can you do a video on quantum tunneling next?', timestamp: '30m ago'},
    { id: 5, userId: 'user-2', text: 'Replying to @Alex Johnson, that\'s a great idea!', timestamp: '15m ago'},
];

export function CommentsSheet({ open, onOpenChange, commentCount }: CommentsSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[80vh] flex flex-col">
        <SheetHeader className="text-center">
          <SheetTitle>{commentCount.toLocaleString()} Comments</SheetTitle>
        </SheetHeader>
        <Separator />
        <ScrollArea className="flex-1 -mx-6 px-6">
            <div className="space-y-6 py-6">
                {mockComments.map(comment => {
                    const user = users.find(u => u.id === comment.userId);
                    return (
                        <div key={comment.id} className="flex items-start gap-3">
                            <Avatar className="h-9 w-9 border">
                                <AvatarImage src={user?.profile_photo} alt={user?.name} />
                                <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <p className="text-xs text-muted-foreground">@{user?.name.split(' ').join('').toLowerCase()} <span className="ml-2">{comment.timestamp}</span></p>
                                <p className="text-sm">{comment.text}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </ScrollArea>
        <Separator />
        <div className="py-4">
            <div className="flex items-center gap-2">
                 <Avatar className="h-9 w-9 border">
                    <AvatarImage src={users.find(u => u.id === 'user-3')?.profile_photo} />
                    <AvatarFallback>A</AvatarFallback>
                </Avatar>
                <Input placeholder="Add a comment..." className="flex-1" />
                <Button size="icon">
                    <Send className="h-4 w-4" />
                </Button>
            </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
