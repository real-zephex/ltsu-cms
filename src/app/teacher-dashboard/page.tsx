import { createClient } from "@/components/database/supabaseServer";
import TeacherNavbar from "@/components/ui/teacher-navbar/page";
import TeacherDashboardComponents from "@/components/ui/teacher/page";
import { TeacherMetadata } from "@/types/types";
import { redirect } from "next/navigation";

const TeacherDashboard = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    redirect("/");
  }

  const teachMetadata = data.user.user_metadata as TeacherMetadata;
  if (teachMetadata.role != "teacher") {
    redirect("/");
  }

  return (
    <main>
      <TeacherNavbar teacherData={teachMetadata} mail={data.user.email!} />
      <section className="container mx-auto">
        <TeacherDashboardComponents />
      </section>
    </main>
  );
};

export default TeacherDashboard;
