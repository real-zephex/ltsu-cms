import { Teachers } from "@/types/types";
import { Courses } from "../actions";
import StatModel from "../statModel";
import AddInfo from "../addModal";

interface TeacherData {
  status: boolean;
  data: Teachers[] | null;
  length: number;
}

const ManageTeachers = async ({ className }: { className: string }) => {
  const teacher_data: TeacherData = await Courses("teachers");

  return (
    <main className={className}>
      <StatModel data={teacher_data} type="teachers" />
      <dialog id="teachers" className="modal">
        <div className="modal-box w-11/12 max-w-6xl">
          <h3 className="font-bold text-lg">Manage Teachers</h3>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>#</th>
                  <th>Teacher ID</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Subjects</th>
                </tr>
              </thead>
              <tbody>
                {teacher_data!.status &&
                  teacher_data!.data
                    ?.sort((a, b) => a.teacher_id - b.teacher_id)
                    .map((items, index) => (
                      <tr key={index}>
                        <th>{index + 1}</th>
                        <td>{items.teacher_id}</td>
                        <td>{items.name}</td>
                        <td>{items.phone}</td>
                        <td>{items.email}</td>
                        <td>{items.subject}</td>
                      </tr>
                    ))}
              </tbody>
            </table>
            <AddInfo
              type="teachers"
              lastCount={teacher_data.length}
              extraData={teacher_data}
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

export default ManageTeachers;
