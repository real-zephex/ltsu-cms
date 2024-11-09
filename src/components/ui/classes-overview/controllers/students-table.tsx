import React from "react";
import { getStudents } from "./database-actions";

const StudentsTable = async ({ id }: { id: string }) => {
  const student_data = await getStudents(id);

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>#</th>
            <th>ID</th>
            <th>Name</th>
            <th>DOB</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {student_data.status &&
            student_data.data &&
            student_data.data.length > 0 &&
            student_data.data.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.student_id}</td>
                <td>{item.name}</td>
                <td>{item.dob}</td>
                <td>{item.phone}</td>
              </tr>
            ))}
        </tbody>
      </table>
      {student_data.data && student_data.data.length === 0 && (
        <p className="text-center text-white">
          No student records found for this class.
        </p>
      )}
    </div>
  );
};

export default StudentsTable;
