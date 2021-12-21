//DB Model
const { CustomError } = require("../../../../../error/error");
const db = require("../../../../../database/index");
const { slice, orderBy } = require("lodash");

const fetchPopularUsers = async (_, args, context) => {
  const users = await db.User.find({}).populate("followers");

  if (users) {
    const popularUsers = slice(
      orderBy(users, (user) => user.followers.length, ["desc"]),
      0,
      10
    );
    console.log(popularUsers);
    return popularUsers;
  } else {
    throw new CustomError("Error", "Query Failed", "Something went wrong!");
  }
};

module.exports = { fetchPopularUsers };
