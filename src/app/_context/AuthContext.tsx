"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { getUserProfileFromToken } from "../actions/auth";
import { usePathname } from "next/navigation";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  useEffect(() => {
    (async () => {
      try {
        const user = await getUserProfileFromToken();
        setUser(user);
      } catch {
        setUser(null);
      }
      // }
      setLoading(false);
    })();
  }, [pathname]);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
