"use client"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { AlertTriangle, CheckCircle2, XCircle } from "lucide-react"
import { useDealQuery, useAcceptDealMutation, useRejectDealMutation, useCancelDealMutation, useCompleteDealMutation } from "@/graphql/generated/graphql"
import { Header } from "@/components/header"
import { toast } from "sonner"
import { useAccounts } from "@mysten/dapp-kit"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DealStatus, DealType } from "@/graphql/generated/graphql"

export default function DealPage() {
  const params = useParams()
  const router = useRouter()
  const dealId = params.dealId as string
  const [isActionDialogOpen, setIsActionDialogOpen] = useState(false)
  const [actionType, setActionType] = useState<"accept" | "reject" | "complete" | "cancel">("accept")

  const { data: dealData, loading: dealLoading } = useDealQuery({
    variables: {
      dealId: dealId,
    },
  })

  const [acceptDeal] = useAcceptDealMutation()
  const [rejectDeal] = useRejectDealMutation()
  const [completeDeal] = useCompleteDealMutation()
  const [cancelDeal] = useCancelDealMutation()

  const accounts = useAccounts()
  const currentWallet = accounts[0]

  const deal = dealData?.deal
  const isAuthorized = currentWallet?.address
  const isUserA = deal?.userA?.wallet === currentWallet?.address
  const isUserB = deal?.userB?.wallet === currentWallet?.address

  const handleAction = async () => {
    if (!isAuthorized) {
      toast.error("Please connect your wallet to perform this action")
      return
    }

    try {
      switch (actionType) {
        case "accept":
          await acceptDeal({
            variables: { dealId },
            onCompleted: () => {
              toast.success("Deal accepted successfully!")
              setIsActionDialogOpen(false)
            },
            refetchQueries: ["Deal"],
          })
          break
        case "reject":
          await rejectDeal({
            variables: { dealId },
            onCompleted: () => {
              toast.success("Deal rejected")
              setIsActionDialogOpen(false)
            },
            refetchQueries: ["Deal"],
          })
          break
        case "complete":
          await completeDeal({
            variables: { dealId },
            onCompleted: () => {
              toast.success("Deal completed successfully!")
              setIsActionDialogOpen(false)
            },
            refetchQueries: ["Deal"],
          })
          break
        case "cancel":
          await cancelDeal({
            variables: { dealId },
            onCompleted: () => {
              toast.success("Deal cancelled")
              setIsActionDialogOpen(false)
            },
            refetchQueries: ["Deal"],
          })
          break
      }
    } catch (error) {
      console.error("Error performing action:", error)
      toast.error("An error occurred while performing the action")
    }
  }

  const getActionButton = () => {
    if (!deal || !isAuthorized) return null

    if (deal.status === DealStatus.Pending) {
      if (isUserB) {
        return (
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setActionType("reject")
                setIsActionDialogOpen(true)
              }}
            >
              <XCircle className="mr-2 h-4 w-4" /> Reject
            </Button>
            <Button
              onClick={() => {
                setActionType("accept")
                setIsActionDialogOpen(true)
              }}
            >
              <CheckCircle2 className="mr-2 h-4 w-4" /> Accept
            </Button>
          </div>
        )
      } else if (isUserA) {
        return (
          <Button
            variant="destructive"
            onClick={() => {
              setActionType("cancel")
              setIsActionDialogOpen(true)
            }}
          >
            <XCircle className="mr-2 h-4 w-4" /> Cancel Deal
          </Button>
        )
      }
    } else if (deal.status === DealStatus.Agreed) {
      return (
        <Button
          onClick={() => {
            setActionType("complete")
            setIsActionDialogOpen(true)
          }}
        >
          <CheckCircle2 className="mr-2 h-4 w-4" /> Complete Deal
        </Button>
      )
    }

    return null
  }

  if (dealLoading) {
    return (
      <div className="container mx-auto p-4 md:p-6 lg:p-8 max-w-4xl">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/3 mb-6"></div>
          <div className="space-y-4">
            <div className="h-32 bg-muted rounded"></div>
            <div className="h-32 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!deal) {
    return (
      <div className="container mx-auto p-4 md:p-6 lg:p-8 max-w-4xl text-center">
        <AlertTriangle className="mx-auto h-12 w-12 text-destructive mb-4" />
        <h1 className="text-2xl font-semibold">Deal Not Found</h1>
        <p className="text-muted-foreground">The deal you are looking for does not exist or could not be loaded.</p>
        <Button onClick={() => window.history.back()} className="mt-6">
          Go Back
        </Button>
      </div>
    )
  }

  return (
    <div className="relative">
      <Header />
      <div className="container mx-auto p-4 md:p-6 lg:p-8 max-w-4xl">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Deal Details</h1>
            <Badge className="mt-2" variant={deal.status === DealStatus.Completed ? "default" : "secondary"}>
              {deal.status}
            </Badge>
          </div>
          {getActionButton()}
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Skills Exchange</CardTitle>
              <CardDescription>Details of the skills being exchanged</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="font-semibold">{deal.userA?.name || "User A"}</h3>
                  <p className="text-sm text-muted-foreground">Offering: {deal.postA?.haveSkill}</p>
                  <p className="text-sm text-muted-foreground">Seeking: {deal.postA?.wantSkill}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">{deal.userB?.name || "User B"}</h3>
                  <p className="text-sm text-muted-foreground">Offering: {deal.postB?.haveSkill}</p>
                  <p className="text-sm text-muted-foreground">Seeking: {deal.postB?.wantSkill}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {deal.reviews && deal.reviews.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Reviews</CardTitle>
                <CardDescription>Reviews submitted for this deal</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {deal.reviews.map((review) => (
                    <div key={review.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          {/* <p className="font-medium">{review.reviewer.name || review.reviewer.wallet}</p>
                          <p className="text-sm text-muted-foreground">
                            Reviewed {review.reviewee.name || review.reviewee.wallet}
                          </p> */}
                        </div>
                        <Badge>{review.rating}/5</Badge>
                      </div>
                      {review.comment && <p className="text-sm mt-2">{review.comment}</p>}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <Dialog open={isActionDialogOpen} onOpenChange={setIsActionDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {actionType === "accept"
                  ? "Accept Deal"
                  : actionType === "reject"
                  ? "Reject Deal"
                  : actionType === "complete"
                  ? "Complete Deal"
                  : "Cancel Deal"}
              </DialogTitle>
              <DialogDescription>
                {actionType === "accept"
                  ? "Are you sure you want to accept this deal?"
                  : actionType === "reject"
                  ? "Are you sure you want to reject this deal?"
                  : actionType === "complete"
                  ? "Are you sure you want to mark this deal as completed?"
                  : "Are you sure you want to cancel this deal?"}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsActionDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                variant={actionType === "reject" || actionType === "cancel" ? "destructive" : "default"}
                onClick={handleAction}
              >
                {actionType === "accept"
                  ? "Accept"
                  : actionType === "reject"
                  ? "Reject"
                  : actionType === "complete"
                  ? "Complete"
                  : "Cancel"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
} 