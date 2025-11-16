
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { users } from "@/lib/data";
import Link from "next/link";
import { ChevronRight } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

const subscribedTeachers = users.filter(u => u.role === 'teacher').slice(0, 2);

export default function SubscriptionsPage() {
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl font-bold tracking-tight mb-6 font-headline">Subscriptions</h1>
      
        {subscribedTeachers.length > 0 ? (
            <Card>
                <CardContent className="p-0">
                    <div className="space-y-0">
                        {subscribedTeachers.map((teacher, index) => (
                        <div key={teacher.id} className={`flex items-center p-4 ${index < subscribedTeachers.length - 1 ? 'border-b' : ''}`}>
                            <Link href={`/profile/${teacher.id}`} className="flex items-center gap-4 group flex-1">
                                <Avatar className="h-14 w-14 border">
                                    <AvatarImage src={teacher.profile_photo} alt={teacher.name} />
                                    <AvatarFallback>{teacher.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h2 className="text-lg font-semibold group-hover:underline">{teacher.name}</h2>
                                    <p className="text-sm text-muted-foreground">1.2M Subscribers</p>
                                </div>
                            </Link>
                            <div className="flex items-center gap-2 ml-auto">
                                <Button variant="outline" asChild>
                                    <Link href={`/profile/${teacher.id}`}>
                                        Visit Channel
                                        <ChevronRight className="h-4 w-4 ml-2" />
                                    </Link>
                                </Button>
                                <Button variant="secondary">Subscribed</Button>
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
