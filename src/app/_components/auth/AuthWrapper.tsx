"use client";

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAppDispatch } from '@/lib/hooks';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/app/_lib/firebase/auth/auth';
import { login, logout } from '@/lib/features/authSlice';
import { setUser } from '@/lib/features/userSlice';

function AuthWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log('Checking credentials...')
      console.log(pathName)
      
      if (user) {
        dispatch(login({
          idToken: await user.getIdToken()
        }));
        dispatch(setUser({
          avatar: user.photoURL,
          current_channel: null,
          email: user.email,
          last_post_id: null,
          locality: null,
          num_posts: null,
          user_name: user.displayName
        }))
        if (!pathName?.includes('dashboard')) {
          router.push('/dashboard')
        } else {
          router.push(pathName)
        }
      } else {
        console.log("None or invalid credentials");
        dispatch(logout());
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return children;
}

export default AuthWrapper;
