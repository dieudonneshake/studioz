
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/auth";
import { users } from "@/lib/data";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";


export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();

  const handleLogin = (role: 'student' | 'teacher' | 'admin') => {
    // Find an approved user for the selected role for login simulation
    const user = users.find(u => u.role === role && u.status !== 'pending');
    if (user) {
      login(user);
      if (role === 'student') {
        router.push('/home');
      } else if (role === 'teacher') {
        router.push('/dashboard');
      }
      else if (role === 'admin') {
        router.push('/admin/dashboard');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="mx-auto max-w-sm">
        <CardHeader className="text-center">
            <Image src="/Ederaxy.png" alt="Ederaxy Logo" width={48} height={48} className="mx-auto h-12 w-12" />
            <CardTitle className="text-2xl font-headline mt-4">Login to Ederaxy</CardTitle>
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
            <div className="grid grid-cols-2 gap-2">
                <Button onClick={() => handleLogin('student')} className="w-full">
                Login as Student
                </Button>
                <Button onClick={() => handleLogin('teacher')} variant="secondary" className="w-full">
                Login as Teacher
                </Button>
            </div>
             <Button onClick={() => handleLogin('admin')} variant="outline" className="w-full">
              Login as Admin
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
