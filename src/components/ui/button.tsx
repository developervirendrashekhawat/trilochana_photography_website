import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const variants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-center text-sm font-medium transition-colors motion-reduce:transition-none outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      // Brand variants. Use buttonVariants() on <a>/<Link> for zero-JS CTAs.
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-gold-light",
        outline: "border-gold text-gold-light hover:bg-gold hover:text-ink",
        secondary: "bg-secondary text-secondary-foreground hover:bg-card-dark",
        ghost: "hover:bg-muted hover:text-foreground",
        destructive: "bg-destructive/10 text-destructive hover:bg-destructive/20",
        link: "text-gold-text underline-offset-4 hover:underline",
      },
      size: {
        default: "min-h-12 gap-2 px-6 text-[15px] font-semibold",
        sm: "min-h-11 gap-1.5 px-4 text-sm",
        icon: "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

// Wrapped in cn() so variant classes override the base ones (cva alone just concatenates,
// e.g. "border-transparent ... border-gold" where CSS order, not intent, wins).
const buttonVariants = (props?: Parameters<typeof variants>[0]) => cn(variants(props))

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof variants>) {
  return (
    <button
      data-slot="button"
      className={cn(variants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Button, buttonVariants }
