
"use client";

import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { type Video, type User } from "@/lib/types";
import { users } from "@/lib/data";
import { ContentActionsMenu } from "./content-actions";
import Link from "next/link";

interface ContentTableProps {
    videos: Video[];
}

export function ContentTable({ videos }: ContentTableProps) {
    const getUploaderName = (userId: string) => {
        return users.find(u => u.id === userId)?.name || 'Unknown User';
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
