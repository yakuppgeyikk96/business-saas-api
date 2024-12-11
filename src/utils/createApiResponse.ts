import { ApiResponse } from "@/types/common/ApiResponse";

export default function createApiResponse<T>(
  status: "success" | "error",
  data?: T,
  message?: string,
  metadata?: ApiResponse<T>["metadata"]
): ApiResponse<T> {
  return {
    status,
    message,
    data,
    metadata,
  };
}
