# Drill Offline — Backlog

> Backlog ini menampung masukan review dan status implementasinya. Perubahan yang berstatus lokal sudah tersedia di prototype, tetapi belum dipush.

## Latest review batch

### DRILL-026 — Perbarui copy alternatif pengaturan internet

- **Referensi:** Gambar 1.
- **Task:** Perbarui heading dan langkah alternatif agar jelas bahwa koneksi internet dapat dimatikan lewat menu Pengaturan perangkat.
- **Acceptance criteria:** Copy menyebut Wi-Fi dan data seluler dengan bahasa yang ringkas dan konsisten di flow mematikan maupun menyalakan koneksi.
- **Status:** Implemented locally

### DRILL-027 — Hapus copy yang ditandai pada Gambar 2

- **Referensi:** Gambar 2.
- **Task:** Hapus komponen copy yang ditandai dari tampilan.
- **Catatan:** Target copy perlu dikonfirmasi saat implementasi karena Gambar 4 juga mendefinisikan subcopy pada pop-up koneksi.
- **Status:** Implemented locally

### DRILL-028 — Sembunyikan XP dan statistik jawaban selama pengerjaan

- **Referensi:** Gambar 3.
- **Task:** Hilangkan total XP, jumlah benar, dan jumlah salah dari header screen pengerjaan.
- **Acceptance criteria:** Nilai benar/salah dan XP baru muncul pada hasil akhir setelah koneksi internet aktif dan hasil berhasil diproses.
- **Status:** Implemented locally

### DRILL-029 — Rapikan urutan informasi pop-up koneksi

- **Referensi:** Gambar 4.
- **Task:** Susun informasi pop-up dengan urutan: title → timer → subcopy.
- **Acceptance criteria:** Bagian penting pada subcopy dibuat bold, tanpa menambah blok teks yang tidak diperlukan.
- **Status:** Implemented locally

### DRILL-030 — Toast saat kembali Offline

- **Task:** Tampilkan toast ketika user berhasil mematikan internet dan kembali ke mode Offline setelah pop-up koneksi ditutup.
- **Contoh copy:** `Koneksi internet mati. Kamu kembali ke mode Offline.`
- **Status:** Implemented locally

### DRILL-031 — Indikator mode Offline

- **Task:** Tambahkan indikator persisten di bagian bawah screen pengerjaan untuk menunjukkan bahwa user sedang berada di mode Offline.
- **Acceptance criteria:** Indikator tidak menutupi soal, timer, atau CTA; tetap terlihat saat area soal discroll.
- **Status:** Implemented locally

### DRILL-032 — Hapus inline error state koneksi

- **Referensi:** Gambar 5.
- **Task:** Hilangkan blok error inline pada screen soal.
- **Acceptance criteria:** Saat koneksi menyala, cukup tampilkan pop-up koneksi; state soal tidak menampilkan error card tambahan.
- **Status:** Implemented locally

### DRILL-033 — Redesain halaman pengumpulan

- **Referensi:** Gambar 6.
- **Task:** Buat layout halaman pengumpulan yang berbeda dari halaman persiapan agar tidak terasa familiar dan tidak membingungkan user.
- **Flow:** User masuk halaman pengumpulan → menyalakan internet → tombol `Kumpulkan` aktif → user menekan tombol tersebut.
- **Acceptance criteria:** Checklist dan layout baru tidak mengulang struktur halaman persiapan; tombol `Kumpulkan` disabled sebelum internet aktif dan enabled setelah internet aktif.
- **Status:** Implemented locally

## Existing flow decisions to carry into implementation

### DRILL-034 — Tambahkan istilah Airplane Mode

- **Task:** Dampingi istilah `Mode Terbang` dengan `Airplane Mode` pada heading dan langkah terkait.
- **Status:** Implemented locally

### DRILL-035 — Hapus copy pembuka panduan mematikan internet

- **Task:** Hapus teks pembuka `Matikan koneksi internet perangkat untuk melanjutkan mengerjakan drill secara offline.` di bawah heading panduan.
- **Status:** Implemented locally

### DRILL-036 — Auto-submit grace timeout langsung ke hasil

- **Task:** Jika countdown 25 detik saat internet terdeteksi habis, jangan masuk ke state pengumpulan manual.
- **Flow:** Kunci jawaban → upload otomatis karena internet sudah aktif → tampilkan loading singkat → langsung ke hasil; jika upload gagal, tampilkan retry tanpa kembali ke soal.
- **Status:** Implemented locally

### DRILL-037 — Hapus CTA `Kembali ke Offline` dari pop-up koneksi

- **Referensi:** Screenshot 11.44.13.
- **Task:** Hilangkan button `Kembali ke Offline` dari pop-up saat koneksi internet terdeteksi.
- **Flow yang diinginkan:** User mematikan internet dari perangkat; aplikasi mendeteksi koneksi kembali Offline dan melanjutkan flow secara otomatis tanpa perlu menekan button di pop-up.
- **Tester cheat:** Tambahkan kontrol khusus di sidebar tester untuk mensimulasikan event `Kembali ke Offline` saat review prototype. Kontrol ini hanya untuk tester dan tidak tampil di user flow.
- **Acceptance criteria:** Pop-up tidak memiliki CTA; state berubah ketika event Offline terdeteksi; kontrol tester dapat memicu event yang sama secara deterministik.
- **Status:** Implemented locally

