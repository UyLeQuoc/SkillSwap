"use client"
import { Header } from '@/components/header'
import { usePostsByWalletQuery } from '@/graphql/generated/graphql'
import { useParams } from 'next/navigation'
import React from 'react'
import { SkillCard, SkillCardSkeleton } from '@/components/skill-card'
import { Search } from 'lucide-react'

export default function Page() {
  const { walletId } = useParams()

  const { data: posts, loading } = usePostsByWalletQuery({
    variables: { wallet: walletId as string },
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

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {Array.from({ length: 3 }).map((_, i) => (
              <SkillCardSkeleton key={i} />
            ))}
          </div>
        ) : !posts?.postsByWallet || posts.postsByWallet.length === 0 ? (
          <div className="text-center py-16">
            <div className="mb-4">
              <Search className="h-12 w-12 mx-auto text-muted-foreground/50" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No posts found</h3>
            <p className="text-muted-foreground">
              This user hasn't posted any skills yet
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {posts.postsByWallet.map((post) => (
              <SkillCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
