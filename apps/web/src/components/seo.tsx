import { Metadata } from "next"

interface SEOProps {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  type?: "website" | "article"
  url?: string
}

const defaultSEO = {
  title: "SkillSwap - Web3 Skill Exchange Platform in HCMC",
  description: "Connect, share, and exchange skills within HCMC's vibrant decentralized community. Trade skills, learn from others, and build your reputation through NFT SkillBadges.",
  keywords: [
    "SkillSwap",
    "skill exchange",
    "Web3",
    "HCMC",
    "Sui blockchain",
    "skill trading",
    "NFT badges",
    "community learning",
    "peer-to-peer exchange",
    "skill verification",
  ],
  image: "/logo.png",
  type: "website" as const,
  url: "https://skillswap.uydev.id.vn",
}

export function generateSEO({
  title = defaultSEO.title,
  description = defaultSEO.description,
  keywords = defaultSEO.keywords,
  image = defaultSEO.image,
  type = defaultSEO.type,
  url = defaultSEO.url,
}: SEOProps = {}): Metadata {
  return {
    title,
    description,
    keywords: keywords.join(", "),
    openGraph: {
      title,
      description,
      url,
      siteName: "SkillSwap",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: "SkillSwap Platform",
        },
      ],
      type,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@skillswap",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "your-google-site-verification",
      yandex: "your-yandex-verification",
    },
    alternates: {
      canonical: url,
    },
  }
} 