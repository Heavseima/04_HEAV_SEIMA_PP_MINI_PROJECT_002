"use server";

import { registerService } from "../service/authService";
import { signIn, signOut } from "../auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export const loginWithGithub = async () => {
  await signIn("github", { redirectTo: "/" });
};

export const logout = async () => {
  await signOut({ redirectTo: "/" });
};

export async function loginAction(data) {
  const { email, password } = data;
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return { success: true };

  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.log(error.message);
    return { error: error.message };
  }
}

export const registerAction = async (data) => {
  try {
    await registerService(data);
    return { success: true };
  } catch (error) {
    if (isRedirectError(error)) throw error;
    return { error: error.message };
  }
};
