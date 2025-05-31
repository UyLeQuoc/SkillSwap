import { ArrowRight, Award, Heart, Search, Users, Wallet } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const steps = [
  {
    icon: Wallet,
    title: "Connect Wallet",
    description: "Sign in using your Sui wallet to unlock the platform.",
  },
  {
    icon: Users,
    title: "Post What You Offer or Need",
    description: "List a skill, service, or item you can offer. Or create a request.",
  },
  {
    icon: Search,
    title: "Find a Match",
    description: "Explore offers and requests from others. Send or receive a deal proposal.",
  },
  {
    icon: Heart,
    title: "Make the Exchange",
    description: "Meet, help, teach, trade – and confirm when done.",
  },
  {
    icon: Award,
    title: "Get Verified",
    description: "Once both sides confirm, each user receives a SkillBadge NFT on-chain.",
  },
]

export function HowItWorksSection() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          {steps.map((step, index) => (
            <Card key={index} className="text-center relative">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </CardContent>
              {index < 4 && (
                <ArrowRight className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 text-muted-foreground hidden lg:block" />
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
} 