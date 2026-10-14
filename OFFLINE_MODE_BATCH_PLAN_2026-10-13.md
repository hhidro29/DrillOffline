# Offline Mode — Rencana Batch Berdasarkan Meeting 13 Oktober 2026

Scope: prototype Drill Soal Offline dan Tryout Offline. Kedua project tetap terpisah.

Sumber utama keputusan: [transkrip meeting](</Users/fa-2400/Documents/ChatGPT/meeting-review/meeting.txt), khususnya pembahasan Summary Drill, persiapan Offline, pengerjaan, pengumpulan, auto-submit, dan dua subtest Tryout.

## Prinsip produk yang sudah dikunci

- Selama Offline, jawaban hanya disimpan lokal. Tidak ada penilaian benar/salah, skor, XP, atau Starchamp real-time.
- Hasil dan reward baru diproses setelah jawaban berhasil dikumpulkan saat Online.
- Halaman panduan Offline berfokus pada satu tugas: mematikan koneksi internet.
- Summary Drill tampil sebelum masuk persiapan Offline. Isinya konteks Drill, bukan T&C.
- Loading persiapan menampilkan progress karena jumlah soal dapat besar.
- `Simpan Pengerjaan` berarti menyimpan jawaban lokal. `Kumpulkan` berarti mengirim hasil setelah koneksi tersedia.
- Pengumpulan normal meminta aksi eksplisit `Kumpulkan` agar peserta sadar bahwa hasil dikirim.
- Auto-submit hanya untuk kondisi internet terdeteksi ketika attempt aktif, bukan untuk menggantikan aksi pengumpulan normal.
- Tryout memakai dua subtest untuk prototype: subtest 1 → simpan → subtest 2 → simpan → pengumpulan.
- Setelah subtest terakhir tidak ada halaman review gabungan baru. Ringkasan seluruh pengerjaan berada di halaman pengumpulan.

## Rencana per batch

| Batch | Cakupan | Pekerjaan utama | Output selesai |
|---|---|---|---|
| **0. Kunci IA dan keputusan meeting** | Kedua project | Selaraskan catatan meeting dengan flow; pisahkan keputusan final dari open decision; tetapkan istilah `Simpan`, `Kumpulkan`, `Online`, dan `Offline`. | **Selesai** — flow map kedua project menjadi acuan builder. |
| **1. Entry dan persiapan Offline** | Drill dan Tryout | Summary Drill sebelum Offline; loading otomatis dengan progress; halaman panduan mematikan internet; status koneksi berbentuk info/warning; CTA hanya aktif saat Offline; hilangkan fokus “Poinmu tidak hilang”; hilangkan step Ready dari jalur utama jika tidak memberi fungsi tambahan; panduan perangkat tetap tersedia. | **Selesai** — konteks aktivitas, progress, panduan, dan gate Offline terhubung di kedua prototype. |
| **2. Pengerjaan Offline dan network interruption** | Drill: satu sesi. Tryout: dua subtest. | Ubah pengerjaan Drill agar pola navigasinya seperti Tryout: nomor soal/navigator, dapat berpindah soal, tanpa konfirmasi benar/salah per jawaban; tampilkan status Offline; simpan jawaban lokal. Tryout: review satu subtest, `Simpan Pengerjaan`, transisi ke subtest 2, lalu review dan simpan. Saat internet terdeteksi di attempt aktif, kunci kontrol dan tampilkan peringatan; jika tetap Online, jalur auto-submit/terminasi berjalan. | **Selesai** — tidak ada penilaian Offline; jawaban tersimpan; dua subtest dan interruption sudah diuji. |
| **3. Pengumpulan, upload, auto-submit, dan hasil** | Drill dan Tryout | Halaman `Kumpulkan ...` menjelaskan status belum terkumpul dan kebutuhan menyalakan internet. Offline: `Kembali ke Soal` aktif, `Kumpulkan` nonaktif. Online: `Kembali ke Soal` nonaktif, `Kumpulkan` aktif. Klik `Kumpulkan` menampilkan progress upload di halaman yang sama, lalu hasil. Sediakan failed/retry. Jalur auto-submit karena pelanggaran koneksi memakai halaman pemberitahuan khusus sebelum hasil. | **Selesai** — collection manual, progress, retry, auto-submit interruption, dan hasil sudah terhubung. |
| **4. Audit visual dan regression lintas flow** | Semua state yang sudah dikerjakan | Bandingkan Drill dan Tryout di 360×740; cek hierarchy, scroll, CTA, Online/Offline, hash route, refresh, reset, deep link, dan tidak adanya copy grading di Offline. | **Selesai** — build, diff check, live smoke, gate matrix, deep link, dan copy audit lulus. |
| **5. Handoff dan Git** | Kedua project | Review diff per project, bersihkan artefak lokal, catat evidence/build, lalu commit/push hanya saat diminta. | **Siap handoff** — perubahan masih lokal; commit/push menunggu instruksi terpisah. |

## Struktur IA yang dituju

### Drill

`Summary Drill → Loading dengan progress → Panduan mematikan internet → Pengerjaan satu sesi → Kumpulkan jawaban Drill → Upload → Hasil`

Summary Drill berisi `Drill Soal → pelajaran/topik → daftar bab → jumlah soal`. Subtopik tidak perlu ditampilkan. Durasi hanya ditampilkan bila konfigurasi Drill memang memakai timer.

### Tryout

`Aturan/ringkasan → Persiapan → Loading dengan progress → Panduan mematikan internet → Subtest 1 → Review → Simpan Pengerjaan → Subtest 2 → Review → Simpan Pengerjaan → Kumpulkan Tryout → Upload → Hasil`

Review selalu untuk subtest aktif. Ringkasan gabungan seluruh subtest berada di halaman pengumpulan, bukan setelah review subtest terakhir.

## Open decision yang belum menghambat Batch 1

- Apakah durasi/timer Drill selalu ditampilkan atau configurable; baseline MVP dapat tanpa timer.
- Tab platform tetap manual untuk sementara: Android/iOS/Windows/MacOS.
- Copy final untuk warning koneksi dan halaman auto-submit.
- Detail ringkasan jumlah soal terjawab pada halaman pengumpulan.
- Bentuk final halaman pemberitahuan auto-submit sebelum hasil.

## Status saat ini

- Batch 0: selesai; keputusan meeting dirangkum dan catatan lama yang bertentangan diberi status superseded.
- Batch 1: selesai untuk Drill dan Tryout. Summary/loading sudah terhubung; `#offline-guide` fokus pada tindakan mematikan koneksi, dengan CTA aktif hanya saat Offline dan tab platform manual.
- Batch 2: selesai; navigator Drill, jawaban lokal, review/save dua subtest Tryout, dan interruption gate sudah terhubung.
- Batch 3: selesai; collection manual, gate tombol, upload progress/retry, auto-submit interruption, dan hasil sudah terhubung.
- Batch 4: selesai; live smoke kedua prototype mencakup loading, guide, attempt, collection, upload/result, gate Online/Offline, reset, dan direct hash link.
- Batch 5: siap handoff; tidak ada commit/push yang dibuat pada iterasi ini.
- Verifikasi terakhir: `npm run build` dan `git diff --check` berhasil di kedua project; audit copy Offline tidak menemukan grading/reward feedback pada state aktif.
- Kedua project masih memiliki perubahan lokal yang belum di-commit atau di-push.
