"use client";

import React, { useCallback, useState } from "react";
import { useEffect } from "react";

import { FaPlus } from "react-icons/fa";
import { FaIdBadge } from "react-icons/fa";
import { MdOutlinePhone } from "react-icons/md";
import { CiCalendarDate } from "react-icons/ci";
import { FaRegAddressCard } from "react-icons/fa";
import { BsCalendar2Date } from "react-icons/bs";
import { SiCoursera, SiNamemc } from "react-icons/si";
import { IoCalendarNumberSharp } from "react-icons/io5";
import { IoIosPeople } from "react-icons/io";
import { BiRename } from "react-icons/bi";
import { GiDuration, GiTeacher } from "react-icons/gi";

import { handleModal } from "@/utils/manageModals";
import { CourseInfo } from "./Courses/page";
import { WriteData } from "./actions";
import { ClassesInfo } from "./Classes/page";
import { generateTeacherId } from "@/utils/teachIds";

const AddInfo = ({
  type,
  lastCount,
  extraData,
}: {
  type: "classes" | "students" | "courses" | "teachers";
  lastCount: number;
  extraData: any | null;
}) => {
  const [data, setData] = useState<JSX.Element>(<></>);

  const [classId, setClassId] = useState<string>(
    extraData != null && type === "students" ? extraData.data[0].class_id : ""
  );

  const [stuId, setStuId] = useState<string>(
    extraData != null && type === "students"
      ? `${new Date().getFullYear()}${(lastCount + 1)
          .toString()
          .padEnd(4, "0")}`
      : ""
  );

  // For adding classes
  const [courseID, setCourseId] = useState<string>(
    extraData != null && type === "classes" ? extraData.data[0].course_id : ""
  );
  const [cclassId, setCClassId] = useState(
    extraData != null && type === "classes" ? `300${lastCount + 1}` : ""
  );

  // For adding courses
  const [rCourseId, setRcourseId] = useState<string>(
    extraData != null && type === "courses" ? `100${lastCount + 1}` : ""
  );

  // For adding teachers
  const [teacherId, setTeacherId] = useState<string>(
    extraData != null && type === "teachers" ? generateTeacherId() : ""
  );

  const ModalFunction = useCallback(handleModal, []);

  function handleIDs() {
    switch (type) {
      case "classes":
        setCClassId((prevId) => (Number(prevId) + 1).toString());
        console.info("Updated class id.");
        break;
      case "courses":
        setRcourseId((prevId) => (Number(prevId) + 1).toString());
        console.info("Updated course id.");
        break;
      case "students":
        setStuId((prevId) => (Number(prevId) + 1).toString());
        console.info("Updated student id.");
        break;
      case "teachers":
        setTeacherId(() => generateTeacherId());
        console.info("Updated teacher id.");
        break;
    }
  }

  const Buttons: JSX.Element = (
    <div className="modal-action">
      <button
        type="submit"
        className="btn btn-success btn-outline"
        formAction={async (e) => {
          const status = await WriteData(e, type);
          if (status) {
            ModalFunction(`${type}-add`, "hide");
            handleIDs();
          } else {
            console.error("Some error occured while storing data.");
          }
        }}
      >
        Submit
      </button>
      <button
        className="btn"
        onClick={(e) => {
          e.preventDefault();
          ModalFunction(`${type}-add`, "hide");
        }}
      >
        Close
      </button>
    </div>
  );

  useEffect(() => {
    switch (type) {
      case "students":
        const tempContent = extraData as ClassesInfo;
        var tempData = (
          <form>
            {/* Student ID */}
            <label className="input input-bordered flex items-center gap-2">
              <FaIdBadge />
              <input
                type="text"
                className="grow"
                placeholder="Id"
                autoComplete="off"
                value={stuId}
                name="stuId"
                readOnly
              />
            </label>

            {/* Name */}
            <label className="input input-bordered flex items-center gap-2 mt-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input
                type="text"
                className="grow"
                placeholder="Name"
                name="name"
                required
                autoComplete="off"
              />
            </label>

            {/* Email */}
            <label className="input input-bordered flex items-center gap-2 mt-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="email"
                className="grow"
                placeholder="Email"
                autoComplete="off"
                name="email"
                required
              />
            </label>

            {/* Phone */}
            <label className="input input-bordered flex items-center gap-2 mt-2">
              <MdOutlinePhone />
              <input
                type="tel"
                className="grow"
                placeholder="Phone"
                autoComplete="off"
                name="phone"
                required
              />
            </label>

            {/* DOB */}
            <label className="input input-bordered flex items-center gap-2 mt-2">
              <React.Fragment>
                <CiCalendarDate />
                <span className="font-semibold">DOB</span>
              </React.Fragment>
              <input
                type="date"
                className="grow"
                placeholder="DOB"
                autoComplete="off"
                name="dob"
                required
              />
            </label>

            {/* Address */}
            <label className="input input-bordered flex items-center gap-2 mt-2">
              <FaRegAddressCard />
              <input
                type="text"
                className="grow"
                placeholder="Address"
                autoComplete="off"
                name="address"
                required
              />
            </label>

            {/* Enrollment Date */}
            <label className="input input-bordered flex items-center gap-2 mt-2">
              <React.Fragment>
                <BsCalendar2Date />
                <span className="font-semibold">Enrollment date</span>
              </React.Fragment>
              <input
                type="date"
                className="grow"
                placeholder="Enrollment date"
                autoComplete="off"
                name="enrollDate"
                required
              />
            </label>

            <input className="" value={classId} name="classId" readOnly />
            <div className="flex items-center mt-2 bg-base-200 max-w-xs p-1 rounded-md">
              <SiCoursera className="ml-2" size={24} />
              <select
                className="select w-full  bg-base-200"
                onChange={(event) => {
                  const selectedValue = event.target.value;
                  console.info(`Class ID changed to ${selectedValue}`);
                  setClassId(selectedValue);
                }}
              >
                {tempContent &&
                  tempContent.data?.map((item, index) => (
                    <option key={index} value={item.class_id}>
                      {item.class_name} : {item.class_id} Course:{" "}
                      {item.course_id}
                    </option>
                  ))}
              </select>
            </div>

            {Buttons}
          </form>
        );
        setData(tempData);
        break;

      case "classes":
        const tempContent_course = extraData as CourseInfo;
        var tempData = (
          <form>
            {/* Class ID */}
            <label className="input input-bordered flex items-center gap-2">
              <FaIdBadge />
              <input
                type="text"
                className="grow"
                placeholder="Class ID"
                autoComplete="off"
                value={cclassId}
                name="classId"
                readOnly
              />
            </label>

            {/* Class Name */}
            <label className="input input-bordered flex items-center gap-2 mt-2">
              <SiNamemc />
              <input
                type="text"
                className="grow"
                placeholder="Class Name"
                autoComplete="off"
                name="className"
                required
              />
            </label>

            {/* Year */}
            <label className="input input-bordered flex items-center gap-2 mt-2">
              <IoCalendarNumberSharp />
              <input
                type="number"
                className="grow"
                placeholder="Year"
                autoComplete="off"
                max={new Date().getFullYear().toString()}
                min={2000}
                required
                name="year"
              />
            </label>

            {/* Students */}
            <label className="input input-bordered flex items-center gap-2 mt-2">
              <IoIosPeople />
              <input
                type="number"
                className="grow"
                placeholder="Total students"
                autoComplete="off"
                required
                name="totalStudents"
              />
            </label>

            {/* Course ID */}
            <input
              className="hidden"
              value={courseID}
              name="courseId"
              readOnly
            />
            <div className="flex items-center mt-2 bg-base-200 max-w-xs p-1 rounded-md">
              <SiCoursera className="ml-2" size={24} />
              <select
                className="select w-full  bg-base-200"
                onChange={(event) => {
                  const selectedValue = event.target.value;
                  setCourseId(selectedValue);
                  // console.log(selectedValue);
                }}
              >
                {tempContent_course &&
                  tempContent_course.data?.map((item, index) => (
                    <option key={index} value={item.course_id}>
                      {item.course_name} : {item.course_id}
                    </option>
                  ))}
              </select>
            </div>
            {Buttons}
          </form>
        );
        setData(tempData);
        break;

      case "courses":
        const tempData_courses = (
          <form>
            {/* Course ID */}
            <label className="input input-bordered flex items-center gap-2">
              <FaIdBadge />
              <input
                type="text"
                className="grow"
                placeholder="Class ID"
                autoComplete="off"
                value={rCourseId}
                name="courseId"
                readOnly
              />
            </label>

            {/* Course Name */}
            <label className="input input-bordered flex items-center gap-2 mt-2">
              <BiRename />
              <input
                type="text"
                className="grow"
                placeholder="Course Name"
                autoComplete="off"
                name="courseName"
                required
              />
            </label>

            {/* Course Duration */}
            <label className="input input-bordered flex items-center gap-2 mt-2">
              <GiDuration />
              <input
                type="number"
                className="grow"
                placeholder="Course Duration"
                autoComplete="off"
                name="duration"
                required
              />
            </label>
            {Buttons}
          </form>
        );
        setData(tempData_courses);
        break;
      case "teachers":
        const tempData_teachers = (
          <form>
            {/* Teacher ID */}
            <label className="input input-bordered flex items-center gap-2">
              <FaIdBadge />
              <input
                type="text"
                className="grow"
                placeholder="Teacher ID"
                autoComplete="off"
                value={teacherId}
                name="teacherId"
                readOnly
              />
            </label>

            {/* Teacher Name */}
            <label className="input input-bordered flex items-center gap-2 mt-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14c0 1.105-1.107 2-2.5 2S6.907 15.105 6.907 14c0-1.105 1.107-2 2.5-2S12 12.895 12 14z"
                />
              </svg>
              <input
                type="text"
                className="grow"
                placeholder="Teacher Name"
                autoComplete="off"
                name="name"
                required
              />
            </label>

            {/* Teacher Email */}
            <label className="input input-bordered flex items-center gap-2 mt-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <input
                type="email"
                className="grow"
                placeholder="Email"
                autoComplete="off"
                name="email"
                required
              />
            </label>

            {/* Teacher Phone */}
            <label className="input input-bordered flex items-center gap-2 mt-2">
              <MdOutlinePhone />
              <input
                type="tel"
                className="grow"
                placeholder="Phone"
                autoComplete="off"
                name="phone"
                required
              />
            </label>

            {/* Teacher Subject */}
            <label className="input input-bordered flex items-center gap-2 mt-2">
              <GiTeacher />
              <input
                type="text"
                className="grow"
                placeholder="Subject"
                autoComplete="off"
                name="subject"
                required
              />
            </label>
            {Buttons}
          </form>
        );
        setData(tempData_teachers);
        break;
    }
  }, [type, stuId, cclassId, rCourseId, classId, teacherId]);

  return (
    <main>
      <button
        className="btn w-full mt-2"
        onClick={() => ModalFunction(`${type}-add`, "show")}
      >
        <FaPlus />
        <span>
          Add <span className="capitalize">{type}</span>
        </span>
      </button>

      <dialog id={`${type}-add`} className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg">
            Manage <span className="capitalize">{type}</span>
          </h3>
          <div className="mt-4">{data}</div>
        </div>
      </dialog>
    </main>
  );
};

export default AddInfo;
