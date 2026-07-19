"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Search,
  Plus,
  MapPin,
  Calendar,
  Clock,
  Phone,
  ChevronRight,
  ChevronDown,
  Filter,
  CircleCheck,
  CircleAlert,
  MoreVertical,
  Heart,
  Activity,
  User,
  Stethoscope,
  Eye,
  Edit,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { PATIENTS } from "@/constants";

type ViewMode = "table" | "grid";
type StatusFilter = "all" | "stable" | "needs_attention" | "critical";

export default function PatientRegistry() {
  const [view, setView] = useState<ViewMode>("table");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const filtered = PATIENTS.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.condition.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusConfig = {
    stable: { label: "Stable", variant: "outline" as const, icon: CircleCheck, color: "text-green-500" },
    needs_attention: { label: "Needs Attention", variant: "secondary" as const, icon: CircleAlert, color: "text-amber-500" },
    critical: { label: "Critical", variant: "destructive" as const, icon: CircleAlert, color: "text-destructive" },
  };

  const stats = [
    { label: "Total Patients", value: PATIENTS.length, icon: Users, color: "text-primary" },
    { label: "Needs Attention", value: PATIENTS.filter((p) => p.status === "needs_attention").length, icon: Activity, color: "text-amber-500" },
    { label: "Critical", value: PATIENTS.filter((p) => p.status === "critical").length, icon: Heart, color: "text-destructive" },
    { label: "Stable", value: PATIENTS.filter((p) => p.status === "stable").length, icon: CircleCheck, color: "text-green-500" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-blue-600 shadow-sm">
            <Users className="size-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Patient Care Board</h2>
            <p className="text-sm text-muted-foreground">
              Register &amp; manage patient records across Osun State
            </p>
          </div>
        </div>
        <Button size="sm" onClick={() => setShowAddModal(true)}>
          <Plus className="size-4 mr-1.5" />
          Register Patient
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-0 shadow-sm bg-muted/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
                <div className={cn("flex size-10 items-center justify-center rounded-xl bg-background shadow-sm", stat.color)}>
                  <stat.icon className="size-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters & Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name, ID, condition..."
            className="h-9 pl-9 text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-1.5 rounded-lg border p-1 bg-muted/30">
          {(["all", "stable", "needs_attention", "critical"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={cn(
                "rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap",
                statusFilter === s
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {s === "all" ? "All" : statusConfig[s].label}
            </button>
          ))}
        </div>
        <div className="flex items-center rounded-lg border p-1 bg-muted/30">
          {(["table", "grid"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={cn(
                "rounded-md px-2.5 py-1.5 transition-colors",
                view === v ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
              )}
            >
              {v === "table" ? (
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="9" y1="3" x2="9" y2="21" />
                </svg>
              ) : (
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="3" width="7" height="7" rx="1" />
                  <rect x="3" y="14" width="7" height="7" rx="1" />
                  <rect x="14" y="14" width="7" height="7" rx="1" />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Table View */}
      {view === "table" && (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-6">Patient</TableHead>
                  <TableHead>Age/Sex</TableHead>
                  <TableHead>Condition</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Last Visit</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="pr-6 text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence mode="popLayout">
                  {filtered.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">
                        No patients found matching your search.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filtered.map((patient, i) => {
                      const stat = statusConfig[patient.status];
                      const StatusIcon = stat.icon;
                      return (
                        <motion.tr
                          key={patient.id}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ delay: i * 0.03 }}
                          className={cn(
                            "group cursor-pointer",
                            selectedPatient === patient.id && "bg-muted/50"
                          )}
                          onClick={() => setSelectedPatient(patient.id === selectedPatient ? null : patient.id)}
                        >
                          <TableCell className="pl-6">
                            <div className="flex items-center gap-3">
                              <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-semibold">
                                {patient.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                              </div>
                              <div>
                                <p className="text-sm font-medium">{patient.name}</p>
                                <p className="text-xs text-muted-foreground">{patient.id}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm">{patient.age}/{patient.sex}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-[10px] font-normal">
                              {patient.condition}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                              <MapPin className="size-3.5" />
                              {patient.location}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                              <Calendar className="size-3.5" />
                              {patient.lastVisit}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={stat.variant} className="gap-1">
                              <StatusIcon className={cn("size-3", stat.color)} />
                              {stat.label}
                            </Badge>
                          </TableCell>
                          <TableCell className="pr-6 text-right">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-7 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <MoreVertical className="size-4" />
                            </Button>
                          </TableCell>
                        </motion.tr>
                      );
                    })
                  )}
                </AnimatePresence>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Grid View */}
      {view === "grid" && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <div className="col-span-full text-center py-12 text-muted-foreground">
                No patients found matching your search.
              </div>
            ) : (
              filtered.map((patient, i) => {
                const stat = statusConfig[patient.status];
                const StatusIcon = stat.icon;
                return (
                  <motion.div
                    key={patient.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: i * 0.03 }}
                    layout
                  >
                    <Card
                      className={cn(
                        "cursor-pointer transition-shadow hover:shadow-md",
                        selectedPatient === patient.id && "ring-2 ring-primary"
                      )}
                      onClick={() => setSelectedPatient(patient.id === selectedPatient ? null : patient.id)}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold">
                              {patient.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                            </div>
                            <div>
                              <CardTitle className="text-sm">{patient.name}</CardTitle>
                              <CardDescription className="text-xs">{patient.id}</CardDescription>
                            </div>
                          </div>
                          <Badge variant={stat.variant} className="gap-1 text-[10px]">
                            <StatusIcon className={cn("size-3", stat.color)} />
                            {stat.label}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-3">
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Stethoscope className="size-3.5" />
                            <span>{patient.condition}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="size-3.5" />
                            <span>{patient.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="size-3.5" />
                            <span>Last: {patient.lastVisit}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="border-t pt-3">
                        <div className="flex items-center justify-between w-full">
                          <span className="text-xs text-muted-foreground">{patient.age}/{patient.sex}</span>
                          <Button variant="ghost" size="sm" className="text-xs gap-1">
                            View Profile <ChevronRight className="size-3" />
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Add Patient Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-lg rounded-2xl border bg-card shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b px-6 py-4">
                <h3 className="font-semibold">Register New Patient</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8"
                  onClick={() => setShowAddModal(false)}
                >
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
                    className="size-4"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </Button>
              </div>
              <div className="space-y-4 px-6 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium">Full Name</label>
                    <Input placeholder="Patient name" className="h-9" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium">Phone Number</label>
                    <Input placeholder="080..." className="h-9" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium">Age</label>
                    <Input placeholder="Years" className="h-9" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium">Sex</label>
                    <div className="flex gap-2">
                      {["M", "F"].map((s) => (
                        <button
                          key={s}
                          className="flex-1 rounded-md border py-1.5 text-xs font-medium hover:bg-muted transition-colors"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium">Weight (kg)</label>
                    <Input placeholder="kg" className="h-9" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium">Location / LGA</label>
                  <Input placeholder="e.g., Osogbo, Orolu LGA" className="h-9" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium">Presenting Condition</label>
                  <Input placeholder="e.g., Malaria, Cholera, ANC" className="h-9" />
                </div>
              </div>
              <div className="flex items-center justify-end gap-2 border-t px-6 py-4">
                <Button variant="outline" size="sm" onClick={() => setShowAddModal(false)}>
                  Cancel
                </Button>
                <Button size="sm" onClick={() => setShowAddModal(false)}>
                  <Plus className="size-4 mr-1.5" />
                  Register Patient
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}