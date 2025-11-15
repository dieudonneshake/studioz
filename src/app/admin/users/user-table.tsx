
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { type User } from "@/lib/types";
import { UserActionsMenu } from "./user-actions";

interface UserTableProps {
    users: User[];
}

const statusVariant: Record<string, "default" | "secondary" | "destructive"> = {
    approved: "default",
    pending: "secondary",
    rejected: "destructive",
};


export function UserTable({ users }: UserTableProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead className="hidden sm:table-cell">Role</TableHead>
                    <TableHead className="hidden sm:table-cell">Status</TableHead>
                    <TableHead className="hidden md:table-cell">Joined</TableHead>
                    <TableHead>
                        <span className="sr-only">Actions</span>
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.map(user => (
                <TableRow key={user.id}>
                    <TableCell>
                        <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9">
                                <AvatarImage src={user.profile_photo} alt="Avatar" />
                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="grid gap-0.5">
                                <div className="font-medium">{user.name}</div>
                                <div className="hidden text-sm text-muted-foreground md:inline">
                                    {user.email}
                                </div>
                            </div>
                        </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell capitalize">{user.role}</TableCell>
                    <TableCell className="hidden sm:table-cell">
                        {user.status && (
                            <Badge variant={statusVariant[user.status] || "outline"} className="capitalize">
                                {user.status}
                            </Badge>
                        )}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{new Date().toLocaleDateString()}</TableCell>
                    <TableCell>
                        <UserActionsMenu user={user} />
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
