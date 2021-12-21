//DB Model
const { CustomError } = require("../../../../../error/error");
const db = require("../../../../../database/index");

const getPopularCategories = async (_, args, context) => {
  const categories = await db.Category.aggregate([
    {
      $unwind: "$products",
    },
    {
      $group: {
        _id: "$_id",
        name: {
          $first: "$name",
        },
        image: {
          $first: "$image",
        },
        productsCount: { $sum: 1 },
      },
    },
    {
      $sort: {
        productsCount: -1,
      },
    },
    {
      $project: {
        _id: "$_id",
        productsCount: "$productsCount",
        name: "$name",
        image: "$image",
      },
    },

    // {
    // $sortByCount: "$products",
    //, },
    // {
    // $project: {
    //   category: "$_id",
    //   productsCount: "$productsCount",
    //   photo: "$image",
    // },
    // },
    {
      $limit: 5,
    },
  ]);

  if (categories) {
    console.log(categories);
    return categories;
  } else {
    throw new CustomError("Error", "Query Failed", "Something went wrong!");
  }
};

module.exports = { getPopularCategories };
