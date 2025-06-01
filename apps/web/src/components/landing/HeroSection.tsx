"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, Wallet } from "lucide-react"
import { RetroGrid } from "../magicui/retro-grid"
import { useRouter } from "next/navigation"
import { BoxReveal } from "../magicui/box-reveal"
import { ConnectModal, useAccounts, useCurrentWallet } from "@mysten/dapp-kit"
import { useGetCurrentUserQuery } from "@/graphql/generated/graphql"

export function HeroSection() {
  const router = useRouter()
  const accounts = useAccounts()

  const currentAccount = accounts[0]
  return (
    <section>
      <div className="container mx-auto text-center max-w-4xl py-10 pb-0 px-4 z-30">
        <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium">
          🌟 Powered by Sui Blockchain
        </Badge>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 flex flex-col items-center">
          <BoxReveal boxColor="#1864FC">
            Trade Skills. Earn Trust.{" "}
          </BoxReveal>
          <BoxReveal boxColor="#1864FC">
            <span className="bg-gradient-to-r from-blue-600 to-primary bg-clip-text text-transparent dark:from-blue-400 dark:to-primary">
              Build Community.
            </span>
          </BoxReveal>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          SkillSwap is a Web3 platform where people in HCMC exchange skills or items, and get verified through
          NFT-based proof of contribution.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
        <ConnectModal
            trigger={
              <Button size="lg" className="text-lg px-8 py-6 cursor-pointer z-50" disabled={!!currentAccount}>
                <Wallet className="mr-2 h-5 w-5" />
                {currentAccount ? 'Connected' : 'Connect Wallet'}
              </Button>
            }
          />
          
          <Button size="lg" variant="outline" className="text-lg px-8 py-6 cursor-pointer z-50" onClick={() => router.push("/explore")}>
            <Search className="mr-2 h-5 w-5" />
            Explore Offers
          </Button>
        </div>
      </div>
      <div className="relative h-[500px] w-full overflow-hidden -mt-80">
        <RetroGrid 
            darkLineColor="#C5E7F4"
            lightLineColor="#2C5286"
        />
      </div>
    </section>
  )
} 