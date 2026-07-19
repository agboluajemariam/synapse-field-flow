export const BRAND_NAME = "Osun Health Synapse";
export const BRAND_TAGLINE = "AI-Powered Community Healthcare Bridge";

export const LGAS = [
  "Osogbo", "Ife Central", "Ife East", "Ife North", "Ife South",
  "Ilesa East", "Ilesa West", "Ede North", "Ede South", "Egbedore",
  "Ejigbo", "Ila", "Irepodun", "Isokan", "Iwo",
  "Obokun", "Odo Otin", "Ola Oluwa", "Olorunda", "Oriade",
  "Orolu", "Atakunmosa East", "Atakunmosa West", "Ayedaade", "Ayedire",
  "Boluwaduro", "Boripe", "Ifedayo",
];

export const REFERRAL_HOSPITALS = [
  { name: "LAUTECH Teaching Hospital", city: "Osogbo", beds: 650, specialty: "General" },
  { name: "UNIOSUN Teaching Hospital", city: "Osogbo", beds: 500, specialty: "General" },
  { name: "Our Lady of Lourdes Hospital", city: "Ilesa", beds: 200, specialty: "Maternal" },
  { name: "Wesley Guild Hospital", city: "Ilesa", beds: 350, specialty: "Pediatric" },
  { name: "State Hospital Asubiaro", city: "Osogbo", beds: 180, specialty: "General" },
  { name: "Baptist Hospital", city: "Ede", beds: 120, specialty: "General" },
];

export const COMMON_ALIMENTS = [
  { id: "malaria", name: "Malaria", symptoms: ["fever", "chills", "sweating", "headache", "joint pain"], rdt: "mRDT", severity: "high" },
  { id: "typhoid", name: "Typhoid Fever", symptoms: ["prolonged fever", "abdominal pain", "headache", "constipation", "fatigue"], rdt: "Widal test", severity: "high" },
  { id: "cholera", name: "Cholera", symptoms: ["watery diarrhea", "vomiting", "leg cramps", "dehydration"], rdt: "Stool culture", severity: "critical" },
  { id: "lassa_fever", name: "Lassa Fever", symptoms: ["fever", "sore throat", "chest pain", "vomiting", "bleeding"], rdt: "PCR", severity: "critical" },
  { id: "malnutrition", name: "Malnutrition", symptoms: ["weight loss", "fatigue", "swelling", "irritability"], rdt: "MUAC tape", severity: "moderate" },
  { id: "pneumonia", name: "Pneumonia", symptoms: ["cough", "fever", "difficulty breathing", "chest pain"], rdt: "Chest exam", severity: "high" },
  { id: "dengue", name: "Dengue Fever", symptoms: ["high fever", "severe headache", "eye pain", "rash", "muscle pain"], rdt: "NS1 test", severity: "high" },
];

export const MOCK_EPIDEMIC_ALERTS = [
  { id: 1, lga: "Ilesa East", disease: "Lassa Fever", cases: 4, status: "active", date: "2025-06-10", risk: "high" },
  { id: 2, lga: "Osogbo", disease: "Cholera", cases: 12, status: "monitoring", date: "2025-06-08", risk: "critical" },
  { id: 3, lga: "Ife Central", disease: "Malaria", cases: 89, status: "active", date: "2025-06-11", risk: "moderate" },
  { id: 4, lga: "Ede North", disease: "Dengue", cases: 2, status: "contained", date: "2025-06-05", risk: "low" },
  { id: 5, lga: "Iwo", disease: "Cholera", cases: 0, status: "monitoring", date: "2025-06-11", risk: "low" },
  { id: 6, lga: "Ilesa West", disease: "Lassa Fever", cases: 1, status: "contained", date: "2025-06-07", risk: "moderate" },
];

export const MOCK_PATIENTS = [
  { id: "P001", name: "Adebayo Olamide", age: 34, lga: "Osogbo", gender: "Female", insurance: "NHIS-OS-3421", vitals: { bp: "120/80", temp: 36.8, oxy: 98, weight: 65, heartRate: 72 }, lastVisit: "2025-06-10", status: "stable" },
  { id: "P002", name: "Ogunlade Femi", age: 28, lga: "Ife Central", gender: "Male", insurance: "NHIS-OS-4521", vitals: { bp: "135/85", temp: 38.2, oxy: 96, weight: 72, heartRate: 88 }, lastVisit: "2025-06-09", status: "critical" },
  { id: "P003", name: "Adeleke Chinwe", age: 5, lga: "Ilesa East", gender: "Female", insurance: "NHIS-OS-1298", vitals: { bp: "90/60", temp: 37.1, oxy: 99, weight: 18, heartRate: 95 }, lastVisit: "2025-06-08", status: "stable" },
  { id: "P004", name: "Olawale Rasheed", age: 56, lga: "Ede North", gender: "Male", insurance: "NHIS-OS-6743", vitals: { bp: "145/95", temp: 36.5, oxy: 97, weight: 80, heartRate: 76 }, lastVisit: "2025-06-07", status: "warning" },
  { id: "P005", name: "Ogunbiyi Tolu", age: 22, lga: "Iwo", gender: "Female", insurance: "NHIS-OS-2387", vitals: { bp: "110/70", temp: 37.4, oxy: 99, weight: 55, heartRate: 68 }, lastVisit: "2025-06-11", status: "stable" },
  { id: "P006", name: "Akinsanya Dapo", age: 45, lga: "Osogbo", gender: "Male", insurance: "NHIS-OS-5612", vitals: { bp: "130/82", temp: 39.1, oxy: 94, weight: 70, heartRate: 92 }, lastVisit: "2025-06-10", status: "critical" },
  { id: "P007", name: "Oyedele Funke", age: 31, lga: "Ife North", gender: "Female", insurance: "NHIS-OS-9045", vitals: { bp: "118/76", temp: 36.9, oxy: 98, weight: 62, heartRate: 74 }, lastVisit: "2025-06-06", status: "stable" },
  { id: "P008", name: "Babatunde Kayode", age: 8, lga: "Ilesa West", gender: "Male", insurance: "NHIS-OS-3401", vitals: { bp: "95/60", temp: 37.8, oxy: 97, weight: 25, heartRate: 85 }, lastVisit: "2025-06-09", status: "warning" },
];

