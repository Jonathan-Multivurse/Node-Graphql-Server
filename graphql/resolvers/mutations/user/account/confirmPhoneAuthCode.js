const { CustomError } = require("../../../../../error/error");
const { User, PhoneAuthCode } = require("../../../../../database/index");
const {
  accessToken,
  refreshToken,
} = require("../../../../../auth/authentication");

const confirmPhoneAuthCode = async (_, args) => {
  const authCode = await PhoneAuthCode.findOne({
    phoneNumber: args.phoneNumber,
    countryCode: args.countryCode,
    code: args.code,
  });

  if (!authCode) {
    return false;
  }

  let res = await User.create({
    usernameId: Math.random().toString(36).substr(2, 6),
    password: Math.random().toString(36).substr(2, 8),
    phoneNumber: "+" + args.countryCode + args.phoneNumber,
  });

  const acctoken = accessToken(res);
  const reftoken = refreshToken(res);

  let update = await User.findOneAndUpdate(
    {
      phoneNumber: "+" + args.countryCode + args.phoneNumber,
    },
    {
      accessToken: acctoken,
      refreshToken: reftoken,
    },
    { new: true, omitUndefined: true, useFindAndModify: false }
  );

  res.save();

  update.save();

  return update;
};

module.exports = { confirmPhoneAuthCode };
