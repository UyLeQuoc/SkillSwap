import React from "react"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

interface LogoProps {
    withText?: boolean
}

export const Logo = ({
    withText = true,
}: LogoProps) => {
    const router = useRouter()

    return (
        <Link href="/" className="flex items-center gap-2">
            <div className={
                cn(
                    'flex items-center',
                    'hover:transition-all hover:duration-1000 motion-reduce:hover:transition-none',
                    '[mask-image:linear-gradient(60deg,#000_25%,rgba(0,0,0,.2)_50%,#000_75%)] [mask-position:0] [mask-size:400%]',
                    'hover:[mask-position:100%]'
                )
                }>
                <Image src="/logo.png" alt="SkillSwap Logo" width={48} height={48} className="dark:invert" />
                <span className={
                    'text-2xl font-bold'
                }>Skillswap</span>
            </div>
        </Link>
    )
} 