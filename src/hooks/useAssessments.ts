import { useMutation, useQuery } from "@tanstack/react-query";
import { userAuth, useVariables } from "../stores/variables";
import useAxiosAuth from "./auth-hooks/useAxiosAuth";
import { responseStatus } from "../utils/helpers";
import { useRouter } from "next/navigation";
import { IAssesssment, IResponse, IStudent } from "../lib/types";
import axios, { AxiosError } from "axios";
import { assessmentRoute, studentsRoute } from "../utils/route";
import { toast } from "sonner";

export const useFindAssessments = () => {
  const { page, size, from, to } = useVariables();
  const { credentials } = userAuth();
  const router = useRouter();
  const { post } = useAxiosAuth();

  const fetchAssessments = async () => {
    const { data } = await post("/assessments", {
      from,
      to,
      page,
      size,
    });
    // console.log("Students data hook:", data);
    responseStatus(data.status.code, data.status.message, router);
    return data;
  };

  return useQuery({
    queryKey: ["assessments", page, size, from, to],
    queryFn: fetchAssessments,
    // Only run query if user is authenticated
    enabled: !!credentials?.accessToken,
    // Retry on failure
    retry: 2,
    // Refetch on window focus
    refetchOnWindowFocus: false,
  });
};

export const useCreateAssessment = () => {
  const router = useRouter();
  const { post } = useAxiosAuth();

  const handleCreateAssessment = async (data: IAssesssment) => {
    const res = await post("/assessment/create", data);
    return res.data;
  };
  const mutation = useMutation<IResponse, AxiosError<IResponse>, IAssesssment>({
    mutationFn: handleCreateAssessment,
    onSuccess: (data: IResponse) => {
      responseStatus(data.status.code, data.status.message, router);
      console.log(data);
      if (data.status.code === 200) {
        router.push(assessmentRoute);
        toast.success("Created Successfully");
      }
    },
    onError: (error) => {
      console.log(error);
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.status.message
          ? error.response.data.status.message
          : "An unknown error occurred.";
      toast.error(errorMessage);
    },
  });

  // Return the mutation object to use in components
  return mutation;
};
export const useUpdateStudent = () => {
  const router = useRouter();
  const { post } = useAxiosAuth();

  const updateStudent = async (data: IStudent) => {
    const res = await post("/student/update", {
      id: data.id,
      fullName: data.fullName,
      gender: data.gender,
      age: data.age,
      address: data.address,
      city: data.city,
      state: data.state,
      country: data.country,
      lastSchool: data.lastSchool,
      guardianName: data.guardianName,
      guardianPhone: data.guardianPhone,
      guardianEmail: data.guardianEmail,
      guardianAddress: data.guardianAddress,
      guardianRelationship: data.guardianRelationship,
      programId: data.program?.id,
      cohortId: data.cohort?.id,
    });
    return res.data;
  };
  const mutation = useMutation<IResponse, AxiosError<IResponse>, IStudent>({
    mutationFn: updateStudent,
    onSuccess: (data: IResponse) => {
      responseStatus(data.status.code, data.status.message, router);
      console.log(data);
      if (data.status.code === 200) {
        router.push(studentsRoute);
        toast.success("Updated Successfully");
      }
    },
    onError: (error) => {
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.status.message
          ? error.response.data.status.message
          : "An unknown error occurred.";
      toast.error(errorMessage);
    },
  });

  // Return the mutation object to use in components
  return mutation;
};
