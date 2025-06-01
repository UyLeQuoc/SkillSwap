"use client"

import { useParams, useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { usePostQuery, useUpdatePostMutation, useGetCurrentUserQuery } from "@/graphql/generated/graphql"
import { CreatePostForm, CreatePostFormValues } from "@/app/create-post/_components/form"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { toast } from "sonner"
import { Skeleton } from "@/components/ui/skeleton"
import { type PostType } from "@/graphql/generated/graphql"

export default function EditPostPage() {
  const params = useParams()
  const router = useRouter()
  const postId = params.postId as string

  const { data: postData, loading: postLoading } = usePostQuery({
    variables: {
      postId: postId,
    },
  })

  const { data: userData } = useGetCurrentUserQuery()
  const [updatePost, { loading: updateLoading }] = useUpdatePostMutation()

  const post = postData?.post
  const isAuthorized = post?.user?.id === userData?.getCurrentUser?.id

  const handleUpdatePost = async (values: CreatePostFormValues) => {
    if (!isAuthorized) {
      toast.error("You are not authorized to update this post")
      return
    }

    try {
      await updatePost({
        variables: {
          input: {
            id: postId,
            haveSkill: values.haveSkill,
            wantSkill: values.wantSkill,
            description: values.description,
            type: values.type as PostType,
            tags: values.tags.map((tag: string) => ({ name: tag })),
          },
        },
        onCompleted: () => {
          toast.success("Post updated successfully!")
          router.push(`/post/${postId}`)
        },
        onError: (error) => {
          console.error("Error updating post:", error)
          toast.error(error.message || "Error updating post. Please try again.")
        },
      })
    } catch (error) {
      console.error("Unhandled error in updatePost:", error)
      toast.error("An unexpected error occurred.")
    }
  }

  if (postLoading) {
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

  if (!post) {
    return (
      <div>
        <Header />
        <main className="container mx-auto py-8 px-4 md:px-6">
          <Alert variant="destructive" className="max-w-2xl mx-auto">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Post Not Found</AlertTitle>
            <AlertDescription>The post you are trying to edit does not exist.</AlertDescription>
          </Alert>
        </main>
      </div>
    )
  }

  if (!isAuthorized) {
    return (
      <div>
        <Header />
        <main className="container mx-auto py-8 px-4 md:px-6">
          <Alert variant="destructive" className="max-w-2xl mx-auto">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Unauthorized</AlertTitle>
            <AlertDescription>You are not authorized to edit this post.</AlertDescription>
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
          <h1 className="text-3xl font-bold mb-8 text-center">Edit Post</h1>
          <CreatePostForm
            onSubmit={handleUpdatePost}
            isLoading={updateLoading}
            defaultValues={{
              haveSkill: post.haveSkill,
              wantSkill: post.wantSkill,
              description: post.description || "",
              type: post.type,
              tags: post.tags?.map((tag) => tag.name) || [],
            }}
            isEdit={true}
          />
        </div>
      </main>
    </div>
  )
} 