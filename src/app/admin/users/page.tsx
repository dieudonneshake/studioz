
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { users } from "@/lib/data";
import { UserActions } from "./user-actions";
import { UserTable } from "./user-table";


export default function AdminUserManagementPage() {
  const teachers = users.filter(u => u.role === 'teacher');
  const students = users.filter(u => u.role === 'student');

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold tracking-tight font-headline">User Management</h1>
        <div className="ml-auto flex items-center gap-2">
            <UserActions />
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
                <UserTable users={teachers} userType="teacher" />
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
                <UserTable users={students} userType="student" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
