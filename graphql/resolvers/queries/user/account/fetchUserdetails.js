const { CustomError } = require("../../../../../error/error");
const { User } = require("../../../../../database/index");

const fetchUserdetails = async (_, { offset, limit }) => {
  const res = await User.find().populate("myProducts");
  const totalCount = res.length;
  const details =
    limit === undefined ? res.slice(offset) : res.slice(offset, offset + limit);

  if (res) {
    console.log(details), console.log(totalCount);
    return {
      pagination: {
        totalItem: totalCount,
        offset,
        limit,
      },
      users: details,
    };
  } else {
    throw new CustomError("Error", "Query Failed", "Something went wrong!");
  }
};

module.exports = { fetchUserdetails };
