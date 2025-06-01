import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default"
import { Module } from "@nestjs/common"
import { EnvModule } from "./dynamic-modules"
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo"
import { GraphQLModule } from "@nestjs/graphql"
import { join } from "path"
import { AuthModule } from "./auth/auth.module"
import { SuiModule } from "./sui/sui.module"
import { HelloModule } from "./hello/hello.module"
import { PrismaModule } from "./prisma/prisma.module"
import { PostsModule } from "./posts/posts.module"
import { DealsModule } from "./deals/deals.module"

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
                    embed: true,
                }),
            ],
            sortSchema: true,
        }),
        HelloModule,
        AuthModule,
        SuiModule,
        PostsModule,
        DealsModule,
    ],
})
export class AppModule {}
