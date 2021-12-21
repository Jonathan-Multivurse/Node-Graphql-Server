//DB Model
const { CustomError } = require("../../../../../error/error");
const db = require("../../../../../database/index");

const searchProducts = async (_, args, context) => {
    // const products = await db.Product.find(
    //     { $text : { $search : args.searchText } },
    //     {},
    //     { sort: { createdAt: -1 } }
    // ).populate("user");

    const products = await db.Product.find().or([{brand: {$regex: args.searchText, $options: 'i'}},
        {category: {$regex: args.searchText, $options: 'i'}},
        {size: {$regex: args.searchText, $options: 'i'}}])
        .populate("user");

    if (products) {
        return products;
    } else {
        throw new CustomError("Error", "Query Failed", "Something went wrong!");
    }
};

module.exports = { searchProducts };
