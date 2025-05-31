import { DEFAULT_DATABASE_URL, DEFAULT_PORT } from "./env.constants"

export const envConfig = () => ({
    databaseUrl: process.env.DATABASE_URL || DEFAULT_DATABASE_URL,
    port: process.env.PORT || DEFAULT_PORT,
    app: {
        frontendUrl: process.env.APP_FRONTEND_URL || "http://localhost:3000",
        backendUrl: process.env.APP_BACKEND_URL || "http://localhost:3000"
    },
    jwt: {
        secret: process.env.JWT_SECRET || "secret",
        [TokenType.AccessToken]: {
            secret: process.env.JWT_ACCESS_TOKEN_SECRET || "access-token",
            expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN || "15m"
        },
        [TokenType.RefreshToken]: {
            secret: process.env.JWT_REFRESH_TOKEN_SECRET || "refresh-token",
            expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN || "7d"
        }
    },
    redis: {
        url: process.env.REDIS_URL || "redis://localhost:6380",
        ttl: process.env.REDIS_TTL || "604800", //60 * 60 * 24 * 7
        otpTtl: process.env.REDIS_OTP_TTL || "300" //5 minutes
    },
    cloudinary: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME || "",
        apiKey: process.env.CLOUDINARY_API_KEY || "",
        apiSecret: process.env.CLOUDINARY_API_SECRET || ""
    },
    upload: {
        maxFileSize: process.env.UPLOAD_MAX_FILE_SIZE || 50000000, //50mb
        maxFiles: process.env.UPLOAD_MAX_FILES || 1
    },
    resend: {
        apiKey: process.env.RESEND_API_KEY || ""
    },
    openai: {
        apiKey: process.env.OPENAI_API_KEY || ""
    }
})

export enum TokenType {
    AccessToken = "accessToken",
    RefreshToken = "refreshToken"
}
