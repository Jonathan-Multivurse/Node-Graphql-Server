const { CustomError } = require("../../../../../error/error");
const { User, PhoneAuthCode } = require("../../../../../database/index");
const { random } = require("lodash");
const axios = require("axios");
const CryptoJS = require("crypto-js");

const projectID = "ncp:sms:kr:262300720864:deepy";
const secretKey = "0857bbf4a92a4db3a39f333a2b1abe99";

const naverAxiosInstance = axios.create({
  baseURL: "https://sens.apigw.ntruss.com",
});

const makeSignature = ({ method, url, timestamp, accessKey, secretKey }) => {
  const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);
  hmac.update(method);
  hmac.update(" ");
  hmac.update(url);
  hmac.update("\n");
  hmac.update(timestamp);
  hmac.update("\n");
  hmac.update(accessKey);

  const hash = hmac.finalize();

  return hash.toString(CryptoJS.enc.Base64);
};

async function sendAuthCode(authCode) {
  const { name, phoneNumber, code, countryCode } = authCode;
  const message = `your auth code is ${code}`;
  const timestamp = Date.now().toString();

  // // todo; implement sending sms
  // const AuthData = {
  //   id: projectID,
  //   key: secretKey,
  // };

  // const subAccountAccessKey = "F5A3B481F1FE8649E57F";
  // const subAccountSecretKey = "219E89F1C948697A0E4C1A0090F7467EE13C0DEC";

  const accessK = "rJ59SDtkGF5yBobdmMFa";
  const secretK = "UCY4IznwvWycLDnOGga4a65Igsx1l9WTfYM0lEjk";

  const sendSmsUrl = `/sms/v2/services/${projectID}/messages`;

  const signature = makeSignature({
    url: sendSmsUrl,
    timestamp,
    method: "POST",
    secretKey: secretK,
    accessKey: accessK,
  });

  const requestHeaders = {
    "Content-Type": "application/json; charset=utf-8",
    "x-ncp-apigw-timestamp": timestamp,
    "x-ncp-iam-access-key": accessK,
    "x-ncp-apigw-signature-v2": signature,
  };

  const requestBody = {
    type: "SMS",
    contentType: "COMM",
    countryCode,
    from: "01043909392",
    content: message,
    messages: [
      {
        to: phoneNumber,
      },
    ],
  };

  return naverAxiosInstance
    .post(sendSmsUrl, requestBody, {
      headers: requestHeaders,
    })
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      console.log(error.response);
      throw new Error("Error with request", error.response);
    });

  // todo; implement sending sms

  // console.log(phoneNumber, name, message);
}

const getPhoneAuthCode = async (_, args) => {
  const code = random(100000, 999999).toString();

  const authCode = await PhoneAuthCode.create({
    name: args.name,
    phoneNumber: args.phoneNumber,
    countryCode: args.countryCode,
    code,
  });
  await sendAuthCode(authCode);
  return true;
};

module.exports = { getPhoneAuthCode };
