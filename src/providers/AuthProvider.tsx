"use client";
import { useEffect } from "react";
import { userAuth } from "../stores/variables";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { initializeAuth } = userAuth();

//   console.log(credentials);

  useEffect(() => {
    // Initialize auth state on app load
    initializeAuth();
  }, [initializeAuth]);

  return <>{children}</>;
}
