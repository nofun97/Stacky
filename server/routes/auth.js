const jwt = require("express-jwt");

const getTokenFromHeaders = req => {
  const cookie = req.headers.cookie;
  // console.log(cookie);
  if (cookie && cookie.split("=")[0] === "Token") {
    // console.log(cookie.slice(6));
    return cookie.slice(6);
  }
  return null;
};

const auth = {
  required: jwt({
    secret: "stacky",
    userProperty: "payload",
    getToken: getTokenFromHeaders,
  }),
  optional: jwt({
    secret: "stacky",
    userProperty: "payload",
    getToken: getTokenFromHeaders,
    credentialsRequired: false,
  }),
};

module.exports = auth;
