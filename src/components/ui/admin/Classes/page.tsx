import { Classes } from "@/types/types";
import { Courses as courses_info } from "../actions";
import StatModel from "../statModel";
import AddInfo from "../addModal";

export interface ClassesInfo {
  status: boolean;
  data: Classes[] | null;
  length: number;
}

const ManageClasses = async ({ className }: { className: string }) => {
  const course_data: ClassesInfo = await courses_info("classes");
  const courses = await courses_info("courses");

  return (
    <main className={className}>
      <StatModel data={course_data} type="classes" />

      <dialog id="classes" className="modal">
        <div className="modal-box w-11/12 max-w-6xl">
          <h3 className="font-bold text-lg">Manage Classes</h3>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Class ID</th>
                  <th>Class Name</th>
                  <th>Year</th>
                  <th>Course</th>
                  <th>Students</th>
                </tr>
              </thead>
              <tbody>
                {course_data!.status &&
                  course_data!.data?.map((items, index) => (
                    <tr key={index}>
                      <th>{index + 1}</th>
                      <td>{items.class_id}</td>
                      <td>{items.class_name}</td>
                      <td>{items.year}</td>
                      <td>{items.course_id}</td>
                      <td>{items.total}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <AddInfo
              type="classes"
              lastCount={course_data.length}
              extraData={courses}
            />
          </div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </main>
  );
};

export default ManageClasses;
