const { CustomError } = require("../../../../../error/error");
const { User } = require("../../../../../database/index");
const {
  accessToken,
  refreshToken,
} = require("../../../../../auth/authentication");

const loginUser = async (_, args) => {
  console.log(args);
  let user = await User.findOne({
    usernameId: args.usernameId,
    password: args.password,
  });

  if (!user) throw new CustomError("Login Error!");

  const acctoken = accessToken(user);
  const reftoken = refreshToken(user);

  console.log(acctoken, reftoken);

  if (user) {
    res = await User.findOneAndUpdate(
      {
        _id: user.id,
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
    res.save();
    return res;
  }
};

module.exports = { loginUser };
