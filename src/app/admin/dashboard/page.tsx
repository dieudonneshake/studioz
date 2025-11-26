
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import { collection, query, where, doc, updateDoc } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
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
} from "@/components/ui/alert-dialog"
import { type User, type Video, type Quiz } from "@/lib/types";

export default function AdminDashboardPage() {
  const firestore = useFirestore();
  const { toast } = useToast();
  const [selectedTeacher, setSelectedTeacher] = useState<User | null>(null);

  const usersQuery = useMemoFirebase(() => collection(firestore, 'users'), [firestore]);
  const videosQuery = useMemoFirebase(() => collection(firestore, 'videos'), [firestore]);
  const quizzesQuery = useMemoFirebase(() => collection(firestore, 'quizzes'), [firestore]);

  const { data: allUsers } = useCollection<User>(usersQuery);
  const { data: allVideos } = useCollection<Video>(videosQuery);
  const { data: allQuizzes } = useCollection<Quiz>(quizzesQuery);

  const [totalStudents, setTotalStudents] = useState(0);
  const [totalTeachers, setTotalTeachers] = useState(0);
  const [pendingTeachers, setPendingTeachers] = useState<User[]>([]);

  useEffect(() => {
    if (allUsers) {
      setTotalStudents(allUsers.filter(u => u.role === 'student').length);
      setTotalTeachers(allUsers.filter(u => u.role === 'teacher' && u.status === 'approved').length);
      setPendingTeachers(allUsers.filter(u => u.role === 'teacher' && u.status === 'pending'));
    }
  }, [allUsers]);
  
  const handleApproveTeacher = async () => {
    if (selectedTeacher) {
      const teacherDocRef = doc(firestore, 'users', selectedTeacher.id);
      await updateDoc(teacherDocRef, { status: 'approved' });
      toast({
        title: "Teacher Approved",
        description: `${selectedTeacher.name}'s account has been activated.`,
      });
      setSelectedTeacher(null);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Total Teachers</CardDescription>
                        <CardTitle className="text-4xl">{totalTeachers}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-xs text-muted-foreground">
                        +10% from last month
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Total Students</CardDescription>
                        <CardTitle className="text-4xl">{totalStudents}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-xs text-muted-foreground">
                        +25% from last month
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Total Videos</CardDescription>
                        <CardTitle className="text-4xl">{allVideos?.length ?? 0}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-xs text-muted-foreground">
                        +5% from last month
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Total Quizzes</CardDescription>
                        <CardTitle className="text-4xl">{allQuizzes?.length ?? 0}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-xs text-muted-foreground">
                        +12% from last month
                        </div>
                    </CardContent>
                </Card>
                </div>
                <Card>
                    <CardHeader className="pb-3">
                    <CardTitle className="font-headline">Teacher Applications</CardTitle>
                    <CardDescription className="max-w-lg text-balance leading-relaxed">
                        Review and approve new teacher applications to allow them to start uploading content.
                    </CardDescription>
                    </CardHeader>
                    <CardContent>
                         <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead className="hidden sm:table-cell">Subjects</TableHead>
                                    <TableHead className="hidden sm:table-cell">Status</TableHead>
                                    <TableHead className="hidden md:table-cell">Applied On</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {pendingTeachers.length > 0 ? pendingTeachers.map(teacher => (
                                     <TableRow key={teacher.id}>
                                        <TableCell>
                                            <div className="font-medium">{teacher.name}</div>
                                            <div className="hidden text-sm text-muted-foreground md:inline">
                                                {teacher.email}
                                            </div>
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">{teacher.subjects?.join(', ')}</TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            <Badge className="text-xs" variant="destructive">
                                                {teacher.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">{new Date().toLocaleDateString()}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex gap-2 justify-end">
                                                <Button size="sm" variant="outline">View Details</Button>
                                                <AlertDialog>
                                                  <AlertDialogTrigger asChild>
                                                    <Button size="sm" onClick={() => setSelectedTeacher(teacher)}>Approve</Button>
                                                  </AlertDialogTrigger>
                                                  <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                      <AlertDialogDescription>
                                                        This action will approve {selectedTeacher?.name} and allow them to start creating content. Are you sure you want to proceed?
                                                      </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                      <AlertDialogAction onClick={handleApproveTeacher}>Approve</AlertDialogAction>
                                                    </AlertDialogFooter>
                                                  </AlertDialogContent>
                                                </AlertDialog>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )) : (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center">No pending applications.</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </main>
      </div>
    </div>
  );
}