export const DRUG_DOSAGE_GUIDE = {
  adult: {
    artemether_lumefantrine: { name: "Artemether-Lumefantrine (Coartem)", indication: "Malaria", dose: "4 tablets twice daily for 3 days", weightMin: 35 },
    ciprofloxacin: { name: "Ciprofloxacin", indication: "Typhoid", dose: "500mg twice daily for 10 days", weightMin: 30 },
    doxycycline: { name: "Doxycycline", indication: "Cholera/Dengue prophylaxis", dose: "100mg twice daily for 7 days", weightMin: 45 },
    paracetamol: { name: "Paracetamol", indication: "Fever", dose: "500-1000mg every 4-6 hours (max 4g/day)", weightMin: 50 },
  },
  pediatric: {
    artemether_lumefantrine: { name: "Artemether-Lumefantrine (Coartem Junior)", indication: "Malaria", dose: "Based on weight: 5-15kg: 1 tab x2/day; 15-25kg: 2 tabs x2/day; 25-35kg: 3 tabs x2/day", weightMin: 5 },
    amoxicillin: { name: "Amoxicillin", indication: "Pneumonia/Infection", dose: "25mg/kg twice daily for 7 days", weightMin: 3 },
    paracetamol: { name: "Paracetamol Suspension", indication: "Fever", dose: "15mg/kg every 4-6 hours (max 60mg/kg/day)", weightMin: 3 },
    zinc_sulfate: { name: "Zinc Sulfate", indication: "Diarrhea/Malnutrition", dose: "10mg (<6mo) / 20mg (>6mo) daily for 14 days", weightMin: 3 },
  },
};

export const PATIENTS = [
  { id: "P001", name: "Adebayo Olamide", age: 34, sex: "F", condition: "Malaria", location: "Osogbo", lastVisit: "2025-06-10", status: "stable" as const },
  { id: "P002", name: "Ogunlade Femi", age: 28, sex: "M", condition: "Cholera", location: "Ife Central", lastVisit: "2025-06-09", status: "critical" as const },
  { id: "P003", name: "Adeleke Chinwe", age: 5, sex: "F", condition: "Malnutrition", location: "Ilesa East", lastVisit: "2025-06-08", status: "stable" as const },
  { id: "P004", name: "Olawale Rasheed", age: 56, sex: "M", condition: "Hypertension", location: "Ede North", lastVisit: "2025-06-07", status: "needs_attention" as const },
  { id: "P005", name: "Ogunbiyi Tolu", age: 22, sex: "F", condition: "ANC Routine", location: "Iwo", lastVisit: "2025-06-11", status: "stable" as const },
  { id: "P006", name: "Akinsanya Dapo", age: 45, sex: "M", condition: "Lassa Fever (Suspected)", location: "Osogbo", lastVisit: "2025-06-10", status: "critical" as const },
  { id: "P007", name: "Oyedele Funke", age: 31, sex: "F", condition: "Typhoid Fever", location: "Ife North", lastVisit: "2025-06-06", status: "stable" as const },
  { id: "P008", name: "Babatunde Kayode", age: 8, sex: "M", condition: "Pneumonia", location: "Ilesa West", lastVisit: "2025-06-09", status: "needs_attention" as const },
  { id: "P009", name: "Olasunkanmi Halimah", age: 42, sex: "F", condition: "Diabetes Type 2", location: "Orolu", lastVisit: "2025-06-05", status: "stable" as const },
  { id: "P010", name: "Adeleke Sunday", age: 67, sex: "M", condition: "COPD", location: "Egbedore", lastVisit: "2025-06-04", status: "needs_attention" as const },
  { id: "P011", name: "Ogunlade Yetunde", age: 3, sex: "F", condition: "Diarrhea", location: "Irepodun", lastVisit: "2025-06-11", status: "critical" as const },
  { id: "P012", name: "Fasoranti Bamidele", age: 39, sex: "M", condition: "Malaria", location: "Ejigbo", lastVisit: "2025-06-10", status: "stable" as const },
];

