# Task Board — Ruanguji TO Offline 2026

Task list untuk pekerjaan proyek. Perbarui status di sini setiap kali pekerjaan dimulai atau selesai. Item yang bergantung pada keputusan produk tetap berstatus **Blocked** sampai keputusan tersebut dicatat di `PROJECT_CONTEXT.md`.

## Status

- **Backlog** — belum dikerjakan.
- **In Progress** — sedang dikerjakan; cantumkan branch dan pemilik.
- **Blocked** — menunggu keputusan atau dependensi.
- **Done** — selesai dan sudah masuk ke Git.

## Board

| ID | Task | Prioritas | Status | Dependensi / catatan |
| --- | --- | --- | --- | --- |
| TOFF-001 | Tinjau alur desain Figma node `15:7547` dan catat urutan screen | P1 | Done | Ringkasan ada di `PROJECT_CONTEXT.md`. |
| TOFF-002 | Konfirmasi tujuan produk, pengguna, platform, dan cakupan MVP | P0 | Blocked | Jawaban diperlukan sebelum membangun aplikasi tryout. |
| TOFF-003 | Putuskan arti **Simpan Hasil** dan **Upload & Kumpulkan Tryout** | P0 | Blocked | Tentukan kapan sesi dianggap final dan apakah jawaban masih dapat diubah. |
| TOFF-004 | Tetapkan kebutuhan paket offline dan masa berlaku unduhan | P1 | Blocked | Termasuk ukuran paket, ruang penyimpanan, dan perilaku saat paket kedaluwarsa. |
| TOFF-005 | Tetapkan perilaku pemulihan untuk reload, perangkat mati, dan upload gagal | P0 | Blocked | Tentukan penyimpanan lokal, retry, serta penanganan duplikasi submit. |
| TOFF-006 | Pilih platform dan stack implementasi | P0 | Blocked | Bergantung pada TOFF-002. |
| TOFF-007 | Buat scaffold aplikasi dan alur Git untuk source code | P1 | Backlog | Mulai setelah TOFF-002 dan TOFF-006. |
| TOFF-008 | Implementasikan persiapan tryout dan download paket | P1 | Backlog | Bergantung pada TOFF-004 dan TOFF-007. |
| TOFF-009 | Implementasikan pengerjaan offline, timer, navigasi, dan penyimpanan jawaban | P1 | Backlog | Bergantung pada TOFF-003, TOFF-005, dan TOFF-007. |
| TOFF-010 | Implementasikan ringkasan jawaban dan konfirmasi sebelum submit | P1 | Backlog | Bergantung pada TOFF-003 dan TOFF-009. |
| TOFF-011 | Implementasikan upload, progres, retry, dan status pengumpulan | P1 | Backlog | Bergantung pada TOFF-005 dan TOFF-010. |
| TOFF-012 | Implementasikan state hasil diproses dan akses pembahasan | P2 | Backlog | Perlu definisi kapan hasil tersedia. |

## Aturan mengelola task

1. Gunakan satu ID stabil (`TOFF-###`) untuk setiap task dan cantumkan ID itu pada branch serta commit.
2. Sebelum mulai, ubah status menjadi **In Progress** dan tulis pemilik serta branch pada kolom catatan.
3. Jika terhambat keputusan, ubah status menjadi **Blocked** dan catat pertanyaannya di `PROJECT_CONTEXT.md`.
4. Setelah selesai, ubah status menjadi **Done** hanya setelah perubahan tercatat dalam commit Git.
5. Tambahkan task baru sebagai **Backlog**; jangan mencatat asumsi sebagai keputusan produk.

## Template task baru

```md
| TOFF-### | Kata kerja + hasil yang diharapkan | P1 | Backlog | Dependensi / catatan |
```
