import { Award, CheckCircle, Code, GraduationCap, Music, Palette, Shield, Users, Zap } from "lucide-react"
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid"
import { cn } from "@/lib/utils"
import { Marquee } from "../magicui/marquee"

const features = [
  {
    Icon: Shield,
    name: "Connect through Sui Wallet",
    description: "Your identity stays yours.",
    className: "col-span-3 lg:col-span-1",
    href: "#wallet",
    cta: "Connect Now",
    background: (
      <Marquee
        pauseOnHover
        className="absolute top-10 [--duration:20s] [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)]"
      >
        {["Secure", "Private", "Decentralized"].map((text, idx) => (
          <div
            key={idx}
            className={cn(
              "relative w-32 cursor-pointer overflow-hidden rounded-xl border p-4",
              "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
              "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
              "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none",
            )}
          >
            <div className="flex flex-row items-center gap-2">
              <div className="flex flex-col">
                <span className="text-sm font-medium dark:text-white">{text}</span>
              </div>
            </div>
          </div>
        ))}
      </Marquee>
    ),
  },
  {
    Icon: Users,
    name: "Exchange skills or goods",
    description: "Teach, learn, trade, or help.",
    className: "col-span-3 lg:col-span-2",
    href: "#exchange",
    cta: "Start Trading",
    background: (
      <div className="absolute right-2 top-4 h-[300px] w-full scale-75 border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-90">
        <div className="grid grid-cols-2 gap-4 p-4">
          {["Teaching", "Learning", "Trading", "Helping"].map((skill, idx) => (
            <div
              key={idx}
              className="rounded-lg border p-4 text-center transition-all bg-primary text-primary-foreground"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    Icon: Award,
    name: "Earn NFT SkillBadges",
    description: "Verifiable proof of real-world contributions.",
    className: "col-span-3 lg:col-span-2",
    href: "#badges",
    cta: "View Badges",
    background: (
      <div className="absolute right-2 top-4 h-[300px] w-full scale-75 border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-90">
        <div className="flex flex-wrap gap-4 p-4">
          {[
            { name: "Teaching", icon: GraduationCap },
            { name: "Coding", icon: Code },
            { name: "Design", icon: Palette },
            { name: "Language", icon: Users },
            { name: "Music", icon: Music },
          ].map((badge, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-all bg-primary text-primary-foreground hover:bg-primary/80"
            >
              <badge.icon className="h-4 w-4" />
              <span>{badge.name} Badge</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    Icon: Zap,
    name: "No middlemen",
    description: "Community-first, transparent, and secure.",
    className: "col-span-3 lg:col-span-1",
    href: "#community",
    cta: "Join Now",
    background: (
      <div className="absolute right-2 top-4 h-[300px] w-full scale-75 border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-90">
        <div className="flex flex-col gap-4 p-4">
          {["Direct", "Transparent", "Secure"].map((feature, idx) => (
            <div
              key={idx}
              className="rounded-lg border p-4 text-center transition-all hover:bg-muted"
            >
              {feature}
            </div>
          ))}
        </div>
      </div>
    ),
  },
]

export function WhySkillSwapSection() {
  return (
    <section className="py-20 px-4 bg-muted/50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why SkillSwap?</h2>
          <p className="text-xl text-muted-foreground">Decentralized by Design. Human at Heart.</p>
        </div>
        <div className="container mx-auto">
            <BentoGrid>
                {features.map((feature, idx) => (
                    <BentoCard key={idx} {...feature} />
                ))}
            </BentoGrid>
        </div>
      </div>
    </section>
  )
} 