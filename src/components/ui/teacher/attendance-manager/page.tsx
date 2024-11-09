import { TbPresentationAnalytics } from "react-icons/tb";
import { Courses } from "../../admin/actions";
import AttendanceModel from "./options";
import { TeacherInformationFetcher } from "@/utils/teacherUtils";
import { createClient } from "@/components/database/supabaseServer";
import { AttendanceData, AttendanceStatus } from "@/types/types";
import { generateUUID } from "@/utils/teachIds";
import { MarkAttendance } from "@/utils/attendanceUtils";
import { handleModal } from "@/utils/manageModals";

const AttendanceManager = async ({ classname }: { classname: string }) => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error(
      "Error occured while trying to fetch teacher information",
      __filename,
      error
    );
    return;
  }

  const classesData = await Courses("classes");
  const teacher_db_data = await TeacherInformationFetcher(data.user.email!);
  const teacherData = teacher_db_data[0];

  const handleFormSubmit = async (
    period: string,
    classId: string,
    attendance_data: AttendanceData[]
  ): Promise<AttendanceStatus> => {
    "use server";
    const tempData = {
      attendance_id: generateUUID(),
      class_id: classId,
      teacher_id: teacherData.teacher_id.toString(),
      subject: teacherData.subject,
      period: Number(period),
      attendance_data,
    };
    console.info("Potential attendance request incoming!\n", tempData);

    const attendanceStatus = await MarkAttendance(tempData);
    if (attendanceStatus) {
      // Return success status
      return { success: true, message: "Attendance marked successfully!" };
    } else {
      return { success: false, message: "Failed to mark attendance." };
    }
  };

  return (
    <main className={`bg-base-100 lg:w-80 w-full p-2 rounded-lg mt-2 ${classname}`}>
      <div className="flex items-center text-2xl font-semibold">
        <span>
          <TbPresentationAnalytics className="mr-2" />
        </span>
        <p>Attendance Manager</p>
      </div>
      <AttendanceModel data={classesData.data!} onSubmit={handleFormSubmit} />
    </main>
  );
};

export default AttendanceManager;
