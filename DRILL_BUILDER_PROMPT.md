# Builder Prompt — Drill Soal Offline

> Salin seluruh prompt di bawah ini ke builder. Planner tetap menjadi pihak yang melakukan review visual, approval, dan keputusan scope.

```text
Kamu adalah frontend engineer dan visual QA engineer untuk prototype Drill Soal Offline. Kerjakan scope Drill saja dan jangan mengubah flow TO Offline.

TUJUAN
Bangun prototype student experience Drill Soal Offline berdasarkan desain Figma node `69:14041`. Prototype ini digunakan untuk student BAC yang membuka link dari guru, melihat detail drill, mengunduh paket, mengerjakan satu sesi secara offline, lalu menyalakan internet dan mengunggah hasil.

SUMBER WAJIB
Baca sebelum mulai:
- DEVELOPMENT_PLAN.md
- PROJECT_CONTEXT.md
- TASKS.md
- PROJECT_BOUNDARIES.md
- DRILL_STATUS.md (inside `drill-offline-prototype/`)
- GIT_WORKFLOW.md

SOURCE OF TRUTH FIGMA
File: https://www.figma.com/design/oF0SkvpIqm2TIodNxQFxJ5/ruanguji---TO-Offline--2026-?node-id=69-14041&t=pGaR8Lw7oAPkSe4g-4
Node: `69:14041`

Implementasikan 11 frame berikut sebagai baseline Drill:
1. `69:13360` — 01 · Unduh Soal
2. `69:13411` — 02 · Unduh Soal — Dalam Proses
3. `69:13464` — 03 · Matikan Internet — Panduan
4. `69:13527` — 04 · Siap Mengerjakan
5. `69:10610` — 05 · Kerjakan Soal
6. `69:10677` — 06 · Konfirmasi Jawaban
7. `69:10823` — 07 · Hasil Jawaban — Salah
8. `69:10895` — 08 · Waktu Habis
9. `69:13066` — 09 · Nyalakan Internet — Panduan
10. `69:13136` — 10 · Unggah dan Kumpulkan Hasil
11. `69:12792` — 11 · Ringkasan Hasil

REALITY CHECK
- The standalone Drill worktree is `/Users/fa-2400/Documents/ChatGPT/Drill Offline` on branch `feat/drill-dev`.
- The project inside it is `drill-offline-prototype/`.
- Its preview is `http://localhost:3001/`, its Vite config owns port `3001`, and its entrypoint is `drill-offline-prototype/src/main.tsx`.
- Verify the actual screen count, Drill labels, Drill fixtures, and Drill assets before working. A `DRILL-*` commit or branch name is not evidence by itself.
- If the selected checkout still shows the TO app, do not relabel it. Switch to the standalone Drill project or report the boundary mismatch.

BATAS PRODUK DRILL
- Drill adalah tepat satu session.
- Tidak ada subtes, transisi subtes, atau screen “Next subtest”.
- Copy, fixture soal, state review, submit, dan result harus khusus Drill.
- Student masuk melalui link guru; detail topik/tes, jumlah soal, dan durasi harus terlihat sebelum download.
- Pola offline baseline: download → panduan matikan internet → kerjakan → panduan nyalakan internet → upload/kumpulkan.
- Jangan otomatis menerapkan aturan TO seperti tujuan anti-AI, enforcement 25 detik, terminasi, atau result policy jika belum dikonfirmasi untuk Drill. Catat area yang belum jelas sebagai asumsi atau USER-ACTION.

DEPENDENCY DAN SOURCE BOUNDARY
- Drill is a standalone project/worktree. It does not wait for TO refactoring or shared foundation extraction.
- Jangan menambahkan logic Drill ke source atau preview TO.
- Target source Drill is `/Users/fa-2400/Documents/ChatGPT/Drill Offline/drill-offline-prototype/`.
- Jangan mengimpor dari `src/main.tsx` atau folder source TO.
- Buat komponen lokal di project Drill jika diperlukan. Shared extraction ditunda sampai kedua prototype selesai direview.
- Content, fixture, styles, dan assets Drill harus berada di project Drill.

ATURAN VISUAL
- Target viewport: `360 × 740`.
- Gunakan screenshot dan metadata Figma untuk setiap node sebelum implementasi.
- Abaikan mock browser bar Figma; implementasi dimulai dari navbar/konten produk.
- Reuse komponen dan asset TO hanya jika bentuk/state-nya memang shared. Copy Drill tidak boleh tertinggal sebagai “Tryout”.
- Pertahankan ukuran, wrapping, typography, warna, radius, shadow, spacing, dan sticky action sesuai Figma.
- Pastikan tidak ada overflow, overlap, placeholder, atau teks terpotong.
- Seluruh 11 screen wajib melalui visual iteration sebelum handoff; baseline implementasi yang sekadar dapat diklik belum dianggap selesai.
- Mulai audit dari screen 11 (Ringkasan Hasil): cek lebar layout terhadap viewport, header dan breadcrumb, hero gradient, hierarki typography, score card, statistik, CTA, spacing, dan area kosong yang tidak semestinya. Bawa perbaikan yang relevan ke seluruh screen.
- Untuk setiap screen, simpan screenshot setelah iterasi dan catat mismatch yang diperbaiki atau masih terbuka.

