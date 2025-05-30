import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default"
import { Module } from "@nestjs/common"
import { EnvModule } from "./dynamic-modules"
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo"
import { GraphQLModule } from "@nestjs/graphql"
import { join } from "path"
import { UsersModule } from "./users/users.module"
import { HelloModule } from "./hello/hello.module"
import { PrismaModule } from "./dynamic-modules/prisma/prisma.module"

@Module({
    imports: [
        PrismaModule,
        EnvModule.forRoot(),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), "src/schema.gql"),
            csrfPrevention: false,
            playground: false,
            plugins: [
                ApolloServerPluginLandingPageLocalDefault({
                    embed: true
                })
            ],
            sortSchema: true,
        }),
        HelloModule,
        UsersModule,
    ],
})
export class AppModule {}
