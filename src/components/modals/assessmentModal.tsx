"use client";

import React, { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useAssessmentModal } from "../../stores/modals";
import { TfiClose } from "react-icons/tfi";
import InputField from "../ui/InputField";
import TextAreaField from "../ui/TextAreaField";
import { toast } from "sonner";
import { useFormik } from "formik";
import { IAssesssment } from "../../lib/types";
import { assessment } from "../../utils/contents";
import Button from "../ui/Button";

const AssessmentModal = () => {
  const { isModalOpen, closeModal } = useAssessmentModal();
  const [loading, setLoading] = useState(false);

  const formik = useFormik<IAssesssment>({
    initialValues: {
      date: "",
      attentive:
        assessment.find((a) => a.title === "Attentive")?.grades[0].value || "",
      assignment:
        assessment.find((a) => a.title === "Assignment")?.grades[0].value || "",
      punctuality:
        assessment.find((a) => a.title === "Punctuality")?.grades[0].value ||
        "",
      behaviour:
        assessment.find((a) => a.title === "Behaviour")?.grades[0].value || "",
      remark: "",
    },
    onSubmit: (values) => {
      setLoading(true);
      console.log(values);
      setTimeout(() => {
        setLoading(false);
        closeModal();
        toast.success("Successful");
        formik.resetForm();
      }, 1000);
    },
  });

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
              <DialogTitle as="h3" className="text-base font-medium">
                Oliva Twist
              </DialogTitle>

              <InputField
                name="date"
                label=""
                type="date"
                placeholder="Select date"
                value={formik.values.date}
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
                      className="border border-[#E9EAEB] rounded-[12px] py-[25px] px-4"
                    >
                      <h4 className="mb-4">{a.title}</h4>
                      <div className="flex gap-4 justify-between flex-wrap">
                        {a.grades.map((g) => (
                          <button
                            type="button"
                            key={g.value}
                            className={`rounded-[30px] border py-[10px] px-4 w-full max-w-[151px] cursor-pointer whitespace-nowrap text-[#535862]
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
                    name="remark"
                    label="Remark"
                    placeholder="Type in the remark here......."
                    value={formik.values.remark}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.remark
                        ? formik.errors.remark || null
                        : null
                    }
                  />
                </div>
              </section>

              <div className="mt-6 flex justify-end">
                <Button
                  loading={loading}
                  disabled={loading || !(formik.isValid && formik.dirty)}
                  size="sm"
                  type="submit"
                  className=""
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

export default AssessmentModal;
