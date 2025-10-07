export interface IErrorResponse {
  status: number;
  data: {
    message: string;
    errors?: Record<string, string>;
  };
}