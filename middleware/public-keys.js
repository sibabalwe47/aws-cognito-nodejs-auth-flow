const dotenv = require("dotenv");
dotenv.config({ path: "../config/.env" });

module.exports = {
  alg: process.env.ALG,
  e: process.env.E,
  kid: process.env.KID,
  kty: process.env.KTY,
  n: process.env.N,
  use: process.env.USE,
};
