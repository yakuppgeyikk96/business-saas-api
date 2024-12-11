export interface ApiResponse<T> {
  status: "success" | "error";
  message?: string;
  data?: T;
  error?: {
    code: string;
    details?: any;
  };
  metadata?: {
    page?: number;
    limit?: number;
    total?: number;
  };
}
