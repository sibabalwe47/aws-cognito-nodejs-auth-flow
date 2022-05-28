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

    // Stores verified user data
    const userFromCognito = verifyToken(result.AuthenticationResult.IdToken);

    // Check if the user is not empty
    if (Object.keys(userFromCognito).length == 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    } else {
      const response = {
        success: true,
        verified: userFromCognito.email_verified,
        userId: userFromCognito.sub,
        email: userFromCognito.email,
        token: result.AuthenticationResult.AccessToken,
        refreshToken: result.AuthenticationResult.RefreshToken,
      };
      // Return result to client
      return res.status(result["$metadata"].httpStatusCode).json(response);
    }
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
