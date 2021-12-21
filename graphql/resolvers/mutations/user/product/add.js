const { User, Product } = require("../../../../../database/index");
const { verifyUser } = require("../../../../../auth/authentication");

const addProduct = async (_, args, context) => {
  const user = await verifyUser(context.auth);
  const product = await Product.findOne({
    _id: args._id,
  });
  try {
    const res = await User.findOneAndUpdate(
      {
        _id: user.id,
      },
      {
        $addToSet: {
          myCart: product,
        },
      }
    );
    res.save();
    return true;
  } catch (error) {
    console.log(`Error : ${error}`);
    return false;
  }
};

module.exports = { addProduct };
