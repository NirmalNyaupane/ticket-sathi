import { UserRoleEnum } from "@/constants/enum";
import { createSlice } from "@reduxjs/toolkit";
import { authLoginReducer, authLogoutReducer } from "../reducers/authReducer";

//initial state for auth slicer
export interface AuthState {
  isUserLogin: boolean;
  isVerified: boolean;
  isRegisterOrganizer:boolean,
  role: UserRoleEnum;
}

const initialState:AuthState = {
  isUserLogin: false,
  isVerified: false,
  isRegisterOrganizer:false,
  role: UserRoleEnum.VISITORS,
};

const authSlice = createSlice({
  name: "authslice",
  initialState,
  reducers: {
    loginReducer: authLoginReducer,
    logoutReducer: authLogoutReducer
  },
});

//exporting action for each slice
export const { loginReducer, logoutReducer} = authSlice.actions;
//exporting reducer
export default authSlice.reducer;
