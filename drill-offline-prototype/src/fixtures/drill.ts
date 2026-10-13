export const drillFixture = {
  title: 'Persiapan Mengerjakan Drill Soal Offline',
  topic: 'Persamaan dan Fungsi',
  subject: 'Matematika',
  questionCount: 3,
  durationMinutes: 15,
  questions: [
    {
      prompt: 'Diketahui suatu bilangan kompleks z memenuhi Re(z) − Im(z) = 3 dan (Re(z))² + (Im(z))² = 45. Jika Re(z) > 0, nilai dari Im(z)/Re(z) adalah …',
      options: ['3', '2', '1', '1/2', '1/3'],
      answer: 3,
      difficulty: 'Sulit',
    },
    {
      prompt: 'Tentukan modulus (nilai mutlak) dari bilangan kompleks yang diberikan: |−2 + 2i|.',
      options: ['3√2', '√13', '2√2', '2√5'],
      answer: 2,
      difficulty: 'Sedang',
    },
    {
      prompt: 'Jika z = 1 − √3i, berapakah nilai dari |z|?',
      options: ['1', '2', '√3', '2√2'],
      answer: 1,
      difficulty: 'Sedang',
    },
  ],
} as const;

export type PreparationState = 'download' | 'downloading' | 'offline-guide' | 'ready';
