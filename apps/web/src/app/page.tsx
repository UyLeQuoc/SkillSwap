"use client"

import { useCurrentWallet } from "@mysten/dapp-kit"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/landing/HeroSection"
import { WhySkillSwapSection } from "@/components/landing/WhySkillSwapSection"
import { HowItWorksSection } from "@/components/landing/HowItWorksSection"
import { UseCasesSection } from "@/components/landing/UseCasesSection"
import { BuiltForHCMCSection } from "@/components/landing/BuiltForHCMCSection"
import { TechnologyStackSection } from "@/components/landing/TechnologyStackSection"
import { WhatYouEarnSection } from "@/components/landing/WhatYouEarnSection"

export default function Home() {
  return (
    <div>
      <Header />
      <main>
        <HeroSection />
        <WhySkillSwapSection />
        <HowItWorksSection />
        <UseCasesSection />
        <BuiltForHCMCSection />
        <TechnologyStackSection />
        <WhatYouEarnSection />
      </main>
    </div>
  )
}

function MyComponent() {
  const { currentWallet, connectionStatus } = useCurrentWallet()
 
  return (
    <div>
      {connectionStatus === 'connected' ? (
        <div>
          <h2>Current wallet:</h2>
          <div>Name: {currentWallet.name}</div>
          <div>
            Accounts:
            <ul>
              {currentWallet.accounts.map((account) => (
                <li key={account.address}>- {account.address}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div>Connection status: {connectionStatus}</div>
      )}
    </div>
  )
}