import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    // Configure CORS with specific options
    app.enableCors({
        origin: true, // This allows all origins and will reflect the request origin
        credentials: true,
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
        allowedHeaders: [
            "Origin",
            "X-Requested-With",
            "Content-Type",
            "Accept",
            "Authorization",
            "Access-Control-Allow-Origin",
        ],
        preflightContinue: false,
        optionsSuccessStatus: 204,
    })

    await app.listen(process.env.PORT ?? 4000)
}
bootstrap()
