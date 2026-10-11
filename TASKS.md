# Task Board — Ruanguji TO Offline dan Drill Offline 2026

Board ini memakai task berukuran **epic/fase besar**. Pecah epic menjadi checklist atau subtask saat pekerjaan akan dimulai; jangan memenuhi backlog dengan detail implementasi yang belum disepakati.

## Status

- **Backlog** — siap diprioritaskan.
- **In Progress** — sedang dikerjakan; cantumkan branch dan pemilik.
- **Internal Review** — implementasi dan evidence tersedia; planner sedang melakukan review.
- **Blocked** — menunggu keputusan atau dependensi.
- **Deferred** — sengaja ditunda; bukan dependency milestone saat ini.
- **Done** — selesai dan sudah masuk ke Git.

## Board

| ID | Epic | Prioritas | Status | Cakupan / dependensi |
| --- | --- | --- | --- | --- |
| EPIC-001 | Pahami kebutuhan dan alur produk | P1 | Done | Review alur Figma node `15:7547` dan dokumentasikan temuan di `PROJECT_CONTEXT.md`. |
| EPIC-002 | Sepakati produk dan MVP | P0 | Blocked | Konfirmasi pengguna, tujuan, cakupan MVP, kriteria berhasil, serta perilaku simpan dan submit. |
| EPIC-003 | Tentukan fondasi teknis | P0 | Blocked | Pilih platform/stack dan tetapkan kebutuhan offline, penyimpanan, serta pemulihan. Mulai setelah EPIC-002. |
| EPIC-004 | Bangun pengalaman tryout offline | P1 | Backlog | Persiapan, unduh paket, kesiapan offline, pengerjaan soal, timer, navigasi, dan penyimpanan jawaban. Mulai setelah EPIC-003. |
| EPIC-005 | Bangun pengumpulan dan hasil tryout | P1 | Backlog | Ringkasan sebelum submit, unggah dan pemulihan kegagalan, status hasil, serta akses pembahasan. Mulai setelah EPIC-004 dan keputusan produk terkait tersedia. |
| EPIC-006 | Refactor boundary TO Offline | P2 | Deferred | Tidak diperlukan untuk milestone Drill standalone. Evaluasi setelah prototype TO dan Drill stabil. |
| EPIC-007 | Ekstrak shared offline foundation | P2 | Deferred | Tidak menjadi dependency Drill milestone pertama. Evaluasi berdasarkan evidence setelah kedua prototype direview. |
| EPIC-008 | Bangun student flow Drill Offline | P0 | Internal Review | Standalone Drill project sudah tersedia di `feat/drill-dev` pada `drill-offline-prototype/`; 11 frame dan one-session flow sudah memiliki evidence. |
| EPIC-009 | Sediakan preview entrypoint Drill | P1 | Internal Review | Project Drill memiliki package dan Vite preview sendiri di `http://localhost:3001/`; tidak memakai entrypoint TO. |
| EPIC-010 | Regression dan handoff Drill | P1 | In Progress | Planner review dan keputusan approval masih berjalan setelah project boundary dipisahkan. |

## Drill Offline — Task Plan Mandiri

Task Drill di bawah ini adalah rencana lengkap untuk prototype berdasarkan Figma node `69:14041`. Task ini berdiri sendiri dan tidak menunggu extraction shared component. TO Offline tetap menjadi prototype terpisah.

| ID | Task | Prioritas | Status | Cakupan / output |
| --- | --- | --- | --- | --- |
| D-001 | Validasi source desain Drill | P0 | Internal Review | Inspect metadata, screenshot, urutan flow, copy, state, dan node ID dari 11 frame Drill. Catat pertanyaan terbuka di `USER_ACTIONS.md`. |
| D-002 | Scaffold project Drill standalone | P0 | Internal Review | Worktree `feat/drill-dev` now contains `drill-offline-prototype/` with its own React/Vite package, entrypoint, styles, fixtures, assets, and port `3001`. |
| D-003 | Implementasi persiapan Drill | P0 | Internal Review | Frame 01–04 implemented: Unduh Soal, download dalam proses, panduan matikan internet, dan Siap Mengerjakan. |
| D-004 | Implementasi pengerjaan Drill | P0 | Internal Review | Frame 05–08 implemented: Kerjakan Soal, Konfirmasi Jawaban, Hasil Jawaban — Salah, dan Waktu Habis. One session without subtests. |
| D-005 | Implementasi pengumpulan Drill | P0 | Internal Review | Frame 09–11 implemented: Nyalakan Internet, Unggah dan Kumpulkan Hasil, dan Ringkasan Hasil. |
| D-006 | Navigation dan state Drill | P1 | Internal Review | CTA/state wiring, local developer sidebar, 11 direct jumps, reset, active network switch, offline preparation gate, online upload gate, and upload-failure trigger are implemented. |
| D-007 | Visual iteration dan QA Drill | P0 | Internal Review | All 11 screens were iterated at `360 × 740`; scroll, sticky CTA, network gates, wrong-answer, timeout, upload retry, and summary evidence are recorded in `DRILL_STATUS.md`. |
| D-008 | Handoff Drill ke planner | P1 | Internal Review | Branch commits, evidence, assumptions, and open decisions are recorded; planner still decides `Approved` or `Changes Requested`. |

