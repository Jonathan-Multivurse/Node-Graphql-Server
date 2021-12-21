//DB Model
const { CustomError } = require("../../../../../error/error");
const db = require("../../../../../database/index");

const getPopularCategoriesOld = async (_, args, context) => {
  const categories = await db.Product.aggregate([
    {
      $group: {
        _id: "$category",
        productsCount: { $sum: 1 },
        image: {
          $first: "$images",
        },
      },
    },
    {
      $sort: { productsCount: -1 },
    },
    {
      $project: {
        category: "$_id",
        productsCount: "$productsCount",
        photo: "$image",
      },
    },
    {
      $limit: 5,
    },
  ]);

  if (categories) {
    return categories;
  } else {
    throw new CustomError("Error", "Query Failed", "Something went wrong!");
  }
};

module.exports = { getPopularCategoriesOld };
