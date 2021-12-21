const { CustomError } = require("../../../../../error/error");
const { Category } = require("../../../../../database/index");
const { verifyUser } = require("../../../../../auth/authentication");

const getCategoryById = async (_, args, context) => {
  const user = await verifyUser(context.auth);
  if (user) {
    const category = await Category.findById(args._id)
      .populate("products")
      .populate({ path: "sub_categories", populate: { path: "products" } });

    if (!category) {
      return new CustomError("Error", "Query failed", "Unable to get category");
    }

    console.log(category);

    return category;
  } else if (!user) {
    return new CustomError("Error", "Mutation Failed", "Something went wrong!");
  }
};

module.exports = { getCategoryById };
