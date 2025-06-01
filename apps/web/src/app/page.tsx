"use client"

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
