# TO Offline Prototype Test Plan

Dokumen ini menjadi gate sebelum task diberi status `Approved`. Build yang berhasil hanya membuktikan aplikasi dapat dikompilasi; status dan transisi tetap harus diverifikasi melalui UI.

## Aturan test

- Gunakan viewport `360 × 740`.
- Untuk behavior, jalankan flow dari screen sebelumnya. Menu jump hanya untuk inspeksi visual atau setup fixture, bukan bukti transisi end-to-end.
- Setiap test harus memeriksa tiga hal: state internal yang diwakili UI, kontrol yang enabled/disabled, dan screen/state tujuan setelah aksi.
- Capture evidence untuk setiap state yang berbeda. Screenshot harus menyebutkan ID test, screen, dan state.
- Setelah memperbaiki shared component atau state reducer, ulangi semua test yang menyentuh komponen tersebut.
- Defect tidak boleh ditutup hanya karena `npm run build` berhasil.

## State acceptance matrix

| ID | Flow | Kondisi | Expected UI | Expected transition |
| --- | --- | --- | --- | --- |
| SMOKE-001 | Screen 12 | Network `offline` | Koneksi belum success, progres tersimpan lokal terlihat, upload menunggu, tanpa CTA `Lanjutkan` | Tetap di screen 12 |
| SMOKE-002 | Screen 12 | Network berubah ke `online` | Progres upload tampil di screen 12 | Upload berhasil → screen 14, tanpa membuka screen 13 |
| SMOKE-003 | Screen 07/08 | Attempt active, network berubah online | Overlay tampil `25 detik`, timer berhenti, soal dan navigasi disabled | Tetap di screen pengerjaan |
| SMOKE-004 | Screen 07/08 | Network kembali offline sebelum 25 detik | Overlay hilang, kontrol aktif, timer lanjut dari nilai yang sama | Lanjut mengerjakan |
| SMOKE-005 | Screen 07/08 | Network tetap online selama 25 detik | Overlay terminated, input tetap locked, status `pending_sync` | CTA → screen 12 |
| SMOKE-006 | Screen 13 | Network `offline` | CTA upload disabled, status pending tetap terlihat | Tetap di screen 13 |
| SMOKE-007 | Screen 13 | Network `online` | CTA upload enabled | Upload → screen 14 |
| SMOKE-008 | Screen 03 | Download berjalan | Progress meningkat sampai 100% tanpa reload | Otomatis → screen 04 |
| SMOKE-009 | Screen 01 | Consent unchecked/checked | CTA disabled/enabled sesuai checkbox | CTA → screen 02 hanya setelah checked |
| SMOKE-010 | Screen 05–07 | Network `online` sebelum attempt dimulai | Tidak ada nudge anti-cheat di persiapan; saat masuk screen 07, nudge langsung aktif sebelum soal dapat digunakan | Attempt masuk warning state di screen 07 |
| SMOKE-011 | Screen 09/10/11 | Attempt belum final, network berubah online | Enforcement tetap aktif; review/save/next-subtest tidak dapat melewati proteksi | Warning, recovery, atau termination mengikuti policy attempt |
| SMOKE-012 | Screen 07–11 | Reload, back, duplicate tab, atau tab visibility berubah | Attempt state dan timer tidak reset; event tercatat | Resume hanya melalui state attempt yang valid |
| SMOKE-013 | Production boundary | Peserta membuka device/app lain atau device kedua | Di luar kemampuan web prototype; harus ada mitigation platform/proctoring | Dicatat sebagai residual risk atau requirement produksi |
| SMOKE-014 | Screen 04 | Network `online` / `offline` | Online: `1/2`, langkah koneksi belum success, CTA disabled. Offline: `2/2`, langkah koneksi success, CTA enabled | Offline → screen 05; Online tetap di screen 04 |

## Visual review matrix

Minimal capture untuk setiap state yang memiliki output visual berbeda:

- Screen 01: consent unchecked dan checked.
- Screen 03: download progress awal, berjalan, selesai.
- Screen 04: network online dan offline.
- Screen 04: state `1/2` online dan `2/2` offline, termasuk checklist serta CTA.
- Screen 07: normal offline, warning online, dan terminated.
- Screen 12: `0/2` offline dan `1/2` online.
- Screen 13: pending sync dan ready to upload.
- Screen 14: result waiting.
- Screen 05/06: Online blocked sebelum attempt dimulai.
- Screen 09/10/11: warning atau locked state ketika Online selama attempt belum final.

## Release gate

Task boleh diberi `Approved` hanya jika:

1. `npm run build` berhasil.
2. Semua acceptance test yang relevan lulus.
3. Screenshot state matrix tersedia dan dibandingkan dengan Figma.
4. Tidak ada defect severity tinggi atau sedang yang belum memiliki keputusan.
5. Residual risk dan asumsi backend dicatat di `USER_ACTIONS.md`.

## Evidence log — 2026-10-10

- `SMOKE-001`/`SMOKE-002`: screen 12 fixture shows `0/2` and disabled upload preparation while Offline, then `1/2` and enabled continuation while Online.
- `SMOKE-003`/`SMOKE-004`: screen 08 Online shows the 25-second warning and disabled question controls; returning Offline clears the overlay and resumes the timer.
- `SMOKE-011`: screen 09 Online shows the same warning and disables both review actions, confirming enforcement across the attempt boundary.
- `SMOKE-006`/`SMOKE-007`: screen 13 upload failure leaves `pending_sync` visible; switching Online enables `Coba Lagi`, and a successful retry reaches screen 14 waiting state.
- `SMOKE-014`: screen 04 now renders `1/2` Online and `2/2` Offline, with matching checklist and CTA state.
- Build gate: `npm run build` passed after the enforcement, upload recovery, persistence, and screen 04 state updates.
