
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Briefcase, Shield, Check, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth, useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, collection } from "firebase/firestore";
import { type Curriculum } from "@/lib/types";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

type Role = "student" | "teacher" | "admin";

const PasswordStrengthIndicator = ({ strength, criteria }: { strength: number, criteria: any }) => {
    return (
        <div className="space-y-2">
            <Progress value={strength} className="h-2" />
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                <div className={cn("flex items-center gap-2", criteria.length ? 'text-green-600' : 'text-muted-foreground')}>
                    {criteria.length ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                    <span>At least 8 characters</span>
                </div>
                <div className={cn("flex items-center gap-2", criteria.number ? 'text-green-600' : 'text-muted-foreground')}>
                    {criteria.number ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                    <span>At least one number</span>
                </div>
                <div className={cn("flex items-center gap-2", criteria.specialChar ? 'text-green-600' : 'text-muted-foreground')}>
                    {criteria.specialChar ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                    <span>At least one special character</span>
                </div>
                 <div className={cn("flex items-center gap-2", criteria.match ? 'text-green-600' : 'text-muted-foreground')}>
                    {criteria.match ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                    <span>Passwords match</span>
                </div>
            </div>
        </div>
    );
};


export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<Role | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    number: false,
    specialChar: false,
    match: false
  });

  const router = useRouter();
  const auth = useAuth();
  const firestore = useFirestore();
  const { toast } = useToast();

  const curriculaQuery = useMemoFirebase(() => collection(firestore, 'curricula'), [firestore]);
  const { data: curricula } = useCollection<Curriculum>(curriculaQuery);
  
  useEffect(() => {
    const hasLength = password.length >= 8;
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const doPasswordsMatch = password !== "" && password === confirmPassword;

    let strength = 0;
    if (hasLength) strength += 25;
    if (hasNumber) strength += 25;
    if (hasSpecialChar) strength += 25;
    if (doPasswordsMatch) strength += 25;
    
    setPasswordStrength(strength);
    setPasswordCriteria({
      length: hasLength,
      number: hasNumber,
      specialChar: hasSpecialChar,
      match: doPasswordsMatch
    });

  }, [password, confirmPassword]);

  const handleRoleSelect = (selectedRole: Role) => {
    setRole(selectedRole);
    setStep(2);
  };

  const handleSignup = async () => {
    if (!role) return;

    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Signup Failed",
        description: "Passwords do not match.",
      });
      return;
    }
    
    if (passwordStrength < 100) {
       toast({
        variant: "destructive",
        title: "Signup Failed",
        description: "Please ensure your password meets all the requirements.",
      });
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      const fullName = `${firstName} ${lastName}`;
      await updateProfile(user, { displayName: fullName });

      // Create a user document in Firestore
      await setDoc(doc(firestore, "users", user.uid), {
        id: user.uid,
        name: fullName,
        email: user.email,
        role: role,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: role === 'teacher' ? 'pending' : 'approved',
        profilePhoto: `https://avatar.vercel.sh/${user.email}.png`,
        bio: '',
      });

      if (role === 'teacher') {
          toast({
              title: "Registration Submitted",
              description: "Your teacher account is pending approval by an administrator.",
          });
          router.push('/login');
      } else {
        if (role === 'student') {
          router.push('/home');
        } else { // admin
          router.push('/admin/dashboard');
        }
      }
    } catch(error: any) {
        console.error("Signup error:", error);
        toast({
            variant: "destructive",
            title: "Signup Failed",
            description: error.message || "An unexpected error occurred.",
        });
    }
  };


  const RoleSelection = () => (
    <Card className="mx-auto max-w-sm text-center">
      <CardHeader>
        <Image src="/Ederaxy1.png" alt="Ederaxy Logo" width={80} height={80} className="mx-auto h-20 w-20" />
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
        <Image src="/Ederaxy1.png" alt="Ederaxy Logo" width={80} height={80} className="mx-auto h-20 w-20" />
        <CardTitle className="text-2xl font-headline mt-4">Create your {role} account</CardTitle>
        <CardDescription>Enter your information to create an account</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="first-name">First name</Label>
              <Input id="first-name" placeholder="Max" required value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="last-name">Last name</Label>
              <Input id="last-name" placeholder="Robinson" required value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
           <div className="grid gap-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input id="confirm-password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>

          <PasswordStrengthIndicator strength={passwordStrength} criteria={passwordCriteria} />


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
                        {curricula?.map((curriculum) => (
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

          <Button onClick={handleSignup} type="submit" className="w-full" disabled={passwordStrength < 100}>
            Create an account
          </Button>
          <Button variant="outline" className="w-full" onClick={() => toast({ title: "Coming soon!"})}>
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
      <>{step === 1 ? <RoleSelection /> : <SignupForm />}</>
  );
}

    