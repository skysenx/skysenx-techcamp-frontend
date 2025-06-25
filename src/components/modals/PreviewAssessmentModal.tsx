/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { usePreviewAssessmentModal } from "../../stores/modals";
import { TfiClose } from "react-icons/tfi";
import { IAssesssment } from "../../lib/types";
import { assessment } from "../../utils/contents";
import { FaUserCircle } from "react-icons/fa";

const PreviewAssessmentModal = () => {
  const { isModalOpen, selectedAssessment, closeModal } =
    usePreviewAssessmentModal();
  const today = new Date().toISOString().split("T")[0];

  console.log(isModalOpen);
  console.log(selectedAssessment);

  const initialValues: IAssesssment = {
    date: today,
    attentive:
      assessment
        .find((a) => a.title === "Attentive")
        ?.grades[0].value.toUpperCase() || "",
    assignment:
      assessment
        .find((a) => a.title === "Assignment")
        ?.grades[0].value.toUpperCase() || "",
    behaviour:
      assessment
        .find((a) => a.title === "Behaviour")
        ?.grades[0].value.toUpperCase() || "",
    remarks: "",
  };

  if (!selectedAssessment) return null;

  return (
    <Dialog
      open={isModalOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={closeModal}
    >
      <div className="fixed inset-0 z-10 w-screen pt-20 pb-40 overflow-y-auto bg-[#00000021]">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-[1000px] rounded-xl bg-white p-[34px] backdrop-blur-2xl relative"
            style={{ boxShadow: " -1px 6px 12.5px 0px #00000021" }}
          >
            {/* Header */}
            <div className="flex justify-between items-center">
              <DialogTitle
                as="h3"
                className="text-lg font-medium flex items-center gap-4"
              >
                <div className="h-20 w-20 rounded-full overflow-hidden">
                  {selectedAssessment.student?.photoUrl ? (
                    <img
                      alt="Student"
                      src={selectedAssessment.student.photoUrl}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <FaUserCircle className="w-full h-full text-[#5358627f]" />
                  )}
                </div>
                <span>
                  {selectedAssessment?.student?.fullName || ""} – Assessment
                  Preview
                </span>
              </DialogTitle>

              <div className="text-sm text-gray-600">
                <span className="font-medium text-gray-800">Date: </span>
                {initialValues.date}
              </div>
            </div>

            {/* Preview Content */}
            <section className="mt-5 grid grid-cols-3 gap-4">
              {assessment.map((a) => {
                const key = a.title.toLowerCase() as keyof IAssesssment;

                return (
                  <div
                    key={a.title}
                    className="border border-[#E9EAEB] rounded-[12px] py-5 px-4"
                  >
                    <h4 className="mb-2 font-medium text-gray-800">
                      {a.title}
                    </h4>
                    <div>
                      <span className="inline-block py-1 px-3 rounded-full bg-[#EDF7FC] text-primary text-sm font-medium">
                        {String(initialValues[key] ?? "")}
                      </span>
                    </div>
                  </div>
                );
              })}

              <div className="border border-[#E9EAEB] rounded-[12px] py-4 px-4">
                <label className="block text-sm text-gray-600 mb-1 font-medium">
                  Remark:
                </label>
                <p className="text-sm text-gray-800">
                  {initialValues.remarks || "No remark added."}
                </p>
              </div>
            </section>

            {/* Close Button */}
            <button
              className="cursor-pointer bg-white border border-[#EFEFEF] absolute -top-8 -right-8 h-16 w-16 rounded-full flex justify-center items-center"
              onClick={closeModal}
            >
              <TfiClose className="text-[26px]" />
            </button>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default PreviewAssessmentModal;
