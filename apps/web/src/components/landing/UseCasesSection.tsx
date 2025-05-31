import { Card } from "@/components/ui/card"

const useCases = [
  "🌍 Teach Vietnamese / Learn English",
  "🛠️ Fix my laptop / Design your website",
  "🎸 Guitar lessons / Coding help",
  "📦 Trade old books / Share kitchen appliances",
]

export function UseCasesSection() {
  return (
    <section className="py-20 px-4 bg-muted/50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Use Cases</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {useCases.map((useCase, index) => (
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
  )
} 