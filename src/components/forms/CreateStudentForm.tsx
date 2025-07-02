"use client";
import React from "react";
import InputField from "../ui/InputField";
import { useFormik } from "formik";
import Button from "../ui/Button";
import { ICohort, IProgram, IStudent } from "../../lib/types";
import { studentValidation } from "../../lib/validations";
import SelectField from "../ui/SelectField";
import { useFindPrograms } from "../../hooks/useProgram";
import { useFindCohorts } from "../../hooks/useCohort";
import { useCreateStudent } from "../../hooks/useStudents";

export default function StudentForm() {
  const { data: programsData } = useFindPrograms();
  const { data: cohortsData } = useFindCohorts();
  const programs = programsData?.data?.programs?.map((p: IProgram) => ({
    label: p.name,
    value: p.id,
  }));
  const cohorts = cohortsData?.data?.cohorts?.map((p: ICohort) => ({
    label: p.name,
    value: p.id,
  }));
  const { mutate, isPending } = useCreateStudent();

  // console.log(programs);
  // console.log(cohorts);

  const formik = useFormik<IStudent>({
    initialValues: {
      fullName: "",
      age: 0,
      gender: "",
      address: "",
      city: "Warri",
      state: "Delta",
      country: "Nigeria",
      program: {
        id: "",
      },
      cohort: {
        id: "",
      },
      guardianName: "",
      guardianPhone: "",
      guardianEmail: "",
      guardianAddress: "",
      guardianRelationship: "",
    },
    validationSchema: studentValidation,
    onSubmit: (values) => {
      console.log("valuesss", values);
      mutate(values);
    },
  });

  return (
    <div className="border border-[#E9EAEB] w-[600px] rounded-[12px] py-10 px-[60px]">
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        <h3 className="font-medium text-lg  mt-4 text-center">
          Student Details
        </h3>
        <InputField
          name="fullName"
          label="Full Name"
          placeholder="Enter full name"
          value={formik.values.fullName || ""}
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
            value={formik.values.age || ""}
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
                  value: "M",
                },
                {
                  label: "Female",
                  value: "F",
                },
              ]}
              value={formik.values.gender || ""}
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
          value={formik.values.address || ""}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.address ? formik.errors.address || null : null}
        />
        <InputField
          name="city"
          label="City"
          placeholder="Enter city"
          value={formik.values.city || ""}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.city ? formik.errors.city || null : null}
        />
        <InputField
          name="state"
          label="State"
          placeholder="Enter state"
          value={formik.values.state || ""}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.state ? formik.errors.state || null : null}
        />
        <InputField
          name="country"
          label="Country"
          placeholder="Enter country"
          value={formik.values.country || ""}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.country ? formik.errors.country || null : null}
        />
        <InputField
          name="lastSchool"
          label="Last School"
          placeholder="Enter last school"
          value={formik.values.lastSchool || ""}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.lastSchool ? formik.errors.lastSchool || null : null
          }
        />

        <h3 className="font-medium text-lg  mt-4 text-center">Course Info</h3>
        <SelectField
          name="program"
          label="Program"
          options={programs}
          value={formik.values.program?.id || ""}
          onChange={(val) => formik.setFieldValue("program", { id: val })}
          onBlur={() => formik.setFieldTouched("program", true)}
          error={
            formik.touched.program
              ? typeof formik.errors.program === "object"
                ? (formik.errors.program as { id?: string })?.id || null
                : formik.errors.program || null
              : null
          }
        />

        <SelectField
          name="cohort"
          label="Cohort"
          options={cohorts}
          value={formik.values.cohort?.id || ""}
          onChange={(val) => formik.setFieldValue("cohort", { id: val })}
          onBlur={() => formik.setFieldTouched("cohort", true)}
          error={
            formik.touched.cohort
              ? typeof formik.errors.cohort === "object"
                ? (formik.errors.cohort as ICohort)?.id || null
                : formik.errors.cohort || null
              : null
          }
        />

        <h4 className="text-lg font-medium mt-4 text-center">Guardian Info</h4>

        <InputField
          name="guardianName"
          label="Guardian Name"
          placeholder="Enter guardian's name"
          value={formik.values.guardianName || ""}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.guardianName
              ? formik.errors.guardianName || null
              : null
          }
        />
        <InputField
          name="guardianPhone"
          label="Guardian Contact"
          placeholder="Phone number"
          type="tel"
          value={formik.values.guardianPhone || ""}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.guardianPhone
              ? formik.errors.guardianPhone || null
              : null
          }
        />
        <InputField
          name="guardianEmail"
          label="Guardian Email"
          placeholder="Email address"
          value={formik.values.guardianEmail || ""}
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
          value={formik.values.guardianRelationship || ""}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.guardianRelationship
              ? formik.errors.guardianRelationship || null
              : null
          }
        />
        <InputField
          name="guardianAddress"
          label="Guardian Address"
          placeholder="Enter address"
          value={formik.values.guardianAddress || ""}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.guardianAddress
              ? formik.errors.guardianAddress || null
              : null
          }
        />

        <Button
          type="submit"
          loading={isPending}
          disabled={isPending || !(formik.isValid && formik.dirty)}
          size="sm"
          className="mt-5 w-fit mx-auto"
        >
          Save
        </Button>
      </form>
    </div>
  );
}
