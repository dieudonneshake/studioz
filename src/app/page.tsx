"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useFirestore } from '@/firebase';

export default function RootPage() {
  const router = useRouter();
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();

  useEffect(() => {
    if (isUserLoading) return;

    const checkUserRole = async () => {
      if (user) {
        const userDocRef = doc(firestore, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          if(userData.role === 'student'){
            router.replace('/home');
          } else { // teacher or admin
            router.replace('/dashboard');
          }
        } else {
            // Default redirect if user doc doesn't exist for some reason
            router.replace('/home');
        }
      } else {
        router.replace('/home');
      }
    };

    checkUserRole();
  }, [user, isUserLoading, router, firestore]);

  return (
    <div className="flex h-screen items-center justify-center">
      <p>Loading...</p>
    </div>
  );
}
