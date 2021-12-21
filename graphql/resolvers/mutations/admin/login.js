const { CustomError } = require("../../../../error/error");
const { Admin } = require("../../../../database/index");
const {
  adminAccessToken,
  adminRefreshToken,
} = require("../../../../auth/authentication");

const loginAdmin = async (_, args, context) => {
  let admin = await Admin.findOne({
    usernameId: args.usernameId,
    password: args.password,
  });

  console.log(admin);
  if (admin == null) throw new CustomError("Login Error!");

  const acctoken = adminAccessToken(admin);
  const reftoken = adminRefreshToken(admin);

  console.log(acctoken, reftoken);

  if (admin != null) {
    res = await Admin.findOneAndUpdate(
      {
        usernameId: args.usernameId,
      },
      {
        accessToken: acctoken,
        refreshToken: reftoken,
      },
      {
        new: true,
        useFindAndModify: false,
      }
    );
    console.log(res);
    // res.save();
    return res;
  }
};

module.exports = { loginAdmin };
