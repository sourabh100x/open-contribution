// pages/auth/signin.tsx

"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const SignInPage: React.FC = () => {
  const router = useRouter();

  const handleSignIn = async () => {
    await signIn("google", {
      callbackUrl: "/find", // Redirect after successful sign-in
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md text-center w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Sign In</h2>
        <p className="text-gray-600 mb-4">Sign in with your Google account to continue</p>
        <button
          onClick={handleSignIn}
          className="px-6 py-3 w-full text-white bg-blue-500 rounded-md hover:bg-blue-600 transition"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default SignInPage;
