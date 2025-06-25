/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { userAuth, useVariables } from "../stores/variables";
import { loginRoute } from "../utils/route";
import Pageloading from "../components/ui/PageLoading";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { initializeAuth, credentials } = userAuth();
  const [isInitialized, setIsInitialized] = useState(false);
  const { reset } = useVariables();
  // reset();

  useEffect(() => {
    reset(); // reset Zustand store whenever pathname changes
  }, [pathname, reset]);

  useEffect(() => {
    initializeAuth();
    setIsInitialized(true);
  }, [initializeAuth]);

  useEffect(() => {
    // Only check credentials after initialization
    if (isInitialized) {
      if (!credentials) {
        router.replace(loginRoute);
      }
    }
  }, [isInitialized, credentials]);

  // Show loading while initializing
  if (!isInitialized) {
    return <Pageloading />;
  }

  // Show loading while redirecting
  if (!credentials) {
    return <Pageloading />;
  }

  return <>{children}</>;
}
