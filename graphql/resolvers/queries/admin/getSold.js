//DB Model
const { CustomError } = require("../../../../error/error");
const db = require("../../../../database/index");
const { verifyUser } = require("../../../../auth/authentication");

const getSold = async (_, args, context) => {
  const sold = await db.Product.find({
    soldOut: true,
  }).count();

  if (sold != null) {
    return sold;
  } else {
    throw new CustomError("Error", "Query Failed", "Something went wrong!");
  }
};

module.exports = { getSold };
