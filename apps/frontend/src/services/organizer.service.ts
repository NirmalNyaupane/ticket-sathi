import { OrganizerRegisterFormData } from "@/types/auth/AuthType";
import axios, { AxiosResponse } from "axios";

const registerOrganizerApi = async (
  payload: OrganizerRegisterFormData
): Promise<AxiosResponse<any, any>> => {
  const formData = new FormData();
  formData.append("organizer_name", payload.organizer_name);
  formData.append("description", payload.description);
  formData.append("address", payload.address);
  formData.append("website", payload.website);

  const socialLinks = payload.social_links.map((social) => {
    return {
      name: social.name,
      url: social.url,
    };
  });

  formData.append("social_links[]", JSON.stringify(socialLinks));
  formData.append("logo", payload.logo);

  return axios.post("/organizer/register", formData);
};

export { registerOrganizerApi };

