
'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Send } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { useUser } from "@/firebase";

interface CommentsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  commentCount: number;
}

const mockComments = [
    { id: 1, userId: 'user-3', userName: 'Alex Johnson', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d', text: 'This is such a cool explanation!', timestamp: '2h ago' },
    { id: 2, userId: 'user-2', userName: 'Samuel Chen', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704e', text: 'Mind blown! 🤯', timestamp: '1h ago' },
    { id: 3, userId: 'user-1', userName: 'Evelyn Reed', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704f', text: 'I never thought about it that way. Thanks!', timestamp: '45m ago'},
];

export function CommentsSheet({ open, onOpenChange, commentCount }: CommentsSheetProps) {
  const { user } = useUser();
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
                    return (
                        <div key={comment.id} className="flex items-start gap-3">
                            <Avatar className="h-9 w-9 border">
                                <AvatarImage src={comment.avatar} alt={comment.userName} />
                                <AvatarFallback>{comment.userName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <p className="text-xs text-muted-foreground">@{comment.userName.split(' ').join('').toLowerCase()} <span className="ml-2">{comment.timestamp}</span></p>
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
                    <AvatarImage src={user?.photoURL ?? undefined} />
                    <AvatarFallback>{user?.displayName?.charAt(0) ?? 'U'}</AvatarFallback>
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
