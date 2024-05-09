export interface ApiSucessResponse<T> {
  statusCode: number;
  data: T;
  message: string;
  sucess: boolean;
}

export interface ApiSucessArrayResponse<T> {
  statusCode: number;
  data: T[];
  message: string;
  sucess: boolean;
}

export interface ApiFailureError<T> {
  statusCode: number;
  error: T | null | [] | T[];
  message: string;
}
