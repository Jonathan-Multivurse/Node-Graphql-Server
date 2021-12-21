//DB Model
const { CustomError } = require("../../../../../error/error");
const db = require("../../../../../database/index");
const { verifyUser } = require("../../../../../auth/authentication");

const getProduct = async (_, args, context) => {
  const user = await verifyUser(context.auth);

  if (user) {
    const res = await db.Product.findOne({
      user: user.id,
    }).populate("user");

    return res;
  } else {
    return new CustomError("Error", "Query Failed", "Something went wrong!");
  }
};

module.exports = { getProduct };
