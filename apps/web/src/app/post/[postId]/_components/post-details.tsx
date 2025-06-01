import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { formatDistanceToNow } from "date-fns"
import { FullPost } from "./types"
import { PostStatus } from "@/graphql/generated/graphql"

interface PostDetailsProps {
    post: FullPost
}

export function PostDetails({ post }: PostDetailsProps) {
    return (
        <Card>
            <CardHeader className="space-y-4">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <Badge variant="outline">{post.type}</Badge>
                        <Badge variant={post.status === PostStatus.Active ? "default" : "secondary"}>{post.status}</Badge>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h2 className="text-xl font-semibold">Offering: {post.haveSkill}</h2>
                        <h3 className="text-lg text-muted-foreground">Seeking: {post.wantSkill}</h3>
                    </div>
                </div>
                {post.description && <p className="text-muted-foreground">{post.description}</p>}
                <div className="flex flex-wrap gap-2">
                    {post.tags?.map((tag) => (
                        <Badge key={tag.name} variant="secondary">
                            {tag.name}
                        </Badge>
                    ))}
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Posted by {post.user.wallet}</span>
                    <span>Posted {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</span>
                </div>
            </CardHeader>
        </Card>
    )
}

export function PostDetailsSkeleton() {
    return (
        <Card>
            <CardHeader className="space-y-4">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-6 w-20" />
                        <Skeleton className="h-6 w-20" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <Skeleton className="h-7 w-3/4" />
                        <Skeleton className="h-6 w-1/2" />
                    </div>
                </div>
                <Skeleton className="h-4 w-full" />
                <div className="flex flex-wrap gap-2">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-20" />
                </div>
                <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-32" />
                </div>
            </CardHeader>
        </Card>
    )
}
