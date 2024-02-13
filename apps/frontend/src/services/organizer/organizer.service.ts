import { OrganizerResponseType } from "@/types/organizer/organizerType";
import axios, { AxiosResponse } from "axios";

const fetchOrganizerApi = async (): Promise<
  AxiosResponse<OrganizerResponseType, any>
> => {
  return await axios.get("/organizer");
};



export { fetchOrganizerApi };
