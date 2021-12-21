const { rule, shield, and, or, not } = require("graphql-shield");

/*
function checkPermission(user, permission) {
  if (user) {
    return user.permissions.include(permission);
  }
  return false;
}

// Rules
const isAuthenticated = rule({ cache: "contextual" })(
  (parent, args, context, info) => {
    return context.user !== null;
  }
);

// Authorization
const authorization = shield({
  User: isAuthenticated,
});

module.exports = {
  authorization,
};

*/