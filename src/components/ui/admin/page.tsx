import ClassesOverview from "../classes-overview/page";
import ManageClasses from "./Classes/page";
import ManageCourses from "./Courses/page";
import ManageStudents from "./Students/page";
import ManageTeachers from "./Teachers/page";

const Admin = async () => {
  return (
    <main className="mt-4 ">
      <section className="flex flex-col lg:flex-row items-center">
        <ManageCourses />
        <ManageClasses className="lg:ml-2 mt-2 w-full lg:w-auto" />
        <ManageStudents className="lg:ml-2 mt-2 w-full lg:w-auto" />
        <ManageTeachers className="lg:ml-2 mt-2 w-full lg:w-auto" />
      </section>
      <ClassesOverview />
    </main>
  );
};

export default Admin;