### DRILL-038 — Arahkan CTA `Yakin` ke proses upload jawaban

- **Referensi:** Screenshot 11.45.49.
- **Task:** Setelah user memilih `Yakin` pada konfirmasi mengakhiri sesi Drill, arahkan user ke flow pengumpulan/upload jawaban.
- **Flow yang diinginkan:** Konfirmasi akhiri sesi → halaman pengumpulan hasil → user menyalakan internet → tombol `Kumpulkan` aktif → upload jawaban.
- **Acceptance criteria:** CTA `Yakin` tidak langsung membuka hasil akhir; user masuk ke proses upload/pengumpulan dan tetap harus menyelesaikan upload sebelum melihat hasil.
- **Status:** Implemented locally

### DRILL-039 — Tambahkan penanda Drill sedang dikerjakan dalam mode Offline

- **Referensi:** Screenshot 11.46.44.
- **Task:** Tampilkan penanda yang jelas bahwa sesi Drill sedang dikerjakan dalam mode Offline pada screen soal.
- **Flow yang diinginkan:** Selama user mengerjakan soal tanpa koneksi internet, label `Mode Offline` tetap terlihat dan tidak bergantung pada isi soal.
- **Acceptance criteria:** Penanda terlihat pada area header/progress atau area status yang mudah ditemukan, tidak menutupi nomor soal, timer, soal, maupun footer, dan tetap tersedia saat konten soal discroll.
- **Status:** Implemented locally

### DRILL-040 — Mulai download otomatis saat link Drill dibuka

- **Referensi:** Screenshot 11.47.31.
- **Task:** Ketika student membuka link Drill dan masuk ke halaman persiapan, sistem langsung memulai proses download paket soal tanpa menunggu klik `Download Soal`.
- **Acceptance criteria:** Halaman tetap menampilkan status/progress download; button manual tidak diperlukan untuk memulai proses; setelah download selesai user lanjut ke panduan mematikan koneksi internet.
- **Status:** Implemented locally

### DRILL-041 — Akumulasi Starchamp selama Offline

- **Task:** Ubah mekanisme reward saat Drill dikerjakan dalam mode Offline. Poin Starchamp tidak diberikan secara langsung per soal, tetapi diakumulasikan dan diproses setelah sesi selesai dikumpulkan saat internet aktif.
- **Acceptance criteria:** Selama Offline tidak ada reward Starchamp real-time; data benar/salah dan reward tersimpan untuk diproses setelah upload; hasil akhir menampilkan akumulasi yang sudah diproses.
- **Status:** Implemented locally

### DRILL-042 — Edukasi pemrosesan nilai, Starchamp, dan XP di akhir sesi

- **Task:** Tambahkan edukasi bahwa status benar/salah, poin Starchamp, dan XP belum direview saat Offline dan baru diproses setelah user menyalakan internet serta mengumpulkan Drill.
- **Contoh copy:** `Jawaban, Starchamp, dan XP kamu akan direview setelah sesi selesai dan Drill berhasil dikumpulkan saat online.`
- **Acceptance criteria:** Copy terlihat sebelum atau saat mulai mengerjakan, menggunakan bahasa ringkas, dan tidak menjanjikan nilai/reward sebelum proses upload selesai.
- **Status:** Implemented locally

### DRILL-043 — Gabungkan progress soal dan indikator Offline

- **Referensi:** Screenshot 11.59.52.
- **Task:** Tempatkan nomor progress soal dan status mode jaringan dalam satu komponen horizontal pada screen pengerjaan.
- **Layout:** `1/10` berada di sisi kiri; `Mode Offline` berada di sisi kanan dalam komponen yang sama.
- **Acceptance criteria:** Tidak ada lagi pill `Mode Offline` terpisah di bagian bawah yang menutupi area soal; komponen tetap terlihat jelas tanpa mengganggu timer, soal, opsi jawaban, atau footer.
- **Status:** Implemented locally

### DRILL-044 — Auto-upload saat internet aktif di halaman pengumpulan

- **Referensi:** Screenshot 12.11.21.
- **Task:** Saat koneksi internet sudah aktif pada halaman pengumpulan, mulai proses upload jawaban secara otomatis tanpa menunggu klik `Kumpulkan`.
- **Acceptance criteria:** Deteksi Online memicu state upload; tampilkan progress upload; setelah selesai lanjut ke hasil. Tombol manual tidak menjadi langkah wajib pada happy path.
- **Status:** Implemented locally

### DRILL-045 — Selaraskan visual halaman pengumpulan dengan persiapan Drill

