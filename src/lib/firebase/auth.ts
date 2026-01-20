import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
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
  [key: string]: any;
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

// Sign in with Google and create user document
export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
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
  } catch (error) {
    console.error("Error signing in with Google: ", error);
    return { user: null, error: (error as Error).message };
  }
};

// Sign in with email and password
export const signInWithEmail = async (email: string, password: string) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return { user: result.user, error: null };
  } catch (error) {
    console.error("Error signing in with email: ", error);
    return { user: null, error: (error as Error).message };
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
  } catch (error) {
    console.error("Error registering with email: ", error);
    return { user: null, error: (error as Error).message };
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
