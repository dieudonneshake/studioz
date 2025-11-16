
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { users } from "@/lib/data";
import Link from "next/link";
import { ChevronRight } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { type User } from "@/lib/types";


const initialSubscribedTeachers = users.filter(u => u.role === 'teacher').slice(0, 2);

export default function SubscriptionsPage() {
    const { toast } = useToast();
    const [subscribedTeachers, setSubscribedTeachers] = useState(initialSubscribedTeachers);
    const [teacherToUnsubscribe, setTeacherToUnsubscribe] = useState<User | null>(null);

    const handleUnsubscribe = () => {
        if (!teacherToUnsubscribe) return;
        
        setSubscribedTeachers(currentTeachers => 
            currentTeachers.filter(t => t.id !== teacherToUnsubscribe.id)
        );

        toast({
            title: "Unsubscribed",
            description: `You have unsubscribed from ${teacherToUnsubscribe.name}.`,
        });

        setTeacherToUnsubscribe(null); // Close dialog
    };


  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl font-bold tracking-tight mb-6 font-headline">Subscriptions</h1>
      
        {subscribedTeachers.length > 0 ? (
            <Card>
                <CardContent className="p-0">
                    <div className="space-y-0">
                        {subscribedTeachers.map((teacher, index) => (
                        <div key={teacher.id} className={`flex flex-col md:flex-row items-center p-4 gap-4 ${index < subscribedTeachers.length - 1 ? 'border-b' : ''}`}>
                            <Link href={`/profile/${teacher.id}`} className="flex w-full items-center gap-4 group flex-1">
                                <Avatar className="h-14 w-14 border">
                                    <AvatarImage src={teacher.profile_photo} alt={teacher.name} />
                                    <AvatarFallback>{teacher.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <h2 className="text-lg font-semibold group-hover:underline">{teacher.name}</h2>
                                    <p className="text-sm text-muted-foreground">1.2M Subscribers</p>
                                </div>
                            </Link>
                            <div className="flex items-center gap-2 w-full md:w-auto md:ml-auto">
                                <Button variant="outline" asChild className="flex-1 md:flex-none">
                                    <Link href={`/profile/${teacher.id}`}>
                                        Visit Channel
                                        <ChevronRight className="h-4 w-4 ml-2" />
                                    </Link>
                                </Button>

                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="secondary" className="flex-1 md:flex-none" onClick={() => setTeacherToUnsubscribe(teacher)}>
                                            Unsubscribe
                                        </Button>
                                    </AlertDialogTrigger>
                                    {teacherToUnsubscribe?.id === teacher.id && (
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Unsubscribe from {teacher.name}?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    You will no longer receive notifications for new videos from this channel.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel onClick={() => setTeacherToUnsubscribe(null)}>Cancel</AlertDialogCancel>
                                                <AlertDialogAction onClick={handleUnsubscribe}>Unsubscribe</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    )}
                                </AlertDialog>
                            </div>
                        </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        ) : (
             <div className="flex items-center justify-center h-64 border-2 border-dashed rounded-lg">
                <p className="text-muted-foreground">You haven't subscribed to any channels yet.</p>
            </div>
        )}
    </div>
  );
}

