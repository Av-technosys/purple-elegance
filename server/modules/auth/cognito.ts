import {
  ACCESS_KEY_ID,
  AWS_REGION,
  AWS_SECRET_ACCESS_KEY,
  COGNITO_CLIENT_ID,
  COGNITO_CLIENT_SECRET,
  USER_POOL_ID,
} from "@/config/env"
import {
  AdminGetUserCommand,
  AdminUpdateUserAttributesCommand,
  AuthFlowType,
  ChangePasswordCommand,
  CognitoIdentityProviderClient,
  ConfirmForgotPasswordCommand,
  ConfirmSignUpCommand,
  ForgotPasswordCommand,
  GlobalSignOutCommand,
  InitiateAuthCommand,
  ResendConfirmationCodeCommand,
  SignUpCommand,
  type AttributeType,
} from "@aws-sdk/client-cognito-identity-provider"
import crypto from "crypto"


export const cognito = new CognitoIdentityProviderClient({
  region: AWS_REGION,
  credentials: {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
})


export const generateSecretHash = async (username: string) => {
  const hmac = crypto.createHmac("sha256", COGNITO_CLIENT_SECRET)
  hmac.update(username + COGNITO_CLIENT_ID)
  return hmac.digest("base64")
}


export async function cognitoSignUp({
  email,
  password,
  userAttribute,
}: {
  email: string
  password: string
  userAttribute: AttributeType[]
}) {
  const command = new SignUpCommand({
    ClientId: COGNITO_CLIENT_ID,
    Username: email,
    Password: password,
    UserAttributes: userAttribute,
    SecretHash: await generateSecretHash(email),
  })
  return cognito.send(command)
}


export async function cognitoConfirmSignUp({
  email,
  code,
}: {
  email: string
  code: string
}) {
  const command = new ConfirmSignUpCommand({
    ClientId: COGNITO_CLIENT_ID,
    Username: email,
    ConfirmationCode: code,
    SecretHash: await generateSecretHash(email),
  })
  return cognito.send(command)
}


export async function cognitoResendConfirmationCode({
  email,
}: {
  email: string
}) {
  const command = new ResendConfirmationCodeCommand({
    ClientId: COGNITO_CLIENT_ID,
    Username: email,
    SecretHash: await generateSecretHash(email),
  })
  return cognito.send(command)
}


export async function cognitoInitiateAuth({
  email,
  password,
}: {
  email: string
  password: string
}) {
  const command = new InitiateAuthCommand({
    AuthFlow: "USER_PASSWORD_AUTH" as AuthFlowType,
    ClientId: COGNITO_CLIENT_ID,
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password,
      SECRET_HASH: await generateSecretHash(email),
    },
  })
  return cognito.send(command)
}

export async function authSignIn({
  email,
  password,
}: {
  email: string
  password: string
}) {
  if (!email || !password) {
    throw new Error("Email and password are required.")
  }

  const response = await cognitoInitiateAuth({ email, password })

  return {
    message: "Login successful.",
    accessToken: response.AuthenticationResult?.AccessToken,
    idToken: response.AuthenticationResult?.IdToken,
    refreshToken: response.AuthenticationResult?.RefreshToken,
    expiresIn: response.AuthenticationResult?.ExpiresIn,
    tokenType: response.AuthenticationResult?.TokenType,
  }
}


export async function refreshCognitoTokens({
  email,
  refreshToken,
}: {
  email: string
  refreshToken: string
}) {
  const command = new InitiateAuthCommand({
    AuthFlow: "REFRESH_TOKEN_AUTH" as AuthFlowType,
    ClientId: COGNITO_CLIENT_ID,
    AuthParameters: {
      USERNAME: email,
      REFRESH_TOKEN: refreshToken,
      SECRET_HASH: await generateSecretHash(email),
    },
  })

  const response = await cognito.send(command)

  return {
    accessToken: response.AuthenticationResult?.AccessToken,
    idToken: response.AuthenticationResult?.IdToken,
    refreshToken: response.AuthenticationResult?.RefreshToken,
    expiresIn: response.AuthenticationResult?.ExpiresIn,
    tokenType: response.AuthenticationResult?.TokenType,
  }
}


export async function cognitoForgotPassword({ email }: { email: string }) {
  const command = new ForgotPasswordCommand({
    ClientId: COGNITO_CLIENT_ID,
    Username: email,
    SecretHash: await generateSecretHash(email),
  })
  return cognito.send(command)
}


export async function cognitoConfirmForgotPassword({
  email,
  code,
  newPassword,
}: {
  email: string
  code: string
  newPassword: string
}) {
  const command = new ConfirmForgotPasswordCommand({
    ClientId: COGNITO_CLIENT_ID,
    Username: email,
    ConfirmationCode: code,
    Password: newPassword,
    SecretHash: await generateSecretHash(email),
  })
  return cognito.send(command)
}

export async function cognitoChangePassword({
  accessToken,
  currentPassword,
  newPassword,
}: {
  accessToken: string
  currentPassword: string
  newPassword: string
}) {
  const command = new ChangePasswordCommand({
    AccessToken: accessToken,
    PreviousPassword: currentPassword,
    ProposedPassword: newPassword,
  })
  return cognito.send(command)
}

// ─── Admin — Get User ─────────────────────────────────────────────────────────

export async function cognitoAdminGetUser({ email }: { email: string }) {
  const command = new AdminGetUserCommand({
    UserPoolId: USER_POOL_ID,
    Username: email,
  })
  return cognito.send(command)
}


export async function cognitoUpdateUserAttribute({
  email,
  userAttribute,
}: {
  email: string
  userAttribute: AttributeType[]
}) {
  const command = new AdminUpdateUserAttributesCommand({
    UserPoolId: USER_POOL_ID,
    Username: email,
    UserAttributes: userAttribute,
  })
  return cognito.send(command)
}


export async function cognitoGlobalSignOut({
  accessToken,
}: {
  accessToken: string
}) {
  const command = new GlobalSignOutCommand({
    AccessToken: accessToken,
  })
  return cognito.send(command)
}
