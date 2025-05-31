import { Award, Star } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function WhatYouEarnSection() {
  return (
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
  )
} 