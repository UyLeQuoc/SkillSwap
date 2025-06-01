"use client"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { PostsQuery } from "@/graphql/generated/graphql"
import { usePostsQuery } from "@/graphql/generated/graphql"
import { useCurrentAccount } from "@mysten/dapp-kit"
import { Search, Sparkle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { SkillCard, SkillCardSkeleton } from "@/components/skill-card"
import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern"

const ITEMS_PER_PAGE = 3 // For demonstration with few items

export default function SkillExchangePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState("createdAt_desc") // e.g. createdAt_desc, haveSkill_asc
  const { data: posts, loading } = usePostsQuery()
  const router = useRouter()
  const currentAccount = useCurrentAccount()

  // Memoize filtered and sorted posts
  const processedPosts = useMemo(() => {
    if (!posts?.posts) return []
    let filtered = posts.posts

    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (post) =>
          post.description?.toLowerCase().includes(lowerSearchTerm) ||
          post.haveSkill.toLowerCase().includes(lowerSearchTerm) ||
          post.wantSkill.toLowerCase().includes(lowerSearchTerm) ||
          post.user?.wallet.toLowerCase().includes(lowerSearchTerm) ||
          post.tags?.some((tag) => tag.name.toLowerCase().includes(lowerSearchTerm)),
      )
    }

    // Sorting
    const [sortField, sortOrder] = sortBy.split("_")
    filtered.sort((a, b) => {
      let valA, valB
      if (sortField === "createdAt") {
        valA = new Date(a.createdAt).getTime()
        valB = new Date(b.createdAt).getTime()
      } else if (sortField === "haveSkill" || sortField === "wantSkill") {
        valA = a[sortField].toLowerCase()
        valB = b[sortField].toLowerCase()
      } else {
        return 0
      }

      if (valA < valB) return sortOrder === "asc" ? -1 : 1
      if (valA > valB) return sortOrder === "asc" ? 1 : -1
      return 0
    })

    return filtered
  }, [posts, searchTerm, sortBy])

  const totalPages = Math.ceil((processedPosts?.length || 0) / ITEMS_PER_PAGE)

  // Memoize paginated posts
  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    return processedPosts?.slice(startIndex, endIndex) || []
  }, [processedPosts, currentPage])

  useEffect(() => {
    setCurrentPage(1) // Reset to first page on search/filter change
  }, [searchTerm, sortBy])

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const getPaginationItems = () => {
    const items = []
    const maxPagesToShow = 5 // Max number of page links to show
    const halfMaxPages = Math.floor(maxPagesToShow / 2)

    let startPage = Math.max(1, currentPage - halfMaxPages)
    let endPage = Math.min(totalPages, currentPage + halfMaxPages)

    if (currentPage - halfMaxPages < 1) {
      endPage = Math.min(totalPages, maxPagesToShow)
    }
    if (currentPage + halfMaxPages > totalPages) {
      startPage = Math.max(1, totalPages - maxPagesToShow + 1)
    }

    if (startPage > 1) {
      items.push(
        <PaginationItem key="start-ellipsis">
          <PaginationEllipsis />
        </PaginationItem>,
      )
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink href="#" isActive={i === currentPage} onClick={() => handlePageChange(i)}>
            {i}
          </PaginationLink>
        </PaginationItem>,
      )
    }

    if (endPage < totalPages) {
      items.push(
        <PaginationItem key="end-ellipsis">
          <PaginationEllipsis />
        </PaginationItem>,
      )
    }
    return items
  }

  return (
    <div className="relative">
      <div className="opacity-75 -z-50 inset-0 absolute">
      <InteractiveGridPattern className="w-full h-full" width={75} height={75}/>
    </div>
    <div className="bg-muted/20 min-h-screen relative">
      <Header />
      <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600 dark:from-primary dark:to-blue-100">
            SkillSwap Network
          </h1>
          <p className="text-lg text-muted-foreground mt-3 max-w-2xl mx-auto">
            Discover, connect, and exchange skills within our vibrant decentralized community. Find your next learning
            opportunity or share your expertise.
          </p>
        </header>

        <div className="mb-8 p-4 bg-background rounded-lg shadow">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex flex-1 gap-2 items-center w-full flex-col md:flex-row md:w-auto">
              <div className="relative flex-1 w-full md:w-auto">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground " />
                <Input
                  type="search"
                  placeholder="Search skills, tags, descriptions, or wallet addresses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 py-2.5 text-base w-full"
                />
              </div>
              <div className="flex gap-2 items-center w-full md:w-auto">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full md:w-[180px] py-2.5 text-base">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="createdAt_desc">Newest First</SelectItem>
                    <SelectItem value="createdAt_asc">Oldest First</SelectItem>
                    <SelectItem value="haveSkill_asc">Offering A-Z</SelectItem>
                    <SelectItem value="haveSkill_desc">Offering Z-A</SelectItem>
                    <SelectItem value="wantSkill_asc">Seeking A-Z</SelectItem>
                    <SelectItem value="wantSkill_desc">Seeking Z-A</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="self-end">
                {
                  currentAccount && (
                    <Button className="cursor-pointer"
                    onClick={() => {
                      router.push("/create-post")
                    }}
                    >
                      <Sparkle className="h-4 w-4" /> Create Post
                    </Button>
                  )
                }
              </div>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
              <SkillCardSkeleton key={i} />
            ))}
          </div>
        ) : processedPosts?.length === 0 ? (
          <div className="text-center py-16">
            <div className="mb-4">
              <Search className="h-12 w-12 mx-auto text-muted-foreground/50" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              {searchTerm ? "No matching skills found" : "No skills available"}
            </h3>
            <p className="text-muted-foreground">
              {searchTerm
                ? "Try adjusting your search terms or filters"
                : "Be the first to share your skills with the community"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {paginatedPosts.map((post) => (
              <SkillCard key={post.id} post={post} />
            ))}
          </div>
        )}

        {!loading && totalPages > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() => handlePageChange(currentPage - 1)}
                  aria-disabled={currentPage === 1}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              {getPaginationItems()}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() => handlePageChange(currentPage + 1)}
                  aria-disabled={currentPage === totalPages}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
    </div>
  )
}
