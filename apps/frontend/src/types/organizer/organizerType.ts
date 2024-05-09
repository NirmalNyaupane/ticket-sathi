import { ApiSucessResponse } from "../generics/ApiGenericsType"
export interface OrganizerProfile {
    id: string
    userId: string
    organizer_name: string
    logo: string
    description: string
    website: string
    address: string
    social_links: SocialLinks[]
    status: string
    createdAt: string
    updatedAt: string
  }


interface SocialLinks{
    label:string;
    url:string;
}

export type OrganizerResponseType = ApiSucessResponse<OrganizerProfile>;