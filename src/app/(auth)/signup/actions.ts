"use server";

import { lucia } from "@/auth";
import { prisma } from "@/lib/prisma";
import { signupSchema, SignUpValues } from "@/lib/validation";
import { hash } from "@node-rs/argon2";
import { generateIdFromEntropySize } from "lucia";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signup(
  credentials: SignUpValues,
): Promise<{ error: string }> {
  try {
    const { userName, password, email } = signupSchema.parse(credentials);
    const passwordHash = await hash(password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 64,
      parallelism: 1,
    });

    const userId = generateIdFromEntropySize(10);
    const existingUserName = await prisma.user.findFirst({
      where: {
        username: {
          equals: userName,
          mode: "insensitive",
        },
      },
    });

    if (existingUserName) {
      return { error: "Username already exists" };
    }
    const existingEmail = await prisma.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: "insensitive",
        },
      },
    });
    if (existingEmail) {
      return { error: "Email already takens" };
    }

    await prisma.user.create({
      data: {
        id: userId,
        username: userName,
        displayName: userName,
        email,
        passwordHash,
      },
    });

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    (await cookies()).set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
    return redirect("/");
  } catch (error) {
    console.log("error signup  ----", error);
    if (isRedirectError(error)) throw error;
    return { error: "Something went wrong" };
  }
}
