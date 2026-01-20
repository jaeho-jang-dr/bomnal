"use client";

import { BottomNav } from "@/components/layout/BottomNav";
import { AuthModal } from "@/components/auth/AuthModal";
import { useUIStore } from "@/store/uiStore";

export default function GlobalUI() {
    const isAuthModalOpen = useUIStore((state) => state.isAuthModalOpen);
    const closeAuthModal = useUIStore((state) => state.closeAuthModal);

    return (
        <>
            {isAuthModalOpen && <AuthModal onClose={closeAuthModal} />}
            <BottomNav />
        </>
    );
}
