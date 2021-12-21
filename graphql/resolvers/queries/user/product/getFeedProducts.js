//DB Model
const { CustomError } = require("../../../../../error/error");
const db = require("../../../../../database/index");
const { verifyUser } = require("../../../../../auth/authentication");

const getFeedProducts = async (_, args, context) => {
  const user = await verifyUser(context.auth);
  if (user) {
    const userRecord = await db.User.findById(user.id).populate("following");
    const products = await db.Product.find(
      {
        user: {
          $in: userRecord.following,
        },
      },
      {},
      { sort: { createdAt: -1 } }
    ).populate("user");

    if (products) {
      return products;
    } else {
      throw new CustomError("Error", "Query Failed", "Something went wrong!");
    }
  } else {
    throw new CustomError("Error", "Query Failed", "Something went wrong!");
  }
};

module.exports = { getFeedProducts };
