/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import Button from "../../../components/ui/Button";
// import { createstudentRoute } from "../../../utils/route";
import { FiEdit2 } from "react-icons/fi";
import Pagination from "../../../components/Pagination";
import AssessmentModal from "../../../components/modals/assessmentModal";
import { useAssessmentModal } from "../../../stores/modals";

// Sample data - replace with your actual data
const studentsData = [
  {
    id: 1,
    name: "John Doe",
    status: "Present",
    class: "Class A",
    parentPhone: "+234 803 123 4567",
  },
  {
    id: 2,
    name: "Jane Smith",
    status: "Absent",
    class: "Class B",
    parentPhone: "+234 801 987 6543",
  },
  {
    id: 3,
    name: "Mike Johnson",
    status: "Present",
    class: "Class A",
    parentPhone: "+234 805 555 0123",
  },
  {
    id: 4,
    name: "Sarah Williams",
    status: "Present",
    class: "Class C",
    parentPhone: "+234 802 444 9876",
  },
  {
    id: 1,
    name: "John Doe",
    status: "Present",
    class: "Class A",
    parentPhone: "+234 803 123 4567",
  },
  {
    id: 2,
    name: "Jane Smith",
    status: "Absent",
    class: "Class B",
    parentPhone: "+234 801 987 6543",
  },
];

const StatusBadge = ({ status }: { status: string }) => {
  const isPresent = status === "Present";
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
  const { openModal } = useAssessmentModal();

  const handleAssessStudent = (studentId: number) => {
    console.log("Edit student:", studentId);
    openModal();
  };
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalItems = studentsData.length; // Your total number of students
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // const handleDeleteStudent = (studentId: number) => {
  //   console.log("Delete student:", studentId);
  //   // Implement delete functionality
  // };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Fetch new data or update your table based on the new page
    console.log("Navigating to page:", page);
  };

  const handleAddStudent = () => {
    console.log("Add new student");
    // Implement add student functionality
  };

  return (
    <div className="mt-[29px] border rounded-[12px] border-[#e9eaeb] bgwhite shadow">
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-5 border-b border-[#e9eaeb]">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold text-gray-900">Design</h3>
          <div className="text-xs text-primary bg-[#EDF7FC] text-center rounded-full py-1 px-3 w-fit font-medium">
            {studentsData.length} students
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="">
        <table className="w-full min-w-fit">
          <thead>
            <tr className="text-sm text-[#535862] bg-[#FAFAFA]">
              <th className="py-4 px-6 text-left font-medium">Name</th>
              <th className="py-4 px-6 text-center font-medium">Status</th>
              <th className="py-4 px-6 text-center font-medium">Behaviour</th>
              <th className="py-4 px-6 text-center font-medium">Attentive</th>
              <th className="py-4 px-6 text-center font-medium">Punctuality</th>
              <th className="py-4 px-6 text-center font-medium">Remark</th>
              <th className="py-4 px-6 text-center font-medium">Class</th>
              <th className="py-4 px-6 text-center font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e9eaeb] overflow-y-scroll max-h-[1000px]">
            {studentsData.map((student, i) => (
              <tr
                key={i}
                className="text-sm text-[#535862] hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="flex gap-3 items-center py-4 px-6 font-medium text-gray-900">
                  <div className="h-10 w-10 rounded-full overflow-hidden">
                    <img
                      alt="Image"
                      src="/images/login-image.png"
                      className="h-full w-full object-cover"
                      height={50}
                      width={50}
                    />
                  </div>
                  <div className="whitespace-nowrap">{student.name}</div>
                </td>
                <td className="py-4 px-6 text-center">
                  <StatusBadge status={student.status} />
                </td>
                <td className="py-4 px-6 text-center font-medium whitespace-nowrap">
                  Good
                </td>
                <td className="py-4 px-6 text-center whitespace-nowrap">
                  Very Good
                </td>
                <td className="py-4 px-6 text-center whitespace-nowrap">
                  Very Good
                </td>
                <td className="py-4 px-6 text-center whitespace-nowrap">
                  Design
                </td>
                <td className="py-4 px-6 text-center max-w-10 truncate whitespace-nowrap">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Sapiente, itaque.
                </td>
                <td className="py-4 px-6 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleAssessStudent(student.id)}
                      className="p-2 text-[#535862] hover:text-primary hover:bg-blue-50 rounded-lg transition-colors duration-150"
                      title="Edit student"
                    >
                      <FiEdit2 size={16} />
                    </button>
                    {/* <button
                      onClick={() => handleDeleteStudent(student.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-150"
                      title="Delete student"
                    >
                      <HiOutlineTrash size={16} />
                    </button> */}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {studentsData.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            itemsPerPage={itemsPerPage}
            totalItems={totalItems}
          />
        )}
      </div>

      {/* Empty state - show when no students */}
      {studentsData.length === 0 && (
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
            Get started by adding your first student to the Design class.
          </p>
          <Button size="sm" onClick={handleAddStudent} className="mx-auto">
            Add Student
          </Button>
        </div>
      )}

      <AssessmentModal />
    </div>
  );
}
