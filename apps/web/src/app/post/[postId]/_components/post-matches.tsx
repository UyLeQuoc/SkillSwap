"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { formatDistanceToNow } from "date-fns"
import { ArrowRightLeft, Sparkles } from "lucide-react"
import { DisplayMatch } from "./types"
import { useRouter } from "next/navigation"
interface PostMatchesProps {
    matches: DisplayMatch[]
    currentPostId: string
}

export function PostMatches({ matches, currentPostId }: PostMatchesProps) {
    const router = useRouter()
    if (matches.length === 0) {
        return (
            <div className="text-center py-8">
                <Sparkles className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Matches Found</h3>
                <p className="text-muted-foreground">This post hasn't been matched with any other skills yet.</p>
            </div>
        )
    }

    return (
        <div className="grid gap-4">
            {matches.map((match) => (
                <Card key={match.id}>
                    <CardHeader className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Badge variant="outline">Match Score: {match.score ? `${match.score * 100}%` : 'N/A'}</Badge>
                                <Badge variant="secondary">{match.method}</Badge>
                            </div>
                            <span className="text-sm text-muted-foreground">
                                {formatDistanceToNow(new Date(match.createdAt), { addSuffix: true })}
                            </span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <span className="font-medium">Matched Post:</span>
                                <span className="text-muted-foreground">
                                    {match.matchedPost.haveSkill} → {match.matchedPost.wantSkill}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="font-medium">Posted by:</span>
                                <span className="text-muted-foreground">{match.matchedPost.user.wallet}</span>
                            </div>
                        </div>
                        <Button className="w-full"
                            onClick={() => {
                                router.push(`/post/${match.matchedPost.id}`)
                            }}
                        >
                            <ArrowRightLeft className="mr-2 h-4 w-4" /> View Match Details
                        </Button>
                    </CardHeader>
                </Card>
            ))}
        </div>
    )
}

export function PostMatchesSkeleton() {
    return (
        <div className="grid gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
                <Card key={i}>
                    <CardHeader className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-6 w-32" />
                                <Skeleton className="h-6 w-24" />
                            </div>
                            <Skeleton className="h-4 w-24" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-4 w-48" />
                            </div>
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-4 w-48" />
                            </div>
                        </div>
                        <Skeleton className="h-10 w-full" />
                    </CardHeader>
                </Card>
            ))}
        </div>
    )
}
