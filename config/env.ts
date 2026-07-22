// Database 
export const DATABASE_URL = process.env.DATABASE_URL!
export const DATABASE_DIRECT_URL = process.env.DATABASE_DIRECT_URL!

//  AWS General 
export const AWS_REGION = process.env.AWS_REGION!
export const ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID!
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY!

//  AWS Cognito 
export const USER_POOL_ID = process.env.COGNITO_USER_POOL_ID!
export const COGNITO_CLIENT_ID = process.env.COGNITO_CLIENT_ID!
export const COGNITO_CLIENT_SECRET = process.env.COGNITO_CLIENT_SECRET!
export const COGNITO_DOMAIN = process.env.COGNITO_DOMAIN!

//  AWS SES 
export const SES_FROM_EMAIL = process.env.SES_FROM_EMAIL!
export const SES_FROM_NAME = process.env.SES_FROM_NAME!

//  AWS S3 
// export const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME!
// export const S3_BUCKET_REGION = process.env.S3_BUCKET_REGION!
// export const S3_PUBLIC_URL = process.env.S3_PUBLIC_URL!

//  App 
// export const APP_URL = process.env.NEXT_PUBLIC_APP_URL!
export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME!
