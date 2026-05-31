import { format, parseISO } from "date-fns";

import type { BaseChartDataPoint } from "@/lib/charts/types";

export type ProviderPatientStatus = "ACTIVE" | "DISCHARGED";

export type ProviderPatientSort = "recent" | "name" | "visits";

export type ProviderPatientStatusFilter = "all" | "active" | "discharged";

export interface ProviderPatient {
  id: string;
  name: string;
  age: number;
  gender: string;
  lastVisit: string;
  diagnosis: string;
  status: ProviderPatientStatus;
}

export const PROVIDER_PATIENTS_PAGE_SIZE = 15;

export const MOCK_PROVIDER_PATIENTS: ProviderPatient[] = [
  {
    id: "PT-8821",
    name: "Ram Nepal",
    age: 29,
    gender: "Male",
    lastVisit: "2026-05-21",
    diagnosis: "General Checkup",
    status: "ACTIVE",
  },
  {
    id: "PT-4412",
    name: "Sita Shrestha",
    age: 34,
    gender: "Female",
    lastVisit: "2026-05-19",
    diagnosis: "Type 2 Diabetes Management",
    status: "ACTIVE",
  },
  {
    id: "PT-0911",
    name: "Hari Prasad",
    age: 45,
    gender: "Male",
    lastVisit: "2026-04-12",
    diagnosis: "Acute Bronchitis",
    status: "DISCHARGED",
  },
  {
    id: "PT-1204",
    name: "Gita Rai",
    age: 27,
    gender: "Female",
    lastVisit: "2026-05-18",
    diagnosis: "Chronic Hypertension",
    status: "ACTIVE",
  },
  {
    id: "PT-1205",
    name: "Anil Thapa",
    age: 38,
    gender: "Male",
    lastVisit: "2026-05-17",
    diagnosis: "Migraine Management",
    status: "ACTIVE",
  },
  {
    id: "PT-1206",
    name: "Mina Gurung",
    age: 31,
    gender: "Female",
    lastVisit: "2026-05-16",
    diagnosis: "Thyroid Disorder",
    status: "ACTIVE",
  },
  {
    id: "PT-1207",
    name: "Bikash Karki",
    age: 52,
    gender: "Male",
    lastVisit: "2026-05-15",
    diagnosis: "Coronary Artery Disease",
    status: "ACTIVE",
  },
  {
    id: "PT-1208",
    name: "Puja Adhikari",
    age: 24,
    gender: "Female",
    lastVisit: "2026-05-14",
    diagnosis: "Anemia Follow-up",
    status: "ACTIVE",
  },
  {
    id: "PT-1209",
    name: "Ramesh Bhattarai",
    age: 41,
    gender: "Male",
    lastVisit: "2026-05-13",
    diagnosis: "Lower Back Pain",
    status: "DISCHARGED",
  },
  {
    id: "PT-1210",
    name: "Sabina Tamang",
    age: 33,
    gender: "Female",
    lastVisit: "2026-05-12",
    diagnosis: "Asthma Control Review",
    status: "ACTIVE",
  },
  {
    id: "PT-1211",
    name: "Kiran Maharjan",
    age: 36,
    gender: "Male",
    lastVisit: "2026-05-11",
    diagnosis: "Gastroesophageal Reflux",
    status: "ACTIVE",
  },
  {
    id: "PT-1212",
    name: "Anju Pandey",
    age: 28,
    gender: "Female",
    lastVisit: "2026-05-10",
    diagnosis: "Prenatal Checkup",
    status: "ACTIVE",
  },
  {
    id: "PT-1213",
    name: "Dipesh Shrestha",
    age: 47,
    gender: "Male",
    lastVisit: "2026-05-09",
    diagnosis: "Chronic Kidney Disease",
    status: "ACTIVE",
  },
  {
    id: "PT-1214",
    name: "Rita Koirala",
    age: 55,
    gender: "Female",
    lastVisit: "2026-05-08",
    diagnosis: "Osteoarthritis",
    status: "DISCHARGED",
  },
  {
    id: "PT-1215",
    name: "Nabin Joshi",
    age: 22,
    gender: "Male",
    lastVisit: "2026-05-07",
    diagnosis: "Sports Injury Rehab",
    status: "ACTIVE",
  },
  {
    id: "PT-1216",
    name: "Sunita Basnet",
    age: 39,
    gender: "Female",
    lastVisit: "2026-05-06",
    diagnosis: "Anxiety Disorder",
    status: "ACTIVE",
  },
  {
    id: "PT-1217",
    name: "Prakash Limbu",
    age: 44,
    gender: "Male",
    lastVisit: "2026-05-05",
    diagnosis: "Fatty Liver Monitoring",
    status: "ACTIVE",
  },
  {
    id: "PT-1218",
    name: "Laxmi Dhakal",
    age: 50,
    gender: "Female",
    lastVisit: "2026-05-04",
    diagnosis: "Rheumatoid Arthritis",
    status: "ACTIVE",
  },
  {
    id: "PT-1219",
    name: "Ashok Poudel",
    age: 37,
    gender: "Male",
    lastVisit: "2026-05-03",
    diagnosis: "Sleep Apnea Screening",
    status: "DISCHARGED",
  },
  {
    id: "PT-1220",
    name: "Manisha KC",
    age: 26,
    gender: "Female",
    lastVisit: "2026-05-02",
    diagnosis: "Vitamin D Deficiency",
    status: "ACTIVE",
  },
  {
    id: "PT-1221",
    name: "Suresh Bhandari",
    age: 58,
    gender: "Male",
    lastVisit: "2026-05-01",
    diagnosis: "Prostate Health Review",
    status: "ACTIVE",
  },
  {
    id: "PT-1222",
    name: "Kamala Thapa",
    age: 43,
    gender: "Female",
    lastVisit: "2026-04-30",
    diagnosis: "Fibromyalgia Care",
    status: "ACTIVE",
  },
  {
    id: "PT-1223",
    name: "Rajan Magar",
    age: 35,
    gender: "Male",
    lastVisit: "2026-04-28",
    diagnosis: "Seasonal Allergies",
    status: "DISCHARGED",
  },
  {
    id: "PT-1224",
    name: "Pooja Sharma",
    age: 30,
    gender: "Female",
    lastVisit: "2026-04-26",
    diagnosis: "PCOS Management",
    status: "ACTIVE",
  },
  {
    id: "PT-1225",
    name: "Devendra Rana",
    age: 49,
    gender: "Male",
    lastVisit: "2026-04-24",
    diagnosis: "Gout Flare Prevention",
    status: "ACTIVE",
  },
  {
    id: "PT-1226",
    name: "Nirmala Yadav",
    age: 62,
    gender: "Female",
    lastVisit: "2026-04-22",
    diagnosis: "COPD Monitoring",
    status: "DISCHARGED",
  },
  {
    id: "PT-1227",
    name: "Arjun Shahi",
    age: 32,
    gender: "Male",
    lastVisit: "2026-04-20",
    diagnosis: "Dermatitis Treatment",
    status: "ACTIVE",
  },
  {
    id: "PT-1228",
    name: "Rekha Oli",
    age: 40,
    gender: "Female",
    lastVisit: "2026-04-18",
    diagnosis: "Postpartum Recovery",
    status: "ACTIVE",
  },
];

