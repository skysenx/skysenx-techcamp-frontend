import { useRouter } from "next/navigation";
import useAxiosAuth from "./auth-hooks/useAxiosAuth";
import { responseStatus } from "../utils/helpers";
import { useQuery } from "@tanstack/react-query";
import { userAuth, useVariables } from "../stores/variables";

export const useFindCohorts = () => {
  const { page, size } = useVariables();
  const { credentials } = userAuth();
  const router = useRouter();
  const { post } = useAxiosAuth();

  const fetchCohorts = async () => {
    const { data } = await post("/cohorts", {
      page,
      size,
    });
    // console.log("Students data hook:", data);
    responseStatus(data.status.code, data.status.message, router);
    return data;
  };

  return useQuery({
    queryKey: ["cohorts", page, size],
    queryFn: fetchCohorts,
    // Only run query if user is authenticated
    enabled: !!credentials?.accessToken,
    // Retry on failure
    retry: 2,
    // Refetch on window focus
    refetchOnWindowFocus: false,
  });
};
