"use server";

import {
  createClient,
  adminAuthClient,
} from "@/components/database/supabaseServer";
import { revalidatePath } from "next/cache";

export async function Courses(
  type: "courses" | "classes" | "students" | "teachers"
) {
  const supabase = await createClient();
  const { data, error } = await supabase.from(type).select("*");

  if (error) {
    console.log("Some error occurred:", error);
    return {
      status: false,
      data: null,
      length: 0,
    };
  }

  return {
    status: true,
    data: data,
    length: data.length,
  };
}

export async function WriteData(
  formData: FormData,
  type: "courses" | "classes" | "students" | "teachers"
) {
  const supabase = await createClient();

  switch (type) {
    case "students":
      try {
        console.log("Initiating students....");

        const student_id = formData.get("stuId") as string;
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const phone = formData.get("phone") as string;
        const dob = formData.get("dob") as string;
        const address = formData.get("address") as string;
        const enrollment_date = formData.get("enrollDate") as string;
        const class_id = formData.get("classId") as string;

        // Insert student data
        const { data, error } = await supabase.from(type).insert([
          {
            student_id,
            name,
            email,
            phone,
            dob,
            address,
            enrollment_date,
            class_id,
          },
        ]);

        if (error) throw error;

        const { data: loginData, error: loginError } =
          await adminAuthClient.createUser({
            email,
            password: student_id,
            email_confirm: true,
            phone,
            user_metadata: { role: "student", name, phone },
          });

        if (loginError) throw loginError;

        console.info("Student sign up and storing successful!");
        revalidatePath("/dashboard", "page");
        return true;
      } catch (error) {
        console.error("Error occurred:", error);
        return false;
      }

    case "classes":
      try {
        console.log("Initiating classes.");

        // Getting data from form data
        const class_id = formData.get("classId") as string;
        const class_name = formData.get("className") as string;
        const year = formData.get("year") as string;
        const course_id = formData.get("courseId") as string;
        const total = formData.get("totalStudents") as string;

        // Insert student data
        const { data, error } = await supabase.from(type).insert([
          {
            class_id,
            class_name,
            year,
            course_id,
            total,
          },
        ]);

        if (error) throw error;
        console.info(
          `Successfully added class: ${class_name} with ID: ${class_id}`
        );
        revalidatePath("/dashboard", "page");
        return true;
      } catch (error) {
        console.error("Error occured while storing classes:", error);
        return false;
      }

    case "courses":
      try {
        console.log("Initiating courses.");

        const course_id = formData.get("courseId");
        const course_name = formData.get("courseName");
        const duration = formData.get("duration");

        const { data, error } = await supabase.from(type).insert([
          {
            course_id,
            course_name,
            duration,
          },
        ]);

        if (error) throw error;
        console.info(
          `Successfully added course: ${course_name} with ID: ${course_id}`
        );
        revalidatePath("/dashboard", "page");
        return true;
      } catch (error) {
        console.error("Error occured while storing courses => ", error);
        return false;
      }
    case "teachers":
      try {
        console.log("Initiating teachers.");

        const teacher_id = formData.get("teacherId") as string;
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const phone = formData.get("phone") as string;
        const subject = formData.get("subject") as string;

        const { data, error } = await supabase.from(type).insert([
          {
            teacher_id,
            name,
            email,
            phone,
            subject,
          },
        ]);

        if (error) throw error;

        const { data: loginData, error: loginError } =
          await adminAuthClient.createUser({
            email,
            password: teacher_id,
            email_confirm: true,
            phone,
            user_metadata: { role: "teacher", name, phone },
          });

        if (loginError) throw loginError;

        console.info(
          `Successfully added teacher: ${name} with ID: ${teacher_id}`
        );
        revalidatePath("/dashboard", "page");
        return true;
      } catch (error) {
        console.error("Error occured while storing teachers => ", error);
        return false;
      }
    default:
      console.warn("No type defined.");
      return false;
  }
}
