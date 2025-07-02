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
    case 11301:
      toast.warning(message);
      break;
    default:
      // dispatch(fetchUserSuccess({ ...res.data.data.user }));
      // console.log(res.data);
      // toast.success('Success');
      break;
  }
};

// utils/formatDateTime.ts
// utils/formatDateTime.ts
// const formatter = new Intl.DateTimeFormat("en-US", {
//   hour: "numeric",
//   minute: "2-digit",
//   hour12: false,
//   day: "numeric",
//   month: "short",
//   year: "numeric",
// });

// /**
//  * Formats a valid ISO or Date object into:
//  * "1:06 PM, June 18, 2025"
//  * Returns "-" if input is invalid.
//  */
// export function formatDateTime(raw: string | Date | null | undefined): string {
//   if (!raw) return "-";
//   const date = raw instanceof Date ? raw : new Date(raw);
//   if (isNaN(date.getTime())) return "-";
//   return formatter.format(date);
// }

// utils/formatDateTime.ts
export function formatDateTime(raw: string | Date | null | undefined): string {
  if (!raw) return "-";
  const date = raw instanceof Date ? raw : new Date(raw);
  if (isNaN(date.getTime())) return "-";

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 || 12;
  const paddedMinutes = minutes.toString().padStart(2, "0");

  const time = `${hour12}:${paddedMinutes} ${ampm}`;
  const datePart = date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return `${time}, ${datePart}`;
}

export function capitalizeWords(str: string): string {
  return str.replace(/\b\w/g, (char: string) => char.toUpperCase());
}