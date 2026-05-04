"use server";

import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export async function register(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!name || !email || !password) {
      return { error: "Missing required fields" };
    }

    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: "Email already in use" };
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const colors = ["#8B5CF6", "#3B82F6", "#10B981", "#F59E0B", "#EC4899", "#6366F1"];
    const profileColor = colors[Math.floor(Math.random() * colors.length)];

    await db.user.create({
      data: {
        name,
        email,
        passwordHash,
        profileColor,
      },
    });

    return { success: "Account created successfully! You can now log in." };
  } catch (error: any) {
    console.error("Registration Error:", error);
    return { error: error?.message || "An unexpected error occurred during database setup." };
  }
}

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials." };
        default:
          return { error: "Something went wrong." };
      }
    }
    // Don't re-throw NEXT_REDIRECT errors
    throw error;
  }

  // Redirect after successful sign-in
  redirect("/dashboard");
}
