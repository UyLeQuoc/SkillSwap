"use client"
import { Header } from "@/components/header"
import { useGetBadgesByWalletQuery, usePostsByWalletQuery } from "@/graphql/generated/graphql"
import { useParams } from "next/navigation"
import { SkillCard, SkillCardSkeleton } from "@/components/skill-card"
import { Search, Award } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Page() {
  const { walletId } = useParams()

  const { data: posts, loading: postsLoading } = usePostsByWalletQuery({
    variables: { wallet: walletId as string },
  })

  const { data: badges, loading: badgesLoading } = useGetBadgesByWalletQuery({
    variables: { input: { wallet: walletId as string } },
  })

  return (
    <div className="bg-muted/20 min-h-screen">
      <Header />
      <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600 dark:from-primary dark:to-blue-100">
            User Profile
          </h1>
          <p className="text-lg text-muted-foreground mt-3 max-w-2xl mx-auto">
            View all skills and posts from this user
          </p>
        </header>

        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="posts" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Posts
              {posts?.postsByWallet && (
                <Badge variant="secondary" className="ml-1">
                  {posts.postsByWallet.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="skills" className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              Skills
              {badges?.getBadgesByWallet && (
                <Badge variant="secondary" className="ml-1">
                  {badges.getBadgesByWallet.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="posts">
            {postsLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <SkillCardSkeleton key={i} />
                ))}
              </div>
            ) : !posts?.postsByWallet || posts.postsByWallet.length === 0 ? (
              <div className="text-center py-16">
                <div className="mb-4">
                  <Search className="h-12 w-12 mx-auto text-muted-foreground/50" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No posts found</h3>
                <p className="text-muted-foreground">This user hasn't posted any skills yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.postsByWallet.map((post) => (
                  <SkillCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="skills">
            {badgesLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardHeader>
                      <div className="h-4 bg-muted rounded w-3/4"></div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="h-3 bg-muted rounded w-1/2"></div>
                        <div className="h-3 bg-muted rounded w-2/3"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : !badges?.getBadgesByWallet || badges.getBadgesByWallet.length === 0 ? (
              <div className="text-center py-16">
                <div className="mb-4">
                  <Award className="h-12 w-12 mx-auto text-muted-foreground/50" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No skill badges found</h3>
                <p className="text-muted-foreground">This user hasn't earned any skill badges yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {badges.getBadgesByWallet.map((badge) => (
                  <Card key={badge.id} className="hover:shadow-lg transition-shadow duration-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Award className="h-5 w-5 text-primary" />
                        {badge.skillName}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                        <div className="flex justify-between">
                          <span>Minted:</span>
                          <span>{new Date(badge.mintedAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <span>Verifier ID:</span>
                          <code className="text-xs bg-muted px-2 py-1 rounded break-all">
                            {badge.verifierId.slice(0, 20)}...
                          </code>
                        </div>
                        <div className="flex flex-col gap-1">
                          <span>Digest:</span>
                          <a href={`https://suiscan.xyz/testnet/tx/${badge.suiObjectId}`} className="text-xs bg-muted px-2 py-1 rounded break-all"
                            target="_blank"
                          >
                            {badge.suiObjectId.slice(0, 20)}...
                          </a>
                        </div>
                      </div>
                      <Badge variant="outline" className="w-fit">
                        Verified Skill
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
