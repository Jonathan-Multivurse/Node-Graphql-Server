//DB Model
const { CustomError } = require("../../../../../error/error");
const db = require("../../../../../database/index");
const { verifyUser } = require("../../../../../auth/authentication");

const updateSoldProduct = async (_, args, context) => {
  const user = await verifyUser(context.auth);
  const product = await db.Product.findOne({
    _id: args._id,
  });

  if (user) {
    const res = await db.Product.findOneAndUpdate(
      {
        _id: product._id,
      },
      {
        $set: {
          soldOut: args.soldOut,
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

module.exports = { updateSoldProduct };
