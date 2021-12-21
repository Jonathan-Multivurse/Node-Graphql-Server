const { CustomError } = require("../../../../../error/error");
const { User } = require("../../../../../database/index");
const { verifyUser } = require("../../../../../auth/authentication");
const { profileUploader } = require("../../../../../config/profileUploader");
const { productUploader } = require("../../../../../config/productUploader");

const updateUser = async (_, args, context) => {
  const user = await verifyUser(context.auth);
  if (user) {
    const res = await User.findOneAndUpdate(
      {
        _id: user.id,
      },
      {
        $set: {
          usernameId: args.usernameId,
          introduction: args.introduction,
        },
      },
      { new: true, omitUndefined: true, useFindAndModify: false }
    );
    return res;
  } else if (!user) {
    return CustomError("Error", "Mutation Failed", "Something went wrong!");
  }
};

const updateUserPhoto = async (_, args, context) => {
  const user = await verifyUser(context.auth);

  if (user) {
    //upload profile photo
    const photo = await args.profilePhoto;
    const { filename, mimetype, encoding, createReadStream } = photo;

    const mime = mimetype.split("/");

    if (mime[0] !== "image") {
      throw new CustomError("Invalid file type. Expected  animage");
    }

    const uri = await profileUploader.upload(createReadStream(), {
      filename,
      mimetype,
      encoding,
    });

    //upload to db
    const resp = await User.findOneAndUpdate(
      {
        _id: user.id,
      },
      {
        $set: {
          profilePhoto: uri,
        },
      },
      { new: true, omitUndefined: true, useFindAndModify: false }
    );

    resp.save();
    console.log(filename, mimetype, encoding, uri);
    return {
      filename,
      mimetype,
      encoding,
      uri,
      resp,
    };
  } else {
    return new CustomError("Error", "Mutation Failed", "Something went wrong!");
  }
};

const uploadProducts = async (_, args, context) => {
  const user = await verifyUser(context.auth);

  if (user) {
    const images = await args.productsImages;
    console.log(typeof images, images.length);

    const uploadedImages = [];

    for (const image of images) {
      console.log(image);
      const { createReadStream, filename, mimetype, encoding } = await image;
      const mime = mimetype.split("/");

      if (mime[0] !== "image") {
        throw new CustomError("Invalid file type. Expected  animage");
      }

      const uri = await productUploader.upload(createReadStream(), {
        filename,
        mimetype,
        encoding,
      });

      uploadedImages.push({
        filename,
        mimetype,
        encoding,
        uri,
      });
    }
    console.log(uploadedImages);

    return uploadedImages;
  } else {
    return CustomError("Error", "Mutation Failed", "Something went wrong!");
  }
};

module.exports = { updateUser, updateUserPhoto, uploadProducts };
