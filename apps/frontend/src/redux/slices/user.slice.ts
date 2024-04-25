import { AuthType, GetCurrentUserQuery, UserRole } from "@/__generated__/graphql";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type User = GetCurrentUserQuery["getCurrentUser"];

const initialState: User= {
  role: UserRole.User,
  phone: "",
  isVerified: false,
  fullName: "",
  email: "",
  authType: AuthType.Traditional,
  id: "",
  createdAt: "",
  address:"",
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