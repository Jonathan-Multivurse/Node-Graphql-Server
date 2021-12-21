const { CustomError } = require("../../../../../error/error");
const {
  User,
  Notification,
  Category,
} = require("../../../../../database/index");
const { verifyUser } = require("../../../../../auth/authentication");

const createCategory = async (_, args, context) => {
  const user = await verifyUser(context.auth);
  if (user) {
    // const existingCategory = await Category.findOne({
    //   name: args.name,
    // }).populate("sub_categories");

    // const category = existingCategory
    //   ? existingCategory
    //   : (
    //       await Category.create({
    //         name: args.name,
    //         image: args.image,
    //       })
    //     ).populate("sub_categories");

    // const subCategories = args.subCategories || [];

    // for (const subCategory of args.subCategories) {
    //   const subCategoryRecord = await Category.create({
    //     ...subCategory,
    //     base_category: category.id,
    //   });

    //   await Category.findByIdAndUpdate(category.id, {
    //     $addToSet: {
    //       sub_categories: subCategoryRecord.id,
    //     },
    //   });
    // }

    // const categoryRecord = (await category).populate("sub_categories");

    const existingCategory = await Category.findOne({
      name: args.name,
    });
    const category = existingCategory
      ? existingCategory
      : await Category.create({
          name: args.name,
          image: args.image || "",
        });

    const subCategories = args.subCategories || [];

    for (const subCategory of subCategories) {
      const subCategoryRecord = await Category.create({
        ...subCategory,
        image: subCategory.image || "",
        base_category: category.id,
      });
      category.sub_categories.push(subCategoryRecord);
    }

    await category.save();
    const categoryRecord = await Category.findById(category.id).populate(
      "sub_categories"
    );

    return categoryRecord;
  } else {
    return new CustomError("Error", "Mutation Failed", "Something went wrong!");
  }
};

module.exports = { createCategory };