export const PROVIDER_PATIENT_VISIT_COUNTS: Record<string, number> = {
  "PT-8821": 5,
  "PT-4412": 8,
  "PT-0911": 2,
  "PT-1204": 11,
  "PT-1205": 6,
  "PT-1206": 9,
  "PT-1207": 14,
  "PT-1208": 4,
  "PT-1209": 3,
  "PT-1210": 7,
  "PT-1211": 10,
  "PT-1212": 5,
  "PT-1213": 12,
  "PT-1214": 2,
  "PT-1215": 6,
  "PT-1216": 8,
  "PT-1217": 9,
  "PT-1218": 11,
  "PT-1219": 3,
  "PT-1220": 4,
  "PT-1221": 13,
  "PT-1222": 7,
  "PT-1223": 2,
  "PT-1224": 6,
  "PT-1225": 8,
  "PT-1226": 5,
  "PT-1227": 4,
  "PT-1228": 9,
};

export const MOCK_PROVIDER_PATIENT_VISITS_CHART: BaseChartDataPoint[] = [
  { label: "Jan", value: 18 },
  { label: "Feb", value: 22 },
  { label: "Mar", value: 26 },
  { label: "Apr", value: 31 },
  { label: "May", value: 28 },
  { label: "Jun", value: 24 },
];

export const MOCK_PROVIDER_PATIENT_TOP_DIAGNOSES_CHART: BaseChartDataPoint[] = [
  { label: "Diabetes", value: 9 },
  { label: "Hypertension", value: 7 },
  { label: "Respiratory", value: 6 },
  { label: "Musculoskeletal", value: 5 },
  { label: "Other", value: 11 },
];

export const MOCK_PROVIDER_PATIENT_STATUS_CHART: BaseChartDataPoint[] = [
  { label: "Active Treatment", value: 21, color: "var(--state-success)" },
  { label: "Discharged", value: 7, color: "var(--text-secondary)" },
];

export function formatProviderPatientLastVisit(isoDate: string): string {
  return format(parseISO(isoDate), "MMM d, yyyy");
}

export function getProviderPatientInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function filterAndSortProviderPatients(
  patients: ProviderPatient[],
  search: string,
  sort: ProviderPatientSort,
  statusFilter: ProviderPatientStatusFilter,
): ProviderPatient[] {
  const query = search.trim().toLowerCase();

  let result = patients.filter((patient) => {
    if (statusFilter === "active" && patient.status !== "ACTIVE") {
      return false;
    }
    if (statusFilter === "discharged" && patient.status !== "DISCHARGED") {
      return false;
    }
    if (!query) {
      return true;
    }

    return (
      patient.name.toLowerCase().includes(query) ||
      patient.id.toLowerCase().includes(query) ||
      patient.diagnosis.toLowerCase().includes(query)
    );
  });

  result = [...result].sort((a, b) => {
    if (sort === "name") {
      return a.name.localeCompare(b.name);
    }
    if (sort === "visits") {
      const visitsA = PROVIDER_PATIENT_VISIT_COUNTS[a.id] ?? 0;
      const visitsB = PROVIDER_PATIENT_VISIT_COUNTS[b.id] ?? 0;
      return visitsB - visitsA;
    }
    return parseISO(b.lastVisit).getTime() - parseISO(a.lastVisit).getTime();
  });

  return result;
}

export function paginateProviderPatients<T>(
  items: T[],
  page: number,
  pageSize: number = PROVIDER_PATIENTS_PAGE_SIZE,
) {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const currentPage = Math.min(Math.max(page, 1), totalPages);
  const start = (currentPage - 1) * pageSize;

  return {
    items: items.slice(start, start + pageSize),
    totalPages,
    currentPage,
    totalItems: items.length,
  };
}
