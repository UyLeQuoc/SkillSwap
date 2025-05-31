import { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  className?: string;
}

interface BentoCardProps {
  Icon: LucideIcon;
  name: string;
  description: string;
  className?: string;
  href: string;
  cta: string;
  background?: React.ReactNode;
}

function BentoGrid({ children, className, ...props }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 md:grid-cols-3",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function BentoCard({
  Icon,
  name,
  description,
  className,
  href,
  cta,
  background,
}: BentoCardProps) {
  return (
    <div
      className={cn(
        "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl border bg-background p-6 hover:shadow-2xl hover:shadow-gray-500/20 dark:hover:shadow-gray-900/20",
        className,
      )}
    >
      <Link href={href} className="relative z-10 pt-28">
        <Icon className="h-8 w-8 text-primary" />
        <h3 className="mt-4 text-xl font-bold">{name}</h3>
        <p className="mt-2 text-muted-foreground">{description}</p>
        <div className="mt-4">
          <span className="text-sm font-medium text-primary">{cta} →</span>
        </div>
      </Link>
      {background}
    </div>
  );
}

export { BentoCard, BentoGrid };
