import { useMutation, useQuery } from "@tanstack/react-query";
import { userAuth, useVariables } from "../stores/variables";
import useAxiosAuth from "./auth-hooks/useAxiosAuth";
import { responseStatus } from "../utils/helpers";
import { useRouter } from "next/navigation";
import { IResponse, IStudent } from "../lib/types";
import axios, { AxiosError } from "axios";
import { studentsRoute } from "../utils/route";
import { toast } from "sonner";

export const useFindStudents = () => {
  const { page, size, filterCriteria, filterValue } = useVariables();
  const { credentials } = userAuth();
  const router = useRouter();
  const { post } = useAxiosAuth();

  const fetchStudents = async () => {
    const { data } = await post("/students", {
      filterCriteria,
      filterValue,
      page,
      size,
    });
    console.log("Students data hook:", filterCriteria, filterValue);
    responseStatus(data.status.code, data.status.message, router);
    return data;
  };

  return useQuery({
    queryKey: ["students", page, size, filterCriteria, filterValue],
    queryFn: fetchStudents,
    // Only run query if user is authenticated
    enabled: !!credentials?.accessToken,
    // Retry on failure
    retry: 2,
    // Refetch on window focus
    refetchOnWindowFocus: false,
  });
};

export const useFindStudent = (id: string) => {
  const { credentials } = userAuth();
  const router = useRouter();
  const { post } = useAxiosAuth();

  const fetchStudent = async () => {
    const { data } = await post("/student", {
      id,
    });
    // console.log("Students data hook:", data);
    responseStatus(data.status.code, data.status.message, router);
    return data;
  };

  return useQuery({
    queryKey: ["student", id],
    queryFn: fetchStudent,
    // Only run query if user is authenticated
    enabled: !!credentials?.accessToken,
    // Retry on failure
    retry: 2,
    // Refetch on window focus
    refetchOnWindowFocus: false,
  });
};

export const useCreateStudent = () => {
  const router = useRouter();
  const { post } = useAxiosAuth();

  const createStudent = async (data: IStudent) => {
    const res = await post("/student/create", {
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
    mutationFn: createStudent,
    onSuccess: (data: IResponse) => {
      responseStatus(data.status.code, data.status.message, router);
      console.log(data);
      if (data.status.code === 200) {
        router.push(studentsRoute);
        toast.success("Created Successfully");
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