### Drill frame mapping

| Frame | Figma node | Task |
| --- | --- | --- |
| 01 · Unduh Soal | `69:13360` | D-003 |
| 02 · Unduh Soal — Dalam Proses | `69:13411` | D-003 |
| 03 · Matikan Internet — Panduan | `69:13464` | D-003 |
| 04 · Siap Mengerjakan | `69:13527` | D-003 |
| 05 · Kerjakan Soal | `69:10610` | D-004 |
| 06 · Konfirmasi Jawaban | `69:10677` | D-004 |
| 07 · Hasil Jawaban — Salah | `69:10823` | D-004 |
| 08 · Waktu Habis | `69:10895` | D-004 |
| 09 · Nyalakan Internet — Panduan | `69:13066` | D-005 |
| 10 · Unggah dan Kumpulkan Hasil | `69:13136` | D-005 |
| 11 · Ringkasan Hasil | `69:12792` | D-005 |

### Drill guardrails

- Source Drill berada di worktree/project terpisah dari TO. Boundary, path, port, dan prompt ditulis di `PROJECT_BOUNDARIES.md`.
- Jangan mengimpor `src/main.tsx` atau flow TO sebagai source Drill.
- Tidak ada subtes, `Next subtest`, atau transisi subtes.
- Jangan mewarisi aturan TO yang belum dikonfirmasi untuk Drill.
- Jika frame Figma belum menjelaskan behavior, catat sebagai asumsi atau `USER-ACTION`; jangan mengarang behavior diam-diam.
- Adaptasi sistem sidebar developer TO Offline secara lokal di project Drill; pertahankan pola akses demo, buka/tutup, reset session, status koneksi, active state, dan direct jump. Ganti daftar screen menjadi 11 frame Drill serta pertahankan toggle Online/Offline untuk membantu QA.
- Simulasi koneksi harus memengaruhi behavior yang terlihat: mode Offline menguji kesiapan memulai dan pengerjaan, sedangkan mode Online menguji gate serta upload hasil. Jangan menambahkan aturan terminasi TO yang belum dikonfirmasi untuk Drill.
- Seluruh 11 screen wajib melewati satu putaran visual iteration. Jangan menganggap implementasi baseline sebagai hasil final hanya karena semua CTA dan direct jump sudah berjalan.
- Visual iteration dilakukan berulang sampai mismatch P0/P1 tertutup atau blocker-nya terdokumentasi; satu pass yang hanya menghasilkan screenshot belum cukup.
- Audit pertama memakai screen 11 (Ringkasan Hasil) sebagai baseline: cek lebar layout terhadap viewport, header dan breadcrumb, hero gradient, hierarki typography, score card, statistik, CTA, spacing, dan area kosong yang tidak semestinya. Terapkan temuan yang sama ke screen lain.
- Sidebar tester tidak boleh muncul sebagai UI student pada flow utama; akses melalui kontrol demo khusus seperti di prototype TO.
- Shared component extraction ditunda sampai prototype TO dan Drill selesai direview.

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

Epic lama `TOFF-001` sampai `TOFF-012` digabung ke epic TO di atas sebelum pekerjaan implementasi dimulai. Pekerjaan Drill memakai EPIC-008 dan tidak menambah logic ke app TO. Gunakan ID epic baru untuk pekerjaan berikutnya.

## Catatan status Drill

Branch `feat/drill-dev` memiliki project standalone `drill-offline-prototype/` dengan entrypoint, styles, fixtures, assets, dan Vite port `3001` sendiri. Preview dan source harus diverifikasi dari project tersebut; nama branch atau commit `DRILL-*` saja tetap bukan evidence.

## Prompt ownership

- TO planner: `TO_PLANNER_PROMPT.md`
- TO builder: `TO_BUILDER_PROMPT.md`
- Drill planner: `DRILL_PLANNER_PROMPT.md`
- Drill builder: `DRILL_BUILDER_PROMPT.md`
