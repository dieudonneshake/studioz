
"use client";

import { useAuthStore } from "@/store/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { videos } from "@/lib/data";
import { Eye, Film, Star, Users, TrendingUp, HelpCircle, Bell } from "lucide-react";
import { RecentActivities } from "@/components/dashboard/recent-activities";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ProgressChart } from "@/components/dashboard/progress-chart";

export default function DashboardPage() {
  const { user } = useAuthStore();
  const teacherVideos = videos.filter(v => v.uploaded_by === user?.id);

  const userName = user ? user.name.split(' ')[0] : 'Teacher';

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight font-headline">
          Welcome back, {userName}!
        </h2>
        <div className="flex items-center space-x-2">
            <Button asChild>
                <Link href="/upload">Upload Content</Link>
            </Button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Videos Uploaded
            </CardTitle>
            <Film className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teacherVideos.length}</div>
            <p className="text-xs text-muted-foreground">
              +2 this month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Students Reached
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+1,250</div>
            <p className="text-xs text-muted-foreground">
              +15% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Quizzes Generated</CardTitle>
            <HelpCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teacherVideos.length}</div>
            <p className="text-xs text-muted-foreground">
             Matching your video count
            </p>
          </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Channel Growth</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">+50</div>
                <p className="text-xs text-muted-foreground">New followers this month</p>
            </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-1 lg:col-span-4">
          <CardHeader>
            <CardTitle className="font-headline">Latest Content</CardTitle>
            <CardDescription>
              A summary of your recently uploaded videos.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Video</TableHead>
                        <TableHead className="hidden sm:table-cell">Status</TableHead>
                        <TableHead className="hidden md:table-cell text-right">Views</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {teacherVideos.slice(0,5).map(video => (
                        <TableRow key={video.id}>
                            <TableCell>
                                <Link href={`/watch/${video.id}`} className="font-medium hover:underline line-clamp-2">{video.title}</Link>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell"><Badge variant="outline">Published</Badge></TableCell>
                            <TableCell className="hidden md:table-cell text-right">
                                {video.views_count.toLocaleString()}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card className="col-span-1 lg:col-span-3">
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              New quiz completions from your students.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentActivities />
          </CardContent>
        </Card>
      </div>
       <div className="grid gap-4 grid-cols-1">
        <Card className="col-span-full">
            <CardHeader>
                <CardTitle className="font-headline">Student Performance Overview</CardTitle>
                <CardDescription>Average student quiz scores over the last 6 months.</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
                <ProgressChart />
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
