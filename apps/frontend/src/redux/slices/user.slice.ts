import { AuthType, UserRole } from "@/__generated__/graphql";
import { User } from "@/types/user/userType";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: User = {
  role: UserRole.User,
  phone: "",
  isVerified: false,
  fullName: "",
  email: "",
  authType: AuthType.Traditional,
  id: "",
  createdAt: "",
  profile: {
    __typename: undefined,
    name: undefined
  }
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