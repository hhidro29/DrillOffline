export type QuestionChoice = 'A' | 'B' | 'C' | 'D';
export type QuestionAnswerStatus = 'unanswered' | 'answered' | 'doubtful';

export type ToOfflineQuestion = {
  id: string;
  number: 1 | 2;
  subject: 'Geografi SMA';
  competency: string;
  difficulty: 'sedang';
  stem: string;
  passageTitle: string;
  passage: string;
  options: Array<{ key: QuestionChoice; text: string }>;
  correctAnswer: QuestionChoice;
  selectedAnswer: QuestionChoice | null;
  status: QuestionAnswerStatus;
};

/** Original practice content for the two Figma question states. */
export const TO_OFFLINE_QUESTIONS: readonly ToOfflineQuestion[] = [
  {
    id: 'ksr-geo-2025-national-01',
    number: 1,
    subject: 'Geografi SMA',
    competency: 'Menganalisis hubungan kondisi fisik wilayah dan kegiatan penduduk',
    difficulty: 'sedang',
    stem: 'Berdasarkan bacaan, faktor yang paling menjelaskan perbedaan pola tanam di kedua desa adalah ...',
    passageTitle: 'Perbedaan Pola Tanam di Lereng Merapi',
    passage:
      'Desa Suka Maju dan Desa Tegal Arum berada di sisi yang sama dari sebuah gunung api. Suka Maju terletak pada lereng atas dengan kemiringan lahan yang lebih besar. Tanahnya bertekstur remah dan menerima abu vulkanik secara berkala, tetapi ketersediaan air permukaan cepat berkurang setelah musim hujan. Warga menanam sayuran berumur pendek agar lahan dapat segera dipanen sebelum curah hujan menurun.\n\nTegal Arum berada di kaki lereng yang lebih landai. Aliran air dari bagian atas membawa material halus dan berkumpul di dataran desa. Saluran irigasi sederhana membuat sawah tetap mendapat air pada musim kemarau. Petani di wilayah ini memilih padi pada awal musim, kemudian palawija setelah panen.\n\nKedua desa memiliki akses pasar yang sama. Perbedaan pilihan komoditas terutama muncul karena ketinggian, kemiringan, dan pola aliran air yang membentuk kondisi lahan berbeda.',
    options: [
      { key: 'A', text: 'Perbedaan akses pasar antara desa di lereng atas dan desa di kaki lereng' },
      { key: 'B', text: 'Perbedaan relief, ketersediaan air, dan karakter tanah pada tiap ketinggian' },
      { key: 'C', text: 'Perbedaan jumlah penduduk yang bekerja di sektor pertanian' },
      { key: 'D', text: 'Perbedaan jarak kedua desa terhadap pusat pemerintahan kabupaten' },
    ],
    correctAnswer: 'B',
    selectedAnswer: null,
    status: 'unanswered',
  },
  {
    id: 'ksr-geo-2025-national-02',
    number: 2,
    subject: 'Geografi SMA',
    competency: 'Menilai dampak perubahan tutupan lahan terhadap risiko banjir',
    difficulty: 'sedang',
    stem: 'Kebijakan yang paling sesuai untuk mengurangi risiko banjir tanpa menghambat kebutuhan ruang kota adalah ...',
    passageTitle: 'Ruang Terbuka dan Banjir Perkotaan',
    passage:
      'Kota Nirmala berkembang di sepanjang dua sungai yang bertemu di bagian timur kota. Selama sepuluh tahun, lahan sawah dan kebun di sekitar pertemuan sungai berubah menjadi permukiman. Permukaan tanah yang tertutup bangunan membuat air hujan lebih cepat mengalir ke saluran. Ketika hujan deras datang bersamaan dengan pasang sungai, beberapa lingkungan mengalami genangan meskipun saluran telah dibersihkan.\n\nPemerintah kota memetakan area dengan genangan berulang. Peta tersebut menunjukkan bahwa genangan paling lama terjadi di lingkungan yang kehilangan kolam retensi dan memiliki sedikit ruang terbuka. Di bagian hulu, vegetasi di sempadan sungai juga berkurang karena pembangunan jalan.\n\nRencana tata ruang baru mengusulkan taman resapan pada lahan milik pemerintah, kewajiban sumur resapan untuk bangunan baru, serta pemulihan vegetasi di sempadan sungai. Pembangunan tetap dapat berlangsung, tetapi limpasan hujan ditahan dan diserap lebih dekat dari sumbernya.',
    options: [
      { key: 'A', text: 'Memindahkan seluruh permukiman ke luar wilayah kota dalam satu tahap' },
      { key: 'B', text: 'Memperlebar semua jalan agar air hujan segera mengalir menuju sungai' },
      { key: 'C', text: 'Menambah ruang resapan, kolam retensi, dan vegetasi sempadan secara terpadu' },
      { key: 'D', text: 'Menutup akses sungai agar pasang tidak masuk ke lingkungan permukiman' },
    ],
    correctAnswer: 'C',
    selectedAnswer: null,
    status: 'unanswered',
  },
];

export function getToOfflineQuestion(number: 1 | 2): ToOfflineQuestion {
  const question = TO_OFFLINE_QUESTIONS.find(item => item.number === number);
  if (!question) throw new Error(`Missing TO Offline fixture for question ${number}`);
  return question;
}
