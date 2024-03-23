import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "@/types/user/userType";
import { UserRole } from "@/constants/enum";

const initialState: User = {
  id: "",
  full_name: "",
  email: "",
  phone_number: "",
  avatar: "",
  role: UserRole.USER,
  address: "",
  is_verified: false,
  createdAt: "",
  updatedAt: "",
  is_organizer_registered: false,
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
export const {addUser} = userSlice.actions;
//exporting slice
export default userSlice.reducer;