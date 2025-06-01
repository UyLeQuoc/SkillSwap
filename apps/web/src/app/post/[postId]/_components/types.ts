import { PostStatus, PostType, DealStatus, DealType } from "@/graphql/generated/graphql"

export interface User {
    wallet: string
}

export interface Tag {
    name: string
}

export interface PostSummary {
    id: string
    wantSkill: string
    haveSkill: string
    description: string
    createdAt: string
    user: User
    status: PostStatus
    tags: Tag[]
    type: PostType
}

export interface Match {
    id: string
    score: number
    method: string
    createdAt: string
    sourcePost: PostSummary
    targetPost: PostSummary
}

export interface Review {
    id: string
    reviewer: User
    rating: number
    reviewee: User
    createdAt: string
    comment: string
}

export interface Deal {
    id: string
    userA: User
    userB: User
    type: DealType
    status: DealStatus
    reviews: Review[]
    completedAt?: string | null
    postAId: string
    postBId: string
    createdAt: string
    postA?: PostSummary
    postB?: PostSummary
}

export interface FullPost extends PostSummary {
    matchAsTarget: Match[]
    matchAsSource: Match[]
    dealsAsPostA: Deal[]
    dealsAsPostB: Deal[]
}

export interface DisplayMatch extends Match {
    matchedPost: PostSummary
    type: "source" | "target"
}

export interface DisplayDeal extends Deal {
    otherPartyPostId: string
    otherPartyUser: User
    role: "A" | "B"
} 