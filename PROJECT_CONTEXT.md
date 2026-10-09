# Ruanguji TO Offline 2026 — Project Context

Dokumen ini adalah titik awal bersama untuk manusia dan agent yang bekerja pada proyek ini. Perbarui bagian yang relevan saat keputusan atau kebutuhan baru sudah dikonfirmasi.

## 1. Identitas proyek

- **Nama kerja:** Ruanguji TO Offline 2026
- **Jenis produk:** Belum dikonfirmasi
- **Tujuan proyek:** Belum dikonfirmasi
- **Status:** Screen Figma utama sudah ditinjau; kebutuhan produk dan implementasi belum dikonfirmasi
- **Bahasa kerja dokumen:** Bahasa Indonesia

## 2. Sumber informasi

### Desain

- **File Figma:** [ruanguji — TO Offline — 2026](https://www.figma.com/design/oF0SkvpIqm2TIodNxQFxJ5/ruanguji---TO-Offline--2026-?node-id=15-7547&t=pGaR8Lw7oAPkSe4g-4)
- **Node yang ditunjuk:** `15:7547`
- **Status akses:** Node `15:7547` sudah ditinjau melalui Figma.
- Section `15:7547` berisi beberapa screen mobile untuk alur persiapan, pengerjaan, dan pengumpulan tryout offline.
- Ringkasan screen yang terlihat dicatat di bagian **Ringkasan screen yang ditinjau**.

### Keputusan dan spesifikasi

- Belum ada keputusan produk atau spesifikasi yang dikonfirmasi.
- Jika ada instruksi pengguna, catat keputusan yang berdampak ke implementasi di bagian **Keputusan terkonfirmasi**.

## 3. Ringkasan dan tujuan

Ringkasan awal berdasarkan screen Figma. Ini adalah observasi desain, bukan keputusan produk final.

- **Masalah yang ingin diselesaikan:** Memungkinkan pengguna mengunduh paket soal, mengerjakan tryout tanpa koneksi internet, lalu mengunggah jawaban ketika koneksi internet tersedia kembali.
- **Pengguna utama:** Peserta tryout RuangGuru/Ruanguji pada perangkat mobile.
- **Hasil yang diharapkan:** Tryout dapat dikerjakan offline dan hasilnya berhasil dikumpulkan untuk diproses.
- **Platform/lingkungan:** Belum diketahui
- **Batasan waktu atau teknis:** Belum diketahui

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

## 4. Keputusan terkonfirmasi

Belum ada.

Gunakan format berikut saat menambah keputusan:

| Tanggal | Keputusan | Alasan/sumber | Dampak |
| --- | --- | --- | --- |

## 5. Hal yang perlu diklarifikasi

1. Apa arti dan cakupan “TO Offline” dalam proyek ini?
2. Siapa pengguna utama dan tugas utama yang harus mereka selesaikan?
3. Apakah Figma mencakup keseluruhan produk atau hanya frame/alur tertentu?
4. Platform dan teknologi implementasi apa yang dituju?
5. Apa kriteria keberhasilan dan batasan proyek?
6. Apakah **Simpan Hasil** hanya menyimpan jawaban lokal, sedangkan **Upload & Kumpulkan Tryout** melakukan submit final ke server?
7. Apa yang terjadi jika koneksi terputus saat upload, halaman di-reload, atau upload gagal?
8. Apakah countdown menuju subtes berikutnya dapat dibatalkan atau hanya dapat dilewati melalui CTA?
9. Pada screen hasil, apakah hasil langsung tersedia setelah upload atau memang selalu masuk ke state menunggu?

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
