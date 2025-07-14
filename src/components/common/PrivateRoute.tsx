import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login"); // redirect to login if not authenticated
    }
  }, [user, router]);

  if (!user) return null; // Or loading spinner if you want

  return <>{children}</>;
} 