# Ruanguji Offline — TO dan Drill 2026

Dokumen ini adalah titik awal bersama untuk manusia dan agent yang bekerja pada proyek ini. Perbarui bagian yang relevan saat keputusan atau kebutuhan baru sudah dikonfirmasi.

## 1. Identitas proyek

- **Nama kerja:** Ruanguji Offline — TO dan Drill 2026
- **Jenis produk:** Fitur di dalam produk Ruangguru yang sudah ada
- **Tujuan proyek:** Membatasi akses internet di perangkat selama peserta mengerjakan tryout agar peserta tidak menggunakan AI.
- **Status:** Prototype TO Offline tersedia in the root project; standalone Drill Offline prototype is available at `/Users/fa-2400/Documents/ChatGPT/Drill Offline/drill-offline-prototype/` on branch `feat/drill-dev` and is ready for planner internal review.
- **Bahasa kerja dokumen:** Bahasa Indonesia

## 2. Sumber informasi

### Desain

- **File Figma:** [ruanguji — TO Offline — 2026](https://www.figma.com/design/oF0SkvpIqm2TIodNxQFxJ5/ruanguji---TO-Offline--2026-?node-id=15-7547&t=pGaR8Lw7oAPkSe4g-4)
- **Node yang ditunjuk:** `15:7547`
- **Status akses:** Node `15:7547` sudah ditinjau melalui Figma.
- Section `15:7547` berisi beberapa screen mobile untuk alur persiapan, pengerjaan, dan pengumpulan tryout offline.
- Ringkasan screen yang terlihat dicatat di bagian **Ringkasan screen yang ditinjau**.
- Referensi Drill Offline: Section 2, node `69:14041`, pada file Figma yang sama. Node ini saat ini berisi 11 frame Drill.

### Keputusan dan spesifikasi

- Keputusan produk mulai dikonfirmasi di bagian **Keputusan terkonfirmasi**.
- Wireframe MVP dari PM menjadi baseline saat ini; detailnya masih dapat berubah setelah validasi produk dan teknis.
- Elemen browser bar yang muncul di frame Figma (waktu, address bar, ikon perangkat, Wi-Fi, baterai, dan refresh) adalah mockup perangkat dan diabaikan saat implementasi. Implementasi dimulai dari navbar atau konten produk.
- Jika ada instruksi pengguna, catat keputusan yang berdampak ke implementasi di bagian **Keputusan terkonfirmasi**.

## 3. Ringkasan dan tujuan

Ringkasan awal berdasarkan screen Figma. Ini adalah observasi desain, bukan keputusan produk final.

- **Masalah yang ingin diselesaikan:** Mengurangi peluang peserta menggunakan AI dengan membatasi akses internet di perangkat selama tryout. Alur Figma mendukung pengunduhan paket soal, pengerjaan offline, lalu pengunggahan jawaban setelah koneksi internet dinyalakan kembali.
- **Pengguna utama:** Peserta tryout RuangGuru/Ruanguji pada perangkat mobile.
- **Hasil yang diharapkan:** Tryout dapat dikerjakan offline dan hasilnya berhasil dikumpulkan untuk diproses.
- **Platform/lingkungan:** Prototype web berbasis React; detail platform produksi masih perlu dikonfirmasi di EPIC-003.
- **Batasan waktu atau teknis:** Belum diketahui

### Baseline MVP saat ini

- Routing hanya mengarahkan peserta `BA` dengan sesi cabang aktif ke flow offline; peserta publik tetap memakai flow online existing.
- Peserta mengunduh paket soal, mematikan koneksi sendiri, mengerjakan tryout, lalu menyalakan koneksi untuk mengumpulkan jawaban.
- Saat koneksi terdeteksi selama attempt aktif, input dan navigasi dikunci sementara. Timer utama berhenti pada attempt. Screen pengumpulan memakai gate koneksi terpisah untuk upload.
- Peserta memiliki waktu 25 detik untuk mematikan koneksi kembali. Jika koneksi tetap terdeteksi, attempt dihentikan, jawaban dikunci, dan pengiriman menunggu sinkronisasi.
- Jawaban yang belum terkirim tetap tersimpan di perangkat dan dicoba dikirim ulang saat koneksi tersedia.
- Pengawas dapat melihat status attempt, event koneksi, alasan terminasi, dan status sinkronisasi; nilai tidak ditampilkan di dashboard pengawas.

### Ringkasan screen yang ditinjau

1. Persiapan mengerjakan: pengguna mengunduh soal tryout.
2. Download berjalan: tersedia progress upload/download dan peringatan agar halaman tidak ditutup atau di-reload.
3. Persiapan lanjutan: pengguna mematikan koneksi internet, dengan panduan Android, iOS, Windows, dan macOS.
4. Siap mengerjakan: kedua langkah selesai dan CTA **Kerjakan Tryout** tersedia.
5. Persetujuan aturan: pengguna membaca aturan, mencentang persetujuan, lalu menekan **Lanjutkan**.
6. Pengerjaan offline: layar soal memiliki timer, status mode offline, pagination, navigasi soal, penanda **Ragu-ragu**, dan instruksi pengunggahan jawaban.
7. Ringkasan sebelum menyimpan: pengguna dapat kembali ke soal atau memilih **Simpan Hasil**; soal yang dilewati dan ragu-ragu ditampilkan.
8. Persiapan mengumpulkan: pengguna menyalakan koneksi internet. Setelah koneksi tersedia, hasil tryout diunggah dengan progress.
9. Upload selesai: kedua checklist selesai dan CTA **Upload & Kumpulkan Tryout** tersedia.
10. Transisi subtes: setelah subtes selesai, pengguna dapat mengerjakan subtes berikutnya, dengan countdown otomatis.
11. Hasil tryout: tersedia state menunggu hasil, ringkasan penilaian, dan CTA menuju pembahasan.

### Perbedaan produk: TO Offline vs Drill Soal Offline

Keduanya memakai pola teknis offline yang mirip, tetapi merupakan flow dan kebutuhan produk yang berbeda. Jangan menganggap Drill sebagai TO yang hanya diganti nama.

| Aspek | TO Offline | Drill Soal Offline |
| --- | --- | --- |
| Konteks penggunaan | Peserta mengerjakan tryout yang dapat terdiri dari beberapa subtes. | Kebutuhan dari Academic untuk drill di BAC; guru membagikan link dan student membukanya untuk mengerjakan drill versi web. |
| Entry point | Flow tryout sesuai eligibility dan konteks sesi TO. | Student masuk setelah menerima/membuka link guru. Detail routing dan autentikasi belum ditentukan. |
| Informasi sebelum mulai | Ringkasan tryout dan persiapan sesuai screen TO. | Student melihat apa yang akan dites, jumlah soal, dan durasi sebelum mengunduh. |
| Struktur attempt | Dapat memiliki beberapa subtes dan transisi antar-subtes. | Tepat satu session; tidak ada subtes. |
| Offline cycle | Download paket → matikan internet → kerjakan → nyalakan internet → upload/kumpulkan. | Mengikuti cycle offline yang sama sebagai baseline pengalaman, dengan konten dan copy khusus Drill. |
| Sesudah mengerjakan | Mengikuti flow review, simpan, transisi subtes (jika ada), upload, dan hasil TO. | Student menyalakan internet dan mengumpulkan drill; detail review/result setelah submit masih perlu dikonfirmasi. |

**Batas keputusan:** tujuan anti-AI, aturan enforcement 25 detik, terminasi attempt, dan detail operasional yang dikonfirmasi untuk TO tidak otomatis berlaku untuk Drill. Validasi kebutuhan Drill secara terpisah sebelum menerapkannya.

### Status prototype yang benar-benar tersedia

TO and Drill are now separated at the project/worktree boundary:

- **TO Offline:** root project, entrypoint `src/main.tsx`, Vite port `3000`, 14-screen flow.
- **Drill Offline:** `/Users/fa-2400/Documents/ChatGPT/Drill Offline/drill-offline-prototype/` on branch `feat/drill-dev`, entrypoint `drill-offline-prototype/src/main.tsx`, Vite port `3001`, 11-screen one-session flow.
- Drill has its own `styles.css`, `src/fixtures/drill.ts`, `public/assets/figma/`, package manifest, and test sidebar.
- Drill does not import TO source and does not include subtest transition or TO-specific 25-second enforcement.
- Current Drill implementation and evidence are recorded in `drill-offline-prototype/DRILL_STATUS.md`; planner approval remains separate from TO approval.

The Figma node `69:14041` remains the Drill visual source. Verify the actual Drill project and its 11-screen labels before reviewing; the branch name alone is not evidence.

Frame Drill yang tersedia di node tersebut:

1. `69:13360` — `01 · Unduh Soal`
2. `69:13411` — `02 · Unduh Soal — Dalam Proses`
3. `69:13464` — `03 · Matikan Internet — Panduan`
4. `69:13527` — `04 · Siap Mengerjakan`
5. `69:10610` — `05 · Kerjakan Soal`
6. `69:10677` — `06 · Konfirmasi Jawaban`
7. `69:10823` — `07 · Hasil Jawaban — Salah`
8. `69:10895` — `08 · Waktu Habis`
9. `69:13066` — `09 · Nyalakan Internet — Panduan`
10. `69:13136` — `10 · Unggah dan Kumpulkan Hasil`
11. `69:12792` — `11 · Ringkasan Hasil`

## 4. Keputusan terkonfirmasi

| Tanggal | Keputusan | Alasan/sumber | Dampak |
| --- | --- | --- | --- |
| 2026-10-09 | `TO Offline` menjadi fitur di dalam produk Ruangguru yang sudah ada. | Konfirmasi pengguna dalam diskusi EPIC-002. | Alur perlu terintegrasi dengan produk dan akun yang sudah ada; keputusan platform dan stack harus mengikuti lingkungan produk utama. |
| 2026-10-09 | Tujuan utama fitur adalah membatasi akses internet di perangkat selama tryout agar peserta tidak menggunakan AI. | Konfirmasi pengguna dalam diskusi EPIC-002. | Kriteria sukses dan batas MVP perlu menilai pembatasan akses selama ujian; cara penerapan dan batas teknisnya masih perlu disepakati. |
| 2026-10-09 | Baseline MVP mengikuti wireframe PM: peserta mematikan koneksi sendiri; koneksi yang terdeteksi selama 25 detik memicu penghentian otomatis. | Wireframe `WIREFRAME-tryout-offline-mvp.md` dan konfirmasi pengguna bahwa baseline ini berlaku untuk saat ini dan dapat berubah. | MVP membutuhkan deteksi koneksi, penguncian input, penghentian timer, terminasi attempt, penyimpanan lokal, serta pending upload dan retry. |
| 2026-10-10 | Nudge larangan internet berlaku ketika peserta sedang berada dalam attempt tryout aktif, bukan saat persiapan download dan bukan saat persiapan upload hasil. | Klarifikasi pengguna dalam audit E2E. | Enforcement dimulai saat screen pengerjaan dimulai dan tetap berlaku selama attempt belum disimpan atau terminated; screen upload memiliki network gate terpisah. |
| 2026-10-09 | Mock browser bar di frame Figma tidak termasuk bagian produk yang perlu diimplementasikan. | Konfirmasi pengguna dalam diskusi implementasi visual. | Saat menerjemahkan screen Figma ke prototype, abaikan browser bar dan mulai dari navbar atau konten produk. |
| 2026-10-09 | Prototype mencakup visual dan simulasi behavior yang relevan. | Konfirmasi pengguna dalam diskusi craft plan. | Screen perlu memiliki state dan interaksi yang cukup untuk mensimulasikan flow offline, pengerjaan, pengumpulan, dan hasil. |
| 2026-10-09 | Stack prototype menggunakan React. | Konfirmasi pengguna dalam diskusi craft plan. | Implementasi perlu memakai komponen React reusable dan struktur yang mendukung penambahan screen atau flow. |
| 2026-10-09 | Figma dan `PROJECT_CONTEXT.md` menjadi sumber utama. | Konfirmasi pengguna dalam diskusi craft plan. | Jika dokumen lain berbeda, keputusan produk dan konteks proyek mengikuti kedua sumber ini; perbedaan yang belum jelas dicatat. |
| 2026-10-09 | State dibuat seperlunya untuk mendukung visual dan simulasi flow. | Konfirmasi pengguna dalam diskusi craft plan. | Tidak semua kemungkinan state perlu dibuat; state yang terlihat di Figma atau dibutuhkan baseline MVP harus tersedia. |
| 2026-10-09 | Copy dan data dapat disesuaikan selama tetap mendukung intent desain dan flow. | Konfirmasi pengguna dalam diskusi craft plan. | Builder boleh memakai copy/data demo yang paling jelas; perubahan penting dicatat sebagai asumsi. |
| 2026-10-09 | Self-review dilakukan dengan evidence; asumsi yang masih toleran boleh dipakai, sedangkan area kabur dicatat untuk user. | Konfirmasi pengguna dalam diskusi craft plan. | Setiap screen perlu screenshot atau evidence review; blocker dan pertanyaan terbuka dicatat di `USER_ACTIONS.md`. |
| 2026-10-09 | Perubahan di-commit per task, lalu digabung ke `main` per milestone stabil. | Rekomendasi workflow berdasarkan kebutuhan tracing dan penambahan flow. | Histori tetap mudah ditelusuri, sementara `main` menerima kumpulan screen yang sudah stabil per fase. |
| 2026-10-10 | Prototype Drill Soal Offline adalah flow terpisah untuk student di BAC yang masuk melalui link dari guru, menampilkan topik/tes, jumlah soal, dan durasi, lalu mengerjakan satu session tanpa subtes. | Konteks dan klarifikasi pengguna dalam diskusi planner. | Source, content, fixture, state, dan acceptance criteria Drill dipisahkan dari TO; shared source code ditunda sampai kedua prototype selesai direview. Jangan otomatis mewarisi aturan produk TO yang belum dikonfirmasi untuk Drill. |
| 2026-10-10 | **Historical observation, superseded on 2026-10-12:** branch `feat/drill-dev` belum berisi prototype Drill; preview branch masih merupakan prototype TO Offline, sedangkan Figma node `69:14041` sudah menyediakan 11 frame Drill. | Inspeksi preview `http://localhost:3001/`, menu review, source `src/main.tsx`, dan metadata Figma node `69:14041`. | Builder kemudian membuat standalone `drill-offline-prototype/`; jangan memakai menu atau screen TO sebagai source flow. |
| 2026-10-10 | Transisi ke subtes berikutnya pada screen 11 hanya perlu menjadi preview; prototype tidak perlu mensimulasikan subtes kedua. | Konfirmasi pengguna dalam diskusi backlog P0. | Screen 11 cukup menunjukkan preview transition state. Jangan menambah fixture, answer state, atau flow pengerjaan subtes kedua ke scope TO prototype saat ini. |
| 2026-10-12 | Prototype membutuhkan kontrol reset simulasi agar timer dan attempt dapat diuji ulang dari fixture awal. | Kebutuhan pengguna saat menemukan timer preview berada di `0`. | Reset hanya untuk menu demo/reviewer; bukan fitur peserta. Reset harus menghapus state attempt yang tersimpan dan mengembalikan timer ke durasi fixture awal. |
| 2026-10-12 | Persiapan paket soal dimulai otomatis saat screen 02 dibuka; user tidak perlu menekan tombol download. Loading ditampilkan sebagai progress dengan copy `Mempersiapkan konten untukmu`, bukan headline yang menekankan kata download. Setelah 100%, flow TO masuk ke screen 04 dengan CTA sticky/floating `Kerjakan Tryout`; counter `0/2`, `1/2`, dan `2/2` dihapus dari flow utama. | Feedback lanjutan pengguna/PM pada review flow persiapan offline, disesuaikan ke konteks TO. | CTA `Kerjakan Tryout` disabled saat koneksi Online dan enabled saat Offline; checklist menjadi indikator progres utama. Perubahan simulasi koneksi harus langsung memengaruhi CTA. Status screen 05 tetap menjadi open decision untuk parity dan direct review. |
| 2026-10-11 | Sidebar developer Drill perlu menyediakan simulasi koneksi Online dan Offline untuk testing. | Klarifikasi pengguna. | Toggle harus memengaruhi gate persiapan offline dan pengumpulan online; sidebar tetap hanya alat demo/QA dan tidak menambah aturan TO yang belum dikonfirmasi. |
| 2026-10-11 | Seluruh tampilan Drill perlu diiterasi sebelum dianggap siap direview. | Feedback pengguna berdasarkan screenshot prototype screen hasil. | D-007 menjadi visual iteration dan QA untuk seluruh 11 screen; audit dimulai dari screen 11 lalu diterapkan lintas flow. |
| 2026-10-11 | Review visual Drill harus dilakukan berulang sampai sesuai Figma. | Instruksi pengguna. | Builder wajib menjalankan loop render, compare ke frame Figma, perbaiki, dan render ulang untuk semua 11 screen; handoff ditahan jika mismatch P0/P1 belum ditutup. |
| 2026-10-12 | Boundary project TO dan Drill dipisahkan secara operasional. | Inspeksi worktree, Vite config, entrypoint, fixtures, assets, dan `DRILL_STATUS.md`. | TO tetap di root pada port `3000`; Drill berada di `drill-offline-prototype/` pada `feat/drill-dev` dengan port `3001`, task board terpisah, dan prompt planner/builder terpisah. |

Gunakan format berikut saat menambah keputusan:

| Tanggal | Keputusan | Alasan/sumber | Dampak |
| --- | --- | --- | --- |

## 5. Hal yang perlu diklarifikasi

1. Apakah batas 25 detik, terminasi otomatis, dan perilaku pending upload sudah memenuhi kebutuhan operasional pengawas untuk MVP?
2. Siapa pengguna utama dan tugas utama yang harus mereka selesaikan?
3. Apakah Figma mencakup keseluruhan produk atau hanya frame/alur tertentu?
4. Platform dan teknologi implementasi produksi apa yang dituju di luar prototype React?
5. Apa kriteria keberhasilan dan batasan proyek?
6. Apakah **Simpan Hasil** hanya menyimpan jawaban lokal, sedangkan **Upload & Kumpulkan Tryout** melakukan submit final ke server?
7. Apa yang terjadi jika koneksi terputus saat upload, halaman di-reload, atau upload gagal?
8. Apakah countdown menuju subtes berikutnya dapat dibatalkan atau hanya dapat dilewati melalui CTA?
9. Pada screen hasil, apakah hasil langsung tersedia setelah upload atau memang selalu masuk ke state menunggu?
10. Apakah produk produksi menggunakan native kiosk/device management untuk benar-benar mencegah akses internet dan aplikasi lain, atau hanya mendeteksi koneksi dari web app?

Agent boleh mengerjakan tugas yang tidak bergantung pada jawaban ini. Jangan mengubah asumsi menjadi keputusan produk.

## 6. Cara kerja multi-agent

- Baca dokumen ini sebelum mulai bekerja.
- Kerjakan hanya tugas yang diberikan; tuliskan asumsi yang diperlukan dan tandai sebagai asumsi.
- Hindari mengedit area/file yang sama dengan agent lain pada waktu bersamaan. Nyatakan file atau area yang akan disentuh sebelum pekerjaan paralel dimulai.
- Jangan mengubah keputusan produk yang sudah dikonfirmasi tanpa arahan pengguna.
- Saat menyelesaikan tugas, laporkan ringkas: perubahan, file yang disentuh, pemeriksaan yang dilakukan, dan hal yang masih belum pasti.
- Perbarui dokumen ini jika menemukan fakta atau keputusan yang berlaku lintas tugas. Jangan menyalin spekulasi sebagai fakta.

## 7. Status tugas agent

Catat penugasan aktif agar tidak terjadi pekerjaan tumpang tindih.

| Agent | Tugas | Area/file | Status | Catatan |
| --- | --- | --- | --- | --- |
| — | Belum ada tugas | — | Belum dimulai | — |

## 8. Catatan perubahan dokumen

| Tanggal | Perubahan |
| --- | --- |
| 2026-10-09 | Membuat konteks awal dari nama proyek dan tautan Figma yang diberikan. Isi desain belum dapat ditinjau. |
| 2026-10-09 | Meninjau node Figma `15:7547`; menambahkan ringkasan alur screen offline, pengumpulan hasil, transisi subtes, dan hasil tryout. |
| 2026-10-10 | Menambahkan konteks produk Drill Soal Offline dan membedakannya dari TO Offline; mencatat kebutuhan yang belum dikonfirmasi secara terpisah. |
| 2026-10-10 | **Historical observation, superseded on 2026-10-12:** menginspeksi preview branch `feat/drill-dev` dan metadata Figma `69:14041`; implementasi masih TO Offline, tetapi sumber desain Drill terdiri dari 11 frame yang dapat dijadikan baseline builder. |
| 2026-10-12 | Memperbarui status menjadi dua project boundary yang dapat dijalankan terpisah dan menambahkan prompt planner/builder per app. |
