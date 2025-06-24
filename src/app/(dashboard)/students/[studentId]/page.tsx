/* eslint-disable @next/next/no-img-element */
"use client";
import { useParams } from "next/navigation";
import React from "react";
import UpdateStudentForm from "../../../../components/forms/UpdateStudentForm";
import { useFindStudent } from "../../../../hooks/useStudents";
import { FaUserCircle } from "react-icons/fa";
import Button from "../../../../components/ui/Button";
import { useTakePicModal } from "../../../../stores/modals";
import TakePictureModal from "../../../../components/modals/TakePictureModal";
import { IStudent } from "../../../../lib/types";

export default function Page() {
  const { openModal } = useTakePicModal();
  const params = useParams();
  const id = params.studentId;
  const { data } = useFindStudent(id as string);
  const student: IStudent = data?.data?.student;

  // console.log(student);

  return (
    <div className="flex gap-10 justify-center items-start">
      <div className="flex flex-col items-center ">
        <div className="w-[350px] h-[400px] rounded-2xl overflow-hidden">
          {student?.photoUrl ? (
            <img
              alt="Image"
              src={student?.photoUrl}
              // src={"/images/login-image.png"}
              className="h-full w-full object-cover"
              // height={50}
              // width={50}
            />
          ) : (
            <FaUserCircle className="w-full h-full text-[#5358627f]" />
          )}
        </div>
        <Button onClick={openModal} size="sm" className="mt-6">
          Change Image
        </Button>
      </div>
      <UpdateStudentForm id={id as string} />
      <TakePictureModal reg={student?.regNo as string} />
    </div>
  );
}
