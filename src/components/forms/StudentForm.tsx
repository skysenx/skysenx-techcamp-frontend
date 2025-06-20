"use client";
import React, { useState } from "react";
import InputField from "../ui/InputField";
import { useFormik } from "formik";
import Button from "../ui/Button";
import { IStudent } from "../../lib/types";
import { studentValidation } from "../../lib/validations";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { studentRoute } from "../../utils/route";
import SelectField from "../ui/SelectField";
import { courses } from "../../utils/contents";

export default function StudentForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const formik = useFormik<IStudent>({
    initialValues: {
      fullName: "",
      age: "",
      gender: "",
      address: "",
      city: "",
      program: "",
      previousTraining: "",
      guardianName: "",
      guardianContact: "",
      guardianEmail: "",
      guardianRelationship: "",
    },
    validationSchema: studentValidation,
    onSubmit: (values) => {
      setLoading(true);
      console.log(values);
      router.push(studentRoute);

      setTimeout(() => {
        setLoading(false);
        toast.success("Created Successful");
      }, 1000);
    },
  });

  return (
    <div className="border border-[#E9EAEB] w-full max-w-[610px] rounded-[12px] py-10 px-[60px]">
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        <h3 className="font-medium text-lg  mt-4 text-center">
          Student Details
        </h3>
        <InputField
          name="fullName"
          label="Full Name"
          placeholder="Enter full name"
          value={formik.values.fullName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.fullName ? formik.errors.fullName || null : null
          }
        />
        <div className="flex gap-[10px]">
          <InputField
            name="age"
            label="Age"
            type="number"
            min={0}
            className="input-class flex-1"
            placeholder="Enter age"
            value={formik.values.age}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.age ? formik.errors.age || null : null}
          />
          <div className="w-1/2">
            <SelectField
              name="gender"
              label="Gender"
              options={[
                {
                  label: "Male",
                  value: "male",
                },
                {
                  label: "Female",
                  value: "female",
                },
              ]}
              value={formik.values.gender}
              onChange={(val) => formik.setFieldValue("gender", val)}
              onBlur={() => formik.setFieldTouched("gender", true)}
              error={
                formik.touched.gender ? formik.errors.gender || null : null
              }
            />
          </div>
        </div>

        <InputField
          name="address"
          label="Address"
          placeholder="Enter address"
          value={formik.values.address}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.address ? formik.errors.address || null : null}
        />
        <InputField
          name="city"
          label="City"
          placeholder="Enter city"
          value={formik.values.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.city ? formik.errors.city || null : null}
        />

        <h3 className="font-medium text-lg  mt-4 text-center">Course Info</h3>
        <SelectField
          name="program"
          label="Program"
          options={courses}
          value={formik.values.program}
          onChange={(val) => formik.setFieldValue("program", val)}
          onBlur={() => formik.setFieldTouched("program", true)}
          error={formik.touched.program ? formik.errors.program || null : null}
        />
        <InputField
          name="previousTraining"
          label="Previous Training"
          placeholder="E.g. Coding Bootcamp"
          value={formik.values.previousTraining}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.previousTraining
              ? formik.errors.previousTraining || null
              : null
          }
        />

        <h4 className="text-lg font-medium mt-4 text-center">Guardian Info</h4>

        <InputField
          name="guardianName"
          label="Guardian Name"
          placeholder="Enter guardian's name"
          value={formik.values.guardianName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.guardianName
              ? formik.errors.guardianName || null
              : null
          }
        />
        <InputField
          name="guardianContact"
          label="Guardian Contact"
          placeholder="Phone number"
          value={formik.values.guardianContact}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.guardianContact
              ? formik.errors.guardianContact || null
              : null
          }
        />
        <InputField
          name="guardianEmail"
          label="Guardian Email"
          placeholder="Email address"
          value={formik.values.guardianEmail}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.guardianEmail
              ? formik.errors.guardianEmail || null
              : null
          }
        />
        <InputField
          name="guardianRelationship"
          label="Relationship"
          placeholder="e.g. Father, Sister"
          value={formik.values.guardianRelationship}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.guardianRelationship
              ? formik.errors.guardianRelationship || null
              : null
          }
        />

        <Button
          type="submit"
          loading={loading}
          disabled={loading || !(formik.isValid && formik.dirty)}
          size="sm"
          className="mt-5 w-fit mx-auto"
        >
          Save
        </Button>
      </form>
    </div>
  );
}
