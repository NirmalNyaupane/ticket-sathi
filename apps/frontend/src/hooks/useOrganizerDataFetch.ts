import { fetchOrganizerApi } from "@/services/organizer/organizer.service";
import { OrganizerResponseType } from "@/types/organizer/organizerType";
import {
    UseQueryResult,
    useQuery
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";

const useOrganizerDataFetch = ({
  enabled,
}: {
  enabled?: boolean;
}): UseQueryResult<AxiosResponse<OrganizerResponseType, any>, Error> => {
  const response = useQuery({
    queryKey: ["fetch-organizer-profile"],
    queryFn: () => {
      return fetchOrganizerApi();
    },
    enabled: enabled ?? true,
    refetchOnMount: false,
  });

  return response;
};

export default useOrganizerDataFetch;
