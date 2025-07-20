import { Metadata } from "next";
import Image from "next/image";
import React from "react";
import signupImage from "@/assets/signup-image.jpg";
import Link from "next/link";
import SignUpForm from "./SignUpForm";

export const metadata: Metadata = {
  title: "Sign Up",
};

const Page = () => {
  return (
    <main className="flex h-screen items-center justify-center p-5">
      <div className="max-h[40rem] bg-card flex h-full w-full max-w-[64rem] overflow-hidden rounded-2xl shadow-2xl">
        <div className="w-full space-y-10 overflow-y-auto p-10 md:w-1/2">
          <div className="space-y-1 text-center">
            <h1 className="text-3xl font-bold">Sign Up to Benbook</h1>
            <p className="text-muted-foreground">
              A Space where even <span className="italic">You</span> can find a
              friend
            </p>
          </div>
          <div className="space-y-5">
            <SignUpForm />
            <Link href="/login" className="block text-center hover:underline">
              Already have an account? Login
            </Link>
          </div>
        </div>
        <Image
          src={signupImage}
          alt="signup"
          className="hidden w-1/2 object-cover md:block"
          priority
        />
      </div>
    </main>
  );
};

export default Page;
