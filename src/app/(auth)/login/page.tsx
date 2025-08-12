import React from "react";
import LoginForm from "./LoginForm";
import Link from "next/link";
import Image from "next/image";
import loginImage from "@/assets/login-image.jpg";
const metadata = {
  title: "Login",
  description: "Login page for the application",
};

const page = () => {
  return (
    <main className="flex h-screen items-center justify-center p-5">
      <div className="max-h-[40rem] bg-card flex h-full w-full max-w-[64rem] overflow-hidden rounded-2xl shadow-2xl">
        <div className="w-full space-y-10 overflow-y-auto p-10 md:w-1/2">
          <h1 className="text-3xl font-bold">Login to Benbook</h1>
          <div className="space-y-5">
            <LoginForm />
            <Link href="/signup" className="block text-center hover:underline">
              Don't have an account? Sign up
            </Link>
          </div>
        </div>
        <Image src={loginImage} alt="" className="hidden w-1/2 object-cover md:block" />
      </div>
    </main>
  );
};

export default page;
