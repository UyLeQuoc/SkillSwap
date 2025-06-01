import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    // Configure CORS with specific options
    app.enableCors({
        origin: [
            "https://skillswap.uydev.id.vn",
            "https://api.skillswap.uydev.id.vn",
            "http://localhost:3000", // For local development
        ],
        credentials: false,
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
        allowedHeaders: [
            "Origin",
            "X-Requested-With",
            "Content-Type",
            "Accept",
            "Authorization",
            "Access-Control-Allow-Origin",
            "Access-Control-Allow-Headers",
            "Access-Control-Allow-Methods",
            "Access-Control-Allow-Credentials",
        ],
        exposedHeaders: [
            "Access-Control-Allow-Origin",
            "Access-Control-Allow-Headers",
            "Access-Control-Allow-Methods",
            "Access-Control-Allow-Credentials",
        ],
        preflightContinue: false,
        optionsSuccessStatus: 204,
    })

    await app.listen(process.env.PORT ?? 4000)
}
bootstrap()
