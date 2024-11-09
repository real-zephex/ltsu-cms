"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/components/database/supabaseServer";
import { RawUserMetaData } from "@/types/user-information";

export async function login(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const signInData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { data, error } = await supabase.auth.signInWithPassword(signInData);

  if (error) {
    console.log(error);
    redirect("/error");
  }

  const userData = data.user.user_metadata as RawUserMetaData;

  if (userData && userData.role === "student") {
    redirect("/student-dashboard");
  } else if (userData.role === "teacher") {
    redirect("/teacher-dashboard");
  } else {
    redirect("/dashboard");
  }
}
