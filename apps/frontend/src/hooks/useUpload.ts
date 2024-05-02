import { MediaType, useUploadMediaMutation } from "../__generated__/graphql";

const upload = (fileParameter: { media: File; fileType: MediaType }) => {
  return fileParameter;
};
export const useUpload = async () => {
  const [mutation, { ...restResult }] = useUploadMediaMutation();

  return {
    upload,
  };
};
