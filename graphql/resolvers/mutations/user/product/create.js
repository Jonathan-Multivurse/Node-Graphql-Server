//DB Model
const { CustomError } = require("../../../../../error/error");
const db = require("../../../../../database/index");
const { verifyUser } = require("../../../../../auth/authentication");
const { productUploader } = require("../../../../../config/productUploader");

const createProduct = async (_, args, context) => {
  const user = await verifyUser(context.auth);

  if (user) {
    const imagesUri = [];
    const images = (await args.images) || [];

    for (const image of images) {
      const { createReadStream, filename, mimetype, encoding } = await image;
      const mime = mimetype.split("/");

      if (mime[0] !== "image") {
        throw new CustomError("Invalid file type. Expected  animage");
      }

      const uri = await productUploader.upload(createReadStream(), {
        filename,
        mimetype,
      });

      imagesUri.push(uri);
    }
    const res = await db.Product.create({
      images: imagesUri,
      price: args.price,
      brand: args.brand,
      category: args.category,
      condition: args.condition,
      size: args.size,
      style: args.style,
      description: args.description,
      soldOut: args.soldOut,
      user: user.id,
    });

    if (args.category) {
      const [mainCategory, ...subCategoryArray] = args.category.split("/");
      const subCategory = subCategoryArray.join("/");

      console.log(mainCategory, subCategory);

      let categoryRecord;

      if (mainCategory) {
        const mainCategoryRecord = await db.Category.findOne({
          name: mainCategory,
        });

        if (subCategory) {
          categoryRecord = await db.Category.findOne({
            name: subCategory,
          });
        } else {
          categoryRecord = mainCategoryRecord;
        }

        if (categoryRecord) {
          categoryRecord.products.push(res);
          await categoryRecord.save();
        }
      }
    }

    const notify = await db.Notification.create({
      user: user.id,
      message: "Congrats, product uploaded successfully!",
    });
    const put = await db.User.findOneAndUpdate(
      {
        _id: user.id,
      },
      {
        $addToSet: {
          myProducts: res,
          notifications: notify,
        },
      }
    );
    return true;
  } else {
    throw new CustomError("Error", "Mutation Failed", "Something went wrong!");
  }
};

module.exports = { createProduct };
