/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import CameraViewer from "../../../components/Camera";
import { useAttendance } from "../../../stores/variables";
import { FaUserCircle } from "react-icons/fa";

const StatusBadge = ({ status }: { status: string }) => {
  const isPresent = status === "PRESENT";
  return (
    <span
      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
        isPresent
          ? "bg-[#ECFDF3] text-[#027A48]"
          : "bg-[#FDECEC] text-[#7A0202]"
      }`}
    >
      <span
        className={`w-[6px] h-[6px] rounded-full mr-[6px] ${
          isPresent ? "bg-[#12B76A]" : "bg-[#B71212]"
        }`}
      ></span>
      {status}
    </span>
  );
};

export default function Page() {
  const { students } = useAttendance();

  return (
    <div className="flex pt-[20px] gap-16">
      <div>
        <CameraViewer />
      </div>
      <div className="w-full max-w-[533px] mx-auto">
        <div className="text-xs font-medium px-6 py-3 bg-[#FAFAFA] border border-[#E9EAEB]">
          Students
        </div>

        {/* student */}
        <div className="min-h-[300px]">
          {students.map((s) => (
            <div
              key={s.id}
              className="flex gap-3 items-center px-6 py-4 border border-t-0 border-[#E9EAEB] hover:bg-[#F0F0F0]"
            >
              <div className="min-h-12 min-w-12  w-12 h-12 rounded-full overflow-hidden">
                {s?.student?.photoUrl ? (
                  <img
                    alt="Image"
                    src={s?.student.photoUrl}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <FaUserCircle className="w-full h-full text-[#5358627f]" />
                )}
              </div>
              <div className="flex justify-between w-full">
                <p className="font-medium text-lg">{s.student?.fullName}</p>
                <StatusBadge status={s.student?.attendanceStatus || ""} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
