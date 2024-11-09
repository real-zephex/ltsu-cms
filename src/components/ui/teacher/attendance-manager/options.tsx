"use client";

import {
  AttendanceData,
  AttendanceStatus,
  Classes,
  Students,
} from "@/types/types";
import { getStudentsById } from "@/utils/attendanceUtils";
import { handleModal } from "@/utils/manageModals";
import { useEffect, useState } from "react";
import { ErrorAlert, SuccessAlert } from "../../messages/page";

const AttendanceModel = ({
  data,
  onSubmit,
}: {
  data: Classes[];
  onSubmit: (
    period: string,
    classId: string,
    attendanceData: AttendanceData[]
  ) => Promise<AttendanceStatus>;
}) => {
  const [period, setPeriod] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [classId, setClassId] = useState<string>(data[0].class_id.toString());
  const [studentData, setStudentData] = useState<Students[]>([]);
  const [stuAttendanceData, setStuAttendanceData] = useState<AttendanceData[]>(
    []
  );
  const [status, setStatus] = useState<JSX.Element>(<></>);

  useEffect(() => {
    async function getStudentData() {
      const foo = await getStudentsById(classId);
      setStudentData(foo);

      // generating temporary attendance data will all the attendance marked false
      // on checking the checkbox the attendance of the respectives student will be changed to present i.e. true
      const tempData = Array.from(foo, (e) => {
        return {
          student_id: e.student_id,
          name: e.name,
          status: false,
        };
      });
      setStuAttendanceData(tempData);
    }
    getStudentData();
  }, [classId]);

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setClassId(event.target.value);
  }

  async function handleFormSubmit() {
    setIsSubmitting(true);
    const result = await onSubmit(period, classId, stuAttendanceData);
    if (result.success) {
      handleModal("attendanceModal", "hide");
      console.info("Successfully stored attendance data.");
      setStatus(
        <SuccessAlert message="Successfully stored attendance information" />
      );
      setInterval(() => {
        setStatus(<></>);
      }, 2000);
    } else {
      console.error("Error occured while storing attendance information");
      setStatus(
        <ErrorAlert message="Error occured while storing attendance information" />
      );
      setInterval(() => {
        setStatus(<></>);
      }, 2000);
    }
    setIsSubmitting(false);
  }

  const handlePeriodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPeriod(event.target.value);
  };

  const handleAttendanceChange = (studentId: number) => {
    setStuAttendanceData((prevData) =>
      prevData.map((student) =>
        student.student_id === studentId
          ? { ...student, status: !student.status }
          : student
      )
    );
  };

  return (
    <main>
      <select
        className="select select-bordered w-full mt-2"
        onChange={handleChange}
      >
        {data.map((items, _) => (
          <option key={items.class_id} value={items.class_id}>
            {items.class_name} - {items.class_id}
          </option>
        ))}
      </select>

      <form encType="multipart/formdata">
        <input
          className="input input-bordered w-full mt-2"
          placeholder="Enter period"
          type="number"
          name="period"
          value={period}
          onChange={handlePeriodChange}
          required
        />

        <button
          type="submit"
          className="btn btn-primary mt-2"
          disabled={period.trim() === ""}
          onClick={(e) => {
            e.preventDefault();
            handleModal("attendanceModal", "show");
          }}
        >
          Submit
        </button>
      </form>

      <dialog id="attendanceModal" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg">Attendance - {classId}</h3>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {studentData.length > 0 &&
                  studentData.map((items, index) => (
                    <tr key={index}>
                      <td>{items.student_id}</td>
                      <td>{items.name}</td>
                      <td>
                        <input
                          type="checkbox"
                          className="checkbox"
                          name={`stu-${items.student_id}`}
                          value={items.student_id}
                          onChange={() =>
                            handleAttendanceChange(items.student_id)
                          }
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="modal-action">
            <button
              className="btn btn-success btn-outline"
              onClick={handleFormSubmit}
            >
              {isSubmitting ? (
                <>
                  <span className="loading loading-spinner"></span>
                  Submitting...
                </>
              ) : (
                "Submit"
              )}
            </button>
            <form method="dialog">
              {/* if there is a button, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
      {status}
    </main>
  );
};

export default AttendanceModel;
