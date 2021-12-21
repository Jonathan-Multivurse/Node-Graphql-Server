const { ApolloServer, makeExecutableSchema } = require("apollo-server-express");
const { applyMiddleware } = require("graphql-middleware");
const cors = require("cors");
//typedefs and resolvers
const typeDefs = require("./schema/schema");
const resolvers = require("./resolvers/resolvers");

// authorization
// const { authorization } = require("../auth/authorization");

const GraphqlServer = new ApolloServer({
  schema: applyMiddleware(
    makeExecutableSchema({ typeDefs, resolvers })
    // authorization
  ),
  cors: cors(),
  introspection: true,
  playground: true,
  context: ({ req }) => {
    // get the authorization from the request headers
    // return a context obj with our token. if any!
    const auth = req.headers.authorization || "";
    return {
      auth,
    };
  },
  formatResponse: (res) => {
    if (res.errors) {
      const ErrorOne = res.errors[0];
      console.log(
        `Error: [${ErrorOne.path}]: ${ErrorOne.message}, ${ErrorOne.extensions.code}, ${ErrorOne.extensions.exception.reason}`
      );
    }
    return res;
  },
});

module.exports = { GraphqlServer };
