"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  MapPin,
  Users,
  Clock,
  Activity,
  ChevronRight,
  ChevronDown,
  Filter,
  Info,
  Heart,
  Thermometer,
  Droplets,
  Pill,
  Hospital,
  CircleCheck,
  CircleAlert,
  Search,
  Calendar,
  ChevronUp,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { EPIDEMIC_ALERTS, DISEASE_OUTBREAKS, VACCINATION_CAMPAIGNS } from "@/constants";

type TabKey = "alerts" | "outbreaks" | "vaccination";

export default function EpidemicTracker() {
  const [activeTab, setActiveTab] = useState<TabKey>("alerts");
  const [expandedAlert, setExpandedAlert] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const tabs = [
    { id: "alerts" as const, label: "Active Alerts", count: EPIDEMIC_ALERTS.length, icon: AlertTriangle },
    { id: "outbreaks" as const, label: "Outbreak Tracker", count: DISEASE_OUTBREAKS.length, icon: Activity },
    { id: "vaccination" as const, label: "Vaccination Campaigns", count: VACCINATION_CAMPAIGNS.length, icon: Heart },
  ];

  const severityColor = (s: string) => {
    switch (s) {
      case "critical": return "bg-destructive text-destructive-foreground";
      case "high": return "bg-orange-500 text-white";
      case "medium": return "bg-amber-500 text-white";
      case "low": return "bg-green-500 text-white";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  const trendIcon = (t: string) => {
    switch (t) {
      case "rising": return ArrowUp;
      case "falling": return ArrowDown;
      case "stable": default: return ChevronRight;
    }
  };

  const trendColor = (t: string) => {
    switch (t) {
      case "rising": return "text-destructive";
      case "falling": return "text-green-500";
      case "stable": default: return "text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-destructive to-orange-600 shadow-sm">
            <AlertTriangle className="size-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Epidemic Alert Desk</h2>
            <p className="text-sm text-muted-foreground">
              Real-time outbreak surveillance &amp; vaccination tracking
            </p>
          </div>
        </div>
        <Badge variant="destructive" className="gap-1.5 text-xs">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-destructive" />
          </span>
          LIVE
        </Badge>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 rounded-lg border p-1 bg-muted/30">
        {tabs.map((tab) => {
          const TabIcon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all",
                activeTab === tab.id
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <TabIcon className="size-4" />
              {tab.label}
              <Badge
                variant={activeTab === tab.id ? "default" : "secondary"}
                className="text-[10px] px-1.5 py-0 min-w-[1.25rem]"
              >
                {tab.count}
              </Badge>
            </button>
          );
        })}
        <div className="relative ml-auto hidden sm:block">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search alerts..."
            className="h-9 w-48 pl-9 text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Active Alerts */}
      {activeTab === "alerts" && (
        <div className="grid gap-4 lg:grid-cols-2">
          {EPIDEMIC_ALERTS.map((alert, i) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card
                className={cn(
                  "cursor-pointer transition-all hover:shadow-md",
                  expandedAlert === alert.id && "ring-2 ring-primary"
                )}
                onClick={() => setExpandedAlert(expandedAlert === alert.id ? null : alert.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "flex size-10 items-center justify-center rounded-xl",
                        alert.severity === "critical" ? "bg-destructive/10" :
                        alert.severity === "high" ? "bg-orange-500/10" : "bg-amber-500/10"
                      )}>
                        <AlertTriangle className={cn("size-5", severityColor(alert.severity).replace("bg-", "text-").replace("text-white", "text-destructive").split(" ")[0])} />
                      </div>
                      <div>
                        <CardTitle className="text-sm">{alert.disease}</CardTitle>
                        <CardDescription className="flex items-center gap-1.5 mt-0.5">
                          <MapPin className="size-3" />
                          {alert.region}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge className={severityColor(alert.severity)}>
                      {alert.severity}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="size-3.5" />
                      <span>{alert.cases} cases</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="size-3.5" />
                      <span>{alert.reportedAt}</span>
                    </div>
                  </div>
                  <AnimatePresence>
                    {expandedAlert === alert.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 space-y-3 border-t pt-4">
                          <div className="rounded-lg bg-muted/50 p-3">
                            <p className="text-xs font-medium text-muted-foreground mb-1">Response</p>
                            <p className="text-sm">{alert.response}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-[10px] gap-1">
                              <Hospital className="size-3" />
                              {alert.responseTeam}
                            </Badge>
                            <Badge variant="outline" className="text-[10px] gap-1">
                              <Pill className="size-3" />
                              {alert.intervention}
                            </Badge>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Outbreak Tracker */}
      {activeTab === "outbreaks" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Activity className="size-4 text-primary" />
              Disease Outbreak Trends
            </CardTitle>
            <CardDescription>
              Weekly case counts across Osun State LGAs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {DISEASE_OUTBREAKS.map((outbreak, i) => {
                const TrendIcon = trendIcon(outbreak.trend);
                return (
                  <motion.div
                    key={outbreak.disease}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "flex size-9 items-center justify-center rounded-lg",
                        outbreak.trend === "rising" ? "bg-destructive/10" :
                        outbreak.trend === "falling" ? "bg-green-500/10" : "bg-muted"
                      )}>
                        <Thermometer className={cn("size-4", trendColor(outbreak.trend))} />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{outbreak.disease}</p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                          <span className="flex items-center gap-1">
                            <MapPin className="size-3" />
                            {outbreak.regions.join(", ")}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-semibold">{outbreak.casesThisWeek}</p>
                        <p className="text-[10px] text-muted-foreground">this week</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendIcon className={cn("size-4", trendColor(outbreak.trend))} />
                        <span className={cn("text-xs font-medium", trendColor(outbreak.trend))}>
                          {outbreak.trend === "rising" ? `+${outbreak.changePercent}%` :
                           outbreak.trend === "falling" ? `-${outbreak.changePercent}%` : "stable"}
                        </span>
                      </div>
                      <Button variant="ghost" size="icon-sm" className="size-7">
                        <ChevronRight className="size-4" />
                      </Button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Vaccination Campaigns */}
      {activeTab === "vaccination" && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {VACCINATION_CAMPAIGNS.map((campaign, i) => (
            <motion.div
              key={campaign.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
                      <Heart className="size-5 text-primary" />
                    </div>
                    <Badge
                      variant={campaign.status === "active" ? "default" : "secondary"}
                      className="text-[10px]"
                    >
                      {campaign.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-sm mt-3">{campaign.name}</CardTitle>
                  <CardDescription className="flex items-center gap-1.5">
                    <MapPin className="size-3" />
                    {campaign.region}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-3 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Target</span>
                    <span className="font-medium">{campaign.target.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Reached</span>
                    <span className="font-medium">{campaign.reached.toLocaleString()}</span>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{campaign.coverage}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${campaign.coverage}%` }}
                        transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                        className="h-full rounded-full bg-primary"
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-3">
                  <div className="flex items-center justify-between w-full text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="size-3" />
                      {campaign.endDate}
                    </span>
                    <Button variant="ghost" size="sm" className="text-xs gap-1">
                      Details <ChevronRight className="size-3" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}