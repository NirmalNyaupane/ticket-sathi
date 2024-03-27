import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "@/types/user/userType";
import { UserRole } from "@/constants/enum";
import { AuthType, GetCurrentUserQuery } from "@/__generated__/graphql";

const initialState: User = {
  role: UserRole.USER,
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