"use client";

import { useAuth } from "@/context/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function layout({ children }) {
  const { user } = useAuth();
  const router = useRouter();
  const app_url = process.env.NEXT_PUBLIC_APP_URL;

  useEffect(() => {
    if (user) {
      router.push(app_url);
    }
  }, [user]);

  return children;
}
