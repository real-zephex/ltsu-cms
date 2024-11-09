"use client";

import { handleModal } from "@/utils/manageModals";
import { SiGoogleclassroom } from "react-icons/si";
import { PiStudentBold } from "react-icons/pi";

import { TbBooks } from "react-icons/tb";
import { GiTeacher } from "react-icons/gi";

const StatModel = ({
  data,
  type,
}: {
  data: any;
  type: "classes" | "courses" | "students" | "teachers";
}) => {
  const iconMap = {
    classes: <SiGoogleclassroom size={48} />,
    courses: <TbBooks size={48} />,
    students: <PiStudentBold size={48} />,
    teachers: <GiTeacher size={48} />,
  };

  return (
    <div
      className="stats shadow cursor-pointer w-full"
      onClick={(e) => handleModal(type, "show")}
    >
      <div className="stat">
        <div className="stat-figure text-primary">{iconMap[type]}</div>
        <div className="stat-title">Total {type}</div>
        <div className="stat-value text-primary">
          {data.status ? data.length : "NA"}
        </div>
      </div>
    </div>
  );
};

export default StatModel;
