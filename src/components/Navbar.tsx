"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  Search,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Moon,
  Sun,
  Heart,
  Stethoscope,
  Hospital,
  User,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { BRAND_NAME } from "@/constants";

const navLinks = [
  { label: "Dashboard", href: "#dashboard", active: true },
  { label: "Patients", href: "#patients", active: false },
  { label: "AI Consult", href: "#ai-consult", active: false },
  { label: "Epidemic Desk", href: "#epidemic", active: false },
  { label: "Reports", href: "#reports", active: false },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const toggleDark = () => {
    setDark((d) => !d);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4 lg:px-6">
        {/* Left: Logo */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
          <div className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-blue-600 shadow-sm">
              <Stethoscope className="size-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-sm font-semibold leading-tight tracking-tight">
                {BRAND_NAME}
              </h1>
              <p className="text-[10px] leading-tight text-muted-foreground">
                Osun State Health Portal
              </p>
            </div>
          </div>
        </div>

        {/* Center: Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={cn(
                "relative rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                link.active
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
              )}
            >
              {link.label}
              {link.active && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -bottom-[13px] left-1/2 h-[2px] w-8 -translate-x-1/2 rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          ))}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-1.5">
          {/* Search */}
          <div className="relative hidden sm:block">
            {searchOpen ? (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 240, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                className="flex items-center"
              >
                <Input
                  placeholder="Search patients, records..."
                  className="h-9 pl-9 pr-3 text-sm"
                  autoFocus
                  onBlur={() => setTimeout(() => setSearchOpen(false), 200)}
                />
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              </motion.div>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground"
                onClick={() => setSearchOpen(true)}
              >
                <Search className="size-4" />
              </Button>
            )}
          </div>

          {/* Dark Mode Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground"
            onClick={toggleDark}
          >
            {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </Button>

          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground"
              onClick={() => setNotifOpen(!notifOpen)}
            >
              <Bell className="size-4" />
              <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-destructive text-[9px] font-bold text-white">
                3
              </span>
            </Button>
            <AnimatePresence>
              {notifOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  className="absolute right-0 top-full mt-2 w-80 rounded-xl border bg-card shadow-lg"
                >
                  <div className="flex items-center justify-between border-b px-4 py-3">
                    <span className="text-sm font-semibold">Notifications</span>
                    <Badge variant="secondary" className="text-[10px]">3 new</Badge>
                  </div>
                  {[
                    { icon: CircleAlert, text: "Cholera alert: 12 new cases in Osogbo", time: "2m ago", color: "text-destructive" },
                    { icon: Activity, text: "Patient P002 vitals critical", time: "15m ago", color: "text-warning" },
                    { icon: Heart, text: "Vaccination drive: 340 children immunized", time: "1h ago", color: "text-secondary" },
                  ].map((notif, i) => (
                    <div key={i} className="flex items-start gap-3 px-4 py-3 hover:bg-muted/50 transition-colors cursor-pointer">
                      <div className={cn("mt-0.5", notif.color)}>
                        <notif.icon className="size-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm">{notif.text}</p>
                        <p className="text-[11px] text-muted-foreground mt-0.5">{notif.time}</p>
                      </div>
                    </div>
                  ))}
                  <div className="border-t px-4 py-2.5 text-center">
                    <button className="text-xs text-primary font-medium hover:underline">
                      View all notifications
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile */}
          <div className="flex items-center gap-2 pl-1.5 border-l border-border">
            <Avatar className="size-8 ring-2 ring-primary/10">
              <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                CH
              </AvatarFallback>
            </Avatar>
            <div className="hidden md:block">
              <p className="text-xs font-medium leading-tight">Community Health</p>
              <p className="text-[10px] text-muted-foreground leading-tight">CHW, Osogbo LGA</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:inline-flex size-7 text-muted-foreground"
            >
              <LogOut className="size-3.5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-border/50 lg:hidden"
          >
            <div className="space-y-1 px-4 py-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    link.active
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {link.label}
                  {link.active && (
                    <Badge className="ml-auto text-[10px] px-1.5 py-0" variant="default">
                      Active
                    </Badge>
                  )}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function CircleAlert(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}