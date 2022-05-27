const { COGNITO_IDENTITY_CLIENT } = require("../lib/cognito");
const { statusCode } = require("../utils/errorHandler");
const { verifyToken } = require("../middleware/auth");

// Creates a user in cognito
exports.signUp = async (req, res) => {
  try {
    // Get email and password from request
    const { email, password } = req.body;

    // Sign up user
    const result = await COGNITO_IDENTITY_CLIENT.signUpCommand(email, password);

    // Return result to client
    return res.status(result["$metadata"].httpStatusCode).json({
      success: true,
      message: "You were signed up successfully!",
    });
  } catch (error) {
    return res.json(statusCode(500, error));
  }
};

// Authenticates with cognito user and returns ID, secret token
exports.signIn = async (req, res) => {
  try {
    // Get email and password from request
    const { email, password } = req.body;

    // Sign up user
    const result = await COGNITO_IDENTITY_CLIENT.signInCommand(email, password);

    verifyToken(result.AuthenticationResult.IdToken);
    // Return result to client
    return res.status(result["$metadata"].httpStatusCode).json({
      success: true,
      token: result.AuthenticationResult.AccessToken,
      refreshToken: result.AuthenticationResult.RefreshToken,
    });
  } catch (error) {
    return res.json(statusCode(500, error));
  }
};

// Confirms user email
exports.confirmEmail = async (req, res) => {
  try {
    //console.log(verifyToken("LKLK"));
  } catch (error) {
    statusCode(500, error);
  }
};
