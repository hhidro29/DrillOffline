# Git Workflow

Workflow ringan untuk epic dan task di `TASKS.md`.

## Project boundaries

- TO Offline stays in the root project on port `3000` and uses `CRAFT-*` task IDs.
- Drill Offline stays in `drill-offline-prototype/` inside the managed `feat/drill-dev` worktree on port `3001` and uses `DRILL-*` task IDs.
- Do not import source between the projects or combine their task commits.
- Use `PROJECT_BOUNDARIES.md` as the path, port, and ownership reference.

## Branch

- Fitur: `feat/EPIC-###-nama-singkat`
- Perbaikan: `fix/EPIC-###-nama-singkat`
- Dokumentasi: `docs/EPIC-###-nama-singkat`

Gunakan nama singkat dengan huruf kecil dan tanda hubung. Kerjakan satu task utama per branch.

For the standalone Drill project, use the existing `feat/drill-dev` branch and a `DRILL-###:` subject. For TO, use the active `feat/EPIC-###-*` branch and a `CRAFT-###:` subject.

## Commit

Awali subject commit dengan ID epic atau task:

```text
CRAFT-###: ringkasan perubahan TO
DRILL-###: ringkasan perubahan Drill
```

Contoh: `EPIC-004: add offline package download state`

Commit harus menggambarkan perubahan yang benar-benar sudah dibuat. Jangan tandai task **Done** sebelum commit tercatat.

## Delivery prototype

- Commit perubahan per task yang sudah selesai agar histori mudah ditelusuri.
- Gabungkan TO dan Drill ke `main` hanya sebagai project boundaries yang sudah direview; jangan menggabungkan source Drill ke entrypoint TO.
- Gunakan commit task untuk melacak screen atau flow tertentu saat mencari regresi.

## Penutupan task

Saat task atau epic selesai:

1. Pastikan perubahan yang relevan sudah masuk ke commit.
2. Perbarui status dan catatan task di `TASKS.md` atau `drill-offline-prototype/DRILL_STATUS.md`, sesuai project boundary.
3. Catat keputusan produk baru di `PROJECT_CONTEXT.md` bila ada.
