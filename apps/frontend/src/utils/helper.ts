import { ApiFailureError } from "@/types/generics/ApiGenericsType";
import { AxiosError } from "axios";

const showError = (error:any) => {
  return error.networkError.result.errors[0].message;
};


const firstCharacterOfFullName = (fullName:string)=>{
      if(!fullName) return null;
      const firstCharacter = fullName.split(" ").map((name)=>name.charAt(0));
      return firstCharacter.join("");
}
export { showError, firstCharacterOfFullName};
