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
import UploadPortrait from "../../../../components/UploadPortrait";

export default function Page() {
  const { openModal } = useTakePicModal();
  const params = useParams();
  const id = params.studentId;
  const { data } = useFindStudent(id as string);
  const student: IStudent = data?.data?.student;

  // console.log(student);

  return (
    <div className="flex gap-10 justify-center items-start">
      <div className="flex flex-col gap-20">
        <div className="flex flex-col items-center ">
          <div className="h-[300px] w-[350px] bg-black rounded-2xl overflow-hidden flex justify-center items-center">
            {student?.photoUrl ? (
              <img
                alt="Image"
                src={student?.photoUrl}
                // src={"/images/login-image.png"}
                className="object-contain"
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
        {/* <div className="flex flex-col items-center ">
          <div className="h-[300px] w-[350px] bg-black rounded-2xl overflow-hidden flex justify-center items-center">
            {student?.passportUrl ? (
              <img
                alt="Image"
                src={student?.passportUrl}
                // src={"/images/login-image.png"}
                className="object-cover h-full w-full"
                // height={50}
                // width={50}
              />
            ) : (
              <FaUserCircle className="w-full h-full text-[#5358627f]" />
            )}
          </div>
          <Button size="sm" className="mt-6">
            Upload Portrait
          </Button>
        </div> */}

        <UploadPortrait student={student} reg={student?.regNo as string} />
      </div>
      <UpdateStudentForm id={id as string} />
      <TakePictureModal reg={student?.regNo as string} />
    </div>
  );
}
