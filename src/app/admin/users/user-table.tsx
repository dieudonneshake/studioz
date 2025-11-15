
"use client";

import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { type User } from "@/lib/types";
import { UserActionsMenu } from "./user-actions";

interface UserTableProps {
    users: User[];
    userType: 'teacher' | 'student';
}

export function UserTable({ users, userType }: UserTableProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    {userType === 'teacher' && <TableHead className="hidden md:table-cell">Subjects</TableHead>}
                    {userType === 'student' && <TableHead className="hidden md:table-cell">Email</TableHead>}
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">Joined On</TableHead>
                    <TableHead>
                        <span className="sr-only">Actions</span>
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.map(user => (
                <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    
                    {userType === 'teacher' && <TableCell className="hidden md:table-cell">{user.subjects?.join(', ') || 'N/A'}</TableCell>}
                    {userType === 'student' && <TableCell className="hidden md:table-cell">{user.email}</TableCell>}
                    
                    <TableCell>
                    <Badge variant={user.status === 'approved' ? 'default' : user.status === 'pending' ? 'secondary' : 'destructive'}>
                        {user.status}
                    </Badge>
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
