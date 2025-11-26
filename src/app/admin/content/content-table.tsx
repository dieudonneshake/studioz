
"use client";

import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { type Video, type User } from "@/lib/types";
import { ContentActionsMenu } from "./content-actions";
import Link from "next/link";
import { useCollection, useMemoFirebase } from "@/firebase";
import { collection } from "firebase/firestore";
import { useFirestore } from "@/firebase";
import { Skeleton } from "@/components/ui/skeleton";

interface ContentTableProps {
    videos: Video[];
    isLoading: boolean;
}

export function ContentTable({ videos, isLoading }: ContentTableProps) {
    const firestore = useFirestore();
    const usersQuery = useMemoFirebase(() => collection(firestore, 'users'), [firestore]);
    const { data: allUsers } = useCollection<User>(usersQuery);

    const getUploaderName = (userId: string) => {
        return allUsers?.find(u => u.id === userId)?.name || 'Unknown User';
    }

    if (isLoading) {
        return (
            <div className="space-y-2">
                {[...Array(10)].map((_, i) => <Skeleton key={i} className="h-14 w-full" />)}
            </div>
        )
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead className="hidden md:table-cell">Teacher</TableHead>
                    <TableHead className="hidden sm:table-cell">Subject</TableHead>
                    <TableHead className="hidden sm:table-cell">Status</TableHead>
                    <TableHead className="hidden md:table-cell">Uploaded On</TableHead>
                    <TableHead>
                        <span className="sr-only">Actions</span>
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {videos.map(video => (
                <TableRow key={video.id}>
                    <TableCell className="font-medium">
                        <Link href={`/watch/${video.id}`} className="hover:underline">
                            {video.title}
                        </Link>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{getUploaderName(video.uploaded_by)}</TableCell>
                    <TableCell className="hidden sm:table-cell">{video.subject}</TableCell>
                    <TableCell>
                        <Badge variant="default">Published</Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{new Date(video.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                        <ContentActionsMenu video={video} />
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