FLOW DAN STATE MINIMUM
- Entry/detail drill: topik/tes, jumlah soal, durasi, CTA download.
- Download: idle, downloading, completed, failed/retry.
- Offline readiness: checklist download selesai dan koneksi offline terdeteksi.
- Attempt: satu session, timer jika terlihat di Figma, jawaban tersimpan lokal, state unanswered/answered/doubtful jika tersedia.
- Confirm answer: ringkasan jawaban sebelum submit sesuai frame Figma.
- Result answer: state jawaban salah, waktu habis, dan ringkasan hasil sesuai frame Figma.
- Upload: koneksi online gate, uploading, failed/retry, uploaded/pending sync.
- Simulasi koneksi dari sidebar harus memengaruhi gate yang terlihat: Offline untuk kesiapan mulai dan pengerjaan; Online untuk persiapan upload dan pengumpulan. Jangan mewarisi aturan terminasi TO tanpa keputusan khusus Drill.
- Jangan menambahkan screen atau state subtes.

DEVELOPER TEST SIDEBAR
- Adaptasi **sistem sidebar developer TO Offline**, bukan sekadar membuat daftar link baru.
- Pertahankan pola interaksi TO: akses demo, buka/tutup panel, reset session, indikator/status koneksi, penanda active state, dan direct jump.
- Sertakan simulasi koneksi Online/Offline dan shortcut langsung ke masing-masing 11 frame Drill.
- Simulasi bukan indikator dekoratif: perubahan mode harus dapat dipakai untuk menguji gate Offline pada persiapan/attempt dan gate Online pada upload/kumpulkan.
- Ganti seluruh label dan daftar TO dengan nama screen Drill:
  01 Download package; 02 Downloading package; 03 Turn off internet guide; 04 Ready to start; 05 Work on questions; 06 Confirm answers; 07 Wrong answer result; 08 Time expired; 09 Turn on internet guide; 10 Upload and collect; 11 Result summary.
- Implementasikan sidebar secara lokal di project Drill; jangan membuat dependency shared dengan source TO.
- Panel ini adalah alat demo/QA, bukan bagian dari student-facing flow.

CARA KERJA
1. Enter `drill-offline-prototype/`, check its worktree/status, and inspect the actual files. Do not reset or delete user changes.
2. Baca `DEVELOPMENT_PLAN.md` dan `TASKS.md`; mulai dari D-001.
3. Inspect node Figma dan ambil screenshot setiap frame yang akan dikerjakan.
4. Pecah implementasi ke komponen lokal yang mudah dirawat di project Drill.
5. Kerjakan satu screen atau satu fase kecil per task.
6. Jalankan preview pada viewport `360 × 740`.
7. Ambil screenshot hasil dan bandingkan dengan Figma.
8. Perbaiki mismatch visual dan behavior yang bisa diselesaikan.
9. Catat blocker, asumsi, dan keputusan yang belum ada di `USER_ACTIONS.md`.
10. Tandai task `Internal Review`, bukan `Approved`. Planner yang menentukan `Approved` atau `Changes Requested`.
11. Commit perubahan per task dengan subject yang jelas, misalnya `DRILL-101: implement download package screen`.

ITERATIVE VISUAL REVIEW LOOP
1. Render satu screen pada viewport target `360 × 740`.
2. Bandingkan langsung dengan frame Figma yang sesuai; gunakan screenshot Figma sebagai baseline, bukan ingatan atau perkiraan.
3. Catat mismatch konkret per screen: posisi, ukuran, lebar container, spacing, typography, warna, radius, shadow, wrapping, copy, dan state.
4. Perbaiki mismatch prioritas tinggi terlebih dahulu: struktur/layout, ukuran container, alignment, typography, lalu detail visual.
5. Render ulang screen yang sama dan verifikasi perbaikannya.
6. Ulangi sampai tidak ada mismatch visual P0/P1 yang tersisa atau ada blocker yang dicatat jelas.
7. Lanjutkan ke screen berikutnya, lalu lakukan satu pass lintas-flow untuk memastikan header, breadcrumb, card, CTA, dan state tetap konsisten.
8. Jangan handoff hanya karena semua screen bisa dinavigasi. Handoff membutuhkan screenshot hasil iterasi untuk seluruh 11 screen dan mismatch log yang sudah ditutup atau diberi alasan.

DEFINITION OF DONE
- 11 frame Figma baseline memiliki implementasi Drill yang dapat dinavigasi.
- Flow berjalan dari detail/download sampai upload dan ringkasan hasil.
- Panel tester dapat mengubah simulasi koneksi dan membuka setiap screen Drill langsung.
- Tidak ada subtes atau logic transisi TO.
- Tidak ada copy TO yang tertinggal pada screen Drill.
- Source Drill berada di project/worktree terpisah dan tidak mengubah behavior TO.
- State penting yang terlihat di Figma memiliki representasi UI yang dapat direview.
- Screenshot evidence tersedia untuk tiap screen/fase.
- Setiap 11 screen sudah melalui loop render → compare Figma → fix → render ulang.
- Tidak ada mismatch visual P0/P1 yang belum ditutup tanpa blocker yang terdokumentasi.
- Task berstatus `Internal Review` dan perubahan sudah di-commit.

LAPORAN KE PLANNER
Laporkan:
- scope dan task yang dikerjakan;
- node Figma dan screen yang diimplementasikan;
- file yang berubah;
- komponen shared yang dipakai;
- state dan interaksi yang dibuat;
- screenshot/evidence review;
- mismatch yang tersisa;
- USER-ACTION atau blocker;
- status task dan task berikutnya.

MULAI DENGAN
Audit worktree/project Drill terlebih dahulu. Jika checkout yang diberikan masih menampilkan prototype TO, jangan mengubahnya; laporkan mismatch dan gunakan project Drill standalone yang sudah ditentukan planner.
```
