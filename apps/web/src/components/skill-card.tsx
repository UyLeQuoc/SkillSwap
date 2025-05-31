import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import type { PostsQuery, PostTag } from "@/graphql/generated/graphql"
import { Briefcase, CalendarDays, Copy, GraduationCap, TagsIcon, UserCircle } from "lucide-react"
import { toast } from "sonner"

export function SkillCardSkeleton() {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <div className="flex justify-between items-start gap-2">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-5 w-20" />
        </div>
        <div className="flex items-center pt-1">
          <Skeleton className="h-4 w-4 mr-1.5" />
          <Skeleton className="h-4 w-24" />
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="mb-4">
          <div className="flex items-center text-sm text-muted-foreground mb-1">
            <Skeleton className="h-4 w-4 mr-2" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-5 w-32" />
        </div>

        <div className="mb-4">
          <div className="flex items-center text-sm text-muted-foreground mb-1">
            <Skeleton className="h-4 w-4 mr-2" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-5 w-32" />
        </div>

        <Skeleton className="h-4 w-16 mb-1" />
        <Skeleton className="h-20 w-full" />
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-3">
        <div className="flex items-center text-xs text-muted-foreground">
          <Skeleton className="h-3.5 w-3.5 mr-1.5" />
          <Skeleton className="h-3.5 w-12" />
        </div>
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-5 w-16" />
          ))}
        </div>
        <div className="text-xs text-muted-foreground mt-2 self-end flex items-center">
          <Skeleton className="h-3.5 w-3.5 mr-1.5" />
          <Skeleton className="h-3.5 w-32" />
        </div>
      </CardFooter>
    </Card>
  )
}

interface SkillCardProps {
  post: NonNullable<PostsQuery["posts"][number]>
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

const truncateWalletAddress = (address: string, startChars = 6, endChars = 4) => {
  if (!address) return ""
  return `${address.substring(0, startChars)}...${address.substring(address.length - endChars)}`
}

export function SkillCard({ post }: SkillCardProps) {
  if (!post.user) return null
  const handleCopyWallet = () => {
    if (!post.user) return
    navigator.clipboard.writeText(post.user.wallet)
    toast.success("Wallet address copied to clipboard.")
  }

  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-xl">{post.haveSkill}</CardTitle>
          <Badge variant={post.status === "ACTIVE" ? "default" : "secondary"} className="capitalize shrink-0">
            {post.status.toLowerCase()}
          </Badge>
        </div>
        <CardDescription className="flex items-center pt-1">
          <UserCircle className="h-4 w-4 mr-1.5 text-muted-foreground" />
          <span className="mr-1">User:</span>
          <span className="font-mono text-xs">{truncateWalletAddress(post.user.wallet)}</span>
          <Button variant="ghost" size="icon" className="h-6 w-6 ml-1" onClick={handleCopyWallet}>
            <Copy className="h-3.5 w-3.5" />
            <span className="sr-only">Copy wallet address</span>
          </Button>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="mb-4">
          <div className="flex items-center text-sm text-muted-foreground mb-1">
            <Briefcase className="h-4 w-4 mr-2 shrink-0" />
            <span className="font-medium">Offering:</span>
          </div>
          <p className="text-base font-semibold text-primary">{post.haveSkill}</p>
        </div>

        <div className="mb-4">
          <div className="flex items-center text-sm text-muted-foreground mb-1">
            <GraduationCap className="h-4 w-4 mr-2 shrink-0" />
            <span className="font-medium">Seeking:</span>
          </div>
          <p className="text-base font-semibold">{post.wantSkill}</p>
        </div>

        <p className="text-sm text-muted-foreground mb-1">Details:</p>
        <p className="text-sm leading-relaxed">{post.description}</p>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-3">
        <div className="flex items-center text-xs text-muted-foreground">
          <TagsIcon className="h-3.5 w-3.5 mr-1.5" />
          Tags:
        </div>
        <div className="flex flex-wrap gap-2">
          {post.tags?.map((tag: PostTag) => (
            <Badge key={tag.id} variant="secondary">
              {tag.name}
            </Badge>
          ))}
        </div>
        <div className="text-xs text-muted-foreground mt-2 self-end flex items-center">
          <CalendarDays className="h-3.5 w-3.5 mr-1.5" />
          Posted: {formatDate(post.createdAt)}
        </div>
      </CardFooter>
    </Card>
  )
} 