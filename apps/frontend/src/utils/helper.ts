import { ApiFailureError } from "@/types/generics/ApiGenericsType";
import { AxiosError } from "axios";

const showError = (error: AxiosError<ApiFailureError<any>>) => {
  return error.response?.data?.error?.length > 0
    ? error.response?.data?.error[0]
    : error.response?.data.message
    ? error?.response?.data?.message
    : error.message;
};


const firstCharacterOfFullName = (fullName:string)=>{
      if(!fullName) return null;
      const firstCharacter = fullName.split(" ").map((name)=>name.charAt(0));
      return firstCharacter.join("");
}
export { showError, firstCharacterOfFullName};
