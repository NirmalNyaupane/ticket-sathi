import { registerEnumType } from "type-graphql";

export enum PaymentMethod {
  ESEWA = "ESEWA",
}

registerEnumType(PaymentMethod, {
  name: "PaymentMethod",
});
