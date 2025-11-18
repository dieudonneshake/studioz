
'use client';

import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { Copy, Link as LinkIcon, Twitter, Facebook, MessageCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Input } from "../ui/input";

interface ShareSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  videoId: string;
}

const shareOptions = [
    { name: 'WhatsApp', icon: MessageCircle, color: '#25D366' },
    { name: 'Facebook', icon: Facebook, color: '#1877F2' },
    { name: 'Twitter', icon: Twitter, color: '#1DA1F2' },
];

export function ShareSheet({ open, onOpenChange, videoId }: ShareSheetProps) {
  const { toast } = useToast();
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    // This code will only run on the client, after the component has mounted.
    if (typeof window !== 'undefined') {
      setShareUrl(`${window.location.origin}/watch/${videoId}`);
    }
  }, [videoId]);


  const handleCopy = () => {
    if (!shareUrl) return;
    navigator.clipboard.writeText(shareUrl);
    toast({
      title: "Copied to clipboard!",
    });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="rounded-t-2xl">
        <SheetHeader className="text-center mb-6">
          <SheetTitle>Share this Video</SheetTitle>
        </SheetHeader>
        <div className="flex justify-center gap-4 text-center">
            {shareOptions.map(option => (
                <div key={option.name} className="flex flex-col items-center gap-2">
                    <Button 
                        size="icon" 
                        variant="outline" 
                        className="h-14 w-14 rounded-full"
                        style={{'--color': option.color} as React.CSSProperties}
                        onClick={() => toast({title: `Sharing to ${option.name} is not implemented.`})}
                    >
                        <option.icon className="h-6 w-6" style={{color: option.color}}/>
                    </Button>
                    <span className="text-xs text-muted-foreground">{option.name}</span>
                </div>
            ))}
        </div>
        <div className="mt-8 flex items-center gap-2">
            <Input value={shareUrl} readOnly placeholder="Generating share link..." />
            <Button size="icon" variant="secondary" onClick={handleCopy} disabled={!shareUrl}>
                <Copy className="h-4 w-4" />
            </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
