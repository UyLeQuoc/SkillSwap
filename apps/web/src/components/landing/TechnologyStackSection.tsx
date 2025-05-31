import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cloud, Coins, Server, Smartphone } from "lucide-react"

export function TechnologyStackSection() {
  return (
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
  )
} 