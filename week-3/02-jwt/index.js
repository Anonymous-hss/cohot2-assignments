const jwt = require("jsonwebtoken");
const jwtPassword = "secret";
const zod = require("zod");

const usernameParse = zod.string().email();
const passwordParse = zod.string().min(6);

function signJwt(username, password) {
  const userParse = usernameParse.safeParse(username);
  const passParse = passwordParse.safeParse(password);

  if (!userParse.success || !passParse.success) {
    return null;
  }

  const signature = jwt.sign(
    {
      username,
    },
    jwtPassword
  );
  return signature;
}

function verifyJwt(token) {
  let ans = true;
  try {
    jwt.verify(token, jwtPassword);
  } catch (e) {
    ans = false;
  }
  return ans;
}

function decodeJwt(token) {
  const decoded = jwt.decode(token);
  if (decoded) {
    return true;
  } else {
    return false;
  }
}

module.exports = {
  signJwt,
  verifyJwt,
  decodeJwt,
  jwtPassword,
};
