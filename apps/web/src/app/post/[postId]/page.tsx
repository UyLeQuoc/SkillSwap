"use client"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, Edit3, PlusCircle } from "lucide-react"
import { usePostQuery, useUpdatePostMutation, useGetCurrentUserQuery, useCreateDealMutation } from "@/graphql/generated/graphql"
import { PostDetails, PostDetailsSkeleton } from "./_components/post-details"
import { PostMatches, PostMatchesSkeleton } from "./_components/post-matches"
import { PostDeals, PostDealsSkeleton } from "./_components/post-deals"
import { DisplayDeal, DisplayMatch, FullPost } from "./_components/types"
import { Header } from "@/components/header"
import { toast } from "sonner"
import { useAccounts } from "@mysten/dapp-kit"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DealType } from "@/graphql/generated/graphql"

export default function PostPage() {
  const params = useParams()
  const router = useRouter()
  const postId = params.postId as string
  const [isProposeDialogOpen, setIsProposeDialogOpen] = useState(false)
  const [selectedDealType, setSelectedDealType] = useState<DealType>(DealType.SkillSwap)

  const { data: postData, loading: postLoading } = usePostQuery({
    variables: {
      postId: postId,
    },
  })

  const { data: userData } = useGetCurrentUserQuery()
  const [updatePost, { loading: updateLoading }] = useUpdatePostMutation()
  const [createDeal, { loading: createDealLoading }] = useCreateDealMutation()

  const accounts = useAccounts()
  const currentWallet = accounts[0]

  const post = postData?.post as FullPost | undefined
  const isAuthorized = currentWallet?.address
  const isOwner = post?.user?.wallet === currentWallet?.address

  const handleUpdatePost = () => {
    if (!isAuthorized) {
      toast.error("You are not authorized to update this post")
      return
    }
    router.push(`/post/${postId}/edit`)
  }

  const handleProposeDeal = async () => {
    if (!userData?.getCurrentUser) {
      toast.error("Please connect your wallet to propose a deal")
      return
    }
    if (isOwner) {
      toast.error("You cannot propose a deal to your own post")
      return
    }

    // Check if there's already an active deal for this post
    const hasActiveDeal = post?.dealsAsPostA?.some(
      (deal) => deal.status === "PENDING" || deal.status === "AGREED"
    ) || post?.dealsAsPostB?.some(
      (deal) => deal.status === "PENDING" || deal.status === "AGREED"
    )

    if (hasActiveDeal) {
      toast.error("This post is already part of an active deal")
      return
    }

    try {
      await createDeal({
        variables: {
          input: {
            postAId: postId,
            userBId: userData.getCurrentUser.id,
          },
        },
        onCompleted: () => {
          toast.success("Deal proposed successfully!")
          setIsProposeDialogOpen(false)
        },
        onError: (error) => {
          console.error("Error proposing deal:", error)
          const errorMessage = error.message.toLowerCase()
          if (errorMessage.includes("already exists")) {
            toast.error("You already have an active deal with this user")
          } else if (errorMessage.includes("already part of")) {
            toast.error("This post is already part of an active deal")
          } else {
            toast.error(error.message || "Error proposing deal. Please try again.")
          }
        },
        refetchQueries: ["GetCurrentUser", "Post"],
      })
    } catch (error) {
      console.error("Unhandled error in proposeDeal:", error)
      toast.error("An unexpected error occurred.")
    }
  }

  if (postLoading) {
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
            {isAuthorized && isOwner && (
              <Button variant="outline" onClick={handleUpdatePost} disabled={updateLoading}>
                <Edit3 className="mr-2 h-4 w-4" /> Update Post
              </Button>
            )}
            {isAuthorized && !isOwner && (
              <Dialog open={isProposeDialogOpen} onOpenChange={setIsProposeDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <PlusCircle className="mr-2 h-4 w-4" /> Propose Deal
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Propose a Deal</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to propose a deal with this post?
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsProposeDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleProposeDeal} disabled={createDealLoading}>
                      {createDealLoading ? "Proposing..." : "Propose Deal"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
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