- **Referensi:** Screenshot 12.11.21 dan screen persiapan Drill Offline.
- **Task:** Revisi layout, hierarchy, spacing, card, checklist/status, warna, dan sticky action halaman pengumpulan agar konsisten dengan screen awal persiapan mengerjakan Drill Offline.
- **Acceptance criteria:** Halaman tetap memiliki konteks pengumpulan dan status koneksi, tetapi memakai bahasa visual dan komponen yang selaras dengan persiapan; layout tetap berbeda secukupnya agar user tidak salah mengira sedang berada di langkah persiapan.
- **Status:** Implemented locally

## Notes

- Item berstatus `Implemented locally` sudah tersedia di source dan belum dipush; item berstatus `Backlog` masih menunggu command implementasi.
- Perubahan berstatus `Implemented locally` sudah dikerjakan di source dan menunggu review/push terpisah.

### DRILL-046 — Rapikan visual collection Offline terbaru

- **Task:** Perbarui hierarchy, spacing, dan pending/completed checklist state berdasarkan screenshot collection terbaru; hilangkan copy yang berulang atau memberi kesan langkah sudah selesai saat Offline.
- **Acceptance criteria:** Pending checklist memakai indikator kosong; koneksi dan upload hanya complete pada state yang benar; card dan sticky CTA tetap selaras dengan preparation; Online auto-upload, retry, summary, scroll, dan overflow tidak regresi.
- **Status:** Implemented locally

### DRILL-047 — Gunakan centang abu-abu untuk checklist pending

- **Task:** Ganti lingkaran kosong checklist pending dengan ikon centang abu-abu di seluruh flow, terutama panduan mematikan internet dan halaman collection.
- **Acceptance criteria:** State pending memakai centang abu-abu; state complete tetap memakai centang hijau dan background hijau; makna status dan flow tidak berubah.
- **Status:** Implemented locally

### DRILL-048 — Ringkas status pengumpulan menjadi progress linear

- **Referensi:** Screenshot halaman `Kumpulkan hasil Tryout` di prototype TO Offline, dikirim 12 Oktober 2026.
- **Task:** Adaptasikan halaman pengumpulan Drill agar memakai hierarki visual yang sama: judul `Kumpulkan hasil Drill`, keterangan jawaban tersimpan di perangkat, warning merah yang jelas saat Drill belum terkumpul, dan satu kartu status dengan tiga tahap horizontal.
- **Rancangan:** Tahapnya adalah `Jawaban tersimpan` → `Nyalakan internet` → `Menunggu pengiriman`. Tahap aktif berubah mengikuti state: saat Offline, tahap koneksi diberi penekanan dan pulse halus; ketika Online dan upload berlangsung, tahap pengiriman aktif dan garis progres bergerak; state gagal memberi affordance untuk mencoba lagi. Pertahankan transisi otomatis ke hasil setelah upload berhasil.
- **Rapikan halaman:** Satukan checklist dan status upload yang sekarang mengulang informasi menjadi satu progress linear. Pertahankan edukasi reward hanya jika masih dibutuhkan setelah revisi copy/layout lanjutan; CTA sticky tidak menjadi langkah wajib pada alur upload otomatis.
- **Acceptance criteria:** Offline jelas meminta user menyalakan internet; perubahan Online langsung terlihat sebelum pindah ke hasil; progress upload terasa berlangsung; state gagal tetap bisa dicoba lagi; tampilan memakai bahasa visual halaman persiapan Drill; panduan menyalakan internet dan alur otomatis upload tetap berfungsi.
- **Status:** Implemented locally
- **Catatan implementasi:** Checklist dan status upload yang berulang diganti dengan warning kontekstual dan tracker linear. State menunggu koneksi pada halaman panduan internet juga memakai hierarki tracker yang sama. Auto-upload tetap berjalan; indikator pengiriman ditampilkan sebelum transisi ke hasil, dan CTA `Coba Lagi` hanya muncul saat gagal.
- **Refinement 2026-10-14:** `#internet-guide` sekarang menjadi halaman instruksi dan kesiapan mengumpulkan saja. Intro penyimpanan, tracker linear, dan progress jumlah soal dihapus dari guide; tracker serta jumlah soal tetap tersedia pada tahap upload.

### DRILL-049 — Tampilkan jumlah soal yang sudah dijawab saat mengumpulkan

- **Task:** Beri ringkasan jumlah soal yang sudah dijawab dibanding total soal pada tahap upload.
- **Acceptance criteria:** Angka mengikuti jawaban tersimpan, mudah ditemukan tanpa mengganggu warning atau progress linear, dan bar menunjukkan proporsi soal terjawab.
- **Status:** Implemented locally; tidak ditampilkan pada `#internet-guide` sesuai refinement meeting terbaru.

### Meeting supersession note — 2026-10-13

DRILL-044's original auto-upload happy path is superseded by the latest meeting decision: normal collection is manual (`Kumpulkan`), while auto-submit is reserved for an internet interruption during an active attempt. The implementation and acceptance checks should follow that decision.
