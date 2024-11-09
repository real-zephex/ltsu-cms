import { Courses } from "@/types/types";
import { Courses as courses_info } from "../actions";
import StatModel from "../statModel";
import React from "react";
import AddInfo from "../addModal";

export interface CourseInfo {
  status: boolean;
  data: Courses[] | null;
  length: number;
}

const ManageCourses = async () => {
  const course_data: CourseInfo = await courses_info("courses");

  return (
    <main className="w-full lg:w-auto mt-2 lg:ml-0">
      <StatModel data={course_data} type="courses" />
      <dialog id="courses" className="modal">
        <div className="modal-box w-11/12 max-w-6xl">
          <h3 className="font-bold text-lg">Manage Courses</h3>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Course ID</th>
                  <th>Course Name</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                {course_data!.status &&
                  course_data!.data?.map((items, index) => (
                    <tr key={index}>
                      <th>{index + 1}</th>
                      <td>{items.course_id}</td>
                      <td>{items.course_name}</td>
                      <td>{items.duration}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <AddInfo
              type="courses"
              lastCount={course_data.length}
              extraData={course_data}
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

export default ManageCourses;
