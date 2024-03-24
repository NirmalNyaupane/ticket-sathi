import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "@/types/user/userType";
import { UserRole } from "@/constants/enum";

const initialState: User = {
  role: UserRole.USER,
  phone: "",
  isVerified: false,
  fullName: "",
  email: "",
  authType: ""
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    addUser: (state, payload: PayloadAction<User>) => {
      return payload.payload;
    },
  },
});


//exporting action 
export const { addUser } = userSlice.actions;
//exporting slice
export default userSlice.reducer;