//DB Model
const { CustomError } = require("../../../../../error/error");
const db = require("../../../../../database/index");
const { verifyUser } = require("../../../../../auth/authentication");
const { productUploader } = require("../../../../../config/productUploader");

const updateProduct = async (_, args, context) => {
  const user = await verifyUser(context.auth);
  const product = await db.Product.findOne({
    _id: args._id,
  });

  console.log(product);

  if (user) {
    const newImagesUri = [];
    const newImages = (await args.newImages) || [];

    for (const newImage of newImages) {
      const { createReadStream, filename, mimetype, encoding } = await newImage;
      const mime = mimetype.split("/");

      if (mime[0] !== "image") {
        throw new CustomError("Invalid file type. Expected  animage");
      }

      const uri = await productUploader.upload(createReadStream(), {
        filename,
        mimetype,
      });

      newImagesUri.push(uri);
    }

    const removedImagesIndexes = args.removedImagesIndexes || [];
    let images = product.images;

    if (removedImagesIndexes.length !== 0) {
      images = images.filter(
        (image, imageIndex) => !removedImagesIndexes.includes(imageIndex)
      );
    }

    images = images.concat(newImagesUri);

    const res = await db.Product.findOneAndUpdate(
      {
        _id: product._id,
      },
      {
        $set: {
          images: images,
          price: args.price,
          brand: args.brand,
          category: args.category,
          condition: args.condition,
          size: args.size,
          style: args.style,
          description: args.description,
        },
      },
      { new: true, omitUndefined: true, useFindAndModify: false }
    );
    res.save();
    return true;
  } else {
    return new CustomError("Error", "Query Failed", "Something went wrong!");
  }
};

module.exports = { updateProduct };
