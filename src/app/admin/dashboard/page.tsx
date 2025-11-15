
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { videos, quizzes } from "@/lib/data";
import { useAuthStore } from "@/store/auth";
import { useToast } from "@/hooks/use-toast";


export default function AdminDashboardPage() {
  const { users, updateUserStatus } = useAuthStore();
  const { toast } = useToast();

  const totalStudents = users.filter(u => u.role === 'student').length;
  const totalTeachers = users.filter(u => u.role === 'teacher' && u.status === 'approved').length;
  const pendingTeachers = users.filter(u => u.role === 'teacher' && u.status === 'pending');
  
  const handleApproveTeacher = (teacherId: string) => {
    updateUserStatus(teacherId, 'approved');
    toast({
      title: "Teacher Approved",
      description: "The teacher's account has been activated.",
    })
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                <Card x-chunk="dashboard-05-chunk-0">
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
                <Card x-chunk="dashboard-05-chunk-1">
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
                <Card x-chunk="dashboard-05-chunk-2">
                    <CardHeader className="pb-2">
                        <CardDescription>Total Videos</CardDescription>
                        <CardTitle className="text-4xl">{videos.length}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-xs text-muted-foreground">
                        +5% from last month
                        </div>
                    </CardContent>
                </Card>
                <Card x-chunk="dashboard-05-chunk-3">
                    <CardHeader className="pb-2">
                        <CardDescription>Total Quizzes</CardDescription>
                        <CardTitle className="text-4xl">{quizzes.length}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-xs text-muted-foreground">
                        +12% from last month
                        </div>
                    </CardContent>
                </Card>
                </div>
                <div>
                <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-4">
                    <CardHeader className="pb-3">
                    <CardTitle>Teacher Applications</CardTitle>
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
                                                <Button size="sm" onClick={() => handleApproveTeacher(teacher.id)}>Approve</Button>
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
            </div>
        </main>
      </div>
    </div>
  );
}
