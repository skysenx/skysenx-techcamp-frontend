/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useAssessmentModal } from "../../stores/modals";
import { TfiClose } from "react-icons/tfi";
import InputField from "../ui/InputField";
import TextAreaField from "../ui/TextAreaField";
import { useFormik } from "formik";
import { IAssesssment } from "../../lib/types";
import { assessment } from "../../utils/contents";
import Button from "../ui/Button";
import { FaUserCircle } from "react-icons/fa";
import { useCreateAssessment } from "../../hooks/useAssessments";

const AssessModal = () => {
  const { isModalOpen, selectedStudent, closeModal } = useAssessmentModal();
  const { mutate, isPending } = useCreateAssessment();
  const today = new Date().toISOString().split("T")[0]; // e.g., "2025-06-25"

  const formik = useFormik<IAssesssment>({
    initialValues: {
      date: today || "",
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
    },
    onSubmit: (values) => {
      // console.log("Assessment for:", selectedStudent);
      // console.log(values);
      mutate(
        {
          studentId: selectedStudent?.id,
          attentive: values.attentive?.toUpperCase(),
          behaviour: values.behaviour?.toUpperCase(),
          assignment: values.assignment?.toUpperCase(),
          date: values.date,
          remarks: values.remarks,
        },
        {
          onSuccess: () => {
            formik.resetForm();
          },
        }
      );
    },
  });

  if (!selectedStudent) return null;

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
            <div className="flex justify-between items-center">
              <DialogTitle
                as="h3"
                className="text-lg font-medium flex items-center gap-4"
              >
                <div className="h-12 w-12 rounded-full overflow-hidden">
                  {selectedStudent.photoUrl ? (
                    <img
                      alt="Image"
                      src={
                        selectedStudent.photoUrl || "/images/login-image.png"
                      }
                      className="h-full w-full object-cover"
                      // height={50}
                      // width={50}
                    />
                  ) : (
                    <FaUserCircle className="w-full h-full text-[#5358627f]" />
                  )}
                </div>
                <span>{selectedStudent.fullName}</span>
              </DialogTitle>

              <InputField
                name="date"
                label=""
                type="date"
                placeholder="Select date"
                value={formik.values.date || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.date ? formik.errors.date || null : null}
              />
            </div>

            <form onSubmit={formik.handleSubmit}>
              <section className="mt-5 flex flex-col gap-2">
                {assessment.map((a) => {
                  const key = a.title.toLowerCase() as keyof IAssesssment;

                  return (
                    <div
                      key={a.title}
                      className="border border-[#E9EAEB] rounded-[12px] py-5 px-4"
                    >
                      <h4 className="mb-4">{a.title}</h4>
                      <div className="flex gap-4 justify-between flex-wrap">
                        {a.grades.map((g) => (
                          <button
                            type="button"
                            key={g.value}
                            className={`rounded-[30px] border py-[6px] px-4 w-full max-w-[160px] cursor-pointer whitespace-nowrap text-[#535862]
                              ${
                                formik.values[key] === g.value
                                  ? "bg-primary border-primary text-white"
                                  : "bg-white border-[#EFEFEF] hover:bg-primary/10 hover:border-primary/10"
                              }
                            `}
                            onClick={() => formik.setFieldValue(key, g.value)}
                          >
                            {g.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}

                <div className="border border-[#E9EAEB] rounded-[12px] py-4 px-4">
                  <TextAreaField
                    name="remarks"
                    label="Remark"
                    placeholder="Type in the remark here......."
                    value={formik.values.remarks || ""}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.remarks
                        ? formik.errors.remarks || null
                        : null
                    }
                  />
                </div>
              </section>

              <div className="mt-6 flex justify-end">
                <Button
                  loading={isPending}
                  disabled={isPending || !(formik.isValid && formik.dirty)}
                  size="sm"
                  type="submit"
                >
                  Submit Assessment
                </Button>
              </div>
            </form>

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

export default AssessModal;
