import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/utils"
import { LucideIcon } from "lucide-react"
import { ApplePlusButton, Plus } from "@/components/ApplePlusButton";
import {
  Home,
  Search,
  Music,
  Heart,
  Settings,
  User,
  Mail,
  Calendar
} from "lucide-react"

interface AppIconProps {
  icon: LucideIcon
  label: string
  onClick?: () => void
  active?: boolean
  className?: string
}

interface AppleDockProps {
  className?: string
  items: {
    icon: LucideIcon
    label: string
    onClick?: () => void
    active?: boolean
  }[]
}

const AppIcon = React.forwardRef<HTMLButtonElement, AppIconProps>(
  ({ icon: Icon, label, onClick, active, className }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.15, y: -5 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className={cn(
          "relative group flex flex-col items-center justify-center",
          className
        )}
      >
        <div className={cn(
          "w-12 h-12 flex items-center justify-center rounded-2xl",
          "bg-background/90 shadow-sm border border-border/30",
          "backdrop-blur-sm",
          active && "border-blue-500/50 ring-1 ring-blue-500/30"
        )}>
          <Icon className={cn("w-6 h-6", active ? "text-blue-500" : "text-foreground")} />
        </div>
        {active && (
          <div className="w-1 h-1 rounded-full bg-blue-500 mt-1.5" />
        )}
        <span className={cn(
          "absolute -top-8 left-1/2 -translate-x-1/2",
          "px-2 py-1 rounded text-xs",
          "bg-background/80 text-foreground border border-border/30",
          "backdrop-blur-sm shadow-sm",
          "opacity-0 group-hover:opacity-100",
          "transition-opacity whitespace-nowrap pointer-events-none"
        )}>
          {label}
        </span>
      </motion.button>
    )
  }
)
AppIcon.displayName = "AppIcon"

const AppleDock = React.forwardRef<HTMLDivElement, AppleDockProps>(
  ({ items, className }, ref) => {
    return (
      <div ref={ref} className={cn("w-full flex items-center justify-center p-4", className)}>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={cn(
            "flex items-center gap-2 p-3 rounded-2xl",
            "backdrop-blur-xl border shadow-lg",
            "bg-background/60 border-border/50",
          )}
        >
          {items.map((item) => (
            <AppIcon key={item.label} {...item} />
          ))}
        </motion.div>
      </div>
    )
  }
)
AppleDock.displayName = "AppleDock"

export default function AppleStyleApp() {
  const apps = [
    { icon: Home, label: "Home", active: true },
    { icon: Search, label: "Search" },
    { icon: Mail, label: "Mail" },
    { icon: Calendar, label: "Calendar" },
    { icon: Music, label: "Music" },
    { icon: Heart, label: "Favorites" },
    { icon: User, label: "Profile" },
    { icon: Settings, label: "Settings" },
    { icon: Plus, label: "Add" }
  ]

  return (
    <div className="h-screen w-full bg-gradient-to-b from-background to-muted flex flex-col">
      <div className="flex-1 p-4">
        <div className="w-full h-full rounded-xl border border-border/30 bg-background/50 backdrop-blur-sm shadow-sm flex items-center justify-center">
          <ApplePlusButton />
        </div>
      </div>
      <AppleDock items={apps} className="mb-4" />
    </div>
  )
}
