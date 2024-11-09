import AttendanceManager from "./attendance-manager/page";

const TeacherDashboardComponents = async () => {
  return (
    <main>
      <AttendanceManager classname="hover:bg-base-200 transition-all select-none cursor-pointer" />
    </main>
  );
};

export default TeacherDashboardComponents;
