"use server";

import { lucia, validateRequest } from "@/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
    const {session} = await validateRequest();

    if(!session){
        return new Error("Not Authrorized");
    }

    await lucia.invalidateSession(session.id);
    const sessionCoolie = lucia.createBlankSessionCookie();
    (await cookies()).set(
        sessionCoolie.name,
        sessionCoolie.value,
        sessionCoolie.attributes,
    );
    return redirect("/login");
}