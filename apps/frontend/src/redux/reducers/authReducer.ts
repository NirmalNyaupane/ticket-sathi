import { LoginSucessResponse } from "@/types/auth/AuthType";
import { Draft, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "../slices/auth.slice";
import { deleteCookie, setCookie } from "@/utils/cookie";
import { AUTH_COOKIE_NAME } from "@/constants/config";
import { UserRoleEnum } from "@/constants/enum";

const authLoginReducer = (
  state: Draft<AuthState>,
  action: PayloadAction<LoginSucessResponse>
) => {
  const { access_token, is_organizer_registered, is_verified, role } =
    action.payload;

  setCookie({
    cookieName: AUTH_COOKIE_NAME as string,
    cookieValue: access_token,
  });

  state.isRegisterOrganizer = is_organizer_registered;
  state.isVerified = is_verified;
  state.role = role;
  if (is_verified) {
    state.isUserLogin = true;
  } else {
    state.isUserLogin = false;
  }
};


const authLogoutReducer = (state:Draft<AuthState>)=>{
  deleteCookie(AUTH_COOKIE_NAME as string);
  state.isRegisterOrganizer = false;
  state.isUserLogin = false;
  state.isVerified = false;
  state.role = UserRoleEnum.VISITORS;
}

export { authLoginReducer, authLogoutReducer };
