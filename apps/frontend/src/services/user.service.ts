import { UserResponse } from "@/types/user/userType";
import axios, { AxiosResponse } from "axios";

const getCurrentUserApi = async (): Promise<AxiosResponse<UserResponse, any>> => {
  return await axios.get(`/user/current-user`);
};

export { getCurrentUserApi };
