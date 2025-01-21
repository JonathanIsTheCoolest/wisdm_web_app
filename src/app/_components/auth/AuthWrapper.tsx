"use client";

import { useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/_lib/firebase/auth/auth";
import { login, logout } from "@/lib/features/authSlice";
import { setUser } from "@/lib/features/userSlice";
import { RootState } from "@/lib/store";
import { apiHTTPWrapper } from "@/lib/features/authSlice";

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

  const fetchUserDataFromDB = async (idToken?: string) => {
    const getUserEndpoint = `${process.env.NEXT_PUBLIC_BASE_API_URL}/users/get/user`
    try {
      const user = await dispatch(
        apiHTTPWrapper({
          url: getUserEndpoint,
          options: {
            method: 'GET'
          },
          idToken: idToken
        })
      )

      return await user.payload
    } catch(error) {
      return error
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log('Checking credentials...')

      if (user) {
        const idToken = await user.getIdToken()

        dispatch(login({
          idToken: idToken
        }));
        const user_data = await fetchUserDataFromDB()
        dispatch(setUser({
          photo_url: user_data.photo_url,
          current_channel: currentUser.current_channel ?? user_data.name,
          email: user_data.email,
          locality: user_data.locality,
          username: user_data.username,
          name: user_data.name,
          gender: user_data.gender,
          created_at: user_data.created_at,
          last_sign_in_time: user_data.last_sign_in_time,
          disabled: user_data.disabled,
          partial_data: user_data.partial_data
        }))
        if (user_data.partial_data) {
          console.log(`Great Let's finish signing you up!`)
          router.push('/login/signup/personal')
        } else if (!pathName?.includes('dashboard')) {
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