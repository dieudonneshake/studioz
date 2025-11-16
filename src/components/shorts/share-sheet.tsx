
'use client';

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
  shortId: string;
}

const shareOptions = [
    { name: 'WhatsApp', icon: MessageCircle, color: '#25D366' },
    { name: 'Facebook', icon: Facebook, color: '#1877F2' },
    { name: 'Twitter', icon: Twitter, color: '#1DA1F2' },
    { name: 'Copy Link', icon: LinkIcon, color: '#6b7280' },
];

export function ShareSheet({ open, onOpenChange, shortId }: ShareSheetProps) {
  const { toast } = useToast();
  const shareUrl = `${window.location.origin}/shorts/${shortId}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    toast({
      title: "Copied to clipboard!",
      description: "You can now share the link.",
    });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="rounded-t-2xl">
        <SheetHeader className="text-center mb-6">
          <SheetTitle>Share this Short</SheetTitle>
        </SheetHeader>
        <div className="grid grid-cols-4 gap-4 text-center">
            {shareOptions.map(option => (
                <div key={option.name} className="flex flex-col items-center gap-2">
                    <Button 
                        size="icon" 
                        variant="outline" 
                        className="h-14 w-14 rounded-full"
                        style={{'--color': option.color} as React.CSSProperties}
                        onClick={() => option.name === 'Copy Link' ? handleCopy() : toast({title: `Sharing to ${option.name} is not implemented.`})}
                    >
                        <option.icon className="h-6 w-6" style={{color: option.color}}/>
                    </Button>
                    <span className="text-xs text-muted-foreground">{option.name}</span>
                </div>
            ))}
        </div>
        <div className="mt-8 flex items-center gap-2">
            <Input value={shareUrl} readOnly />
            <Button size="icon" variant="secondary" onClick={handleCopy}>
                <Copy className="h-4 w-4" />
            </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
