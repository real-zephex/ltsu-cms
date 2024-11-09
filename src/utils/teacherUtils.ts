import { createClient } from "@/components/database/supabaseServer";
import { Teachers } from "@/types/types";

const TeacherInformationFetcher = async (email: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("teachers")
    .select("*")
    .eq("email", email);

  if (error) throw error;

  return data as Teachers[];
};


export { TeacherInformationFetcher };
