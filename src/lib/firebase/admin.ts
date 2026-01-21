import "server-only";
import * as admin from "firebase-admin";

function formatPrivateKey(key: string) {
    return key.replace(/\\n/g, "\n");
}

export function getAdminApp() {
    if (!admin.apps.length) {
        const projectId = process.env.FIREBASE_PROJECT_ID;
        const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
        const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY;

        if (!projectId || !clientEmail || !privateKey) {
            throw new Error("Missing Firebase Admin credentials in environment variables.");
        }

        admin.initializeApp({
            credential: admin.credential.cert({
                projectId,
                clientEmail,
                privateKey: formatPrivateKey(privateKey),
            }),
        });
        console.log("🔥 Firebase Admin Initialized Successfully");
    }
    return admin.app();
}

export const getAdminAuth = () => getAdminApp().auth();
export const getAdminDb = () => getAdminApp().firestore();
