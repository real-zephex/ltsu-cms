import { createClient } from "../supabaseServer";

// Student logs in with their email and password (password here is the admission number)
export async function signup(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  // const password = formData.get("password") as string;
  const name = formData.get("name") as string;
  const phone = formData.get("phone") as string;
  const dob = formData.get("dob") as string;
  const admissionNo = formData.get("admissionNo") as string;
  const course = formData.get("course") as string;
  const enrolledDate = formData.get("enrolledDate") as string;
  const gender = formData.get("gender") as string;
  const access = formData.get("access") as string;

  const data = {
    email,
    password: admissionNo,
    options: {
      data: {
        name,
        phone,
        dob,
        admNo: admissionNo,
        course,
        enrolled: enrolledDate,
        gender,
        access,
      },
    },
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    console.log(error);
    return false;
  }

  return true;
}
