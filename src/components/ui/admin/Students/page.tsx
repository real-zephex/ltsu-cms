import { Courses, Students } from "@/types/types";
import { Courses as courses_info } from "../actions";
import StatModel from "../statModel";
import React from "react";
import AddInfo from "../addModal";

interface StudentData {
  status: boolean;
  data: Students[] | null;
  length: number;
}

const ManageStudents = async ({ className }: { className: string }) => {
  const student_data: StudentData = await courses_info("students");
  const classes = await courses_info("classes");

  return (
    <main className={className}>
      <StatModel data={student_data} type="students" />
      <dialog id="students" className="modal">
        <div className="modal-box w-11/12 max-w-6xl">
          <h3 className="font-bold text-lg">Manage Students</h3>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>#</th>
                  <th>Student ID</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>DOB</th>
                  <th>Class</th>
                  <th>Enrolled on</th>
                </tr>
              </thead>
              <tbody>
                {student_data!.status &&
                  student_data!.data
                    ?.sort((a, b) => a.student_id - b.student_id)
                    .map((items, index) => (
                      <tr key={index}>
                        <th>{index + 1}</th>
                        <td>{items.student_id}</td>
                        <td>{items.name}</td>
                        <td>{items.phone}</td>
                        <td>{items.dob}</td>
                        <td>{items.class_id}</td>
                        <td>{items.enrollment_date}</td>
                      </tr>
                    ))}
              </tbody>
            </table>
            <AddInfo
              type="students"
              lastCount={student_data.length}
              extraData={classes}
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

export default ManageStudents;
