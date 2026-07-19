"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Thermometer,
  Activity,
  Heart,
  Droplets,
  Pill,
  Weight,
  ChevronRight,
  Plus,
  Clock,
  MapPin,
  Users,
  Info,
  Check,
  X,
  CircleCheck,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { COMMON_ALIMENTS, SYMPTOM_CHECKLIST, DRUG_DOSAGE_GUIDE } from "@/constants";

type SymptomId = (typeof SYMPTOM_CHECKLIST)[number]["id"];

interface AIDiagnosis {
  condition: string;
  confidence: number;
  severity: "low" | "moderate" | "high" | "critical";
  recommendation: string;
  drug?: string;
  dose?: string;
  referral?: string;
}

const mockDiagnose = (symptoms: SymptomId[]): AIDiagnosis | null => {
  if (symptoms.length === 0) return null;

  const hasFever = symptoms.includes("fever");
  const hasChills = symptoms.includes("chills");
  const hasHeadache = symptoms.includes("headache");
  const hasCough = symptoms.includes("cough");
  const hasDifficultyBreathing = symptoms.includes("difficulty_breathing");
  const hasDiarrhea = symptoms.includes("diarrhea");
  const hasVomiting = symptoms.includes("vomiting");
  const hasBleeding = symptoms.includes("bleeding");
  const hasWeightLoss = symptoms.includes("weight_loss");
  const hasAbdominalPain = symptoms.includes("abdominal_pain");

  if (hasFever && hasDiarrhea && hasVomiting) {
    return {
      condition: "Cholera",
      confidence: 87,
      severity: "critical",
      recommendation: "Immediate rehydration therapy. Refer to nearest ORS center.",
      drug: "Doxycycline (adults) / Azithromycin (children)",
      dose: "Doxycycline: 100mg twice daily for 7 days. Azithromycin: 20mg/kg single dose",
      referral: "LAUTECH Teaching Hospital — Isolation Ward",
    };
  }

  if (hasFever && hasChills && hasHeadache) {
    return {
      condition: "Malaria",
      confidence: 92,
      severity: "high",
      recommendation: "Administer mRDT test. If positive, start ACT therapy immediately.",
      drug: "Artemether-Lumefantrine (Coartem)",
      dose: "4 tablets twice daily for 3 days (adults, >35kg)",
    };
  }

  if (hasCough && hasDifficultyBreathing) {
    return {
      condition: "Pneumonia",
      confidence: 85,
      severity: "high",
      recommendation: "Check respiratory rate and oxygen saturation. Start antibiotics.",
      drug: "Amoxicillin",
      dose: "25mg/kg twice daily for 7 days",
    };
  }

  if (hasFever && hasBleeding) {
    return {
      condition: "Lassa Fever (⚠️ Suspected)",
      confidence: 76,
      severity: "critical",
      recommendation: "URGENT: Isolate patient. Wear full PPE. Notify state epidemiologist immediately.",
      referral: "UNIOSUN Teaching Hospital — Isolation Unit",
    };
  }

  if (hasWeightLoss && hasDiarrhea) {
    return {
      condition: "Malnutrition with GI Infection",
      confidence: 79,
      severity: "moderate",
      recommendation: "MUAC assessment. Start therapeutic feeding. Treat underlying infection.",
      drug: "Zinc Sulfate + Vitamin A",
      dose: "Zinc: 10mg (<6mo) / 20mg (>6mo) daily for 14 days. Vitamin A: 100,000 IU (6-11mo) / 200,000 IU (12-59mo)",
    };
  }

  if (hasFever && hasAbdominalPain) {
    return {
      condition: "Typhoid Fever",
      confidence: 78,
      severity: "high",
      recommendation: "Widal test. Start empirical antibiotics while awaiting results.",
      drug: "Ciprofloxacin",
      dose: "500mg twice daily for 10 days",
    };
  }

  return {
    condition: "General Febrile Illness",
    confidence: 65,
    severity: "moderate",
    recommendation: "Monitor symptoms for 24h. Paracetamol for fever. Return if worsening.",
    drug: "Paracetamol",
    dose: "500-1000mg every 4-6 hours (max 4g/day)",
  };
};

