"use client"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, Edit3, PlusCircle } from "lucide-react"
import { usePostQuery } from "@/graphql/generated/graphql"
import { PostDetails, PostDetailsSkeleton } from "./_components/post-details"
import { PostMatches, PostMatchesSkeleton } from "./_components/post-matches"
import { PostDeals, PostDealsSkeleton } from "./_components/post-deals"
import { DisplayDeal, DisplayMatch, FullPost } from "./_components/types"
import { Header } from "@/components/header"

export default function PostPage() {
  const params = useParams()
  const postId = params.postId as string

  const { data, loading } = usePostQuery({
    variables: {
      postId: postId,
    },
  })

  const post = data?.post as FullPost | undefined

  const handleUpdatePost = () => {
    // Logic to navigate to an update page or open an edit modal
    console.log("Update post:", postId)
    alert("Update post functionality to be implemented.")
  }

  const handleProposeDeal = () => {
    // Logic to initiate a new deal
    console.log("Propose deal for post:", postId)
    alert("Propose deal functionality to be implemented.")
  }

  if (loading) {
    return (
      <div className="container mx-auto p-4 md:p-6 lg:p-8 max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Post Details</h1>
          <div className="flex gap-2">
            <Button variant="outline" disabled>
              <Edit3 className="mr-2 h-4 w-4" /> Update Post
            </Button>
            <Button disabled>
              <PlusCircle className="mr-2 h-4 w-4" /> Propose Deal
            </Button>
          </div>
        </div>
        <PostDetailsSkeleton />
        <Tabs defaultValue="matches" className="mt-6">
          <TabsList>
            <TabsTrigger value="matches">Matches</TabsTrigger>
            <TabsTrigger value="deals">Deals</TabsTrigger>
          </TabsList>
          <TabsContent value="matches" className="mt-4">
            <PostMatchesSkeleton />
          </TabsContent>
          <TabsContent value="deals" className="mt-4">
            <PostDealsSkeleton />
          </TabsContent>
        </Tabs>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="container mx-auto p-4 md:p-6 lg:p-8 max-w-4xl text-center">
        <AlertTriangle className="mx-auto h-12 w-12 text-destructive mb-4" />
        <h1 className="text-2xl font-semibold">Post Not Found</h1>
        <p className="text-muted-foreground">The post you are looking for does not exist or could not be loaded.</p>
        <Button onClick={() => window.history.back()} className="mt-6">
          Go Back
        </Button>
      </div>
    )
  }

  // Combine matches where the current post is either source or target
  const allMatches: DisplayMatch[] = [
    ...(post.matchAsSource?.map((match) => ({ ...match, matchedPost: match.targetPost, type: "source" as const })) || []),
    ...(post.matchAsTarget?.map((match) => ({ ...match, matchedPost: match.sourcePost, type: "target" as const })) || []),
  ]

  // Combine deals where the current post is either postA or postB
  const allDeals: DisplayDeal[] = [
    ...(post.dealsAsPostA?.map((deal) => ({
      ...deal,
      otherPartyPostId: deal.postBId || "",
      otherPartyUser: deal.userB,
      role: "A" as const,
    })) || []),
    ...(post.dealsAsPostB?.map((deal) => ({
      ...deal,
      otherPartyPostId: deal.postAId || "",
      otherPartyUser: deal.userA,
      role: "B" as const,
    })) || []),
  ]

  return (
    <div className="relative">
      <Header />
      <div className="container mx-auto p-4 md:p-6 lg:p-8 max-w-4xl">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold truncate" title={post.wantSkill || "Post Details"}>
            {post.wantSkill || "Post Details"}
          </h1>
          <div className="flex gap-2 flex-shrink-0">
            <Button variant="outline" onClick={handleUpdatePost}>
              <Edit3 className="mr-2 h-4 w-4" /> Update Post
            </Button>
            <Button onClick={handleProposeDeal}>
              <PlusCircle className="mr-2 h-4 w-4" /> Propose Deal
            </Button>
          </div>
        </div>

        <PostDetails post={post} />

        <Tabs defaultValue="matches" className="mt-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="matches">Matches ({allMatches.length})</TabsTrigger>
            <TabsTrigger value="deals">Deals ({allDeals.length})</TabsTrigger>
          </TabsList>
          <TabsContent value="matches" className="mt-4">
            <PostMatches matches={allMatches} currentPostId={post.id} />
          </TabsContent>
          <TabsContent value="deals" className="mt-4">
            <PostDeals deals={allDeals} currentPostId={post.id} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
