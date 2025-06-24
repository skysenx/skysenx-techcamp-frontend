import { toast } from "sonner";
import { loginRoute } from "./route";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const responseStatus = (
  statusCode: number,
  message: string,
  router: AppRouterInstance | string[]
) => {
  switch (statusCode) {
    case 10002:
      router.push(loginRoute);
      toast.error(message);
      break;
    case 11001:
      toast.error(message);
      break;
    default:
      // dispatch(fetchUserSuccess({ ...res.data.data.user }));
      // console.log(res.data);
      // toast.success('Success');
      break;
  }
};
