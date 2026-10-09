# User Actions

## USER-ACTION-001 — Review prototype against source Figma

- Status: Open
- Task terkait: `CRAFT-101`–`CRAFT-114`
- Screen/node: Section `15:7547`
- Hambatan: The prototype is implemented and self-reviewed at 360 × 740, but final visual approval still needs a human comparison against the source Figma frames.
- Yang perlu dilakukan user: Open the local preview and compare each screen with its mapped Figma node; call out any exact spacing, copy, or asset mismatch.
- Alasan: Final visual sign-off depends on the source design review and product judgment.
- Hasil yang dibutuhkan: A list of requested visual changes, or approval of the current pass.
- Cara verifikasi: Mark this action complete after the screen inventory has no remaining visual mismatch notes.
- Dampak: Screen tasks remain `Ready for Review` until sign-off.

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
