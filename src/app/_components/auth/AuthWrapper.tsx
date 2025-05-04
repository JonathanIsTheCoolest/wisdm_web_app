"use client";

import { useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux_lib/hooks";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/_lib/firebase/auth/auth";
import { login, logout } from "@/redux_lib/features/authSlice";
import { setUser } from "@/redux_lib/features/userSlice";
import { setSignupState } from "@/redux_lib/features/signupSlice";
import { RootState } from "@/redux_lib/store";
import { apiHTTPWrapper } from "@/redux_lib/features/authSlice";
import { standardizePersonalRoomName } from "@/app/_lib/user/name/general";

function AuthWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathName = usePathname();
  const currentSearchParams = useSearchParams();

  const currentUser = useAppSelector((state: RootState) => state.user);
  const signupInfo = useAppSelector((state) => state.signup);

  const fetchUserDataFromDB = async (idToken?: string) => {
    const getUserEndpoint = `${process.env.NEXT_PUBLIC_BASE_API_URL}/users/get/user`;
    try {
      const user = await dispatch(
        apiHTTPWrapper({
          url: getUserEndpoint,
          options: {
            method: "GET",
          },
          idToken: idToken,
        })
      );

      return await user.payload;
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("Checking credentials...");

      if (user) {
        const idToken = await user.getIdToken();

        dispatch(
          login({
            idToken: idToken,
          })
        );

        const user_data = await fetchUserDataFromDB();
        const personalChannelName = standardizePersonalRoomName(user_data.username) || ''
        dispatch(
          setUser({
            photo_url: user_data.photo_url,
            current_channel: currentUser.current_channel ?? personalChannelName,
            email: user_data.email,
            locality: user_data.locality,
            username: user_data.username,
            name: user_data.name,
            gender: user_data.gender,
            created_at: user_data.created_at,
            last_sign_in_time: user_data.last_sign_in_time,
            disabled: user_data.disabled,
            partial_data: user_data.partial_data
          })
        );
        if (user_data.partial_data) {
          console.log(`Great Let's finish signing you up!`);
          if (user_data.name) {
            dispatch(
              setSignupState({
                ...signupInfo,
                personalInfo: {
                  ...signupInfo.personalInfo,
                  name: user_data.name,
                },
              })
            );
          }
          router.push("/login/signup/personal");
        } else if (!pathName?.includes("dashboard")) {
          console.log(`Redirecting you to: /dashboard`);
          router.push("/dashboard");
        } else {
          console.log(`Redirecting you to: ${pathName}`);
          router.push(`${pathName}?${currentSearchParams}`);
        }
      } else {
        console.log("None or invalid credentials");
        dispatch(logout());
        console.log(`Redirecting you to: /login`);
        console.log(`Please try signing back in`);
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return children;
}

export default AuthWrapper;
