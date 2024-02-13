import { OrganizerProfile } from "@/types/organizer/organizerType";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: OrganizerProfile = {
  id: "",
  userId: "",
  organizer_name: "",
  logo: "",
  description: "",
  website: "",
  address: "",
  social_links: [],
  status: "",
  createdAt: "",
  updatedAt: "",
};

const organizerSlice = createSlice({
  name: "organizerslice",
  initialState,
  reducers: {
    addOrganizer: (state, dispatch: PayloadAction<OrganizerProfile>) => {
      return { ...dispatch.payload };
    },
  },
});


//exporting organizer slice action 
export const {addOrganizer} = organizerSlice.actions;

//exporting organizer reducer
export default organizerSlice.reducer;