"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { PostType } from "@/graphql/generated/graphql" // Assuming PostType enum is here
import { X, PlusCircle, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Mock PostType if not available in environment
// enum PostType { SKILL = "SKILL", ITEM = "ITEM" }

const createPostSchema = z.object({
  haveSkill: z
    .string()
    .min(3, "Skill you have must be at least 3 characters long.")
    .max(100, "Skill you have must be at most 100 characters long."),
  wantSkill: z
    .string()
    .min(3, "Skill you want must be at least 3 characters long.")
    .max(100, "Skill you want must be at most 100 characters long."),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long.")
    .max(500, "Description must be at most 500 characters long."),
  type: z.nativeEnum(PostType, { errorMap: () => ({ message: "Please select a post type." }) }),
  tags: z
    .array(z.string().min(2, "Tag must be at least 2 characters.").max(20, "Tag must be at most 20 characters."))
    .min(1, "Please add at least one tag.")
    .max(5, "You can add up to 5 tags."),
})

export type CreatePostFormValues = z.infer<typeof createPostSchema>

interface CreatePostFormProps {
  onSubmit: (values: CreatePostFormValues) => Promise<void>
  isLoading: boolean
  defaultValues?: Partial<CreatePostFormValues>
  isEdit?: boolean
}

export function CreatePostForm({ onSubmit, isLoading, defaultValues, isEdit = false }: CreatePostFormProps) {
  const form = useForm<CreatePostFormValues>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      haveSkill: "",
      wantSkill: "",
      description: "",
      type: undefined, // Or PostType.SKILL as default
      tags: [],
      ...defaultValues,
    },
  })

  const [currentTag, setCurrentTag] = useState("")

  const handleAddTag = () => {
    if (
      currentTag.trim() !== "" &&
      !form.getValues("tags").includes(currentTag.trim()) &&
      form.getValues("tags").length < 5
    ) {
      const currentTags = form.getValues("tags")
      form.setValue("tags", [...currentTags, currentTag.trim()], { shouldValidate: true })
      setCurrentTag("")
    } else if (form.getValues("tags").length >= 5) {
      form.setError("tags", { type: "manual", message: "You can add up to 5 tags." })
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    const currentTags = form.getValues("tags")
    form.setValue(
      "tags",
      currentTags.filter((tag) => tag !== tagToRemove),
      { shouldValidate: true },
    )
  }

  const handleSubmit = (values: CreatePostFormValues) => {
    onSubmit(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="haveSkill"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Skill/Item You Have</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Web Development, Vintage Guitar" {...field} />
              </FormControl>
              <FormDescription>What skill or item are you offering?</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="wantSkill"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Skill/Item You Want</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Graphic Design, Rare Coin" {...field} />
              </FormControl>
              <FormDescription>What skill or item are you looking for in return?</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Provide more details about your offer and what you're looking for..."
                  className="resize-none"
                  rows={5}
                  {...field}
                />
              </FormControl>
              <FormDescription>A clear description helps attract the right trades. (Min 10 characters)</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Post Type</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1 md:flex-row md:space-y-0 md:space-x-4"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value={PostType.Skill} />
                    </FormControl>
                    <FormLabel className="font-normal">Skill Exchange</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value={PostType.Item} />
                    </FormControl>
                    <FormLabel className="font-normal">Item Trade</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags (up to 5)</FormLabel>
              <div className="flex items-center space-x-2">
                <FormControl>
                  <Input
                    placeholder="e.g., React, Design, Collectible"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        handleAddTag()
                      }
                    }}
                  />
                </FormControl>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={handleAddTag}
                  disabled={currentTag.trim() === "" || field.value.length >= 5}
                >
                  <PlusCircle className="h-4 w-4" />
                  <span className="sr-only">Add Tag</span>
                </Button>
              </div>
              <FormDescription>Add relevant tags to help others find your post. (Min 1 tag)</FormDescription>
              <FormMessage />
              {field.value.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {field.value.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1 rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      >
                        <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                        <span className="sr-only">Remove {tag}</span>
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full md:w-auto" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Post...
            </>
          ) : isEdit ? (
            "Update Post"
          ) : (
            "Create Post"
          )}
        </Button>
      </form>
    </Form>
  )
}
