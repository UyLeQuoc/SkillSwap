import { MapPin, Shield, Star, Users, Wallet, Zap } from "lucide-react"
import { Card } from "@/components/ui/card"

const features = [
  { icon: MapPin, title: "Location-aware Matching" },
  { icon: Star, title: "Real Reputation System" },
  { icon: Shield, title: "Tamper-proof NFT Verification" },
  { icon: Zap, title: "Smart Contract-Powered Trust" },
  { icon: Wallet, title: "Simple Wallet Integration" },
  { icon: Users, title: "Zero Middlemen" },
]

export function BuiltForHCMCSection() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Built for HCMC, Powered by Web3</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="text-center p-6">
              <feature.icon className="w-8 h-8 mx-auto mb-4 text-blue-500" />
              <h3 className="font-semibold">{feature.title}</h3>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
} 