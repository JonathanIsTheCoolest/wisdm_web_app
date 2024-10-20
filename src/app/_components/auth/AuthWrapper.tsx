"use client";

// System Imports
import { useEffect } from "react";
import { useRouter } from "next/navigation";

// API/Database Imports
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/_lib/firebase/auth/auth";
import { useAppDispatch } from "@/lib/hooks";
import { login, logout } from "@/lib/features/authSlice";

function AuthWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Checking for credentials...");
      if (user) {
        console.log("Logging in");
        dispatch(
          login({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          })
        );
        router.push("/pages/dashboard");
      } else {
        console.log("None or invalid credentials");
        dispatch(logout());
        router.push("/pages/login");
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return children;
}

export default AuthWrapper;
