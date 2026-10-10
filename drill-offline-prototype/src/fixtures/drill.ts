export const drillFixture = {
  title: 'Persiapan Mengerjakan Drill Soal Offline',
  topic: 'Persamaan dan Fungsi',
  subject: 'Matematika',
  questionCount: 10,
  durationMinutes: 15,
  question: {
    prompt: 'Jika diketahui P(x) = 2x³ + 4x² − 3x + 2, maka nilai dari P(5) adalah …',
    options: ['247', '297', '307', '317', '327'],
    answer: 1,
  },
} as const;

export type PreparationState = 'download' | 'downloading' | 'offline-guide' | 'ready';
