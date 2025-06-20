"use client";
import React from "react";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useAssessmentModal } from "../../stores/modals";
import { TfiClose } from "react-icons/tfi";
import InputField from "../ui/InputField";
import { toast } from "sonner";
import { useFormik } from "formik";
import { IAssesssment } from "../../lib/types";

const AssessmentModal = () => {
  const { isModalOpen, closeModal } = useAssessmentModal();

  const formik = useFormik<IAssesssment>({
    initialValues: {
      date: "",
    },
    // validationSchema: studentValidation,
    onSubmit: (values) => {
      //   setLoading(true);
      console.log(values);
      //   router.push(studentRoute);

      setTimeout(() => {
        // setLoading(false);
        toast.success("Created Successful");
      }, 1000);
    },
  });

  return (
    <>
      <Dialog
        open={!isModalOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
        __demoMode
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-[#00000021]">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-[919px] rounded-xl bg-white p-[34px] backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 relative"
              style={{ boxShadow: " -1px 6px 12.5px 0px #00000021" }}
            >
              <div className="flex justify-between items-center">
                <DialogTitle as="h3" className="text-base/7 font-medium ">
                  Oliva Twist
                </DialogTitle>

                <InputField
                  name="date"
                  label=""
                  type="date"
                  placeholder="Enter full name"
                  value={formik.values.date}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.date ? formik.errors.date || null : null
                  }
                />
              </div>

              <Button
                className="bg-white border border-[#EFEFEF] absolute -top-8 -right-8 h-16 w-16 rounded-full overflow-hidden flex justify-center items-center cursor-pointer"
                onClick={closeModal}
              >
                <TfiClose className="text-[26px]" />
              </Button>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default AssessmentModal;
