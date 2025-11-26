
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth, useFirestore } from "@/firebase";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { doc, getDoc } from "firebase/firestore";


export default function LoginPage() {
  const router = useRouter();
  const auth = useAuth();
  const firestore = useFirestore();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const handleLogin = async () => {
    setIsLoading(true);
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const userDocRef = doc(firestore, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
            const userData = userDoc.data();
            if (userData.role === 'admin') {
                router.push('/admin/dashboard');
            } else if (userData.role === 'teacher') {
                router.push('/dashboard');
            } else {
                router.push('/home');
            }
        } else {
            // Default redirect if no role found
            router.push('/home');
        }

    } catch (error: any) {
        console.error("Firebase login error:", error);
        toast({
            variant: "destructive",
            title: "Login Failed",
            description: error.code === 'auth/invalid-credential' 
                ? "Invalid email or password."
                : error.message || "An unexpected error occurred.",
        });
    } finally {
        setIsLoading(false);
    }
  };

  return (
      <Card className="mx-auto max-w-sm">
        <CardHeader className="text-center">
            <Image src="/Ederaxy1.png" alt="Ederaxy Logo" width={80} height={80} className="mx-auto h-20 w-20" />
            <CardTitle className="text-2xl font-headline mt-4">Login to Ederaxy</CardTitle>
            <CardDescription>
            Enter your credentials to sign in.
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
                disabled={isLoading}
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
                disabled={isLoading}
               />
            </div>
            <Button onClick={handleLogin} className="w-full" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
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
  );
}
