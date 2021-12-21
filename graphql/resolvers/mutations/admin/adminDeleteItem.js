const { Admin, Product } = require("../../../../database/index");
const { verifyAdmin } = require("../../../../auth/authentication");
const { CustomError } = require("../../../../error/error");

const adminDeleteItem = async (_, args, context) => {
  const admin = await verifyAdmin(context.auth);
  const product = await Product.findById({
    _id: args.productId,
  });
  console.log(product);
  if (admin) {
    const res = await product.deleteOne();
    res;
    return true;
  } else {
    new CustomError("Error", "Query Failed", "Something went wrong!");
    return false;
  }
};

module.exports = { adminDeleteItem };
