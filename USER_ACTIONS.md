# User Actions

## USER-ACTION-001 — Report visual mismatch when noticed

- Status: Planner-owned review workflow
- Task terkait: `CRAFT-101`–`CRAFT-114`
- Screen/node: Section `15:7547`
- Yang perlu dilakukan user: Tidak perlu menelusuri semua screen satu per satu. Jika menemukan visual yang tidak sesuai, kirim screenshot atau catatan singkat; planner akan mengaudit, membuat task perubahan, dan meminta builder mengerjakannya.
- Hasil yang dibutuhkan: Bukti mismatch bila ada; keputusan `Approved` atau `Changes Requested` ditentukan planner berdasarkan evidence.
- Cara verifikasi: Planner menutup review setelah semua mismatch penting ditangani atau dicatat sebagai residual risk.
- Dampak: Screen tasks berada di `Internal Review` sampai planner memutuskan `Approved` atau `Changes Requested`; status ini bukan backlog aktif.

## USER-ACTION-002 — Confirm unresolved offline product behavior

- Status: Open
- Task terkait: `CRAFT-111`, `CRAFT-113`, `CRAFT-114`
- Screen/node: `8:2032`, `15:9810`, `11:2632`
- Hambatan: The prototype uses the baseline assumptions for countdown cancellation, upload failure recovery, and result availability timing because backend behavior is not specified.
- Yang perlu dilakukan user: Confirm whether countdown can be skipped, how a failed upload is retried, and whether results enter a waiting state after every upload.
- Alasan: These behaviors change state transitions and cannot be inferred reliably from the visual frames alone.
- Hasil yang dibutuhkan: Confirmed behavior rules for the final integration pass.
- Cara verifikasi: Update `PROJECT_CONTEXT.md` and the corresponding flow rows in `CRAFT_PLAN.md`.
- Dampak: End-to-end behavior remains a prototype simulation until confirmed.