export const EPIDEMIC_ALERTS = [
  { id: "EA-001", disease: "Cholera", region: "Osogbo LGA", severity: "critical" as const, cases: 12, reportedAt: "2 hours ago", response: "Rapid Response Team deployed. ORS center established at Osogbo PHC. Water chlorination underway.", responseTeam: "RRT Osun Central", intervention: "Water chlorination" },
  { id: "EA-002", disease: "Lassa Fever", region: "Ilesa East LGA", severity: "high" as const, cases: 4, reportedAt: "6 hours ago", response: "Contact tracing initiated. 24 contacts identified, 12 under monitoring. Isolation unit activated.", responseTeam: "UNIOSON Virology Team", intervention: "Contact tracing" },
  { id: "EA-003", disease: "Malaria", region: "Ife Central LGA", severity: "medium" as const, cases: 89, reportedAt: "1 day ago", response: "Mass LLIN distribution campaign. ACT stock replenished at 12 PHCs.", responseTeam: "NMEP Osun", intervention: "LLIN distribution" },
  { id: "EA-004", disease: "Dengue Fever", region: "Ede North LGA", severity: "low" as const, cases: 2, reportedAt: "3 days ago", response: "Fogging operations completed. Mosquito breeding sites eliminated.", responseTeam: "LGA Health Team", intervention: "Fogging" },
];

export const DISEASE_OUTBREAKS = [
  { disease: "Cholera", regions: ["Osogbo", "Orolu", "Egbedore"], casesThisWeek: 24, trend: "rising" as const, changePercent: 40 },
  { disease: "Malaria", regions: ["Ife Central", "Ife East", "Ife North"], casesThisWeek: 189, trend: "falling" as const, changePercent: 15 },
  { disease: "Lassa Fever", regions: ["Ilesa East", "Ilesa West"], casesThisWeek: 4, trend: "stable" as const, changePercent: 0 },
  { disease: "Typhoid", regions: ["Ede North", "Ede South"], casesThisWeek: 18, trend: "rising" as const, changePercent: 28 },
  { disease: "Dengue", regions: ["Ede North"], casesThisWeek: 2, trend: "falling" as const, changePercent: 50 },
];

export const VACCINATION_CAMPAIGNS = [
  { id: "VC-001", name: "Measles-Rubella Catch-up", region: "Osogbo, Orolu, Egbedore", target: 12000, reached: 8400, coverage: 70, status: "active" as const, endDate: "2025-07-15" },
  { id: "VC-002", name: "Polio Eradication Drive", region: "Ife Central, Ife East, Ife North", target: 25000, reached: 21000, coverage: 84, status: "active" as const, endDate: "2025-06-30" },
  { id: "VC-003", name: "Yellow Fever Mass Vaccination", region: "Ilesa East, Ilesa West", target: 18000, reached: 5400, coverage: 30, status: "active" as const, endDate: "2025-08-01" },
  { id: "VC-004", name: "HPV Vaccine (Adolescent Girls)", region: "Ede North, Ede South", target: 5000, reached: 3800, coverage: 76, status: "active" as const, endDate: "2025-07-01" },
  { id: "VC-005", name: "COVID-19 Booster Campaign", region: "All 30 LGAs", target: 50000, reached: 12400, coverage: 25, status: "active" as const, endDate: "2025-09-01" },
  { id: "VC-006", name: "Routine Immunization (RI) Strengthening", region: "Iwo, Ola Oluwa, Ayedire", target: 8000, reached: 7200, coverage: 90, status: "active" as const, endDate: "2025-06-28" },
];

export const SYMPTOM_CHECKLIST = [
  { id: "fever", label: "Fever", icon: "Thermometer" },
  { id: "chills", label: "Chills / Rigors", icon: "Thermometer" },
  { id: "headache", label: "Headache", icon: "Heart" },
  { id: "cough", label: "Cough", icon: "Activity" },
  { id: "difficulty_breathing", label: "Difficulty Breathing", icon: "Activity" },
  { id: "chest_pain", label: "Chest Pain", icon: "Heart" },
  { id: "abdominal_pain", label: "Abdominal Pain", icon: "Heart" },
  { id: "diarrhea", label: "Diarrhea", icon: "Droplets" },
  { id: "vomiting", label: "Vomiting / Nausea", icon: "Droplets" },
  { id: "joint_pain", label: "Joint / Muscle Pain", icon: "Activity" },
  { id: "fatigue", label: "Fatigue / Weakness", icon: "Activity" },
  { id: "rash", label: "Skin Rash", icon: "Info" },
  { id: "bleeding", label: "Unexplained Bleeding", icon: "Droplets" },
  { id: "weight_loss", label: "Weight Loss", icon: "Weight" },
  { id: "sore_throat", label: "Sore Throat", icon: "Heart" },
  { id: "eye_pain", label: "Eye Pain / Redness", icon: "Eye" },
];