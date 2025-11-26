
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/firebase";
import { users } from "@/lib/data";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState }from "react";
import { useToast } from "@/hooks/use-toast";


export default function LoginPage() {
  const router = useRouter();
  const auth = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState("alex.johnson@example.com");
  const [password, setPassword] = useState("password");


  const handleLogin = async (role: 'student' | 'teacher' | 'admin') => {
    // In a real app, you'd use different emails for different roles.
    // Here we simulate it for demonstration.
    const userAccount = users.find(u => u.role === role && u.status !== 'pending');
    
    if (!userAccount) {
        toast({ variant: "destructive", title: "Login Failed", description: "No user found for this role." });
        return;
    }

    try {
        await signInWithEmailAndPassword(auth, userAccount.email, "password"); // Assuming password is 'password' for all mock users
        
        if (role === 'student') {
            router.push('/home');
        } else if (role === 'teacher') {
            router.push('/dashboard');
        } else if (role === 'admin') {
            router.push('/admin/dashboard');
        }

    } catch (error: any) {
        console.error("Firebase login error:", error);
        toast({
            variant: "destructive",
            title: "Login Failed",
            description: error.message || "An unexpected error occurred.",
        });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="mx-auto max-w-sm">
        <CardHeader className="text-center">
            <Image src="/Ederaxy1.png" alt="Ederaxy Logo" width={80} height={80} className="mx-auto h-20 w-20" />
            <CardTitle className="text-2xl font-headline mt-4">Login to Ederaxy</CardTitle>
            <CardDescription>
            Select a role to sign in.
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              <Input 
                id="password" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
               />
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
