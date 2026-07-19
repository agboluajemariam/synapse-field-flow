"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster } from "sonner";
import {
  LayoutDashboard,
  Users,
  Sparkles,
  AlertTriangle,
  Menu,
  X,
  Stethoscope,
  Hospital,
  Heart,
  Activity,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { BRAND_NAME } from "@/constants";
import Navbar from "@/components/Navbar";
import AIInsights from "@/components/AIInsights";
import PatientRegistry from "@/components/PatientRegistry";
import EpidemicTracker from "@/components/EpidemicTracker";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type ModuleKey = "dashboard" | "patients" | "ai-consult" | "epidemic";

const modules: {
  key: ModuleKey;
  label: string;
  icon: typeof LayoutDashboard;
  description: string;
  color: string;
  gradient: string;
}[] = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    description: "Overview & key metrics",
    color: "text-primary",
    gradient: "from-primary to-blue-600",
  },
  {
    key: "patients",
    label: "Patient Care Board",
    icon: Users,
    description: "Register & manage patients",
    color: "text-emerald-500",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    key: "ai-consult",
    label: "AI Diagnostic Assistant",
    icon: Sparkles,
    description: "Symptom-based triage & treatment",
    color: "text-violet-500",
    gradient: "from-violet-500 to-purple-600",
  },
  {
    key: "epidemic",
    label: "Epidemic Alert Desk",
    icon: AlertTriangle,
    description: "Outbreak surveillance & vaccination",
    color: "text-orange-500",
    gradient: "from-orange-500 to-red-600",
  },
];

const quickStats = [
  {
    label: "Patients Today",
    value: "24",
    change: "+12%",
    icon: Users,
    color: "text-primary",
  },
  {
    label: "AI Consults",
    value: "18",
    change: "+8%",
    icon: Sparkles,
    color: "text-violet-500",
  },
  {
    label: "Active Alerts",
    value: "4",
    change: "+2",
    icon: AlertTriangle,
    color: "text-destructive",
  },
  {
    label: "Vaccinations",
    value: "340",
    change: "+28%",
    icon: Heart,
    color: "text-emerald-500",
  },
];

function DashboardHome() {
  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="rounded-2xl bg-gradient-to-br from-primary/5 via-primary/5 to-blue-600/5 border p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold">
              Good morning, Community Health Worker
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Osogbo LGA — {new Date().toLocaleDateString("en-NG", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10">
            <Stethoscope className="size-6 text-primary" />
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {quickStats.map((stat) => (
          <Card key={stat.label} className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <div className="flex items-baseline gap-1.5 mt-1">
                    <span className="text-2xl font-bold">{stat.value}</span>
                    <span className={cn(
                      "text-xs font-medium",
                      stat.change.startsWith("+") ? "text-green-500" : "text-destructive"
                    )}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className={cn("flex size-10 items-center justify-center rounded-xl bg-background shadow-sm", stat.color)}>
                  <stat.icon className="size-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Module Cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        {modules.slice(1).map((mod) => {
          const Icon = mod.icon;
          return (
            <a
              key={mod.key}
              href={`#${mod.key}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(mod.key)?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group block"
            >
              <Card className="transition-all hover:shadow-md hover:border-primary/30 cursor-pointer">
                <CardContent className="p-5">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "flex size-12 items-center justify-center rounded-xl bg-gradient-to-br shadow-sm",
                      mod.gradient
                    )}>
                      <Icon className="size-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold group-hover:text-primary transition-colors">
                        {mod.label}
                      </h3>
                      <p className="text-sm text-muted-foreground">{mod.description}</p>
                    </div>
                    <ChevronRight className="size-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </CardContent>
              </Card>
            </a>
          );
        })}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardContent className="p-5">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Activity className="size-4 text-primary" />
            Recent Activity
          </h3>
          <div className="space-y-3">
            {[
              { text: "Patient P005 — Malaria diagnosis confirmed, treatment started", time: "10m ago", icon: Heart, color: "text-primary" },
              { text: "Cholera alert escalated to Osogbo LGA health team", time: "25m ago", icon: AlertTriangle, color: "text-destructive" },
              { text: "Vaccination drive: 45 children immunized at Orolu PHC", time: "1h ago", icon: Heart, color: "text-emerald-500" },
              { text: "AI Consult: 3 new symptom assessments completed", time: "2h ago", icon: Sparkles, color: "text-violet-500" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 rounded-lg border p-3">
                <div className={cn("mt-0.5", item.color)}>
                  <item.icon className="size-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm">{item.text}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function App() {
  const [activeModule, setActiveModule] = useState<ModuleKey>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderModule = () => {
    switch (activeModule) {
      case "patients":
        return <PatientRegistry />;
      case "ai-consult":
        return <AIInsights />;
      case "epidemic":
        return <EpidemicTracker />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Toaster
        position="top-right"
        richColors
        closeButton
        toastOptions={{
          style: { borderRadius: "12px" },
        }}
      />

      <Navbar />

      {/* Sidebar for module navigation (desktop) */}
      <aside className="fixed left-0 top-16 z-30 hidden h-[calc(100vh-4rem)] w-60 flex-col border-r border-border/40 bg-background/80 backdrop-blur-xl lg:flex">
        <nav className="flex-1 space-y-1 p-3">
          {modules.map((mod) => {
            const Icon = mod.icon;
            return (
              <button
                key={mod.key}
                onClick={() => {
                  setActiveModule(mod.key);
                  setSidebarOpen(false);
                }}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                  activeModule === mod.key
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <div className={cn(
                  "flex size-8 items-center justify-center rounded-lg",
                  activeModule === mod.key ? "bg-primary/10" : "bg-muted"
                )}>
                  <Icon className={cn("size-4", mod.color)} />
                </div>
                <span className="flex-1 text-left">{mod.label}</span>
                {activeModule === mod.key && (
                  <div className="size-1.5 rounded-full bg-primary" />
                )}
              </button>
            );
          })}
        </nav>
        <div className="border-t p-3">
          <div className="rounded-lg bg-muted/50 p-3">
            <div className="flex items-center gap-2">
              <Hospital className="size-4 text-primary" />
              <span className="text-xs font-medium">Osun State</span>
            </div>
            <p className="text-[10px] text-muted-foreground mt-0.5">
              Ministry of Health Portal
            </p>
          </div>
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed left-0 top-16 z-50 h-[calc(100vh-4rem)] w-60 border-r bg-background"
              onClick={(e) => e.stopPropagation()}
            >
              <nav className="space-y-1 p-3">
                {modules.map((mod) => {
                  const Icon = mod.icon;
                  return (
                    <button
                      key={mod.key}
                      onClick={() => {
                        setActiveModule(mod.key);
                        setSidebarOpen(false);
                      }}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                        activeModule === mod.key
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      <Icon className={cn("size-4", mod.color)} />
                      <span className="flex-1 text-left">{mod.label}</span>
                    </button>
                  );
                })}
              </nav>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="lg:pl-60">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeModule}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
            >
              {renderModule()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}