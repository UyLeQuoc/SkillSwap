"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { formatDistanceToNow } from "date-fns"
import { ArrowRightLeft, Briefcase, CheckCircle, Clock, Star, XCircle } from "lucide-react"
import { DisplayDeal } from "./types"

interface PostDealsProps {
    deals: DisplayDeal[]
    currentPostId: string
}

export function PostDeals({ deals, currentPostId }: PostDealsProps) {
    if (deals.length === 0) {
        return (
            <div className="text-center py-8">
                <Briefcase className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Deals Found</h3>
                <p className="text-muted-foreground">This post hasn't been involved in any deals yet.</p>
            </div>
        )
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "COMPLETED":
                return <CheckCircle className="h-4 w-4 text-green-500" />
            case "IN_PROGRESS":
                return <Clock className="h-4 w-4 text-blue-500" />
            case "CANCELLED":
                return <XCircle className="h-4 w-4 text-red-500" />
            default:
                return <Briefcase className="h-4 w-4 text-gray-500" />
        }
    }

    return (
        <div className="grid gap-4">
            {deals.map((deal) => (
                <Card key={deal.id}>
                    <CardHeader className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Badge variant="outline">
                                    {getStatusIcon(deal.status)}
                                    <span className="ml-1">{deal.status}</span>
                                </Badge>
                                <Badge variant="secondary">{deal.type}</Badge>
                            </div>
                            <span className="text-sm text-muted-foreground">
                                {formatDistanceToNow(new Date(deal.createdAt), { addSuffix: true })}
                            </span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <span className="font-medium">Other Party:</span>
                                <span className="text-muted-foreground">{deal.otherPartyUser.wallet}</span>
                            </div>
                            {deal.reviews && deal.reviews.length > 0 && (
                                <div className="flex items-center gap-2">
                                    <span className="font-medium">Reviews:</span>
                                    <div className="flex items-center gap-1">
                                        <Star className="h-4 w-4 text-yellow-500" />
                                        <span className="text-muted-foreground">
                                            {deal.reviews.reduce((acc, review) => acc + review.rating, 0) / deal.reviews.length} / 5
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                        <Button className="w-full">
                            <ArrowRightLeft className="mr-2 h-4 w-4" /> View Deal Details
                        </Button>
                    </CardHeader>
                </Card>
            ))}
        </div>
    )
}

export function PostDealsSkeleton() {
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
                                <Skeleton className="h-4 w-32" />
                            </div>
                        </div>
                        <Skeleton className="h-10 w-full" />
                    </CardHeader>
                </Card>
            ))}
        </div>
    )
}
