import { useRefreshMatchesMutation } from "@/graphql/generated/graphql"
import { RefreshCw } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { Button } from "./ui/button"

interface RefreshMatchesButtonProps {
  postId: string
  onMatchesRefreshed?: () => void
}

export function RefreshMatchesButton({ postId, onMatchesRefreshed }: RefreshMatchesButtonProps) {
  const [isRefreshing, setIsRefreshing] = useState(false)

  const [refreshMatches, { loading }] = useRefreshMatchesMutation({
    onCompleted: (data) => {
      setIsRefreshing(false)
      toast.success(`Found ${data.refreshMatches.length} new matches!`)
      onMatchesRefreshed?.()
    },
    onError: (error) => {
      setIsRefreshing(false)
      toast.error("Failed to refresh matches: " + error.message)
    },
    refetchQueries: ["Post"],
  })

  const handleRefresh = async () => {
    toast.success("Refreshing matches: " + postId)

    setIsRefreshing(true)
    try {
      await refreshMatches({
        variables: {
          postId: postId,
        },
        refetchQueries: ["Post"],
        onCompleted: () => {
          setIsRefreshing(false)
          toast.success("Matches refreshed successfully")
          onMatchesRefreshed?.()
        },
        onError: (error) => {
          setIsRefreshing(false)
          toast.error("Failed to refresh matches: " + error.message)
        },
      })
    } catch (error) {
      setIsRefreshing(false)
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleRefresh}
      disabled={isRefreshing}
    >
      <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
      {isRefreshing ? "Refreshing..." : "Refresh Matches"}
    </Button>
  )
} 