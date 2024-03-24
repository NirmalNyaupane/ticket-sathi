import { AUTH_COOKIE_NAME } from "@/constants/config";
import { LoginSucessResponse } from "@/types/auth/AuthType";
import { deleteCookie, setCookie } from "@/utils/cookie";
import { Draft, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "../slices/auth.slice";

const authLoginReducer = (
  state: Draft<AuthState>,
  action: PayloadAction<LoginSucessResponse>
) => {
  const { accessToken, isVerified, role } =
    action.payload;

  setCookie({
    cookieName: AUTH_COOKIE_NAME as string,
    cookieValue: accessToken,
  });

  state.isVerified = isVerified;
  state.role = role;
  if (isVerified) {
    state.isUserLogin = true;
  } else {
    state.isUserLogin = false;
  }
};


const authLogoutReducer = (state: Draft<AuthState>) => {
  deleteCookie(AUTH_COOKIE_NAME as string);
  state.isUserLogin = false;
  state.isVerified = false;
}

export { authLoginReducer, authLogoutReducer };

