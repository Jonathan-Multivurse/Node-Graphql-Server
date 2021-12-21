//DB Model
const { CustomError } = require("../../../../error/error");
const db = require("../../../../database/index");
const { verifyUser } = require("../../../../auth/authentication");

const getProducts = async (_, args, context) => {
  const products = await db.Product.find().count();

  if (products != null) {
    return products;
  } else {
    throw new CustomError("Error", "Query Failed", "Something went wrong!");
  }
};

module.exports = { getProducts };
