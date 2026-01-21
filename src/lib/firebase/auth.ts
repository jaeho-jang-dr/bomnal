import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
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
  const clientId = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID || "gYF4YEC_WRYJzM0Nyrbu";
  const redirectUri = "http://localhost:3001/login/callback"; // 127.0.0.1 대신 localhost로 고정
  const state = Math.random().toString(36).substring(7);

  // 설정 확인을 위한 알림 (문제가 해결되면 삭제하세요)
  if (typeof window !== 'undefined') {
    alert(`[네이버 설정 점검]\n\nClient ID: ${clientId}\nCallback URL: ${redirectUri}\n\n이 두 가지가 네이버 개발자 센터에 정확히 등록되어 있어야 합니다.`);
  }

  // Use URLSearchParams for correct encoding
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    redirect_uri: redirectUri,
    state: state,
    auth_type: 'reauthenticate' // 강제 재로그인 옵션
  });

  const naverAuthUrl = `https://nid.naver.com/oauth2.0/authorize?${params.toString()}`;

  return new Promise((resolve, reject) => {
    const width = 500;
    const height = 600;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    const popup = window.open(
      naverAuthUrl,
      "naverlogin",
      `width=${width},height=${height},left=${left},top=${top}`
    );

    if (!popup) {
      reject(new Error("팝업이 차단되었습니다. 팝업 차단을 해제해주세요."));
      return;
    }

    // Message listener for popup communication
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;

      if (event.data.type === "NAVER_LOGIN_SUCCESS") {
        window.removeEventListener("message", handleMessage);
        // Get the current user after successful login
        const user = auth.currentUser;
        resolve(user as User);
      }
    };

    window.addEventListener("message", handleMessage);

    // Check if popup is closed manually
    const checkPopup = setInterval(() => {
      if (!popup || popup.closed) {
        clearInterval(checkPopup);
        window.removeEventListener("message", handleMessage);
        // We reject here, but we should check if user is logged in
        if (auth.currentUser) {
          resolve(auth.currentUser);
        } else {
          reject(new Error("로그인 창이 닫혔습니다."));
        }
      }
    }, 1000);
  });
};

export const signInWithKakao = async () => {
  // Configured ID: oidc.oidc.kakao
  const providerId = 'oidc.oidc.kakao';
  const provider = new OAuthProvider(providerId);
  provider.addScope('openid');
  provider.setCustomParameters({
    prompt: 'login' // Force re-login
  });

  try {
    console.log(`Starting Kakao login with provider: ${providerId}`);
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Check/Create User Doc
    const userDoc = await getUserDocument(user.uid);
    if (!userDoc) {
      await setDoc(doc(firestore, "users", user.uid), {
        email: user.email,
        role: "user",
        provider: "kakao",
        createdAt: new Date()
      });
    }
    return user;
  } catch (error: any) {
    console.error("Kakao Login Error:", error);

    if (error.code === 'auth/operation-not-allowed') {
      const msg = `카카오 로그인이 활성화되지 않았습니다. Provider ID '${providerId}' 설정을 확인하세요.`;
      alert(msg);
      throw new Error(msg);
    } else if (error.code === 'auth/popup-closed-by-user') {
      throw new Error('로그인 창이 닫혔습니다.');
    } else {
      throw new Error(`카카오 로그인 실패: ${error.message}`);
    }
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
