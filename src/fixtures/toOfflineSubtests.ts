export type OfflineSubtestSummary = {
  id: string;
  label: string;
  title: string;
  subject: string;
  totalQuestions: number;
  answeredCount: number;
};

// Demo-only multi-subtest fixture for the upload progress preview.
export const TO_OFFLINE_SUBTEST_EXAMPLES: OfflineSubtestSummary[] = [
  { id: 'subtest-1', label: 'Subtes 1', title: 'KSR 2025 National Round', subject: 'Geografi SMA', totalQuestions: 4, answeredCount: 0 },
  { id: 'subtest-2', label: 'Subtes 2', title: 'Tryout UTBK 2025', subject: 'Penalaran Umum', totalQuestions: 20, answeredCount: 17 },
  { id: 'subtest-3', label: 'Subtes 3', title: 'Tryout UTBK 2025', subject: 'Pengetahuan dan Pemahaman Umum', totalQuestions: 20, answeredCount: 15 },
  { id: 'subtest-4', label: 'Subtes 4', title: 'Tryout UTBK 2025', subject: 'Pemahaman Bacaan dan Menulis', totalQuestions: 20, answeredCount: 19 },
  { id: 'subtest-5', label: 'Subtes 5', title: 'Tryout UTBK 2025', subject: 'Pengetahuan Kuantitatif', totalQuestions: 20, answeredCount: 12 },
  { id: 'subtest-6', label: 'Subtes 6', title: 'Tryout UTBK 2025', subject: 'Literasi Bahasa Indonesia', totalQuestions: 15, answeredCount: 14 },
  { id: 'subtest-7', label: 'Subtes 7', title: 'Tryout UTBK 2025', subject: 'Literasi Bahasa Inggris', totalQuestions: 15, answeredCount: 10 },
  { id: 'subtest-8', label: 'Subtes 8', title: 'Tryout UTBK 2025', subject: 'Penalaran Matematika', totalQuestions: 20, answeredCount: 16 },
];
