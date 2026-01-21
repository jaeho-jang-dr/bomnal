"use client";

import React, { useState } from "react";
import {
  signInWithGoogle,
  signInWithEmail,
  registerWithEmail,
  signInWithNaver,
  signInWithKakao,
} from "@/lib/firebase/auth";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";

interface AuthModalProps {
  onClose: () => void;
}

export const AuthModal = ({ onClose }: AuthModalProps) => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    const { user, error } = await signInWithGoogle();
    if (user) {
      onClose();
    } else {
      setError(error || "Google sign-in failed. Please try again.");
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const { user, error } = isRegister
      ? await registerWithEmail(email, password)
      : await signInWithEmail(email, password);

    if (user) {
      onClose();
    } else {
      setError(error || (
        isRegister
          ? "Registration failed. Please try again."
          : "Sign-in failed. Please check your credentials."
      ));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-8 shadow-xl max-w-sm w-full relative">
        <IconButton
          icon="close"
          label="Close"
          onClick={onClose}
          className="absolute top-4 right-4"
        />
        <h2 className="text-2xl font-bold text-center mb-4">
          {isRegister ? "Create Account" : "Welcome Back"}
        </h2>
        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
        <form onSubmit={handleEmailSubmit}>
          <div className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition-colors">
              {isRegister ? "회원가입" : "로그인"}
            </Button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => setIsRegister(!isRegister)}
            className="text-sm text-gray-600 hover:underline"
          >
            {isRegister
              ? "이미 계정이 있으신가요? 로그인"
              : "계정이 없으신가요? 회원가입"}
          </button>
        </div>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">SNS 계정으로 간편 로그인</span>
          </div>
        </div>

        <div className="space-y-3">
          {/* Google Login - Standard Style */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            <span className="font-bold text-blue-500 text-xl">G</span>
            <span>구글로 시작하기</span>
          </button>

          {/* Naver Login - Brand Green */}
          <button
            type="button"
            onClick={async () => {
              const user = await signInWithNaver();
              if (user) onClose();
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#03C75A] text-white font-bold hover:bg-[#02b351] transition-colors"
          >
            <span className="font-black text-xl">N</span>
            <span>네이버로 시작하기</span>
          </button>

          {/* Kakao Login - Brand Yellow */}
          <button
            type="button"
            onClick={async () => {
              const user = await signInWithKakao();
              if (user) onClose();
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#FEE500] text-[#391B1B] font-bold hover:bg-[#fdd835] transition-colors"
          >
            <span className="font-black text-xl">K</span>
            <span>카카오로 시작하기</span>
          </button>
        </div>
      </div>
    </div>
  );
};
