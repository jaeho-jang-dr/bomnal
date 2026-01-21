import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  OAuthProvider,
} from "firebase/auth";
import { auth, firestore } from "./config";
import {
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
} from "firebase/firestore";

// Define User Data Interface
export interface UserData {
  uid: string;
  email?: string;
  role?: string;
  [key: string]: unknown;
}

// Get user document from Firestore
export const getUserDocument = async (uid: string): Promise<UserData | null> => {
  if (!uid) return null;
  try {
    const userDocRef = doc(firestore, `users/${uid}`);
    const userDoc = await getDoc(userDocRef);
    return userDoc.exists() ? { uid, ...userDoc.data() } as UserData : null;
  } catch (error) {
    console.error("Error fetching user document: ", error);
    return null;
  }
};

// Get all users from Firestore
export const getAllUsers = async () => {
  try {
    const usersCollection = collection(firestore, "users");
    const userSnapshot = await getDocs(usersCollection);
    const userList = userSnapshot.docs.map((doc) => ({
      uid: doc.id,
      ...doc.data(),
    }));
    return userList;
  } catch (error) {
    console.error("Error fetching users: ", error);
    return [];
  }
};

// Update user role
export const updateUserRole = async (uid: string, role: string) => {
  try {
    const userDocRef = doc(firestore, "users", uid);
    // Use setDoc with merge: true to create the document if it doesn't exist
    await setDoc(userDocRef, { role, email: auth.currentUser?.email }, { merge: true });
  } catch (error) {
    console.error("Error updating user role: ", error);
    throw error; // Re-throw so UI can catch it
  }
};

export const signInWithNaver = async () => {
  const provider = new OAuthProvider('oidc.oidc.naver');
  provider.addScope('openid');
  provider.addScope('profile');
  provider.addScope('email');
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Check/Create User Doc
    const userDoc = await getUserDocument(user.uid);
    if (!userDoc) {
      await setDoc(doc(firestore, "users", user.uid), {
        email: user.email,
        role: "user",
        provider: "naver"
      });
    }
    return user;
  } catch (error: any) {
    console.error("Naver Login Error:", error);
    if (error.code === 'auth/operation-not-allowed') {
      alert("네이버 로그인이 활성화되지 않았습니다. Firebase ID가 'oidc.oidc.naver'인지 확인해주세요.");
    } else {
      alert(`로그인 실패: ${error.message}`);
    }
    throw error;
  }
};

export const signInWithKakao = async () => {
  const provider = new OAuthProvider('oidc.oidc.kakao');
  provider.addScope('openid');
  provider.addScope('profile');
  provider.addScope('email');
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Check/Create User Doc
    const userDoc = await getUserDocument(user.uid);
    if (!userDoc) {
      await setDoc(doc(firestore, "users", user.uid), {
        email: user.email,
        role: "user",
        provider: "kakao"
      });
    }
    return user;
  } catch (error: any) {
    console.error("Kakao Login Error:", error);
    if (error.code === 'auth/operation-not-allowed') {
      alert("카카오 로그인이 활성화되지 않았습니다. Firebase ID가 'oidc.oidc.kakao'인지 확인해주세요.");
    } else {
      alert(`로그인 실패: ${error.message}`);
    }
    throw error;
  }
};

// Sign in with Google and create user document
export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  // Force account selection to prevent "immediate" sign-in if already logged in
  provider.setCustomParameters({
    prompt: 'select_account'
  });

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Create user document if it doesn't exist
    const userDoc = await getUserDocument(user.uid);
    if (!userDoc) {
      await setDoc(doc(firestore, "users", user.uid), {
        email: user.email,
        role: user.email === "drjang00@gmail.com" ? "admin" : "user",
      });
    } else if (user.email === "drjang00@gmail.com" && userDoc.role !== "admin") {
      // Upgrade existing user to admin if email matches
      await setDoc(doc(firestore, "users", user.uid), { role: "admin" }, { merge: true });
    }

    return { user, error: null };
  } catch (error: unknown) {
    console.error("Error signing in with Google: ", error);
    const errorMessage = error instanceof Error ? error.message : 'An error occurred';
    return { user: null, error: errorMessage };
  }
};

// Sign in with email and password
export const signInWithEmail = async (email: string, password: string) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return { user: result.user, error: null };
  } catch (error: unknown) {
    console.error("Error signing in with email: ", error);
    const errorMessage = error instanceof Error ? error.message : 'An error occurred';
    return { user: null, error: errorMessage };
  }
};

// Register with email and password and create user document
export const registerWithEmail = async (email: string, password: string) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const user = result.user;
    // Create user document
    await setDoc(doc(firestore, "users", user.uid), {
      email: user.email,
      role: "user",
    });
    return { user, error: null };
  } catch (error: unknown) {
    console.error("Error registering with email: ", error);
    const errorMessage = error instanceof Error ? error.message : 'An error occurred';
    return { user: null, error: errorMessage };
  }
};

// Sign out
export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out: ", error);
  }
};

// Auth state observer
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};
