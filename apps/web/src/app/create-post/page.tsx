"use client"

import { Header } from "@/components/header" // Assuming this component exists
import { type PostType, useCreatePostMutation, useGetCurrentUserQuery } from "@/graphql/generated/graphql"
import { useCurrentAccount } from "@mysten/dapp-kit"
import { toast } from "sonner"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CreatePostForm, CreatePostFormValues } from "./_components/form"
import { useRouter } from "next/navigation"
export default function CreatePostPage() {
  const currentAccount = useCurrentAccount()
  const { data: userData, loading: userLoading, error: userError } = useGetCurrentUserQuery()
  const router = useRouter()

  const [createPost, { loading: createPostLoading }] = useCreatePostMutation()

  const handleCreatePost = async (values: CreatePostFormValues) => {
    if (!userData?.getCurrentUser?.id) {
      toast.error("User not identified. Cannot create post.")
      return
    }

    try {
      await createPost({
        variables: {
          input: {
            haveSkill: values.haveSkill,
            wantSkill: values.wantSkill,
            description: values.description,
            type: values.type as PostType, // Zod enum ensures this is valid
            tags: values.tags.map((tag: string) => ({ name: tag })),
          },
        },
        onCompleted: (data) => {
          console.log("Post created:", data)
          toast.success("Post created successfully!")
          router.push("/wallet/"+ userData?.getCurrentUser?.wallet)
          // Optionally, redirect or reset form
        },
        onError: (error) => {
          console.error("Error creating post:", error)
          toast.error(error.message || "Error creating post. Please try again.")
        },
      })
    } catch (error) {
      console.error("Unhandled error in createPost:", error)
      toast.error("An unexpected error occurred.")
    }
  }

  if (userLoading) {
    return (
      <div>
        <Header />
        <main className="container mx-auto py-8 px-4 md:px-6">
          <div className="max-w-2xl mx-auto space-y-6">
            <Skeleton className="h-8 w-1/3" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-24 w-full" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-8 w-1/5" />
            </div>
            <Skeleton className="h-10 w-1/4" />
            <Skeleton className="h-12 w-full" />
          </div>
        </main>
      </div>
    )
  }

  if (userError) {
    return (
      <div>
        <Header />
        <main className="container mx-auto py-8 px-4 md:px-6">
          <Alert variant="destructive" className="max-w-2xl mx-auto">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Could not load user data. Please try again later.</AlertDescription>
          </Alert>
        </main>
      </div>
    )
  }

  if (!currentAccount) {
    return (
      <div>
        <Header />
        <main className="container mx-auto py-8 px-4 md:px-6 flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
          <Alert className="max-w-md text-center">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Authentication Required</AlertTitle>
            <AlertDescription>Please connect your wallet to create a post.</AlertDescription>
          </Alert>
        </main>
      </div>
    )
  }

  return (
    <div>
      <Header />
      <main className="container mx-auto py-8 px-4 md:px-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">Create New Post</h1>
          {userData?.getCurrentUser ? (
            <CreatePostForm
              onSubmit={handleCreatePost}
              isLoading={createPostLoading}
              // Pass PostType enum if needed by the form, or handle string values
            />
          ) : (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>User Data Missing</AlertTitle>
              <AlertDescription>Could not retrieve user information. Please try refreshing the page.</AlertDescription>
            </Alert>
          )}
        </div>
      </main>
    </div>
  )
}
