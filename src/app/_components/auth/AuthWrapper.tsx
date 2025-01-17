"use client";

import { useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/_lib/firebase/auth/auth";
import { login, logout } from "@/lib/features/authSlice";
import { setUser } from "@/lib/features/userSlice";
import { RootState } from "@/lib/store";

function AuthWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathName = usePathname();
  const currentSearchParams = useSearchParams();

  const currentUser = useAppSelector((state: RootState) => state.user)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log('Checking credentials...')

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
          console.log(`Redirecting you to: /dashboard`)
          router.push('/dashboard')
        } else {
          console.log(`Redirecting you to: ${pathName}`)
          router.push(`${pathName}?${currentSearchParams}`);
        }
      } else {
        console.log("None or invalid credentials");
        dispatch(logout());
        console.log(`Redirecting you to: /login`)
        console.log(`Please try signing back in`)
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return children;
}

export default AuthWrapper;
