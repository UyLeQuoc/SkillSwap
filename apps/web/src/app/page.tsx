"use client"

import { useCurrentWallet, useSuiClientQuery } from "@mysten/dapp-kit";
import { useExampleQueryQuery } from "../graphql/generated/graphql"
import { Header } from "@/components/header"
import {
  ArrowRight,
  CheckCircle,
  Wallet,
  Users,
  Shield,
  Zap,
  Cloud,
  Server,
  Award,
  Coins,
  Heart,
  MapPin,
  Search,
  Smartphone,
  Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const { data, loading, error } = useExampleQueryQuery()
  return (
    <div>
      <Header />
      <main>
        {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium">
              🌟 Powered by Sui Blockchain
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              Trade Skills. Earn Trust.{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
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

      {/* Why SkillSwap Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why SkillSwap?</h2>
            <p className="text-xl text-muted-foreground">Decentralized by Design. Human at Heart.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-2">
              <CardHeader>
                <Shield className="w-8 h-8 text-blue-500 mb-2" />
                <CardTitle className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  Connect through Sui Wallet
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Your identity stays yours.</p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <Users className="w-8 h-8 text-purple-500 mb-2" />
                <CardTitle className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  Exchange skills or goods
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Teach, learn, trade, or help.</p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <Award className="w-8 h-8 text-yellow-500 mb-2" />
                <CardTitle className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  Earn NFT SkillBadges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Verifiable proof of real-world contributions.</p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <Star className="w-8 h-8 text-orange-500 mb-2" />
                <CardTitle className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  Build reputation on-chain
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Trust through reviews and verified deals.</p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <Zap className="w-8 h-8 text-green-500 mb-2" />
                <CardTitle className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  No middlemen
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Community-first, transparent, and secure.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
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
            ].map((step, index) => (
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

      {/* Use Cases Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Use Cases</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "🌍 Teach Vietnamese / Learn English",
              "🛠️ Fix my laptop / Design your website",
              "🎸 Guitar lessons / Coding help",
              "📦 Trade old books / Share kitchen appliances",
            ].map((useCase, index) => (
              <Card key={index} className="text-center p-6">
                <p className="text-lg">{useCase}</p>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <p className="text-xl text-muted-foreground">Whatever you can offer, someone nearby needs it.</p>
          </div>
        </div>
      </section>

      {/* Built for HCMC Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Built for HCMC, Powered by Web3</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: MapPin, title: "Location-aware Matching" },
              { icon: Star, title: "Real Reputation System" },
              { icon: Shield, title: "Tamper-proof NFT Verification" },
              { icon: Zap, title: "Smart Contract-Powered Trust" },
              { icon: Wallet, title: "Simple Wallet Integration" },
              { icon: Users, title: "Zero Middlemen" },
            ].map((feature, index) => (
              <Card key={index} className="text-center p-6">
                <feature.icon className="w-8 h-8 mx-auto mb-4 text-blue-500" />
                <h3 className="font-semibold">{feature.title}</h3>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Technology Stack</h2>
            <p className="text-xl text-muted-foreground">
              Built on cutting-edge tools for reliability, scalability, and decentralization
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <Smartphone className="w-8 h-8 text-blue-500 mb-2" />
                <CardTitle>Frontend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Next.js 15</Badge>
                  <Badge variant="secondary">React 19</Badge>
                  <Badge variant="secondary">Shadcn UI</Badge>
                  <Badge variant="secondary">Tailwind CSS 4</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Server className="w-8 h-8 text-green-500 mb-2" />
                <CardTitle>Backend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">NestJS</Badge>
                  <Badge variant="secondary">GraphQL</Badge>
                  <Badge variant="secondary">Prisma</Badge>
                  <Badge variant="secondary">PostgreSQL</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Coins className="w-8 h-8 text-purple-500 mb-2" />
                <CardTitle>Web3</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Sui blockchain</Badge>
                  <Badge variant="secondary">Move contracts</Badge>
                  <Badge variant="secondary">WalletKit</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Cloud className="w-8 h-8 text-orange-500 mb-2" />
                <CardTitle>Infrastructure</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Dockerized</Badge>
                  <Badge variant="secondary">GitHub Actions</Badge>
                  <Badge variant="secondary">VPS Deployment</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What You Earn Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What You Earn</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8">
              <CardHeader>
                <Award className="w-12 h-12 text-yellow-500 mb-4" />
                <CardTitle className="text-2xl">SkillBadge NFTs</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-muted-foreground">
                  On-chain badges prove that you helped someone or exchanged real value. They're verifiable, unique, and
                  non-transferable.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8">
              <CardHeader>
                <Star className="w-12 h-12 text-blue-500 mb-4" />
                <CardTitle className="text-2xl">Reputation Score</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-muted-foreground">
                  Built from reviews, completions, and contributions. The more you give, the more trusted you become.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      </main>
    </div>
  );
}

function MyComponent() {
  const { currentWallet, connectionStatus } = useCurrentWallet();
 
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