import {
  AuthRegisterErrorResponse,
  AuthRegisterResponse,
  LoginFailure,
  LoginSucessResponse,
  UserRegisterPayload
} from "@/types/auth/AuthType";
import axios, { AxiosResponse } from "axios";

//user register api
const userRegisterApi = async (
  payload: UserRegisterPayload
): Promise<AxiosResponse<AuthRegisterResponse, AuthRegisterErrorResponse>> => {
  return await axios.post(`/auth/register`, payload);
};

//otp verification api
const otpVerificationApi = async (
  email: string,
  otp: string
): Promise<AxiosResponse<any, any>> => {
  return await axios.post(`/auth/email-verification`, { email, otp });
};

//resend otp api
const resendOtpApi = async (
  email: string
): Promise<AxiosResponse<any, any>> => {
  return await axios.post(`/auth/resend-email-verification`, { email });
};

//new registered otp
const newRegisteredEmailVerification = async (data: {
  email: string;
  otp: string;
}): Promise<AxiosResponse<any, any>> => {
  return await axios.post(`/auth/email-verification`, data);
};

//login api
const loginApi  =async (data:{email:string, password:string}):Promise<AxiosResponse<LoginSucessResponse, LoginFailure>> => {
    return await axios.post(`/auth/login`, data);
}




export {
  loginApi, newRegisteredEmailVerification, otpVerificationApi, resendOtpApi, userRegisterApi
};
