const { CustomError } = require("../../../../../error/error");
const { User } = require("../../../../../database/index");

const authenticateUser = async (_, args, context) => {
  const res = await User.create(args);
  if (res) {
    return res;
  } else {
    throw new CustomError("Error", "Mutation Failed", "Something went wrong!");
  }
};

module.exports = { authenticateUser };
