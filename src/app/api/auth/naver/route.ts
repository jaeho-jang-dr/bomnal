import { NextRequest, NextResponse } from "next/server";
import { getAdminAuth, getAdminDb } from "@/lib/firebase/admin";

export async function POST(req: NextRequest) {
    try {
        const { code, state } = await req.json();

        if (!code) {
            return NextResponse.json({ error: "No code provided" }, { status: 400 });
        }

        const clientId = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID;
        const clientSecret = process.env.NAVER_CLIENT_SECRET;

        // 1. Get Access Token from Naver
        const tokenUrl = `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${clientId}&client_secret=${clientSecret}&code=${code}&state=${state}`;

        const tokenResponse = await fetch(tokenUrl);
        const tokenData = await tokenResponse.json();

        if (tokenData.error) {
            console.error("Naver Token Error:", tokenData);
            return NextResponse.json({ error: tokenData.error_description }, { status: 400 });
        }

        const accessToken = tokenData.access_token;

        // 2. Get User Profile from Naver
        const profileResponse = await fetch("https://openapi.naver.com/v1/nid/me", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const profileData = await profileResponse.json();

        if (profileData.resultcode !== "00") {
            console.error("Naver Profile Error:", profileData);
            return NextResponse.json({ error: "Failed to fetch user profile" }, { status: 400 });
        }

        const naverUser = profileData.response;
        const uid = `naver:${naverUser.id}`;
        const email = naverUser.email;
        const name = naverUser.name || naverUser.nickname;
        const photoURL = naverUser.profile_image;

        const adminAuth = getAdminAuth();
        const adminDb = getAdminDb();

        // 3. Create or Update User in Firebase
        try {
            await adminAuth.updateUser(uid, {
                email,
                displayName: name,
                photoURL,
                emailVerified: true,
            });
        } catch (error: any) {
            if (error.code === "auth/user-not-found") {
                await adminAuth.createUser({
                    uid,
                    email,
                    displayName: name,
                    photoURL,
                    emailVerified: true,
                });
            } else {
                throw error;
            }
        }

        // 4. Update Firestore User Document
        await adminDb.collection("users").doc(uid).set({
            email,
            name,
            photoURL,
            provider: "naver",
            role: "user",
            lastLogin: new Date().toISOString(),
        }, { merge: true });

        // 5. Generate Custom Token
        const customToken = await adminAuth.createCustomToken(uid);

        return NextResponse.json({ token: customToken });

    } catch (error: any) {
        console.error("Auth Error:", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}
