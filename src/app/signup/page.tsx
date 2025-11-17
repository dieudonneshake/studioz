
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Briefcase, Shield } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import { useToast } from "@/hooks/use-toast";
import { curricula } from "@/lib/data";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";


type Role = "student" | "teacher" | "admin";

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<Role | null>(null);
  const router = useRouter();
  const { login } = useAuthStore();
  const { toast } = useToast();

  const handleRoleSelect = (selectedRole: Role) => {
    setRole(selectedRole);
    setStep(2);
  };

  const handleSignup = () => {
    if (role === 'teacher') {
        toast({
            title: "Registration Submitted",
            description: "Your teacher account is pending approval by an administrator.",
        });
        // Here you would typically send data to a backend to create a pending user
        router.push('/login');
        return;
    }
    
    if (role) {
      // Find a pre-existing user of the selected role to log in as.
      const user = useAuthStore.getState().users.find(u => u.role === role && u.status !== 'pending');
      if (user) {
        login(user);
        if (role === 'student') {
          router.push('/home');
        } else {
          router.push('/dashboard');
        }
      }
    }
  };


  const RoleSelection = () => (
    <Card className="mx-auto max-w-sm text-center">
      <CardHeader>
        <Image src="/logo.png" alt="Ederaxy Logo" width={48} height={48} className="mx-auto h-12 w-12" />
        <CardTitle className="text-2xl font-headline mt-4">Join Ederaxy</CardTitle>
        <CardDescription>First, tell us who you are.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <Button variant="outline" className="w-full justify-start py-6" onClick={() => handleRoleSelect('student')}>
            <User className="mr-4 h-6 w-6" />
            <span className="text-lg">I am a Student</span>
          </Button>
          <Button variant="outline" className="w-full justify-start py-6" onClick={() => handleRoleSelect('teacher')}>
            <Briefcase className="mr-4 h-6 w-6" />
             <span className="text-lg">I am a Teacher</span>
          </Button>
           <Button variant="outline" className="w-full justify-start py-6" onClick={() => handleRoleSelect('admin')}>
            <Shield className="mr-4 h-6 w-6" />
             <span className="text-lg">I am an Admin</span>
          </Button>
        </div>
         <div className="mt-6 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Login
            </Link>
          </div>
      </CardContent>
    </Card>
  );

  const SignupForm = () => (
    <Card className="mx-auto max-w-sm">
      <CardHeader className="text-center">
        <Image src="/logo.png" alt="Ederaxy Logo" width={48} height={48} className="mx-auto h-12 w-12" />
        <CardTitle className="text-2xl font-headline mt-4">Create your {role} account</CardTitle>
        <CardDescription>Enter your information to create an account</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="first-name">First name</Label>
              <Input id="first-name" placeholder="Max" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="last-name">Last name</Label>
              <Input id="last-name" placeholder="Robinson" required />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" />
          </div>

          {role === 'teacher' && (
            <>
                <div className="grid gap-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" required />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="subjects">Subject(s)</Label>
                    <Input id="subjects" placeholder="e.g., Physics, History" required />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="grades">Grade Levels</Label>
                    <Input id="grades" placeholder="e.g., Grade 10, A-Level" required />
                </div>
                <div className="grid gap-4">
                    <Label>Curricula</Label>
                    <div className="space-y-2">
                        {curricula.map((curriculum) => (
                            <div key={curriculum.id} className="flex items-center space-x-2">
                                <Checkbox id={`curriculum-${curriculum.id}`} />
                                <Label htmlFor={`curriculum-${curriculum.id}`} className="font-normal">
                                    {curriculum.name}
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>
            </>
          )}

          <Button onClick={handleSignup} type="submit" className="w-full">
            Create an account
          </Button>
          <Button onClick={handleSignup} variant="outline" className="w-full">
            Sign up with Google
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          <Button variant="link" onClick={() => setStep(1)}>
            Back to role selection
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      {step === 1 ? <RoleSelection /> : <SignupForm />}
    </div>
  );
}
