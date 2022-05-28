const {
  CognitoIdentityProviderClient,
  SignUpCommand,
  InitiateAuthCommand,
  ConfirmSignUpCommand,
  ResendConfirmationCodeCommand,
} = require("@aws-sdk/client-cognito-identity-provider");
const dotenv = require("dotenv");
dotenv.config({ path: "../config/.env" });

/*
    Description: Abstracts cognito functionality and exposes methods.
 */

class CognitoIdentityClient {
  constructor() {
    // Instantiate the cognito client
    this.COGNITO_CLIENT = new CognitoIdentityProviderClient({
      region: process.env.REGION,
    });

    // Stores client ID of cognito pool
    this.clientID = process.env.CLIENT_ID;

    // Params object
    this.params = {};

    // Set up properties
    this.params.ClientId = this.clientID;
  }

  // Description: Handles signup command
  async signUpCommand(email, password) {
    return await this.COGNITO_CLIENT.send(
      new SignUpCommand({
        ...this.params,
        Username: email,
        Password: password,
      })
    );
  }

  async signInCommand(email, password) {
    return await this.COGNITO_CLIENT.send(
      new InitiateAuthCommand({
        ...this.params,
        AuthFlow: "USER_PASSWORD_AUTH",
        AuthParameters: { USERNAME: email, PASSWORD: password },
      })
    );
  }

  async confirmSignUpCommand(username, confirmationCode) {
    return await this.COGNITO_CLIENT.send(
      new ConfirmSignUpCommand({
        ...this.params,
        Username: username,
        ConfirmationCode: confirmationCode,
      })
    );
  }

  async resendConfirmationCodeCommand(username) {
    return await this.COGNITO_CLIENT.send(
      new ResendConfirmationCodeCommand({
        ...this.params,
        Username: username,
      })
    );
  }
}

// Stores cognito identity instance before export
const COGNITO_IDENTITY_CLIENT = new CognitoIdentityClient();

module.exports = {
  COGNITO_IDENTITY_CLIENT,
};
