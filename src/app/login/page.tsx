"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/auth";
import { GraduationCap } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { users } from "@/lib/data";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();

  const handleLogin = (role: 'student' | 'teacher' | 'admin') => {
    const user = users.find(u => u.role === role);
    if (user) {
      login(user);
      if (role === 'student') {
        router.push('/home');
      } else {
        router.push('/dashboard');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="mx-auto max-w-sm">
        <CardHeader className="text-center">
            <GraduationCap className="mx-auto h-10 w-10 text-primary" />
          <CardTitle className="text-2xl font-headline mt-4">Login to EduVerse</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
            <br />
            <span className="text-xs font-semibold">(This is a simulation)</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                defaultValue="alex.johnson@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" type="password" defaultValue="password" required />
            </div>
            <Button onClick={() => handleLogin('student')} className="w-full">
              Login as Student
            </Button>
             <Button onClick={() => handleLogin('teacher')} variant="secondary" className="w-full">
              Login as Teacher
            </Button>
            <Button variant="outline" className="w-full" onClick={() => handleLogin('student')}>
              Login with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
