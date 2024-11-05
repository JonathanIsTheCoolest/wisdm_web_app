"use client";

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/src/lib/hooks';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/src/app/_lib/firebase/auth/auth';
import { login, logout } from '@/src/lib/features/authSlice';
import { setUser } from '@/src/lib/features/userSlice';
import { RootState } from '@/src/lib/store';

function AuthWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathName = usePathname();

  const currentUser = useAppSelector((state: RootState) => state.user)

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
          current_channel: currentUser.currentChannel ?? user.displayName,
          email: user.email,
          last_post_id: currentUser.lastPostId,
          locality: currentUser.locality,
          num_posts: currentUser.numPosts,
          username: user.displayName
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
