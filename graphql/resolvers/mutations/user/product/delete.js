const { User, Product } = require("../../../../../database/index");
const { verifyUser } = require("../../../../../auth/authentication");

const deleteProduct = async (_, args, context) => {
  const user = await verifyUser(context.auth);
  const product = await Product.findOne({
    _id: args._id,
  });
  if (user) {
    const res = await product.deleteOne();
    res;
    return true;
  } else {
    new CustomError("Error", "Query Failed", "Something went wrong!");
    return false;
  }
};

module.exports = { deleteProduct };
