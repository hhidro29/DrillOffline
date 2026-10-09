# Task Board — Ruanguji TO Offline 2026

Board ini memakai task berukuran **epic/fase besar**. Pecah epic menjadi checklist atau subtask saat pekerjaan akan dimulai; jangan memenuhi backlog dengan detail implementasi yang belum disepakati.

## Status

- **Backlog** — siap diprioritaskan.
- **In Progress** — sedang dikerjakan; cantumkan branch dan pemilik.
- **Blocked** — menunggu keputusan atau dependensi.
- **Done** — selesai dan sudah masuk ke Git.

## Board

| ID | Epic | Prioritas | Status | Cakupan / dependensi |
| --- | --- | --- | --- | --- |
| EPIC-001 | Pahami kebutuhan dan alur produk | P1 | Done | Review alur Figma node `15:7547` dan dokumentasikan temuan di `PROJECT_CONTEXT.md`. |
| EPIC-002 | Sepakati produk dan MVP | P0 | Blocked | Konfirmasi pengguna, tujuan, cakupan MVP, kriteria berhasil, serta perilaku simpan dan submit. |
| EPIC-003 | Tentukan fondasi teknis | P0 | Blocked | Pilih platform/stack dan tetapkan kebutuhan offline, penyimpanan, serta pemulihan. Mulai setelah EPIC-002. |
| EPIC-004 | Bangun pengalaman tryout offline | P1 | Backlog | Persiapan, unduh paket, kesiapan offline, pengerjaan soal, timer, navigasi, dan penyimpanan jawaban. Mulai setelah EPIC-003. |
| EPIC-005 | Bangun pengumpulan dan hasil tryout | P1 | Backlog | Ringkasan sebelum submit, unggah dan pemulihan kegagalan, status hasil, serta akses pembahasan. Mulai setelah EPIC-004 dan keputusan produk terkait tersedia. |

## Cara mengelola board

1. Saat epic akan dikerjakan, ubah status ke **In Progress**, tentukan pemilik dan branch, lalu pecah cakupannya menjadi subtasks.
2. Jika terhambat keputusan, ubah status ke **Blocked** dan catat pertanyaannya di `PROJECT_CONTEXT.md`.
3. Tandai **Done** setelah cakupan epic selesai dan perubahan tercatat dalam commit Git.
4. Catat keputusan produk baru di `PROJECT_CONTEXT.md`; jangan mengubah asumsi menjadi keputusan.
5. Tambahkan epic baru hanya untuk hasil kerja besar yang berdiri sendiri. Detail implementasi masuk sebagai subtask saat epic dimulai.

## Template epic baru

```md
| EPIC-### | Hasil besar yang ingin dicapai | P1 | Backlog | Cakupan / dependensi |
```

Epic lama `TOFF-001` sampai `TOFF-012` digabung ke epic di atas sebelum pekerjaan implementasi dimulai. Gunakan ID epic baru untuk pekerjaan berikutnya.
