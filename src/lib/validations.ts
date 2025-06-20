import * as Yup from "yup";

export const signInValidation = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const studentValidation = Yup.object({
  fullName: Yup.string().required("Full name is required"),
  age: Yup.string().required("Age is required"),
  gender: Yup.string().required("Gender is required"),
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  program: Yup.string().required("Program is required"),
  previousTraining: Yup.string().required("Previous training info is required"),
  guardianName: Yup.string().required("Guardian name is required"),
  guardianContact: Yup.string().required("Guardian contact is required"),
  guardianEmail: Yup.string()
    .email("Invalid email")
    .required("Guardian email is required"),
  guardianRelationship: Yup.string().required("Relationship is required"),
});