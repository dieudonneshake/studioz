
"use client";
import { Toaster } from "@/components/ui/toaster";
import { useUser, useFirestore } from "@/firebase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (isUserLoading) return;

    if (!user) {
      router.push('/login');
      return;
    }

    const checkAdminRole = async () => {
      const userDocRef = doc(firestore, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists() && userDoc.data().role === 'admin') {
        setIsAuthorized(true);
      } else {
        router.push('/home'); // Or a dedicated 'unauthorized' page
      }
    };

    checkAdminRole();
  }, [user, isUserLoading, firestore, router]);

  if (isUserLoading || !isAuthorized) {
    return (
        <div className="flex h-screen items-center justify-center">
            <div className="space-y-4 w-full p-8">
                <Skeleton className="h-12 w-1/4" />
                <Skeleton className="h-96 w-full" />
            </div>
        </div>
    );
  }

  return (
    <>
      {children}
      <Toaster />
    </>
  );
}
