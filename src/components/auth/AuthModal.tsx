"use client";

import React, { useState } from "react";
import {
  signInWithGoogle,
  signInWithEmail,
  registerWithEmail,
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
            <Button type="submit" className="w-full">
              {isRegister ? "Register" : "Sign In"}
            </Button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-sm text-gray-600 hover:underline"
          >
            {isRegister
              ? "Already have an account? Sign In"
              : "Don't have an account? Register"}
          </button>
        </div>
        <div className="flex items-center my-6">
          <hr className="flex-grow" />
          <span className="mx-4 text-sm text-gray-500">OR</span>
          <hr className="flex-grow" />
        </div>
        <Button
          onClick={handleGoogleSignIn}
          className="w-full bg-blue-500 hover:bg-blue-600"
        >
          Sign In with Google
        </Button>
      </div>
    </div>
  );
};
