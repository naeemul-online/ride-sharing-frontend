import type { ApiErrorResponse } from "@/types";

export default function isApiErrorResponse(err: any): err is ApiErrorResponse {
  return (
    err &&
    typeof err === "object" &&
    "data" in err &&
    typeof err.data === "object" &&
    "message" in err.data
  );
}
