import { Overview } from "@/components/dashboard/overview";
import { ProgressChart } from "@/components/dashboard/progress-chart";
import { RecentActivities } from "@/components/dashboard/recent-activities";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Target, Film } from "lucide-react";


export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight font-headline">Welcome back, Alex!</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                    <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">88%</div>
                    <p className="text-xs text-muted-foreground">+5% from last month</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Quizzes Completed</CardTitle>
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">12</div>
                    <p className="text-xs text-muted-foreground">+3 since last week</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Videos Watched</CardTitle>
                    <Film className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">28</div>
                    <p className="text-xs text-muted-foreground">+10 hours this month</p>
                </CardContent>
            </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
                <CardHeader>
                    <CardTitle className="font-headline">Progress Over Time</CardTitle>
                    <CardDescription>Your quiz scores for the last 6 months.</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                    <ProgressChart />
                </CardContent>
            </Card>
            <Card className="col-span-4 lg:col-span-3">
                <CardHeader>
                    <CardTitle className="font-headline">Recent Activity</CardTitle>
                    <CardDescription>You completed 2 quizzes this week.</CardDescription>
                </CardHeader>
                <CardContent>
                    <RecentActivities />
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
