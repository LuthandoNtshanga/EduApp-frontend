import "../styles/globals.css";

import type { AppProps } from "next/app";
import { AuthProvider } from '../context/AuthContext';
import { UserProvider } from '../context/UserContext'; // ✅ import it
import Navbar from "@/components/common/Navbar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <UserProvider> {/* ✅ wrap here */}
        <Navbar />
        <Component {...pageProps} />
      </UserProvider>
    </AuthProvider>
  );
}

