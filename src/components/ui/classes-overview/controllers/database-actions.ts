import { createClient } from "@/components/database/supabaseServer";
import { Classes, Students } from "@/types/types";

const supabase = await createClient();

export const getClassesInfo = async () => {
  const { data, error } = await supabase.from("classes").select("*");

  if (error) {
    ErrorHandler(error, "classes");
    return {
      status: false,
      data: null,
    };
  }

  const classes_data = data as Classes[];
  return {
    status: true,
    data: classes_data,
  };
};

export const getStudents = async (id: string) => {
  const { data, error } = await supabase
    .from("students")
    .select("*")
    .eq("class_id", id);

  if (error) {
    ErrorHandler(error, "students");
    return {
      status: false,
      data: null,
    };
  }

  const student_data = data as Students[];
  return {
    status: true,
    data: student_data,
  };
};

function ErrorHandler(error: unknown, type: string) {
  console.error(
    `Error occured while trying to fetch ${type}`,
    __filename,
    error
  );
}
