import { useState, useEffect } from "react";
import { User } from "firebase/auth";
import { onAuthStateChange, getUserDocument } from "../lib/firebase/auth";

export interface AuthUser extends User {
  role?: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChange(async (user) => {
      if (user) {
        const userDoc = await getUserDocument(user.uid);
        setUser({ ...user, role: userDoc?.role });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, loading };
};
