import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
  // Authentication temporarily disabled
  return <>{children}</>;
} 