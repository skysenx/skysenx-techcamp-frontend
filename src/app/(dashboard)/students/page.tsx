/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
// import Image from "next/image";
import { FiEdit2 } from "react-icons/fi";
import Button from "../../../components/ui/Button";
import Pagination from "../../../components/Pagination";
import { createstudentRoute, studentRoute } from "../../../utils/route";
import { useFindStudents } from "../../../hooks/useStudents";
import { useVariables } from "../../../stores/variables";
import { IStudent } from "../../../lib/types";
import SkeletonRow from "../../../components/SkeletonRow";
import { useRouter } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";
import { TbReport } from "react-icons/tb";
import { useAssessmentModal } from "../../../stores/modals";
import AssessModal from "../../../components/modals/AssessModal";
import { capitalizeWords } from "../../../utils/helpers";
// import AssessmentModal from "../../../components/modals/AssessmentModal";
// import { formatDateTime } from "../../../utils/helpers";

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
  const router = useRouter();
  const { openModal } = useAssessmentModal();
  const { page: currentPage, size, setPage: setCurrentPage } = useVariables();
  const { data, isLoading, isError } = useFindStudents();
  const studentsData: IStudent[] = data?.data?.students;

  const handleAssessStudent = (student: IStudent) => {
    openModal(student);
  };
  console.log(studentsData);

  const totalItems = data?.data?.size ?? 0;
  const totalPages = Math.ceil(totalItems / size);

  const handleEditStudent = (studentId: string) => {
    router.push(studentRoute(studentId));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // console.log("Navigating to page:", page);
  };

  const handleAddStudent = () => {
    router.push(createstudentRoute);
  };

  const renderTable = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="text-sm text-[#535862] bg-[#FAFAFA]">
            <th className="py-4 px-6 text-left font-medium">Name</th>
            <th className="py-4 px-6 text-center font-medium">Status</th>
            <th className="py-4 px-6 text-center font-medium">Reg No.</th>
            <th className="py-4 px-6 text-center font-medium">Class</th>
            <th className="py-4 px-6 text-center font-medium whitespace-nowrap">
              Parents Cell No.
            </th>
            <th className="py-4 px-6 text-center font-medium">Gender</th>
            <th className="py-4 px-6 text-center font-medium whitespace-nowrap">
              Registered By
            </th>
            {/* <th className="py-4 px-6 text-center font-medium">Created</th> */}
            <th className="py-4 px-6 text-center font-medium">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#e9eaeb]">
          {studentsData.map((student: IStudent) => (
            <React.Fragment key={student.id}>
              <tr className="text-sm text-[#535862] hover:bg-gray-50 transition-colors duration-150">
                <td className="flex gap-3 items-center py-4 px-6 font-medium text-gray-900">
                  <div className="h-10 w-10 rounded-full overflow-hidden">
                    {student.photoUrl ? (
                      <img
                        alt="Image"
                        src={student.photoUrl || "/images/login-image.png"}
                        className="h-full w-full object-cover"
                        // height={50}
                        // width={50}
                      />
                    ) : (
                      <FaUserCircle className="w-full h-full text-[#5358627f]" />
                    )}
                  </div>
                  <div className="whitespace-nowrap">
                    {capitalizeWords(student?.fullName || "")}
                  </div>
                </td>
                <td className="py-4 px-6 text-center ">
                  <StatusBadge status={student?.attendanceStatus || ""} />
                </td>
                <td className="py-4 px-6 text-center font-medium whitespace-nowrap">
                  {student?.regNo}
                </td>
                <td className="py-4 px-6 text-center font-medium whitespace-nowrap">
                  {student?.program?.name}
                </td>
                <td className="py-4 px-6 text-center font-mono whitespace-nowrap">
                  {student.guardianPhone}
                </td>
                <td className="py-4 px-6 text-center font-mono whitespace-nowrap">
                  {student?.gender}
                </td>
                <td className="py-4 px-6 text-center font-mono whitespace-nowrap">
                  {student?.registeredBy?.userProfile?.firstname}
                </td>

                <td className="py-4 px-6">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleEditStudent(student.id || "")}
                      className="p-2 cursor-pointer text-[#535862] hover:text-primary hover:bg-blue-50 rounded-lg transition-colors duration-150"
                      title="Edit student"
                    >
                      <FiEdit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleAssessStudent(student)}
                      className="p-2 text-[#535862] hover:text-[#12B76A] hover:bg-[#12B76A]/10 rounded-lg transition-colors duration-150 cursor-pointer"
                      title="Assess student"
                    >
                      <TbReport size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        itemsPerPage={size}
        totalItems={totalItems}
      />
    </div>
  );

  const renderSkeletonTable = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="text-sm text-[#535862] bg-[#FAFAFA]">
            <th className="py-4 px-6 text-left font-medium">Name</th>
            <th className="py-4 px-6 text-left font-medium">Status</th>
            <th className="py-4 px-6 text-left font-medium">Class</th>
            <th className="py-4 px-6 text-left font-medium">
              Parents Cell No.
            </th>
            <th className="py-4 px-6 text-center font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 10 }).map((_, idx) => (
            <SkeletonRow key={idx} />
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderEmptyState = () => (
    <div className="text-center py-12">
      <div className="text-gray-400 mb-4">
        <svg
          className="mx-auto h-12 w-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      </div>
      <h3 className="text-sm font-medium text-gray-900 mb-1">
        No students found
      </h3>
      <p className="text-sm text-gray-500 mb-4">
        Get started by adding your first student.
      </p>
      <Button size="sm" onClick={handleAddStudent} className="mx-auto">
        Add Student
      </Button>
    </div>
  );

  return (
    <div className="mt-[29px] border rounded-[12px] border-[#e9eaeb] bg-white shadow">
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-5 border-b border-[#e9eaeb]">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold text-gray-900">Students</h3>
          <div className="text-xs text-primary bg-[#EDF7FC] text-center rounded-full py-1 px-3 w-fit font-medium">
            {totalItems || 0} student(s)
          </div>
        </div>
        <Button size="sm" onClick={handleAddStudent} href={createstudentRoute}>
          Add Student
        </Button>
      </div>

      {/* Content */}
      {isLoading ? (
        renderSkeletonTable()
      ) : isError ? (
        <div className="p-6 text-sm text-red-500">Error loading students.</div>
      ) : studentsData?.length > 0 ? (
        renderTable()
      ) : (
        renderEmptyState()
      )}
      <AssessModal />
    </div>
  );
}
