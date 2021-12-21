const { sign, verify } = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server-express");

const accessToken = ({ id }) =>
  sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "7d",
  });

const refreshToken = ({ id }) =>
  sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "14d",
  });

//admin
const adminAccessToken = ({ _id }) =>
  sign({ _id }, process.env.ADMIN_ACCESS_TOKEN_SECRET, {
    expiresIn: "7d",
  });

const adminRefreshToken = ({ _id }) =>
  sign({ _id }, process.env.ADMIN_REFRESH_TOKEN_SECRET, {
    expiresIn: "14d",
  });

const verifyUser = async (auth) => {
  if (!auth) throw new AuthenticationError("you must be logged in!");

  const token = auth.split("Bearer ")[1];
  if (!token) throw new AuthenticationError("you should provide a token!");

  const user = await verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err, decoded) => {
      if (err) throw new AuthenticationError("invalid token!");
      return decoded;
    }
  );
  return user;
};

const verifyAdmin = async (auth) => {
  if (!auth) throw new AuthenticationError("you must be logged in!");

  const token = auth.split("Bearer ")[1];
  if (!token) throw new AuthenticationError("you should provide a token!");

  const admin = await verify(
    token,
    process.env.ADMIN_ACCESS_TOKEN_SECRET,
    (err, decoded) => {
      if (err) throw new AuthenticationError("invalid token!");
      return decoded;
    }
  );
  return admin;
};

module.exports = {
  accessToken,
  refreshToken,
  adminAccessToken,
  adminRefreshToken,
  verifyUser,
  verifyAdmin,
};
