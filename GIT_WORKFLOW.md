# Git Workflow

Workflow ringan untuk epic dan task di `TASKS.md`.

## Branch

- Fitur: `feat/EPIC-###-nama-singkat`
- Perbaikan: `fix/EPIC-###-nama-singkat`
- Dokumentasi: `docs/EPIC-###-nama-singkat`

Gunakan nama singkat dengan huruf kecil dan tanda hubung. Kerjakan satu task utama per branch.

## Commit

Awali subject commit dengan ID epic atau task:

```text
EPIC-###: ringkasan perubahan
```

Contoh: `EPIC-004: add offline package download state`

Commit harus menggambarkan perubahan yang benar-benar sudah dibuat. Jangan tandai task **Done** sebelum commit tercatat.

## Penutupan task

Saat task atau epic selesai:

1. Pastikan perubahan yang relevan sudah masuk ke commit.
2. Perbarui status dan catatan task di `TASKS.md`.
3. Catat keputusan produk baru di `PROJECT_CONTEXT.md` bila ada.
