const { ApolloError } = require("apollo-server-express");

class CustomError extends ApolloError {
  constructor(MainType, SubType, Detail) {
    super(MainType, SubType, { reason: Detail });
  }
}
module.exports = { CustomError };
