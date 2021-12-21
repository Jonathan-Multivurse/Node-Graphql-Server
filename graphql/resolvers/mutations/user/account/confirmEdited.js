const { CustomError } = require("../../../../../error/error");
const { User, PhoneAuthCode } = require("../../../../../database/index");
const { verifyUser } = require("../../../../../auth/authentication");

const confirmEditedPhoneAuthCode = async (_, args, context) => {
  const user = await verifyUser(context.auth);
  if (user) {
    const authCode = await PhoneAuthCode.findOne({
      phoneNumber: args.phoneNumber,
      countryCode: args.countryCode,
      code: args.code,
    });

    if (!authCode) {
      return false;
    }
    const res = await User.findOneAndUpdate(
      {
        _id: user.id,
      },
      {
        $set: {
          phoneNumber: "+" + args.countryCode + args.phoneNumber,
        },
      },
      { new: true, omitUndefined: true, useFindAndModify: false }
    );

    res.save();
    return true;
  } else {
    return new CustomError("Error", "Query Failed", "Something went wrong!");
  }
};

module.exports = { confirmEditedPhoneAuthCode };
