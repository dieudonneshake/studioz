"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { GraduationCap, User, Briefcase, Shield } from "lucide-react";
import Link from "next/link";

type Role = "student" | "teacher" | "admin";

export default function SignupPage() {
  const [role, setRole] = useState<Role | null>(null);

  const RoleSelection = () => (
    <Card className="mx-auto max-w-sm text-center">
      <CardHeader>
        <GraduationCap className="mx-auto h-10 w-10 text-primary" />
        <CardTitle className="text-2xl font-headline mt-4">Join EduVerse</CardTitle>
        <CardDescription>First, tell us who you are.</CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup defaultValue={role ?? undefined} onValueChange={(value) => setRole(value as Role)} className="grid gap-4">
          <Label
            htmlFor="student"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          >
            <RadioGroupItem value="student" id="student" className="sr-only" />
            <User className="mb-3 h-6 w-6" />
            I am a Student
          </Label>
          <Label
            htmlFor="teacher"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          >
            <RadioGroupItem value="teacher" id="teacher" className="sr-only" />
            <Briefcase className="mb-3 h-6 w-6" />
            I am a Teacher
          </Label>
           <Label
            htmlFor="admin"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          >
            <RadioGroupItem value="admin" id="admin" className="sr-only" />
            <Shield className="mb-3 h-6 w-6" />
            I am an Admin
          </Label>
        </RadioGroup>
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
         <GraduationCap className="mx-auto h-10 w-10 text-primary" />
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
          <Button type="submit" className="w-full">
            Create an account
          </Button>
          <Button variant="outline" className="w-full">
            Sign up with Google
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          <Button variant="link" onClick={() => setRole(null)}>
            Back to role selection
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      {role ? <SignupForm /> : <RoleSelection />}
    </div>
  );
}
