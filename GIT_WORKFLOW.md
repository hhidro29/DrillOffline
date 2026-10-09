# Git Workflow

Workflow ringan untuk task di `TASKS.md`.

## Branch

- Fitur: `feat/TOFF-###-nama-singkat`
- Perbaikan: `fix/TOFF-###-nama-singkat`
- Dokumentasi: `docs/TOFF-###-nama-singkat`

Gunakan nama singkat dengan huruf kecil dan tanda hubung. Kerjakan satu task utama per branch.

## Commit

Awali subject commit dengan ID task:

```text
TOFF-###: ringkasan perubahan
```

Contoh: `TOFF-008: add offline package download state`

Commit harus menggambarkan perubahan yang benar-benar sudah dibuat. Jangan tandai task **Done** sebelum commit tercatat.

## Penutupan task

Saat task selesai:

1. Pastikan perubahan yang relevan sudah masuk ke commit.
2. Perbarui status dan catatan task di `TASKS.md`.
3. Catat keputusan produk baru di `PROJECT_CONTEXT.md` bila ada.
