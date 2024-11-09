"use server";

import { createClient } from "@/components/database/supabaseServer";
import { AttendanceInfo, Students } from "@/types/types";

const MarkAttendance = async (attendanceData: AttendanceInfo) => {
  const supabase = await createClient();
  const { data, error } = await supabase.from("attendance").insert([
    {
      ...attendanceData,
    },
  ]);
  if (error) {
    console.error("Error occured while trying to write attendance data", error);
    throw error;
  }

  console.info("Writing attendance successful.");
  return true;
};

const getStudentsById = async (id: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("students")
    .select("*")
    .eq("class_id", id);

  if (error) {
    console.error(
      "Error while trying to fetch student information",
      __filename,
      error
    );
    throw error;
  }

  return data as Students[];
};

export { MarkAttendance, getStudentsById };
