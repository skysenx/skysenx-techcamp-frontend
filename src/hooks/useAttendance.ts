import { useRouter } from "next/navigation";
import { userAuth, useVariables } from "../stores/variables";
import useAxiosAuth from "./auth-hooks/useAxiosAuth";
import { responseStatus } from "../utils/helpers";
import { useQuery } from "@tanstack/react-query";

export const useFindAttendance = () => {
  const { page, size, from, to, filterCriteria, filterValue } = useVariables();
  const { credentials } = userAuth();
  const router = useRouter();
  const { post } = useAxiosAuth();

  const fetchAttendnaces = async () => {
    const { data } = await post("/attendances", {
      filterCriteria,
      filterValue,
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
    queryKey: [
      "attendances",
      page,
      size,
      from,
      to,
      filterCriteria,
      filterValue,
    ],
    queryFn: fetchAttendnaces,
    // Only run query if user is authenticated
    enabled: !!credentials?.accessToken,
    // Retry on failure
    retry: 2,
    // Refetch on window focus
    refetchOnWindowFocus: false,
  });
};
