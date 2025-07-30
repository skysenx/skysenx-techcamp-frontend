import { useRouter } from "next/navigation";
import useAxiosAuth from "./auth-hooks/useAxiosAuth";
import { responseStatus } from "../utils/helpers";
import { useQuery } from "@tanstack/react-query";
import { userAuth, useVariables } from "../stores/variables";

export const useFindPrograms = () => {
  const { page, size } = useVariables();
  const { credentials } = userAuth();
  const router = useRouter();
  const { post } = useAxiosAuth();

  const fetchPrograms = async () => {
    const { data } = await post("/programs", {
      page,
      size:100,
    });
    // console.log("Students data hook:", data);
    responseStatus(data.status.code, data.status.message, router);
    return data;
  };

  return useQuery({
    queryKey: ["programs", page, size],
    queryFn: fetchPrograms,
    // Only run query if user is authenticated
    enabled: !!credentials?.accessToken,
    // Retry on failure
    retry: 2,
    // Refetch on window focus
    refetchOnWindowFocus: false,
  });
};
