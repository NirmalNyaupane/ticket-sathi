import axios, { AxiosResponse } from "axios";
import { EventCategoryFormData } from "@/types/organizer/eventCategoryType";

const CreateEventCategoryApi = async (
  data: EventCategoryFormData
): Promise<AxiosResponse<any, any>> => {
  return await axios.post("/event/category", data);
};

export {CreateEventCategoryApi};