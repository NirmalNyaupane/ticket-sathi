import crypto from "crypto";
const OtpGenerator = () => {
  const otp = Math.floor(Math.random() * 900000) + 100000;
  return otp;
};

export function createEsewaSignature(message: string) {
  console.log(message);
  const secret = "8gBm/:&EnhH.1/q";

  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(message);

  const hashInBase64 = hmac.digest("base64");
  return hashInBase64;
}

class HTTPStatusCode {
  static OK = 200;
  static CREATED = 201;
  static NO_CONTENT = 204;
  static BAD_REQUEST = 400;
  static UNAUTHORIZED = 401;
  static FORBIDDEN = 403;
  static NOT_FOUND = 404;
  static METHOD_NOT_ALLOWED = 405;
  static INTERNAL_SERVER_ERROR = 500;
  static BAD_GATEWAY = 502;
  static SERVICE_UNAVAILABLE = 503;
  static GATEWAY_TIMEOUT = 504;
}

export { OtpGenerator, HTTPStatusCode };
