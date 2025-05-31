import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, Wallet } from "lucide-react"

export function HeroSection() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto text-center max-w-4xl">
        <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium">
          🌟 Powered by Sui Blockchain
        </Badge>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
          Trade Skills. Earn Trust.{" "}
          <span className="bg-gradient-to-r from-blue-600 to-primary bg-clip-text text-transparent dark:from-blue-400 dark:to-primary">
            Build Community.
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          SkillSwap is a Web3 platform where people in HCMC exchange skills or items, and get verified through
          NFT-based proof of contribution.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button size="lg" className="text-lg px-8 py-6">
            <Wallet className="mr-2 h-5 w-5" />
            Connect Wallet
          </Button>
          <Button size="lg" variant="outline" className="text-lg px-8 py-6">
            <Search className="mr-2 h-5 w-5" />
            Explore Offers
          </Button>
        </div>
      </div>
    </section>
  )
} 