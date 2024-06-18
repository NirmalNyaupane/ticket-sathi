import { BookingObjectType } from "@/__generated__/graphql";
export const handleEsewaPayment = async (data: BookingObjectType) => {
  const { esewaPayload } = data;

  const form = document.createElement("form");
  form.method = "POST";
  form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

  const { __typename, ...remaining } = esewaPayload;
  for (const [key, value] of Object.entries(remaining)) {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = key;
    input["value"] = value.toString();
    input.required = true;
    form.appendChild(input);
  }

  document.body.appendChild(form);
  form.submit();
};
