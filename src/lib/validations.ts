import * as Yup from "yup";

export const signInValidation = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
  otp: Yup.string().required("OTP is required"),
});


export const studentValidation = Yup.object({
  fullName: Yup.string()
    .required("Full name is required")
    .min(3, "Must be at least 3 characters")
    .max(50, "Must be at most 50 characters"),

  age: Yup.number()
    .typeError("Age must be a number")
    .required("Age is required")
    .min(3, "Minimum age is 3 years")
    .max(50, "Maximum age is 50 years"),

  gender: Yup.string().required("Gender is required"),

  address: Yup.string()
    .required("Address is required")
    .min(3, "Must be at least 3 characters")
    .max(50, "Must be at most 50 characters"),

  city: Yup.string()
    .required("City is required")
    .min(3, "Must be at least 3 characters")
    .max(50, "Must be at most 50 characters"),

  state: Yup.string()
    .required("State is required")
    .min(3, "Must be at least 3 characters")
    .max(50, "Must be at most 50 characters"),

  country: Yup.string()
    .required("Country is required")
    .min(3, "Must be at least 3 characters")
    .max(50, "Must be at most 50 characters"),

  program: Yup.object().shape({
    id: Yup.string().required("Program is required"),
  }),

  cohort: Yup.object().shape({
    id: Yup.string().required("Cohort is required"),
  }),

  guardianName: Yup.string()
    .required("Guardian name is required")
    .min(3, "Must be at least 3 characters")
    .max(50, "Must be at most 50 characters"),

  guardianAddress: Yup.string()
    .required("Guardian address is required")
    .min(3, "Must be at least 3 characters")
    .max(50, "Must be at most 50 characters"),

  guardianPhone: Yup.string()
    .required("Guardian contact is required")
    .matches(
      /^(07|08|09)\d{9}$/,
      "Phone number must start with 07, 08, or 09 and be 11 digits"
    ),

  guardianEmail: Yup.string()
    .email("Invalid email")
    .required("Guardian email is required"),

  guardianRelationship: Yup.string()
    .required("Relationship is required")
    .min(3, "Must be at least 3 characters")
    .max(50, "Must be at most 50 characters"),

  previousTraining: Yup.string()
    .notRequired()
    .max(50, "Must be at most 50 characters"),
});

