import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    // Configure CORS to allow all origins
    app.enableCors({
        origin: "*", // Allow all origins
        credentials: true,
        methods: "*", // Allow all methods
        allowedHeaders: "*", // Allow all headers
        exposedHeaders: "*", // Expose all headers
        preflightContinue: false,
        optionsSuccessStatus: 204,
    })

    await app.listen(process.env.PORT ?? 4000)
}
bootstrap()
