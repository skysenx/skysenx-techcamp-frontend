"use client";
import React from "react";
import GoBack from "../../../../components/ui/GoBack";
import StudentForm from "../../../../components/forms/StudentForm";

export default function Page() {
  return (
    <section>
      <div className="mt-[24px]">
        <GoBack />
      </div>

      <div className="flex justify-center">
        <StudentForm />
      </div>
    </section>
  );
}
