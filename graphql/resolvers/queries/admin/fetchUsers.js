const { CustomError } = require("../../../../error/error");
const { User } = require("../../../../database/index");

const fetchUsers = async (_, args) => {
  const res = await User.find().count();
  if (res != null) {
    return res;
  } else {
    throw new CustomError("Error", "Query Failed", "Something went wrong!");
  }
};

module.exports = { fetchUsers };
