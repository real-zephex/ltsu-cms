import { TeacherMetadata } from "@/types/types";
import LogoutButton from "./logoutButton";
import TeacherSidebar from "../teacher-sidebar/page";
import { TeacherInformationFetcher } from "@/utils/teacherUtils";

const TeacherNavbar = async ({
  teacherData,
  mail,
}: {
  teacherData: TeacherMetadata;
  mail: string;
}) => {
  const teacher_db_data = await TeacherInformationFetcher(mail);
  return (
    <main className="w-full bg-primary text-black text-center flex items-center justify-between">
      <TeacherSidebar data={teacher_db_data} />
      <h2
        className="text-md lg:text-2xl font-semibold p-3"
        title={`Phone: ${teacherData.phone} Role: ${teacherData.role}`}
      >
        Welcome,{" "}
        <span className="bg-gradient-to-r from-[#a8ff78]  to-[#78ffd6] text-transparent bg-clip-text font-bold">
          {teacherData.name}
        </span>
      </h2>
      <LogoutButton />
    </main>
  );
};

export default TeacherNavbar;
