import { Button } from "./ui/button"
import { RefreshCw } from "lucide-react"
import { useMutation } from "@apollo/client"
import { gql } from "@apollo/client"
import { useState } from "react"
import { toast } from "sonner"

const REFRESH_MATCHES = gql`
  mutation RefreshMatches($postId: ID!) {
    refreshMatches(postId: $postId) {
      id
      sourcePostId
      targetPostId
      method
      score
      createdAt
      sourcePost {
        id
        haveSkill
        wantSkill
        description
        createdAt
        user {
          wallet
        }
        status
        tags {
          name
        }
        type
      }
      targetPost {
        id
        haveSkill
        wantSkill
        description
        createdAt
        user {
          wallet
        }
        status
        tags {
          name
        }
        type
      }
    }
  }
`

interface RefreshMatchesButtonProps {
  postId: string
  onMatchesRefreshed?: () => void
}

export function RefreshMatchesButton({ postId, onMatchesRefreshed }: RefreshMatchesButtonProps) {
  const [isRefreshing, setIsRefreshing] = useState(false)

  const [refreshMatches] = useMutation(REFRESH_MATCHES, {
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
    setIsRefreshing(true)
    try {
      await refreshMatches({
        variables: {
          postId,
        },
      })
    } catch (error) {
      // Error is handled in onError callback
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