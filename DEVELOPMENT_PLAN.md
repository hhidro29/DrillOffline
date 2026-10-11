# Development Plan — TO Offline dan Drill Soal Offline

## Keputusan struktur

TO Offline dan Drill Soal Offline adalah dua prototype mandiri.

- Prototype TO yang sekarang tidak disentuh oleh pekerjaan Drill.
- Drill dibuat di worktree atau project terpisah.
- Drill memiliki source, styles, fixtures, dan assets sendiri.
- Tidak ada shared source code pada milestone pertama.
- Reuse komponen baru dievaluasi setelah kedua prototype stabil.

## TO Offline

- Pertahankan prototype TO dan flow 14 screen yang sekarang.
- Jangan menambahkan routing atau logic Drill ke source TO.
- Jangan melakukan refactor TO sebagai dependency untuk Drill.

## Drill Soal Offline

Target: student BAC membuka link dari guru, melihat detail drill, mengunduh paket, mengerjakan satu session offline, menyalakan internet, lalu mengunggah hasil.

Project Drill disiapkan standalone, misalnya:

```text
drill-offline-prototype/
  package.json
  src/
    main.tsx
    styles.css
    screens/
    fixtures/
  public/
    assets/
```

Project Drill tidak boleh mengimpor source dari TO. Jika bentuk komponen mirip, buat komponen lokal di project Drill terlebih dahulu.

## Source of truth Figma

Gunakan node `69:14041` pada file Figma yang sama. Node ini berisi 11 frame:

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

The standalone Drill project is now available at `/Users/fa-2400/Documents/ChatGPT/Drill Offline/drill-offline-prototype/` on branch `feat/drill-dev`. It has its own `package.json`, `src/main.tsx`, `src/styles.css`, fixtures, local assets, and Vite port `3001`. The TO app remains the separate root project on port `3000`.

## Batas produk Drill

- Satu session saja.
- Tidak ada subtes atau transisi subtes.
- Student melihat topik/tes, jumlah soal, dan durasi sebelum download.
- Flow baseline: download → matikan internet → kerjakan → nyalakan internet → upload/kumpulkan.
- Aturan TO yang belum dikonfirmasi tidak boleh diwariskan otomatis.
- Behavior yang tidak jelas di Figma dicatat sebagai asumsi atau USER-ACTION.

## Tahapan development

| ID | Fase | Output |
| --- | --- | --- |
| D-001 | Validasi desain | Metadata, screenshot, urutan flow, dan pertanyaan terbuka dari 11 frame. |
| D-002 | Scaffold standalone | Worktree/project Drill, React/Vite, entrypoint, styles, fixtures, dan assets sendiri. |
| D-003 | Persiapan | Frame 01–04 selesai dan dapat dinavigasi. |
| D-004 | Pengerjaan | Frame 05–08 selesai; satu session tanpa subtes. |
| D-005 | Pengumpulan | Frame 09–11 selesai; upload dan ringkasan dapat direview. |
| D-006 | Navigation dan tester sidebar | Adaptasi sistem sidebar developer TO Offline dengan pola interaksi yang sama: akses demo, buka/tutup, reset session, status koneksi, active state, dan direct jump. Isi sidebar diganti untuk 11 screen Drill; simulasi Online/Offline harus memengaruhi gate persiapan dan pengumpulan. |
| D-007 | Visual iteration dan QA | Loop berulang render → compare Figma → fix → render ulang untuk seluruh 11 screen pada 360 × 740, dimulai dari screen hasil; review berhenti hanya setelah mismatch P0/P1 tertutup atau blocker terdokumentasi. |
| D-008 | Handoff | Commit per fase, evidence, asumsi, blocker, dan status Internal Review. |

## Project and task ownership

- TO work is planned in `CRAFT_PLAN.md` and reviewed with `TO_PLANNER_PROMPT.md`.
- Drill work is planned in the D-001–D-008 rows in `TASKS.md`, recorded in `drill-offline-prototype/DRILL_STATUS.md`, and reviewed with `DRILL_PLANNER_PROMPT.md`.
- TO builders use `TO_BUILDER_PROMPT.md`; Drill builders use `DRILL_BUILDER_PROMPT.md`.
- `CRAFT-*` commits stay in the TO worktree. `DRILL-*` commits stay in the Drill worktree.
- Do not merge source files between the two projects during this milestone.

## Shared component

Shared component extraction ditunda. Setelah TO dan Drill selesai direview, planner baru mengevaluasi apakah ada pola yang layak diekstrak. Shared component bukan dependency untuk milestone Drill.

## Definition of done

- 11 frame Figma Drill memiliki prototype yang dapat dinavigasi.
- Flow berjalan dari download sampai ringkasan hasil.
- Tidak ada subtes atau logic TO.
- Panel tester lokal menyediakan toggle koneksi dan shortcut ke 11 screen Drill, tetapi tidak menjadi bagian student flow.
- Toggle koneksi dapat digunakan untuk menguji gate Offline saat mulai/mengerjakan dan gate Online saat upload/kumpulkan.
- Source Drill berdiri sendiri di `/Users/fa-2400/Documents/ChatGPT/Drill Offline/drill-offline-prototype/` pada branch `feat/drill-dev`.
- Prototype TO tidak berubah.
- Evidence screenshot dan catatan asumsi tersedia.
- Seluruh 11 screen sudah melewati visual iteration; screen hasil menjadi baseline audit pertama.
- Evidence tersedia untuk setiap putaran yang relevan dan mismatch log menunjukkan item P0/P1 sudah tertutup atau memiliki blocker yang jelas.
- Handoff siap direview planner.
