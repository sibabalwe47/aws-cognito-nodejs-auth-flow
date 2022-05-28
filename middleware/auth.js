const jwtPublicKey = require("./public-keys");
const jwt = require("jsonwebtoken");
const jwkToPem = require("jwk-to-pem");

exports.verifyToken = (idToken) => {
  //convert JWK keys to PEM format
  var pem = jwkToPem(jwtPublicKey);

  // verify id_token
  var verified = jwt.verify(idToken, pem, { algorithms: ["RS256"] });

  // Return user object
  return verified;
};
