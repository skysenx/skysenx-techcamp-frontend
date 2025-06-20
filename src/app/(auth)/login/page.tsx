"use client";
import React, { useState } from "react";
import Logo from "../../../components/ui/Logo";
import InputField from "../../../components/ui/InputField";
import { useFormik } from "formik";
import { signInValidation } from "../../../lib/validations";
import { toast } from "sonner";
import Button from "../../../components/ui/Button";
import { dashboardRoute } from "../../../utils/route";
import { useRouter } from "next/navigation";
import { ILogin } from "../../../lib/types";



export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  console.log(loading);
  const formik = useFormik<ILogin>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signInValidation,
    onSubmit: (values) => {
      setLoading(true);
      console.log(values);
      router.push(dashboardRoute);

      setTimeout(() => {
        setLoading(false);
        toast.success("Login Successful");
      }, 1000);
    },
  });

  return (
    <section className="flex h-full">
      <div className="flex-1/2 shrink-0 flex justify-center items-center">
        <div className="w-full max-w-[500px] px-8">
          <div className="mb-[75px] w-fit mx-auto">
            <Logo w="w-[179px]" />
          </div>
          <h3 className="text-[32px] text-center">Login</h3>
          <form
            onSubmit={formik.handleSubmit}
            className="mt-[53px] flex flex-col gap-5"
          >
            <InputField
              name="email"
              label="Email"
              placeholder="Email address"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email ? formik.errors.email || null : null}
            />
            <InputField
              name="password"
              label="Password"
              placeholder="Enter password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.password ? formik.errors.password || null : null
              }
            />
            <Button
              size="lg"
              type="submit"
              className="mx-auto"
              loading={loading}
              disabled={loading || !(formik.isValid && formik.dirty)}
            >
              Login
            </Button>
          </form>
        </div>
      </div>
      <div className="login-bg bg-red-300 flex-1/2 shrink"></div>
    </section>
  );
}