export default function AIInsights() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<SymptomId[]>([]);
  const [diagnosis, setDiagnosis] = useState<AIDiagnosis | null>(null);
  const [loading, setLoading] = useState(false);
  const [patientAge, setPatientAge] = useState("");
  const [patientWeight, setPatientWeight] = useState("");

  const toggleSymptom = (id: SymptomId) => {
    setSelectedSymptoms((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
    setDiagnosis(null);
  };

  const runDiagnosis = async () => {
    if (selectedSymptoms.length === 0) return;
    setLoading(true);
    setDiagnosis(null);
    // Simulate AI inference delay
    await new Promise((r) => setTimeout(r, 1200));
    setDiagnosis(mockDiagnose(selectedSymptoms));
    setLoading(false);
  };

  const resetDiagnosis = () => {
    setSelectedSymptoms([]);
    setDiagnosis(null);
    setPatientAge("");
    setPatientWeight("");
  };

  const severityColor = (s: string) => {
    switch (s) {
      case "critical": return "bg-destructive text-destructive-foreground";
      case "high": return "bg-orange-500 text-white";
      case "moderate": return "bg-amber-500 text-white";
      case "low": return "bg-green-500 text-white";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-blue-600 shadow-sm">
            <Sparkles className="size-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">AI Diagnostic Assistant</h2>
            <p className="text-sm text-muted-foreground">
              Symptom-based triage &amp; treatment recommendation
            </p>
          </div>
        </div>
        {diagnosis && (
          <Button variant="outline" size="sm" onClick={resetDiagnosis}>
            <X className="size-3.5 mr-1.5" />
            Reset
          </Button>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Left: Symptom Selector */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Activity className="size-4 text-primary" />
              Symptom Checklist
            </CardTitle>
            <CardDescription>
              Select all symptoms the patient is presenting
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {SYMPTOM_CHECKLIST.map((symptom) => {
                const Icon = symptom.icon === "Thermometer" ? Thermometer
                  : symptom.icon === "Activity" ? Activity
                  : symptom.icon === "Heart" ? Heart
                  : symptom.icon === "Droplets" ? Droplets
                  : symptom.icon === "Weight" ? Weight
                  : symptom.icon === "Info" ? Info
                  : symptom.icon === "Eye" ? Activity
                  : Info;
                return (
                  <button
                    key={symptom.id}
                    onClick={() => toggleSymptom(symptom.id)}
                    className={cn(
                      "flex items-center gap-2 rounded-lg border px-3 py-2.5 text-left text-sm transition-all",
                      selectedSymptoms.includes(symptom.id)
                        ? "border-primary bg-primary/10 text-primary shadow-sm"
                        : "border-border hover:border-primary/30 hover:bg-muted/50"
                    )}
                  >
                    <Icon className={cn(
                      "size-4 shrink-0",
                      selectedSymptoms.includes(symptom.id) ? "text-primary" : "text-muted-foreground"
                    )} />
                    <span className="truncate">{symptom.label}</span>
                    {selectedSymptoms.includes(symptom.id) && (
                      <Check className="ml-auto size-3.5 shrink-0 text-primary" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="flex items-center gap-2">
                <Clock className="size-4 text-muted-foreground" />
                <Input
                  placeholder="Age (years)"
                  className="h-9 w-24 text-sm"
                  value={patientAge}
                  onChange={(e) => setPatientAge(e.target.value.replace(/\D/g, ""))}
                />
              </div>
              <div className="flex items-center gap-2">
                <Weight className="size-4 text-muted-foreground" />
                <Input
                  placeholder="Weight (kg)"
                  className="h-9 w-24 text-sm"
                  value={patientWeight}
                  onChange={(e) => setPatientWeight(e.target.value.replace(/\D/g, ""))}
                />
              </div>
              <Button
                onClick={runDiagnosis}
                disabled={selectedSymptoms.length === 0 || loading}
                className="ml-auto"
              >
                {loading ? (
                  <Loader2 className="size-4 mr-1.5 animate-spin" />
                ) : (
                  <Sparkles className="size-4 mr-1.5" />
                )}
                {loading ? "Analyzing..." : "Run Diagnosis"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Right: Diagnosis Result */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Heart className="size-4 text-primary" />
              Diagnosis Result
            </CardTitle>
            <CardDescription>
              AI-powered triage recommendation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-12"
                >
                  <div className="relative mb-4">
                    <Loader2 className="size-10 animate-spin text-primary" />
                    <Sparkles className="absolute inset-0 m-auto size-5 text-primary/40" />
                  </div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Analyzing symptoms...
                  </p>
                  <p className="text-xs text-muted-foreground/60 mt-1">
                    Cross-referencing with Osun State disease patterns
                  </p>
                </motion.div>
              ) : diagnosis ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  {/* Condition & Confidence */}
                  <div className="rounded-xl border bg-muted/30 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold">{diagnosis.condition}</span>
                      <Badge className={severityColor(diagnosis.severity)}>
                        {diagnosis.severity}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${diagnosis.confidence}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className={cn(
                            "h-full rounded-full",
                            diagnosis.confidence >= 85 ? "bg-green-500"
                              : diagnosis.confidence >= 70 ? "bg-amber-500"
                              : "bg-orange-500"
                          )}
                        />
                      </div>
                      <span className="text-xs font-medium text-muted-foreground min-w-[3rem] text-right">
                        {diagnosis.confidence}%
                      </span>
                    </div>
                  </div>

                  {/* Recommendation */}
                  <div className="rounded-xl border bg-primary/5 p-4">
                    <div className="flex items-start gap-3">
                      <Info className="size-4 text-primary mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm font-medium mb-1">Recommendation</p>
                        <p className="text-sm text-muted-foreground">{diagnosis.recommendation}</p>
                      </div>
                    </div>
                  </div>

                  {/* Drug & Dose */}
                  {diagnosis.drug && (
                    <div className="rounded-xl border bg-muted/30 p-4">
                      <div className="flex items-start gap-3">
                        <Pill className="size-4 text-primary mt-0.5 shrink-0" />
                        <div>
                          <p className="text-sm font-medium mb-1">{diagnosis.drug}</p>
                          <p className="text-sm text-muted-foreground">{diagnosis.dose}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Referral */}
                  {diagnosis.referral && (
                    <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-4">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="size-4 text-destructive mt-0.5 shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-destructive mb-1">Referral Required</p>
                          <p className="text-sm text-muted-foreground">{diagnosis.referral}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-muted">
                    <Sparkles className="size-7 text-muted-foreground/40" />
                  </div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Select symptoms to begin
                  </p>
                  <p className="text-xs text-muted-foreground/60 mt-1 max-w-[200px]">
                    Choose from the symptom checklist and enter patient details
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>

      {/* Quick Reference */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Pill className="size-4 text-primary" />
            Quick Drug Reference — Osun State Essential Medicines
          </CardTitle>
          <CardDescription>
            Standard dosages per WHO &amp; Nigeria National Treatment Guidelines
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                Adult Formulary
              </h4>
              <div className="space-y-2">
                {Object.values(DRUG_DOSAGE_GUIDE.adult).map((drug) => (
                  <div
                    key={drug.name}
                    className="rounded-lg border p-3 text-sm hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{drug.name}</span>
                      <Badge variant="outline" className="text-[10px]">{drug.indication}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{drug.dose}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                Pediatric Formulary
              </h4>
              <div className="space-y-2">
                {Object.values(DRUG_DOSAGE_GUIDE.pediatric).map((drug) => (
                  <div
                    key={drug.name}
                    className="rounded-lg border p-3 text-sm hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{drug.name}</span>
                      <Badge variant="outline" className="text-[10px]">{drug.indication}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{drug.dose}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}