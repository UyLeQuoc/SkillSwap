"use client"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useGetDealsByWalletQuery, DealStatus, DealType } from "@/graphql/generated/graphql"
import { useAccounts } from "@mysten/dapp-kit"
import { useRouter } from "next/navigation"
import { CheckCircle2, Clock, XCircle, AlertCircle } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export interface Deal {
  id: string
  status: DealStatus
  type: DealType
  createdAt: string
  completedAt?: string | null
  userA?: {
    id: string
    wallet: string
    name?: string | null
    avatarUrl?: string | null
  } | null
  userB?: {
    id: string
    wallet: string
    name?: string | null
    avatarUrl?: string | null
  } | null
  postA?: {
    id: string
    haveSkill: string
    wantSkill: string
    description?: string | null
    type: string
    user?: {
      wallet: string
    } | null
  } | null
  postB?: {
    id: string
    haveSkill: string
    wantSkill: string
    description?: string | null
    type: string
    user?: {
      wallet: string
    } | null
  } | null
}

export default function YourDealsPage() {
  const router = useRouter()
  const accounts = useAccounts()
  const currentWallet = accounts[0]

  const { data: dealsData, loading: dealsLoading } = useGetDealsByWalletQuery({
    variables: { wallet: currentWallet?.address || "" },
    skip: !currentWallet?.address,
  })

  const incomingDeals = dealsData?.getDealsByWallet?.dealsAsB || []
  const outgoingDeals = dealsData?.getDealsByWallet?.dealsAsA || []

  const getStatusBadge = (status: DealStatus) => {
    switch (status) {
      case DealStatus.Pending:
        return <Badge variant="secondary"><Clock className="w-3 h-3 mr-1" /> Pending</Badge>
      case DealStatus.Agreed:
        return <Badge variant="default"><CheckCircle2 className="w-3 h-3 mr-1" /> Agreed</Badge>
      case DealStatus.Completed:
        return <Badge variant="default"><CheckCircle2 className="w-3 h-3 mr-1" /> Completed</Badge>
      case DealStatus.Cancelled:
        return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" /> Cancelled</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const DealCard = ({ deal, isIncoming }: { deal: Deal; isIncoming: boolean }) => {
    const otherUser = isIncoming ? deal.userA : deal.userB
    const otherPost = isIncoming ? deal.postA : deal.postB
    const yourPost = isIncoming ? deal.postB : deal.postA

    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={otherUser?.avatarUrl || undefined} />
                <AvatarFallback>
                  {otherUser?.name?.[0] || otherUser?.wallet?.[0] || "?"}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg">
                  {otherUser?.name || otherUser?.wallet?.slice(0, 6) + "..." + otherUser?.wallet?.slice(-4)}
                </CardTitle>
                <CardDescription>Proposed {new Date(deal.createdAt).toLocaleDateString()}</CardDescription>
              </div>
            </div>
            {getStatusBadge(deal.status)}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-sm mb-2">Skills Exchange</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-muted/50 p-3 rounded-lg">
                  <p className="text-muted-foreground text-xs mb-1">You offer:</p>
                  <p className="font-medium">{yourPost?.haveSkill}</p>
                </div>
                <div className="bg-muted/50 p-3 rounded-lg">
                  <p className="text-muted-foreground text-xs mb-1">You receive:</p>
                  <p className="font-medium">{otherPost?.haveSkill}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => router.push(`/deal/${deal.id}`)}
          >
            View Details
          </Button>
        </CardFooter>
      </Card>
    )
  }

  if (!currentWallet) {
    return (
      <div className="relative">
        <Header />
        <div className="container mx-auto p-4 md:p-6 lg:p-8 max-w-4xl">
          <div className="text-center py-12">
            <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Connect Your Wallet</h3>
            <p className="text-muted-foreground">
              Please connect your wallet to view your deals
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (dealsLoading) {
    return (
      <div className="relative">
        <Header />
        <div className="container mx-auto p-4 md:p-6 lg:p-8 max-w-4xl">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-48 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      <Header />
      <div className="container mx-auto p-4 md:p-6 lg:p-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Your Deals</h1>
          <p className="text-muted-foreground">
            Manage your skill exchange deals and track their progress
          </p>
        </div>

        <Tabs defaultValue="incoming" className="space-y-6">
          <TabsList>
            <TabsTrigger value="incoming">
              Incoming Deals ({incomingDeals.length})
            </TabsTrigger>
            <TabsTrigger value="outgoing">
              Outgoing Deals ({outgoingDeals.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="incoming">
            {incomingDeals.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No incoming deals yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {incomingDeals.map((deal) => (
                  <DealCard key={deal.id} deal={deal} isIncoming={true} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="outgoing">
            {outgoingDeals.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No outgoing deals yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {outgoingDeals.map((deal) => (
                  <DealCard key={deal.id} deal={deal} isIncoming={false} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
