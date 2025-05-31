import { Field, ObjectType, Float } from "@nestjs/graphql"

@ObjectType()
export class UserStats {
  @Field()
      posts: number

  @Field()
      completedDeals: number

  @Field()
      reviews: number

  @Field(() => Float)
      averageRating: number
}
