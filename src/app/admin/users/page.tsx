
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserTable } from "./user-table";
import { useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import { collection } from "firebase/firestore";
import { User } from "@/lib/types";
import { useMemo } from "react";

export default function AdminUserManagementPage() {
  const firestore = useFirestore();
  const usersQuery = useMemoFirebase(() => collection(firestore, 'users'), [firestore]);
  const { data: allUsers, isLoading } = useCollection<User>(usersQuery);

  const { teachers, students, totalUsers, verifiedTeachers, activeStudents } = useMemo(() => {
    if (!allUsers) {
      return { teachers: [], students: [], totalUsers: 0, verifiedTeachers: 0, activeStudents: 0 };
    }
    const teachers = allUsers.filter(u => u.role === 'teacher');
    const students = allUsers.filter(u => u.role === 'student');
    return {
      teachers,
      students,
      totalUsers: allUsers.length,
      verifiedTeachers: teachers.filter(t => t.status === 'approved').length,
      activeStudents: students.length,
    };
  }, [allUsers]);


  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight font-headline">User Management</h1>
          <p className="text-muted-foreground">Manage all users on the platform.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Total Users</CardTitle>
              <CardDescription>All registered accounts.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{totalUsers}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Verified Teachers</CardTitle>
              <CardDescription>Approved teacher accounts.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{verifiedTeachers}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Active Students</CardTitle>
              <CardDescription>All enrolled student accounts.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{activeStudents}</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Users</TabsTrigger>
            <TabsTrigger value="teachers">Teachers</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <Card>
              <CardHeader>
                <CardTitle>All Users</CardTitle>
                <CardDescription>A list of all users on the platform.</CardDescription>
              </CardHeader>
              <CardContent>
                <UserTable users={allUsers ?? []} isLoading={isLoading} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="teachers">
            <Card>
              <CardHeader>
                <CardTitle>Teachers</CardTitle>
                <CardDescription>A list of all teacher accounts.</CardDescription>
              </CardHeader>
              <CardContent>
                <UserTable users={teachers} isLoading={isLoading} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="students">
            <Card>
              <CardHeader>
                <CardTitle>Students</CardTitle>
                <CardDescription>A list of all student accounts.</CardDescription>
              </CardHeader>
              <CardContent>
                <UserTable users={students} isLoading={isLoading} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
