//DB Model
const { CustomError } = require("../../../../../error/error");
const db = require("../../../../../database/index");
const { verifyUser } = require("../../../../../auth/authentication");

const getSoldProducts = async (_, args, context) => {
  const user = await verifyUser(context.auth);

  if (user) {
    const res = await db.Product.find({
      user: user.id,
      soldOut: true,
    }).count();

    return res;
  } else {
    return new CustomError("Error", "Query Failed", "Something went wrong!");
  }
};

module.exports = { getSoldProducts };
