import { createSlice } from "@reduxjs/toolkit";
import { authLoginReducer, authLogoutReducer } from "../reducers/authReducer";
import { UserRole } from "@/__generated__/graphql";

//initial state for auth slicer
export interface AuthState {
  isUserLogin: boolean;
  isVerified: boolean;
  role: UserRole;
  accessToken: string;
  id: string;
}

const initialState: AuthState = {
  isUserLogin: false,
  isVerified: false,
  role: UserRole.User,
  accessToken: "",
  id: "",
};

const authSlice = createSlice({
  name: "authslice",
  initialState,
  reducers: {
    loginReducer: authLoginReducer,
    logoutReducer: authLogoutReducer,
  },
});

//exporting action for each slice
export const { loginReducer, logoutReducer } = authSlice.actions;

//exporting reducer
export default authSlice.reducer;
