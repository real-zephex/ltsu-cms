"use client";

import { Teachers } from "@/types/types";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { IoMail } from "react-icons/io5";
import { MdOutlinePhone } from "react-icons/md";

const TeacherSidebar = ({ data }: { data: Teachers[] }) => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  if (data.length != 1) {
    return;
  }

  return (
    <aside className="relative">
      <button
        onClick={() => setSidebarOpen((prev) => !prev)}
        className="p-2 hover:bg-base-200/20 rounded-lg transition-colors"
        aria-label="Toggle sidebar"
      >
        <GiHamburgerMenu />
      </button>

      <section
        className={`
          fixed inset-y-0 left-0 z-50 w-64 
          bg-gradient-to-b from-base-300/90 to-base-200/50
          transition-transform duration-300 ease-in-out
          flex flex-col
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex-grow">
          <p className="p-4 bg-gradient-to-r from-[#a8ff78] to-[#78ffd6] text-transparent bg-clip-text text-xl">
            Konichiwa
          </p>
          <p className="text-white font-semibold text-xl">{data[0].name}</p>
          <p className="text-sm line-clamp-1 text-white/75">
            {data[0].subject.trim()}
          </p>

          <div className="flex items-center text-white justify-center mt-2">
            <section className="badge">
              <section>
                <MdOutlinePhone className="mr-2" />
              </section>
              <section>{data[0].phone}</section>
            </section>
          </div>

          <div className="flex items-center text-white justify-center mt-1">
            <section className="badge">
              <section>
                <IoMail className="mr-2" />
              </section>
              <section>{data[0].email}</section>
            </section>
          </div>
        </div>

        <button
          onClick={() => setSidebarOpen(false)}
          className="btn btn-error btn-outline w-full hover:bg-base-300/50 transition-colors flex items-center justify-center"
          aria-label="Close sidebar"
        >
          <IoMdClose className="w-5 h-5" />
          <span>Close</span>
        </button>
      </section>
    </aside>
  );
};

export default TeacherSidebar;
