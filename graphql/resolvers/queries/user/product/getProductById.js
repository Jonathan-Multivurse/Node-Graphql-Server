//DB Model
const { CustomError } = require("../../../../../error/error");
const db = require("../../../../../database/index");
const { verifyUser } = require("../../../../../auth/authentication");

const getProductById = async (_, args, context) => {
  const user = await verifyUser(context.auth);

  if (user) {
    const product = await db.Product.findById(args._id).populate("user");

    return product;
  } else {
    return new CustomError("Error", "Query Failed", "Something went wrong!");
  }
};

module.exports = { getProductById };
