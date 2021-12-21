const { CustomError } = require("../../../../../error/error");
const { Category } = require("../../../../../database/index");
const { verifyUser } = require("../../../../../auth/authentication");

const getCategories = async (_, args, context) => {
  const user = await verifyUser(context.auth);
  if (user) {
    const categories = await Category.find(
      {
        base_category: null,
      },
      {}
    )
      .populate("products")
      .populate({ path: "sub_categories", populate: { path: "products" } });

    return categories;
  } else if (!user) {
    return CustomError("Error", "Mutation Failed", "Something went wrong!");
  }
};

module.exports = { getCategories };
