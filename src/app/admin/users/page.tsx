
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useAuthStore } from "@/store/auth";
import { Badge } from "@/components/ui/badge";
import { type User } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

export default function AdminUserManagementPage() {
  const { users, removeUser, updateUserStatus } = useAuthStore();
  const { toast } = useToast();
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const teachers = users.filter(u => u.role === 'teacher');
  const students = users.filter(u => u.role === 'student');

  const handleDeleteUser = () => {
    if (userToDelete) {
      removeUser(userToDelete.id);
      toast({
        title: "User Deleted",
        description: `${userToDelete.name} has been removed from the system.`,
      });
      setUserToDelete(null);
    }
  };

  const handleUpdateStatus = (user: User, status: 'approved' | 'pending' | 'rejected') => {
    updateUserStatus(user.id, status);
    toast({
      title: "User Status Updated",
      description: `${user.name}'s status has been changed to ${status}.`,
    });
  };

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold tracking-tight font-headline">User Management</h1>
        <div className="ml-auto flex items-center gap-2">
            <Button>Add New User</Button>
        </div>
      </div>
      <Tabs defaultValue="teachers">
        <TabsList>
          <TabsTrigger value="teachers">Teachers</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
        </TabsList>
        <TabsContent value="teachers">
          <Card>
            <CardHeader>
              <CardTitle>Teachers</CardTitle>
              <CardDescription>Manage teacher accounts, approve applications, and view details.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden md:table-cell">Subjects</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">Joined On</TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teachers.map(teacher => (
                    <TableRow key={teacher.id}>
                      <TableCell className="font-medium">{teacher.name}</TableCell>
                      <TableCell className="hidden md:table-cell">{teacher.subjects?.join(', ') || 'N/A'}</TableCell>
                      <TableCell>
                        <Badge variant={teacher.status === 'approved' ? 'default' : teacher.status === 'pending' ? 'secondary' : 'destructive'}>
                          {teacher.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{new Date().toLocaleDateString()}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button aria-haspopup="true" size="icon" variant="ghost">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            {teacher.status === 'pending' && <DropdownMenuItem onClick={() => handleUpdateStatus(teacher, 'approved')}>Approve</DropdownMenuItem>}
                            {teacher.status === 'approved' && <DropdownMenuItem onClick={() => handleUpdateStatus(teacher, 'rejected')}>Suspend</DropdownMenuItem>}
                             <AlertDialogTrigger asChild>
                                <DropdownMenuItem className="text-destructive" onClick={() => setUserToDelete(teacher)}>Delete</DropdownMenuItem>
                             </AlertDialogTrigger>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="students">
          <Card>
            <CardHeader>
              <CardTitle>Students</CardTitle>
              <CardDescription>Manage student accounts and view their activity.</CardDescription>
            </CardHeader>
            <CardContent>
               <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden md:table-cell">Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">Joined On</TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map(student => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell className="hidden md:table-cell">{student.email}</TableCell>
                      <TableCell>
                        <Badge variant={student.status === 'approved' ? 'default' : 'destructive'}>
                          {student.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{new Date().toLocaleDateString()}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button aria-haspopup="true" size="icon" variant="ghost">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>View Progress</DropdownMenuItem>
                             <AlertDialogTrigger asChild>
                                <DropdownMenuItem className="text-destructive" onClick={() => setUserToDelete(student)}>Delete</DropdownMenuItem>
                             </AlertDialogTrigger>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <AlertDialog open={!!userToDelete} onOpenChange={(open) => !open && setUserToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the user account for {userToDelete?.name} and remove their data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setUserToDelete(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteUser}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </main>
  );
}
