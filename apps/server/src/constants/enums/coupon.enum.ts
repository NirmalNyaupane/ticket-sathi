import { registerEnumType } from "type-graphql";

export enum CouponType {
  FLAT = "FLAT",
  PERCENTAGE = "PERCENTAGE",
}

export enum CouponStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

registerEnumType(CouponType, {
  name: "CouponType",
});

registerEnumType(CouponStatus, {
  name: "CouponStatus",
});
