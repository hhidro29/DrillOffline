# Figma Craft Plan — Ruanguji TO Offline

Dokumen ini memetakan pekerjaan untuk menerjemahkan section Figma `15:7547` menjadi prototype yang dapat dijalankan, ditinjau, dan diiterasi sampai visualnya sesuai dengan desain.

## Aturan kerja

- Section Figma berisi 14 screen utama.
- Mock browser bar di setiap frame diabaikan. Implementasi dimulai dari navbar atau konten produk.
- Target utama setiap screen adalah viewport mobile `360 × 740`.
- Prototype mencakup visual dan simulasi behavior yang relevan.
- Stack prototype menggunakan React dengan komponen reusable.
- Figma dan `PROJECT_CONTEXT.md` adalah sumber utama; copy dan data dapat disesuaikan bila mendukung intent desain.
- Self-review menggunakan evidence. Asumsi yang toleran boleh digunakan dan harus dicatat; area yang masih kabur masuk `USER_ACTIONS.md`.
- Asset visual diambil dari Figma dan disimpan secara lokal agar tidak bergantung pada URL asset sementara.
- Komponen yang berulang dibuat reusable sebelum dipakai di banyak screen.
- Setiap screen melewati siklus `Planned → Crafting → Internal Review → Changes Requested → Approved`.
- `Internal Review` adalah handoff sementara, bukan item backlog aktif. Builder cukup mengirim evidence; planner yang melakukan review visual dan functional.
- Jika evidence sesuai, planner mengubah status menjadi `Approved`. Jika tidak sesuai, planner membuat catatan mismatch dan mengubah status menjadi `Changes Requested`.
- Screen dianggap `Approved` setelah struktur, visual, interaksi, dan screenshot review selesai.
- Perubahan di-commit per task. Merge ke `main` dilakukan per milestone stabil agar histori mudah ditelusuri.

## Alur pengerjaan

```mermaid
flowchart LR
  A[Scope dan inventory] --> B[Token dan asset]
  B --> C[Komponen reusable]
  C --> D[Craft 14 screen]
  D --> E[Integrasi flow]
  E --> F[Review visual end-to-end]
  F --> G[Approved]
```

## Inventory dan task state

Tabel ini menyimpan inventory screen dan dependensi. Status `Internal Review` tidak perlu ditampilkan sebagai backlog atau dikerjakan ulang oleh user; status itu hanya menunggu review planner. Backlog aktif hanya berisi task `Planned`, `In Progress`, `Blocked`, atau `Changes Requested`.

| ID | Task | Dependensi | Output | Status |
| --- | --- | --- | --- | --- |
| CRAFT-000 | Kunci scope dan aturan visual | — | Aturan craft disepakati | Done |
| CRAFT-001 | Inventarisasi 14 screen dan node Figma | CRAFT-000 | Screen inventory | Done |
| CRAFT-002 | Petakan flow, state, dan transisi | CRAFT-001 | Flow/state map | Approved |
| CRAFT-003 | Ekstrak token visual | CRAFT-001 | Token warna, typography, spacing, radius, shadow | Approved |
| CRAFT-004 | Inventarisasi dan lokalkan asset | CRAFT-001 | Asset map dan file asset lokal | Approved |
| CRAFT-005 | Rancang komponen reusable | CRAFT-002, CRAFT-003, CRAFT-004 | Component map dan API props | Approved |
| CRAFT-006 | Siapkan app shell dan routing prototype React | CRAFT-002, CRAFT-005 | React shell, screen state, dan navigation model | Approved |
| CRAFT-007 | Kunci state contract dan test fixture | CRAFT-002, CRAFT-006 | State matrix, fixture path, dan acceptance criteria | Approved |
| CRAFT-101 | Craft screen 01 — Aturan & Persetujuan | CRAFT-006 | Frame `15:9085` | Internal Review |
| CRAFT-102 | Craft screen 02 — Unduh Soal | CRAFT-006 | Frame `6:419` | Internal Review |
| CRAFT-103 | Craft screen 03 — Unduh Soal — Proses | CRAFT-006 | Frame `7:978` | Internal Review |
| CRAFT-104 | Craft screen 04 — Matikan Internet — Panduan | CRAFT-006 | Frame `8:1203` | Internal Review |
| CRAFT-105 | Craft screen 05 — Siap Mengerjakan | CRAFT-006 | Frame `8:1484` | Internal Review |
| CRAFT-106 | Craft screen 06 — Mulai Tryout — Konfirmasi | CRAFT-006 | Frame `37:10312` | Internal Review |
| CRAFT-107 | Craft screen 07 — Pengerjaan — Soal 1 | CRAFT-006 | Frame `8:2053` | Internal Review |
| CRAFT-108 | Craft screen 08 — Pengerjaan — Soal 2 | CRAFT-006 | Frame `8:2154` | Internal Review |
| CRAFT-109 | Craft screen 09 — Tinjau Jawaban | CRAFT-006 | Frame `13:3198` | Internal Review |
| CRAFT-110 | Craft screen 10 — Simpan Hasil — Konfirmasi | CRAFT-006 | Frame `15:7308` | Internal Review |
| CRAFT-111 | Craft screen 11 — Subtes Berikutnya | CRAFT-006 | Frame `8:2032` | Internal Review |
| CRAFT-112 | Craft screen 12 — Nyalakan Internet — Panduan | CRAFT-006 | Frame `15:9660` | Internal Review |
| CRAFT-113 | Craft screen 13 — Unggah & Kumpulkan Hasil | CRAFT-006 | Frame `15:9810` | Internal Review |
| CRAFT-114 | Craft screen 14 — Hasil Tryout | CRAFT-006 | Frame `11:2632` | Approved |
| CRAFT-201 | Integrasikan transisi antar-screen | CRAFT-101–114 | Flow dapat dijalankan dari awal sampai akhir | Internal Review |
| CRAFT-202 | Implementasikan state offline dan network enforcement | CRAFT-002, CRAFT-201 | State online, offline, warning, dan terminasi | Internal Review |
| CRAFT-203 | Implementasikan timer, autosave, submit, dan pending upload | CRAFT-201, CRAFT-202 | Perilaku tryout sesuai baseline MVP | Internal Review |
| CRAFT-204 | Review responsive dan overflow mobile | CRAFT-101–114 | Semua screen stabil pada viewport target | Internal Review |
| CRAFT-205 | Review visual end-to-end | CRAFT-201–204 | Daftar mismatch dan hasil iterasi terakhir | Internal Review |
| CRAFT-206 | Final cleanup dan handoff | CRAFT-205 | Prototype siap diteruskan ke development | Internal Review |
| CRAFT-208 | Jalankan automated smoke test untuk state dan flow | CRAFT-007, CRAFT-201–203 | Test matrix lulus dan evidence tersimpan | Internal Review |
| CRAFT-209 | Visual regression per state, bukan hanya per screen | CRAFT-007, CRAFT-204 | Screenshot state matrix dan daftar mismatch | Internal Review |
| CRAFT-210 | Tutup defect dan lakukan regression terakhir | CRAFT-208, CRAFT-209 | Semua defect closed atau dicatat sebagai residual risk | Internal Review |
| CRAFT-213 | Audit loophole anti-internet dan integritas attempt | CRAFT-002, CRAFT-007 | Threat model, severity, dan mitigation backlog | Internal Review |
| CRAFT-214 | Finalisasi boundary enforcement attempt aktif | CRAFT-213 | Policy screen 07–11 dan boundary upload screen 12–13 | Internal Review |
| CRAFT-215 | Uji abuse case dan recovery attempt | CRAFT-213, CRAFT-214 | Abuse-case matrix dan evidence | Internal Review |
| CRAFT-216 | State-driven screen 04 — Persiapan Offline | CRAFT-202, CRAFT-209 | Step count, checklist, floating CTA, dan visual mengikuti network state | Internal Review |
| CRAFT-217 | Audit visual screen 09 — Tinjau Jawaban | CRAFT-109, CRAFT-204 | Review screen bersih pada posisi scroll 0 dan dapat discroll sampai ujung konten | Internal Review |
| CRAFT-218 | Audit visual screen 14 — Hasil Tryout | CRAFT-114, CRAFT-204 | Result screen full-bleed, tidak terpotong, dan sesuai frame Figma | Approved |
| CRAFT-219 | Rebuild screen 06 sebagai native bottom drawer | CRAFT-106, CRAFT-204 | Drawer konfirmasi native, bukan screenshot full-screen | Internal Review |
| CRAFT-220 | Rebuild ikon navigator soal screen 07–08 | CRAFT-107, CRAFT-108 | Ikon grid/list sesuai Figma, bukan karakter teks | Internal Review |
| CRAFT-221 | Kunci visual state screen 07 vs 08 | CRAFT-107, CRAFT-108, CRAFT-220 | State question navigator konsisten tanpa layout drift | Internal Review |
| CRAFT-222 | Audit framing dan state screen 12 | CRAFT-112, CRAFT-204, CRAFT-216 | Screen upload preparation stabil dari scroll 0 dan sesuai Figma | Internal Review |
| CRAFT-223 | Perbaiki delivery asset Figma | CRAFT-004, CRAFT-006 | Semua asset lokal tersedia di dev dan production preview | Approved |
| CRAFT-224 | Wire touchpoint navigator soal ke screen 09 | CRAFT-220, CRAFT-221, CRAFT-109 | Ikon grid pada screen 07/08 membuka screen 09 dengan state attempt tetap utuh | Approved |
| CRAFT-225 | Audit visual screen 11 — Subtes Berikutnya | CRAFT-111, CRAFT-204, CRAFT-223 | Screen 11 mengikuti frame Figma `8:2032` pada viewport 360 × 740 | Internal Review |
| CRAFT-226 | Audit dan perbaiki scrollability lintas screen | CRAFT-107–109, CRAFT-204, CRAFT-217 | Scroll ownership, route reset, bottom clearance, dan evidence 14 screen | Internal Review |
| CRAFT-227 | [P0] Ganti fixture soal dengan konten original bergaya UTBK | CRAFT-007, CRAFT-107, CRAFT-108 | Data-driven question fixture untuk screen 07–08 tanpa Lorem ipsum | Approved |
| CRAFT-228 | [P0] Implementasikan state jawaban dan review end-to-end | CRAFT-224, CRAFT-227 | Pilihan jawaban, ragu-ragu, navigator, review, dan save memakai state nyata | Approved |
| CRAFT-229 | [P0] Uji recovery attempt dan persistence prototype | CRAFT-202, CRAFT-203, CRAFT-228 | Reload, timer, pending sync, retry, dan recovery evidence | Approved |
| CRAFT-230 | [P0] Finalisasi boundary anti-cheat produksi | CRAFT-213, CRAFT-214, CRAFT-215 | Keputusan platform/device enforcement di luar kemampuan React prototype | Blocked |
| CRAFT-231 | Sediakan reset simulasi untuk timer dan attempt | CRAFT-007, CRAFT-229 | Kontrol reviewer untuk mengembalikan fixture ke kondisi awal tanpa state basi | Approved |
| CRAFT-232 | [P0] Auto-start persiapan konten dan gate CTA | CRAFT-102, CRAFT-103, CRAFT-201 | Persiapan paket dimulai saat screen 02 dibuka; CTA hanya aktif setelah selesai | Internal Review |

#### Evidence terbaru

- `npm run build` berhasil pada 10 Oktober 2026.
- Flow yang diuji pada `http://localhost:3000/`: mulai attempt → koneksi online terdeteksi → input dan navigasi terkunci → kembali offline → timer lanjut → online selama 25 detik → attempt terminated → `pending_sync` → upload berhasil → hasil tryout.
- Kontrol `Open network simulator` tersedia di header screen pengerjaan karena navbar utama disembunyikan pada frame Figma tersebut.
- Audit E2E menemukan network enforcement belum mencakup seluruh attempt: screen 09–11 masih dapat dipakai saat Online. Screen 05–06 dicatat sebagai pre-check UX terpisah, bukan boundary nudge anti-cheat. Detail threat model dicatat di `SECURITY_AUDIT.md`.
- Defect `screen 12 tetap 0/2 saat simulator Online` ditemukan melalui screenshot review dan diperbaiki dengan state-driven rendering.
- Verifikasi tambahan: screen 12 Online menampilkan `1/2` dan CTA aktif; screen 12 Offline menampilkan `0/2` dan CTA disabled.
- Defect `screen 04 tetap 1/2 saat simulator Offline` diperbaiki dengan state-driven step count, checklist, success styling, dan CTA.
- Browser smoke evidence: screen 08 Online menampilkan overlay `25 detik` dan disabled controls; screen 09 Online menampilkan overlay dan disabled `Kembali ke Soal`/`Simpan Hasil` controls.
- Upload recovery now has visible `uploading`, `failed`, `pending_sync`, and `Coba Lagi` states before screen 14 is reachable.
- User visual feedback for screen 04: CTA `Lanjutkan` was converted to a floating action with no full-width sticky panel. Tracked in `CRAFT-216`.
- User behavior decision for screens 04–05: changing the simulator to offline automatically advances from screen 04 to screen 05; changing it back to online on screen 05 automatically returns to screen 04. Implemented in `src/main.tsx` and verified at `360 × 740`.
- User feedback for the active online-warning overlay: add a collapsed accordion with concise instructions for turning off Wi-Fi and mobile data; opening it must not dismiss the warning or interrupt the countdown. Implemented in `NetworkOverlay` and verified with the overlay DOM state.
- User visual feedback for screen 06: the screenshot-backed modal was replaced with a semantic native bottom drawer and a localized warning illustration. Tracked in `CRAFT-219`.
- User visual feedback for screens 07–08: the text glyph `▦` was replaced with a `LayoutGrid` control with an accessible label and disabled state. Tracked in `CRAFT-220`.
- User visual feedback for screens 07–08: the two references intentionally differ by question state. Track state parity separately from browser/capture offset in `CRAFT-221`.
- User visual feedback for screen 12: navbar/logo appears cropped and the upload-preparation card sits high against the hero. The screenshot may be scrolled, so builder must verify from scroll 0 before changing geometry. Tracked in `CRAFT-222`.
- User visual feedback: screen 01 showed broken images for exam art, question-count icon, and clock icon. The supported localhost runtime now serves the tracked `public/assets/figma/` path correctly; verified in clean reload and all screen smoke checks. Tracked in `CRAFT-223`.
- User flow feedback: ikon grid pada screen 07 dan 08 adalah touchpoint menuju screen 09 `Tinjau Jawaban`. Kontrol visualnya sudah tersedia, tetapi handler navigasinya belum tersambung. Tracked in `CRAFT-224`.

#### CRAFT-224 — Question navigator menuju screen 09

- Screens: `CRAFT-107` dan `CRAFT-108` → `CRAFT-109` / nodes `8:2053`, `8:2154`, `13:3198`
- Status: `Approved`
- Owner: builder

Acceptance criteria:

- [x] Klik ikon grid dari screen 07 membuka screen 09 `Tinjau Jawaban`.
- [x] Klik ikon grid dari screen 08 membuka screen 09 `Tinjau Jawaban`.
- [x] Transisi menetapkan `attemptStatus = reviewing` dan mempertahankan jawaban, ragu-ragu, serta timer.
- [x] Saat attempt terkunci atau terminated, ikon tidak dapat membuka screen 09.
- [x] Tombol `Kembali ke Soal` dari screen 09 memiliki route yang ditentukan dan tidak selalu memaksa kembali ke screen 07 bila entry point berasal dari screen 08.
- [x] Browser smoke evidence mencakup kedua entry point serta enabled dan disabled state pada viewport 360 × 740.
- [x] `npm run build` dan `git diff --check` lulus.

Evidence: screen 07 grid → screen 09 → `Kembali ke Soal` returns to screen 07; screen 08 grid → screen 09 → `Kembali ke Soal` returns to screen 08; online mode exposes a disabled question navigator and locks the attempt controls.
- Planner review 2026-10-12: Approved after live verification of both navigator entry points, review route, return-to-origin behavior, and timer continuity at 360 × 740.

#### CRAFT-225 — Screen 11 visual parity

- Screen: `CRAFT-111` / node `8:2032` (`11 · Subtes Berikutnya`)
- Figma frame: `360 × 740`
- Status: `Internal Review`
- Owner: builder

Temuan audit terhadap source Figma:

- Header Figma memiliki frame `y=0..300`; tombol back berada di `x=8, y=16, 32×32` dan title berada di `x=56, y=16, 248×48`. Prototype perlu mengikuti posisi ini, termasuk line-height title dua baris.
- Figma menempatkan summary pada `x=12, y=82, 336×67`, lalu card `Tes selanjutnya` pada `x=12, y=165, 336×176`. Prototype saat ini menempatkan card kedua pada `top: 140px`, sehingga jarak 16 px dari summary hilang dan kedua card terlihat terlalu rapat/bertumpuk.
- Header Figma memakai pattern asset header, bukan hanya gradient dan mask yang dirender terpisah. Pattern dekoratif bagian atas dan sisi kanan perlu tetap terlihat seperti frame `8:2033`.
- Figma memakai `asset_ruanguji_backgroundpage` pada `x=0, y=604, 360×136` di area countdown dan CTA. Prototype saat ini masih memakai background datar dan shadow wrapper, sehingga area bawah belum mengikuti source.
- Footer Figma memiliki countdown pada `y=647`, progress track pada `y=672` dengan fill `84 px`, dan sticky button wrapper pada `y=676..740`. Posisi ketiganya perlu dikunci terhadap frame, bukan dihitung dari offset yang dapat bergeser.

Acceptance criteria:

- [x] Summary dan card berikutnya memiliki posisi `y=82` dan `y=165`, dengan jarak 16 px dan tanpa overlap.
- [x] Card `Tes selanjutnya` berukuran `336×176` dan struktur internalnya mengikuti instance Figma `8:2046`.
- [x] Header title dan tombol back mengikuti bounds Figma; tidak ada vertical drift pada viewport `360×740`.
- [x] Pattern header dan background bawah memakai asset lokal yang sesuai dari Figma, termasuk `result-bg.svg` untuk area `y=604..740`.
- [x] Countdown, progress track/fill, sticky wrapper, dan CTA berada pada bounds `y=647`, `y=672`, dan `y=676` sesuai frame.
- [x] State disabled saat attempt terkunci tetap terlihat sesuai desain dan tidak menggeser layout.
- [x] Browser evidence screenshot full viewport screen 11 tersedia pada `360×740`; `npm run build` dan `git diff --check` lulus.

Evidence: screen 11 was inspected at `http://localhost:3000/` in offline and locked online states. The offline capture shows the two-line header, 16 px card gap, local header/bottom patterns, and fixed footer coordinates; the online capture shows the disabled back and CTA state without layout shift.

Scope note: screen 11 adalah **preview-only** untuk menunjukkan transisi ke subtes berikutnya. Prototype tidak perlu mengimplementasikan soal, state, atau flow subtes kedua.

#### CRAFT-226 — Audit dan perbaiki scrollability lintas screen

- Scope: semua screen `01–14`, dengan fokus defect pada `07`, `08`, dan `09`
- Target viewport: `360 × 740`, mock browser diabaikan
- Status: `Internal Review`
- Owner: builder

Hasil audit runtime pada `http://localhost:4173/`:

| Screen | Hasil | Bukti runtime | Keputusan |
| --- | --- | --- | --- |
| 01 | Muat dalam frame | `.screen-content` `610/610`, tidak ada overflow konten | Tidak perlu perubahan scroll |
| 02 | Muat dalam frame | `.screen-content` `610/610` | Tidak perlu perubahan scroll |
| 03 | Muat dalam frame | `.screen-content` `610/610` | Tidak perlu perubahan scroll |
| 04 | Scroll halaman bekerja | `document.scrollHeight=1105`, guide terakhir berada di bawah CTA floating dan dapat dicapai | Pertahankan, tambahkan regression check |
| 05 | Muat dalam frame | `.screen-content` `610/610` | Tidak perlu perubahan scroll |
| 06 | Fixed modal | `.start-modal-layer` `714/714`, drawer tidak overflow | Fixed sesuai intent, jangan dipaksa scroll |
| 07 | **Fixed** | Document scroll owner; `.question-one` is `1011px` high and the passage ends before the fixed footer at maximum scroll | Verified with top reset and bottom gesture |
| 08 | **Fixed** | Same document scroll contract and geometry as screen 07; route transition resets `window.scrollY` to `0` | Verified through the shared question component |
| 09 | **Fixed** | Internal `.review-content` scroll owner; `scrollHeight=864`, `clientHeight=680`, max `scrollTop=184`; review groups end at `y=626` and fixed actions begin at `y=642` | 16 px bottom clearance at maximum scroll |
| 10 | Fixed confirmation | `.save-modal-layer` `740/740`; underlay terpotong secara sengaja di balik modal | Verifikasi drawer penuh, jangan ubah underlay sebagai workaround |
| 11 | Fixed Figma frame | `.next-subtest-screen` `740/740`, footer dan CTA berada di frame | Tidak perlu scroll |
| 12 | Internal scroll bekerja | `.upload-prep-screen` `scrollHeight=793`, `clientHeight=680`, CTA sticky | Tambahkan assertion scroll maksimum dan clearance CTA |
| 13 | Muat dalam frame | Card berakhir sekitar `y=522`, CTA `y=672..740` | Tidak perlu perubahan scroll |
| 14 | Fixed result | Konten utama berakhir `y=629`, CTA `y=638..706`; selisih `5px` berasal dari wrapper/shadow, bukan konten utama | Pertahankan fixed; verifikasi tidak ada teks terpotong |

Temuan lintas screen:

- Scroll contract sekarang eksplisit: screen 04 dan 07–08 memakai document scroll, screen 09 dan 12 memakai internal scroll, dan fixed screens keep their frame height.
- Route changes reset `window.scrollY` and the internal review/upload/question containers to `0` before capture.
- Menghapus `overflow:hidden` secara global tidak cukup. Builder harus menentukan satu scroll owner per screen dan menjaga fixed/sticky CTA tetap berada di atas layer konten.

Task untuk builder:

- [x] Buat scroll contract per screen: `fixed`, `document`, atau `internal`; jangan memakai kombinasi accidental antara shell, content, dan child.
- [x] Perbaiki screen 07 dan 08 agar seluruh area soal dapat dilihat sampai bawah through document scroll, with fixed footer clearance.
- [x] Perbaiki screen 09 agar `review groups` terakhir dapat dicapai sampai `scrollTop = scrollHeight - clientHeight`.
- [x] Beri bottom clearance yang cukup untuk `question-sticky` dan `.review-actions`; pada posisi scroll maksimum tidak menutupi teks atau group terakhir.
- [x] Reset `window/document` scroll and all screen scroll containers to `0` on each route transition.
- [x] Tambahkan smoke assertions for scroll owner, `scrollHeight`, `clientHeight`, `scrollTop` awal, maximum position, and last-element visibility.
- [x] Capture top and bottom browser states for screens 07–09 and record runtime metrics; screen 12 existing evidence covers internal scrolling.
- [x] Jalankan `npm run build` dan `git diff --check` setelah revisi.

Acceptance criteria:

- [x] Setiap screen memiliki scroll behavior yang sengaja dipilih dan terdokumentasi; tidak ada konten produk yang terpotong hanya karena parent `overflow:hidden`.
- [x] Screen 07, 08, dan 09 dapat mencapai elemen konten terakhir melalui gesture scroll yang sesuai.
- [x] Screen 04 dan 12 tetap dapat mencapai konten panduan terakhir after the shared shell changes.
- [x] CTA fixed/sticky/floating tidak menutup konten terakhir pada posisi scroll maksimum.
- [x] Direct-open, menu navigation, dan transisi flow membuka screen pada scroll position yang konsisten.
- [x] Evidence full viewport captures and runtime metrics are available for planner review before approval.
- CRAFT-227 top and bottom evidence: `evidence/CRAFT-227-screen07.png`, `evidence/CRAFT-227-screen08.png`, `evidence/CRAFT-227-screen07-bottom.png`, and `evidence/CRAFT-227-screen08-bottom.png`.
- Passage copy now uses the available card width, wraps without horizontal clipping, and resets to the top when switching between screen 07 and screen 08.

#### CRAFT-227 — Fixture soal original bergaya UTBK

- Scope: screen 07–08 dan data yang dipakai screen 09
- Status: `Approved`
- Priority: `P0`
- Owner: builder

Acceptance criteria:

- [x] Lorem ipsum diganti dengan passage dan pertanyaan original yang terasa realistis untuk latihan bergaya UTBK.
- [x] Soal 1 dan soal 2 memiliki content, opsi, metadata, dan state yang dapat dibedakan.
- [x] Fixture disimpan sebagai data terstruktur, bukan hardcode markup per screen.
- [x] Tidak menyalin soal UTBK asli dari internet tanpa sumber berlisensi atau izin penggunaan.
- [x] Copy, panjang teks, dan opsi cukup realistis untuk menguji scroll screen 07–08.
- Planner review 2026-10-12: Approved after reviewing top/bottom evidence for screens 07–08. Horizontal clipping and nested-scroll carryover were fixed in `8847467`; `npm run build` and `git diff --check` pass.

#### CRAFT-228 — State jawaban dan review end-to-end

- Scope: screen 07–10, dengan navigator screen 07–08 menuju screen 09
- Status: `Approved`
- Priority: `P0`
- Owner: builder

Acceptance criteria:

- [x] Peserta dapat memilih dan mengganti jawaban pada screen 07–08.
- [x] Tombol `Ragu-ragu` mengubah state dan state tersebut terlihat pada navigator/review.
- [x] Navigasi soal mempertahankan jawaban dan penanda ragu-ragu.
- [x] Screen 09 menghitung soal dijawab, dilewati, dan ragu-ragu dari state aktual; tidak ada angka hardcoded.
- [x] Screen 10 menampilkan ringkasan yang sama dengan screen 09 dan menyimpan state saat dikonfirmasi.
- [x] State tetap konsisten saat screen 09 dibuka dari screen 07 maupun 08.
- [x] Online lock tetap mencegah perubahan jawaban dan transisi review/save sesuai policy attempt.

- Evidence: `evidence/CRAFT-228-answer-replaced.png`, `evidence/CRAFT-228-doubtful-navigator.png`, `evidence/CRAFT-228-review-from-screen07.png`, `evidence/CRAFT-228-review-from-screen08.png`, `evidence/CRAFT-228-save-summary.png`, and `evidence/CRAFT-228-online-locked.png` at 360 × 740.
- Planner review 2026-10-12: Approved after reviewing answer replacement, doubtful marker, both review origins, dynamic save summary, online lock, and live timer consistency. `npm run build` and `git diff --check` pass.

#### CRAFT-229 — Recovery attempt dan persistence prototype

- Scope: active attempt screen 07–11 dan upload preparation screen 12–13
- Status: `Approved`
- Priority: `P0`
- Owner: builder

Acceptance criteria:

- [x] Reload saat mengerjakan tidak menghapus screen, jawaban, ragu-ragu, timer, network state, atau attempt status.
- [x] Perubahan Online/Offline setelah reload tetap mengikuti enforcement dan warning policy.
- [x] Attempt terminated tetap masuk `pending_sync` dan tidak dapat kembali mengedit jawaban.
- [x] Upload gagal mempertahankan pending state dan retry berhasil tanpa duplicate submission di simulasi.
- [x] Evidence mencakup reload active attempt, reload terminated attempt, upload failure, dan retry.
- [x] Batas persistence client-side dan residual risk produksi dicatat, bukan dianggap sebagai trust boundary.

- Evidence: `evidence/CRAFT-229-reload-active.png`, `evidence/CRAFT-229-reload-terminated.png`, `evidence/CRAFT-229-upload-failure.png`, and `evidence/CRAFT-229-retry-success.png` at 360 × 740.
- Persistence note: sessionStorage supports prototype recovery only. It is user-editable, browser-scoped, and can be cleared or tampered with; production enforcement and submission integrity require a trusted device/runtime and server-side validation.
- Planner review 2026-10-12: Approved after reviewing active/terminated reload, failed upload, retry success, persisted warning/upload state, and single-run upload guard. `npm run build` and `git diff --check` pass.

#### CRAFT-230 — Boundary anti-cheat produksi

- Scope: keputusan platform/device untuk implementasi produksi, bukan perluasan React prototype
- Status: `Blocked`
- Priority: `P0`
- Owner: product/platform/security

Acceptance criteria:

- [ ] Diputuskan apakah enforcement produksi memakai native kiosk, MDM/device management, proctoring, atau kombinasi.
- [ ] Didefinisikan apakah targetnya hanya mendeteksi koneksi atau benar-benar membatasi Wi-Fi, mobile data, VPN, tab, aplikasi lain, dan device kedua.
- [ ] Prototype React secara eksplisit diberi label sebagai simulasi state, bukan jaminan anti-cheat device-level.
- [ ] Requirement backend untuk server time, attempt lease, audit event, dan answer integrity dicatat sebelum production implementation.

#### CRAFT-231 — Reset simulasi untuk timer dan attempt

- Scope: menu demo/reviewer dan state persistence prototype
- Status: `Approved`
- Priority: `P1` (developer/reviewer productivity; bukan fitur peserta)
- Owner: builder

Acceptance criteria:

- [x] Menu demo memiliki aksi `Reset Simulasi` yang terlihat jelas sebagai kontrol preview, bukan bagian dari UI peserta.
- [x] Reset mengembalikan timer ke durasi fixture awal yang didefinisikan oleh satu constant/config, bukan angka yang tersebar di komponen.
- [x] Reset juga membersihkan attempt status, network warning, jawaban, penanda ragu-ragu, sync/upload status, dan progress download agar state tidak saling mewarisi.
- [x] Reset menghapus snapshot `sessionStorage` yang relevan lalu mengembalikan prototype ke entry state yang ditentukan untuk review.
- [x] Setelah reload, prototype tetap berada pada kondisi fixture awal dan timer tidak kembali ke nilai `0` karena state lama.
- [x] Kontrol reset tidak dapat diakses melalui flow peserta dan tidak dianggap sebagai mekanisme reset attempt produksi.
- [x] Evidence mencakup reset dari kondisi timer berjalan, timer `0`, warning Online, terminated, dan pending upload.
- [x] Jalankan `npm run build` dan `git diff --check` setelah implementasi.

- Evidence: `evidence/CRAFT-231-reset-running.png`, `evidence/CRAFT-231-reset-terminated.png`, `evidence/CRAFT-231-reset-warning-online.png`, and `evidence/CRAFT-231-reset-pending-upload.png` at 360 × 740.
- Planner review 2026-10-12: Approved after reviewing all four reset states, the reviewer-only menu boundary, storage clearing, timer reset, and fresh reload state. `npm run build` and `git diff --check` pass.

#### CRAFT-232 — Auto-start persiapan konten dan gate CTA

- Scope: screen 02–03, lifecycle download paket, dan CTA menuju persiapan offline
- Status: `Internal Review`
- Priority: `P0`
- Owner: builder setelah keputusan UX dikonfirmasi
- Source feedback: user discussion dan referensi visual screen `6:419` / `7:978`

Keputusan UX yang sedang diajukan:

- Saat screen 02 dibuka, proses persiapan konten langsung dimulai tanpa klik tambahan dari user.
- State progress screen 03 tetap dipertahankan sebagai state visual/behavior, tetapi dipicu otomatis oleh lifecycle screen 02.
- CTA menggunakan label `Lanjutkan` dan disabled selama status `downloading`.
- Setelah status `completed`, prototype langsung masuk ke screen 04, yaitu panduan mematikan koneksi internet.
- Screen 04 memiliki CTA sticky/floating berlabel TO `Kerjakan Tryout`; CTA disabled saat koneksi masih Online dan enabled saat koneksi sudah Offline.
- Loading copy menggunakan bahasa seperti `Mempersiapkan konten untukmu`; kata `download` tidak perlu menjadi headline/loading copy utama.
- Progress harus terlihat agar user memahami proses sedang berjalan dan mengapa CTA belum dapat digunakan.
- Jika halaman di-reload saat proses berjalan, behavior persistence atau restart download harus ditetapkan sebelum dianggap selesai.

Open decision sebelum implementasi:

- Apakah screen 02 dan screen 03 tetap dipresentasikan sebagai dua route/frame terpisah, atau satu screen dengan state berubah in-place? Rekomendasi prototype: satu entry screen dengan state progress agar tidak ada flicker, sambil tetap mempertahankan mapping state ke frame Figma.
- Apakah screen 05 `Siap Mengerjakan` tetap dipertahankan sebagai frame review terpisah, atau CTA pada screen 04 langsung memulai tryout setelah koneksi Offline? Rekomendasi: pertahankan frame 05 untuk parity/direct review, tetapi flow utama dapat memakai CTA sticky screen 04 sebagai gate menuju kesiapan.
- Apakah download gagal memiliki retry/error state pada prototype, atau cukup dicatat sebagai residual risk untuk milestone ini?

Acceptance criteria:

- [x] Masuk ke screen 02 otomatis memulai persiapan konten; tidak ada CTA `Download Soal` yang harus ditekan.
- [x] Progress/loading terlihat dan CTA `Lanjutkan` tidak dapat digunakan sebelum status `completed`.
- [x] Setelah 100%, flow otomatis masuk ke screen 04 dan menampilkan CTA sticky/floating `Kerjakan Tryout`.
- [x] CTA `Kerjakan Tryout` disabled saat Online dan enabled saat Offline; perubahan mode simulasi memperbarui CTA secara langsung.
- [ ] Reload, direct jump reviewer, dan reset simulasi tidak meninggalkan progress atau status download yang basi.
- [x] State `downloading` dan `completed` memiliki evidence pada viewport target `360 × 740`; behavior gagal/retry masih menjadi open item.
- [x] Loading copy memakai `Mempersiapkan konten untukmu` atau copy setara yang tidak menjadikan kata `download` sebagai headline.
- [x] Copy dan visual progress tidak mengesankan proses ringan; ukuran paket atau durasi simulasi dicatat sebagai asumsi bila data produk belum tersedia.
- [x] Jalankan `npm run build` dan `git diff --check` setelah implementasi.

Evidence implementasi:

- Screen 02 pada `http://127.0.0.1:3000/`: progress dimulai otomatis pada `0%`/`20%` dan CTA `Lanjutkan` disabled.
- Setelah progress `100%`: otomatis masuk screen 04; CTA `Kerjakan Tryout` disabled saat Online.
- Toggle simulasi ke Offline: step count berubah menjadi `2/2`, CTA aktif, dan klik CTA membuka modal konfirmasi mulai tryout.
- Verification: `npm run build` dan `git diff --check` berhasil.

#### CRAFT-206 — Final cleanup dan handoff

- Scope: prototype handoff after the visual parity and interaction audit
- Status: `Internal Review`

Checklist:

- [x] Vite development and preview configuration use port `3000` by default.
- [x] All 44 Figma assets are tracked under `public/assets/figma/` and included in the production build.
- [x] Question navigator transitions and screen 11 geometry are implemented and committed in `bce367b`.
- [x] `npm run build` passes.
- [x] `git diff --check` passes.
- [x] Browser review remains available at `http://localhost:3000/` with the 360 × 740 target frame.

Handoff note: existing documentation and evidence edits remain in the working tree for planner review; no unrelated user files were reset or discarded.

#### CRAFT-208 — Automated smoke test state dan flow

- Scope: `TEST_PLAN.md` state matrix `SMOKE-001`–`SMOKE-014`
- Status: `Internal Review`

Evidence:

- [x] Build gate passes with `npm run build`.
- [x] Runtime root and representative Figma assets return HTTP 200 on `http://localhost:3000/`.
- [x] Screen 07 grid opens screen 09 and preserves the attempt timer; screen 09 returns to screen 07.
- [x] Screen 08 grid opens screen 09 and returns to screen 08.
- [x] Online attempt state shows the enforcement overlay and disabled navigator/actions.
- [x] Screen 11 offline and locked online states were captured at the 360 × 740 target viewport.
- [x] `git diff --check` passes.

The broader state matrix evidence remains in `TEST_PLAN.md`; planner review is still required before changing this task to `Approved`.

#### CRAFT-210 — Regression terakhir dan residual risk

- Status: `Internal Review`

Regression result:

- [x] `CRAFT-217` and `CRAFT-226` were re-tested after the scroll ownership and route reset changes; both are ready for planner internal review.
- [x] `npm run build` passes after the navigator, screen 11, and asset delivery changes.
- [x] `git diff --check` passes.
- [x] Port `3000` serves the app and representative static assets with HTTP 200.
- [x] Attempt enforcement, upload recovery, question navigator routing, and screen 11 enabled/locked states were rechecked in the browser.
- [x] Platform and production integrity risks remain listed in `SECURITY_AUDIT.md` (`L-001`–`L-009`) instead of being treated as resolved by this web prototype.

Residual risk: exact pixel sign-off against source Figma remains planner-owned where the connected design-context tool was unavailable; the affected review notes identify the remaining comparison step.

#### CRAFT-215 — Abuse-case dan recovery attempt

- Status: `Internal Review`
- Matrix: `ABUSE_CASE_MATRIX.md`

Results:

- [x] Active-attempt online detection locks question, review, save, and next-subtest controls and starts the 25-second warning.
- [x] Returning Offline clears the warning and resumes the timer; remaining Online time terminates the attempt and routes to upload preparation.
- [x] Question navigator routing respects the same lock guard and preserves the originating question on return.
- [x] Upload failure keeps `pending_sync` and exposes retry; successful retry reaches the result state.
- [x] Client persistence and reload recovery are covered by the attempt snapshot implementation and `CRAFT-203` evidence.
- [x] Device-level and trust-boundary risks remain explicit residual risks in `SECURITY_AUDIT.md`.

#### REVIEW-011 — Figma asset delivery and screen 12 framing

- Tasks: `CRAFT-004`, `CRAFT-222`, `CRAFT-223`
- Viewport: `360 × 740`, production preview at `http://127.0.0.1:4173/`
- Status: `Approved`
- Evidence: `evidence/CRAFT-223-screen01.png`, `evidence/CRAFT-222-screen12-online.png`, `evidence/CRAFT-222-screen12-offline.png`, `evidence/CRAFT-222-screen13-online.png`

Results:

- Selected `public/assets/figma/` as the static delivery directory; product code consistently requests `/assets/figma/*`. All 44 local Figma assets are present in the production `dist/assets/figma/` output and are served with HTTP 200 by Vite preview.
- Checked `naturalWidth > 0` for every rendered image on all 14 screens in a fresh Chrome profile. No broken images were found. CSS hero and review mask URLs also resolve from the production preview.
- Screen 12 capture from scroll top shows the navbar fully within the frame, full-bleed hero, and the upload card at the 12 px inset. The preparation content is 793 px tall inside a 680 px view, so it now scrolls internally while the CTA remains at the bottom of the 360 × 740 frame.
- Screen 12 state capture: Online renders `1/2`, green connection checklist, and enabled `Lanjutkan`; Offline renders `0/2` and disabled CTA.
- Screen 13 comparison remains at the bottom of the frame with its short upload card, enabled only while Online. Upload card and CTA state remain distinct from screen 12.
- Evidence was captured from the production build at `scrollTop = 0`; guide content was also inspected at the lower scroll position. No source-node Figma connection was available in this session, so exact pixel-by-pixel coordinates remain for planner visual review.
- Verification: `npm run build`, `git diff --check`, production preview asset HTTP checks, and 14-screen Chrome image sweep passed.
- Additional live verification: clean reload at `http://localhost:4173/` rendered screen 01 assets, and all 14 screen image checks returned `complete && naturalWidth > 0`.
- Runtime note: use `http://localhost:4173/` for the Vite prototype. The `file://` tab is not a supported runtime and can make root asset URLs appear broken.

#### REVIEW-012 — Screen 04, 06, and question state follow-up

- Tasks: `CRAFT-216`, `CRAFT-219`, `CRAFT-220`, `CRAFT-221`
- Viewport: `360 × 740`, production preview at `http://127.0.0.1:4173/`
- Status: `Internal Review`
- Evidence: `evidence/CRAFT-216-screen04-online.png`, `evidence/CRAFT-216-screen04-offline.png`, `evidence/CRAFT-216-screen04-online-scroll-bottom.png`, `evidence/CRAFT-219-screen06.png`, `evidence/CRAFT-221-screen07.png`, `evidence/CRAFT-221-screen07-pagination.png`, `evidence/CRAFT-221-screen07-online-locked.png`, `evidence/CRAFT-221-screen08.png`, `evidence/CRAFT-221-screen08-pagination.png`, `evidence/CRAFT-221-screen08-online-locked.png`

Results:

- Screen 04 CTA floats at x=24, y=672, width=312 px, with a 24 px bottom margin. Online is disabled; Offline is enabled. Scrolling to the bottom keeps the CTA in place and brings the final guide copy above it.
- Screen 06 uses a semantic dialog and separate illustration asset. Close, `Kembali`, and `Kerjakan Sekarang` were each activated with Enter and reached their correct screens.
- Screen 07 and 08 share identical geometry for header, pagination, instruction, passage, and sticky navigation. Question index, answered/current states, and offline label follow their respective fixture. Online mode shows the enforcement overlay and disables controls on both screens.
- Planner pixel comparison against nodes `8:1203`, `37:10312`, `8:2053`, and `8:2154` remains pending because the Figma design-context tool is unavailable in this builder session.
- Verification: `npm run build` and `git diff --check` passed.

#### REVIEW-010 — Figma asset delivery regression

- Scope: all screens using `/assets/figma/*`, initially observed on screen 01
- Evidence: screenshot user `Screenshot 2026-10-10 at 7.24.24 AM.png`
- Status: `Internal Review`

Temuan:

- [x] `book-pencil.svg`, `question-count.svg`, dan `clock.png` tampil utuh di exam card pada clean production preview.
- [x] Seluruh 44 asset tersedia di `dist/assets/figma/` setelah build.
- [x] Runtime memakai satu strategi static public path: `/assets/figma/...` dari `public/assets/figma/`.
- [x] Sweep 14 screen tidak menemukan image dengan `naturalWidth === 0`.

Task untuk builder:

- [x] Pilih strategi static public path yang konsisten dengan URL `/assets/figma/...`.
- [x] Pastikan semua 44 asset Figma masuk ke hasil build dan tersedia melalui production preview.
- [x] Periksa `naturalWidth > 0` pada seluruh gambar di 14 screen dan cek URL CSS mask/background terhadap preview.
- [x] Uji direct-open pada clean Chrome profile dan pindah screen melalui fixture tanpa cache tab lama.
- [x] Simpan screenshot screen 01 dan screen 12/13, lalu jalankan `npm run build` dan `git diff --check`.

Acceptance criteria:

- [x] Tidak ada broken image icon pada seluruh 14 screen.
- [x] Asset exam art, question count, clock, header, alert, guide, upload, review, dan result tampil dari local source.
- [x] `dist/` dan preview production memuat semua asset yang dirujuk.
- [x] Verifikasi lulus pada clean browser session.

#### REVIEW-009 — Screen 14 re-review

- Screen: `CRAFT-114` / `CRAFT-218` / node `11:2632`
- Evidence: live browser capture at `http://localhost:4173/`, viewport `360 × 740`
- Status: `Approved`

Hasil review:

- [x] Navbar dan hero tampil utuh tanpa clipping.
- [x] Profile card berada di posisi yang sesuai dan tidak menutupi title hero.
- [x] Waiting card, illustration, heading, dan tanggal tidak overflow.
- [x] Summary card menampilkan tiga metrik dan waktu pengerjaan dengan alignment konsisten.
- [x] Sticky CTA berada di bawah tanpa menutup summary content.
- [x] Tidak terlihat overlap, horizontal overflow, atau band kosong yang tidak diharapkan.
- [x] `npm run build` berhasil.
- [x] `git diff --check` berhasil.
- Review evidence after the parity pass: screen 06 drawer, screen 07/08 navigator states, screen 09 clean top frame, screen 12 online/offline framing, and screen 14 full-bleed result were inspected in the local browser at `360 × 740`.

#### REVIEW-002 — Screen 09 visual parity

- Screen: `CRAFT-109` / node `13:3198`
- Evidence: screenshot user `Screenshot 2026-10-10 at 6.27.35 AM.png`
- Target viewport: `360 × 740`, posisi scroll `0`
- Status: `Internal Review`

Temuan yang terlihat:

- [x] Capture dimulai dari top-level viewport yang bersih; route effect resets window and screen containers to `0`.
- [ ] Hero, judul, alert, dan card review perlu diverifikasi ulang terhadap koordinat frame Figma; screenshot saat ini hanya menampilkan sebagian screen sehingga tidak membuktikan posisi sticky action, subtitle, dan review groups.
- [ ] Alert merah terlihat terlalu dominan terhadap card peach: cek kembali tinggi, padding, radius, border, dan hubungan jarak alert ke card detail berdasarkan frame `13:3198`.
- [ ] Judul alert dan copy kedua harus tetap berada dalam batas inner alert pada lebar `360px`; jangan mengandalkan `white-space: nowrap` bila menyebabkan clipping pada device atau zoom berbeda.
- [ ] Isi card detail di bawah alert perlu diuji sampai bagian metrik, timer, info banner, subtitle, dan group soal; screenshot parsial belum cukup untuk menyatakan screen pixel-perfect.
- [x] Sticky action bar sempat menempel ke sisi kiri viewport karena rule `.screen-content > .review-actions` menimpa positioning center; rule sudah diperbaiki agar sejajar dengan frame app 360 px.
- [x] `.review-content` now owns internal scrolling; the final review group is visible at maximum scroll with 16 px clearance before the fixed actions.

Task untuk builder:

- [x] Render screen 09 from the active question navigator and from the review menu; both paths reset to `scrollTop = 0`.
- [ ] Bandingkan screenshot dengan node Figma `13:3198` pada viewport `360 × 740`; catat koordinat top/left/width/height untuk hero, title, outer card, alert, detail card, sticky action, subtitle, dan review groups.
- [x] Removed the inherited scroll offset source without changing the screen 10 modal layout.
- [x] Full viewport top and bottom browser captures were reviewed for the normal review state; the save action remains fixed and visible.
- [x] Browser verification confirms sticky actions share the app frame's `left` and `width` at `360 × 740`.
- [x] Tested `scrollTop = 0` through `scrollTop = scrollHeight - clientHeight`; subtitle and both review groups are reachable.
- [x] Fixed actions remain available and do not cover the last group at the scroll maximum.
- [x] `npm run build` and `git diff --check` pass after the revision.

Acceptance criteria:

- [x] Tidak ada inherited offset or unexplained blank band at the top viewport.
- [x] Screen 09 remains stable when opened from the menu or from the question navigator.
- [x] Main screen 09 elements remain visible without the fixed actions covering the final group.
- [x] Screen 09 scrolls through the full review content to its maximum scroll position.
- [x] Fixed actions do not cover the final content at the scroll maximum.
- [x] Full viewport browser captures and runtime metrics are available for planner review before approval.

#### REVIEW-003 — Screen 14 visual parity

- Screen: `CRAFT-114` / node `11:2632`
- Evidence: screenshot user `Screenshot 2026-10-10 at 6.36.15 AM.png`
- Target viewport: `360 × 740`, posisi scroll `0`
- Status: `Approved` after `REVIEW-009`

Temuan yang terlihat:

- [ ] Capture menunjukkan navbar/logo hanya sebagian di tepi atas. Verifikasi apakah ini scroll offset/cropping saat capture atau layout screen; hasil akhir harus punya top viewport konsisten dan tidak memotong navbar maupun hero.
- [ ] Latar biru hero terlihat inset dari tepi kiri/kanan area aplikasi, sementara frame result tampak dimaksudkan sebagai bidang full-bleed. Cocokkan batas hero dan background dengan node Figma `11:2632`; jangan menebak berdasarkan crop screenshot saja.
- [ ] Profile card tampak menumpuk di batas bawah hero dengan overlap yang perlu dicocokkan terhadap frame sumber, termasuk x/y, lebar, tinggi, radius, dan shadow.
- [ ] Evidence berhenti di bagian awal card hasil; waiting illustration, rangkuman skor, waktu pengerjaan, serta sticky CTA tidak terlihat. Full-screen review diperlukan sebelum screen dapat dinyatakan rapi.
- [ ] Periksa konsistensi lebar app shell, padding horizontal, dan tinggi scroll container; screenshot harus diambil dari awal halaman pada viewport `360 × 740` tanpa browser mock.

Task untuk builder:

- [ ] Buka screen 14 dari menu dan melalui transisi upload berhasil, lalu reset semua scroll container ke posisi `0`.
- [ ] Bandingkan terhadap node Figma `11:2632`; catat koordinat hero/background, title, profile card, waiting card, summary, dan sticky CTA.
- [ ] Perbaiki inset/background bleed dan profile overlap hanya berdasarkan ukuran/relasi yang terverifikasi pada frame Figma.
- [ ] Capture full viewport dari top dan satu capture lanjutan yang memperlihatkan summary serta CTA; pastikan tidak ada konten tertutup atau terpotong.
- [ ] Jalankan `npm run build` dan `git diff --check` setelah revisi.

Acceptance criteria:

- [ ] Header/hero tidak terpotong dan background mengikuti lebar frame Figma.
- [ ] Profile card dan result content punya posisi serta overlap yang sama dengan frame sumber.
- [ ] Waiting state, rangkuman, waktu pengerjaan, dan CTA terlihat/terjangkau tanpa overlap pada target viewport.
- [ ] Evidence full viewport dari screen direct-open dan flow upload tersedia untuk review planner sebelum status diputuskan `Approved` atau `Changes Requested`.

#### REVIEW-004 — Screen 04 floating CTA

- Screen: `CRAFT-104` / `CRAFT-216` / node `8:1203`
- Evidence: screenshot user `Screenshot 2026-10-10 at 6.37.13 AM.png`
- Target viewport: `360 × 740`
- Status: `Internal Review`

Temuan:

- [x] CTA `Lanjutkan` tampil sebagai tombol floating dengan margin dari sisi viewport dan tanpa panel selebar frame.
- [x] Online tetap disabled dan offline enabled; kedua state terlihat di posisi yang sama.
- [x] Isi panduan terakhir dapat dicapai dengan scroll dan tidak tertutup CTA.
- [x] Perubahan koneksi otomatis memindahkan screen 04 ke screen 05 saat offline, lalu mengembalikan screen 05 ke screen 04 saat online.

Task untuk builder:

- [x] Wrapper memakai tombol floating berukuran 312 px dengan inset horizontal 24 px dan jarak bawah 24 px pada viewport target.
- [x] Validasi posisi pada scroll `0` dan scroll ke bawah: CTA tetap pada viewport sementara teks panduan terakhir dapat dicapai.
- [x] Online disabled dan offline enabled; radius, shadow, dan kontras diperiksa.
- [x] Capture kedua state serta build dan whitespace check berhasil.

Acceptance criteria:

- [x] Tombol terlihat floating dengan margin 24 px, bukan sebagai panel putih selebar viewport.
- [x] CTA tidak menutup copy panduan terakhir dan dapat ditekan pada state offline.
- [x] State disabled/online dan enabled/offline sesuai behavior yang disepakati.
- [x] Screenshot kedua state tersedia untuk review planner.

#### REVIEW-005 — Screen 06 native bottom drawer

- Screen: `CRAFT-106` / `CRAFT-219` / node `37:10312`
- Evidence: screenshot user `Screenshot 2026-10-10 at 6.38.23 AM.png`
- Target viewport: `360 × 740`; mock browser dan elemen background overlay diabaikan
- Status: `Internal Review`

Temuan:

- [x] Screen 06 memakai struktur DOM native dan tidak lagi merender screenshot modal penuh.
- [x] Drawer berisi close control, ilustrasi warning terpisah, heading, copy, emphasis orange, dan dua CTA.
- [x] Backdrop adalah layer terpisah dari konten drawer.
- [x] Drawer stabil pada viewport target dan seluruh konten terlihat.

Task untuk builder:

- [x] `StartTryoutModal` menggunakan `start-modal-layer`, `start-modal-backdrop`, dan `start-modal-sheet`.
- [x] Drawer hanya memakai asset ilustrasi warning yang terpisah, bukan screenshot full-screen.
- [x] Seluruh label dan kontrol drawer dibangun sebagai elemen DOM yang semantic.
- [x] Close dan `Kembali` menuju screen 05; `Kerjakan Sekarang` memulai attempt dan masuk screen 07.
- [x] Close button punya accessible label; Enter mengaktifkan close, `Kembali`, dan `Kerjakan Sekarang` dalam browser.
- [x] Screenshot viewport clean tersedia; build dan `git diff --check` berhasil.

Acceptance criteria:

- [x] Tidak ada `<img>` screenshot full-screen sebagai layout screen 06.
- [x] Drawer dan controls adalah DOM; backdrop layer terpisah.
- [x] Close, `Kembali`, dan `Kerjakan Sekarang` memiliki target terpisah dan interaksi click berfungsi.
- [x] Drawer tidak memiliki overflow atau menutup CTA.
- [x] Screenshot clean dan keyboard activation evidence tersedia untuk close dan kedua CTA.

#### REVIEW-006 — Screen 07–08 question navigator icon

- Screen: `CRAFT-107` dan `CRAFT-108` / nodes `8:2053` dan `8:2154`
- Evidence: screenshot user `Screenshot 2026-10-10 at 6.39.40 AM.png`
- Target viewport: `360 × 740`
- Status: `Internal Review`

Temuan:

- [x] Glyph `▦` diganti dengan icon component `LayoutGrid` dari icon library project.
- [x] Control punya ukuran box 32 × 32 px dan accessible label yang sama pada kedua screen.
- [x] Full viewport dan crop pagination tersedia untuk kedua screen.

Task untuk builder:

- [x] Gunakan `LayoutGrid` dari icon library yang sudah dipakai project.
- [x] Ukuran, stroke, alignment, dan hit target konsisten di screen 07 dan 08; pixel match menunggu planner review.
- [x] Uji screen 07/08 offline dan state online terkunci.
- [x] Capture full viewport dan crop pagination untuk kedua screen.
- [x] Jalankan `npm run build` dan `git diff --check`.

Acceptance criteria:

- [x] Ikon memakai vector icon, bukan glyph teks.
- [ ] Bentuk dan posisi exact terhadap node Figma menunggu planner review.
- [x] Control memiliki accessible label dan hit target 32 × 32 px.
- [x] Pagination card tidak clipping dan geometry kedua screen identik.

#### REVIEW-007 — Screen 07 vs 08 state parity

- Screens: `CRAFT-107` dan `CRAFT-108` / nodes `8:2053` dan `8:2154`
- Evidence: screenshots user `Screenshot 2026-10-10 at 6.40.34 AM.png` dan `Screenshot 2026-10-10 at 6.40.41 AM.png`
- Target viewport: `360 × 740`; mock browser/capture chrome diabaikan
- Status: `Internal Review`

Perbedaan yang memang berasal dari state:

- [x] Screen 07 menampilkan `Soal 1/4`; screen 08 menampilkan `Soal 2/4`.
- [x] Screen 07: nomor 1 current/orange, nomor 2–4 belum dijawab.
- [x] Screen 08: nomor 1 answered/blue, nomor 2 current/orange, nomor 3–4 belum dijawab.
- [x] Label koneksi berbeda sesuai fixture/state: `Mode Offline Aktif` dan `Mengerjakan Offline`.
- [x] Bounds timer dan elemen utama identik di kedua state.
- [x] Ikon grid, pagination, header, dan spacing identik di kedua state.

Perbedaan yang bukan target perubahan layout:

- [x] Kedua state dirender pada viewport bersih `360 × 740`, scroll `0`, dengan geometry identik.
- [ ] Pixel alignment terhadap screenshot sumber Figma menunggu planner visual review.

Task untuk builder:

- [ ] Jadikan screen 07 dan 08 dua fixture state dari komponen question screen yang sama.
- [ ] Pastikan transition 07 → 08 memperbarui question index, pagination status, label offline, dan content state tanpa mengubah geometry global.
- [ ] Capture side-by-side/full viewport untuk state 1 dan state 2, lalu tambahkan close-up pagination sebagai evidence.
- [ ] Uji state yang sama saat network enforcement disabled/locked agar disabled styling tidak menghapus perbedaan current vs answered.
- [ ] Jalankan `npm run build` dan `git diff --check`.

Acceptance criteria:

- [ ] Perbedaan 07/08 sesuai matrix state di atas.
- [ ] Tidak ada layout shift antar state selain konten/state yang memang berubah.
- [ ] Capture builder menggunakan viewport dan scroll position yang sama.
- [ ] Question navigator dan ikon grid konsisten serta tidak bergantung pada glyph font.

#### REVIEW-008 — Screen 12 framing and state parity

- Screen: `CRAFT-112` / `CRAFT-222` / node `15:9660`
- Evidence: screenshot user `Screenshot 2026-10-10 at 6.43.42 AM.png`
- Target viewport: `360 × 740`, mock browser diabaikan
- Status: `Internal Review`

Temuan:

- [x] Dari `scrollTop = 0`, navbar/logo utuh; card berada pada inset 12 px dan hero full-bleed ke frame.
- [x] Header, progress ring, alert, checklist, divider, dan panduan membentuk satu alur vertikal yang dapat digulir.
- [x] Online menunjukkan `1/2`, koneksi success, upload belum selesai, dan CTA aktif. Offline menunjukkan `0/2` dan CTA disabled.
- [x] Screen 12 dan 13 mempertahankan panel, state, dan posisi CTA yang berbeda.
- [ ] Perbandingan koordinat exact terhadap source node `15:9660` menunggu planner visual review; Figma design-context tool tidak tersedia di sesi builder.

Task untuk builder:

- [x] Capture direct-open pada `scrollTop = 0`, viewport `360 × 740`, tanpa mock browser.
- [x] Audit framing navbar, screen content, hero, card, dan CTA; panduan dapat digulir.
- [ ] Bandingkan koordinat terhadap source node `15:9660` saat planner visual review.
- [x] Uji dan capture state Online (`1/2`), Offline (`0/2`), serta screen 13 sebagai pembanding.
- [x] Jalankan `npm run build` dan `git diff --check`.

Acceptance criteria:

- [x] Navbar/logo utuh pada capture scroll 0.
- [x] Hero full-bleed pada app frame dan card mengikuti inset 12 px; exact Figma coordinate match masih menunggu review planner.
- [x] Upload preparation card mempertahankan urutan vertikal dan panduan dapat digulir pada viewport target.
- [x] State online/offline mengubah progress, checklist, dan CTA secara konsisten tanpa merusak layout.
- [x] Evidence full viewport tersedia untuk screen 12 dan pembanding screen 13.

## Task fondasi

### CRAFT-000 — Kunci scope dan aturan visual

- [x] Konfirmasi section target: `15:7547`.
- [x] Konfirmasi mock browser bar diabaikan.
- [x] Konfirmasi target viewport `360 × 740`.
- [x] Konfirmasi visual harus mengikuti Figma dan menggunakan asset asli.
- [x] Konfirmasi komponen akan dipakai ulang di screen lain.

### CRAFT-001 — Inventarisasi screen

- [x] Catat 14 screen utama dan node Figma.
- [x] Kelompokkan screen menjadi persiapan, pengerjaan, pengumpulan, dan hasil.
- [ ] Catat state awal, state sukses, state gagal, dan state disabled setiap screen.
- [ ] Catat hubungan tombol utama antar-screen.

### CRAFT-002 — Flow, state, dan transisi

- [x] Buat peta transisi dari screen 01 sampai 14.
- [x] Catat kondisi yang membuat CTA aktif atau disabled.
- [x] Catat state koneksi pada screen pengerjaan dan pengumpulan.
- [x] Catat state timer, autosave, submit, retry, dan terminasi.
- [x] Tandai bagian yang berasal dari wireframe PM dan bagian yang hanya visual Figma.

#### Flow baseline

Flow berikut menjadi baseline implementasi. Transisi yang diberi label **asumsi** perlu dikonfirmasi saat review produk atau ketika screen terkait mulai dikerjakan.

```mermaid
flowchart TD
  A[Eligibility sesi cabang] --> B[01 Aturan & Persetujuan]
  B -->|Setuju| C[02 Unduh Soal]
  C --> D[03 Unduh Soal - Proses]
  D -->|Download selesai| E[04 Matikan Internet - Panduan]
  E -->|Koneksi offline| F[05 Siap Mengerjakan]
  F --> G[06 Mulai Tryout - Konfirmasi]
  G --> H[07 Pengerjaan - Soal 1]
  H --> I[08 Pengerjaan - Soal 2]
  I --> J[09 Tinjau Jawaban]
  J --> K[10 Simpan Hasil - Konfirmasi]
  K -->|Masih ada subtes| L[11 Subtes Berikutnya]
  L -->|Lanjut / countdown selesai| H
  K -->|Subtes terakhir - asumsi| M[12 Nyalakan Internet - Panduan]
  M --> N[13 Unggah & Kumpulkan Hasil]
  N --> O[14 Hasil Tryout]
```

#### Transisi per screen

| Screen | State masuk | CTA atau event utama | State keluar |
| --- | --- | --- | --- |
| 01 Aturan & Persetujuan | Sesi offline eligible, persetujuan belum dicentang | Checkbox aturan | CTA `Lanjutkan` aktif setelah checkbox dicentang; kembali ke entrypoint jika memilih `Kembali` |
| 02 Unduh Soal | Paket belum tersedia | Mulai download | Masuk ke screen 03 dengan status download berjalan |
| 03 Unduh Soal — Proses | Download berjalan | Progress berubah atau download selesai | Selesai → screen 04; gagal → retry atau error state **perlu dirinci** |
| 04 Matikan Internet — Panduan | Paket lengkap, koneksi masih online | Peserta mengikuti panduan perangkat | Koneksi offline dan checklist selesai → screen 05 |
| 05 Siap Mengerjakan | Paket lengkap, koneksi offline | `Lanjutkan` | Masuk ke screen 06 |
| 06 Mulai Tryout — Konfirmasi | Peserta siap mulai | Persetujuan aturan atau `Mulai Tryout` | Timer dimulai, attempt dikunci, masuk screen 07 |
| 07 Pengerjaan — Soal 1 | Timer berjalan, koneksi offline | Pilih jawaban, tandai ragu-ragu, navigasi | Jawaban tersimpan lokal; navigasi ke screen 08 atau soal lain |
| 08 Pengerjaan — Soal 2 | Timer berjalan, jawaban dapat berubah | Navigasi soal atau selesai mengerjakan | Masuk ke screen 09 untuk meninjau jawaban |
| 09 Tinjau Jawaban | Semua jawaban tersimpan lokal | Kembali ke soal atau `Simpan Hasil` | Kembali ke mode answering atau masuk screen 10 |
| 10 Simpan Hasil — Konfirmasi | Ringkasan jawaban siap disimpan | Konfirmasi simpan atau kembali | Simpan lokal; subtes berikutnya → screen 11, subtes terakhir → screen 12 **asumsi** |
| 11 Subtes Berikutnya | Subtes sebelumnya selesai | Countdown atau CTA lanjut | Mulai subtes berikutnya, kembali ke screen 07 dengan data subtes baru |
| 12 Nyalakan Internet — Panduan | Semua subtes selesai, jawaban tersimpan lokal | Peserta menyalakan koneksi | Koneksi online → screen 13 |
| 13 Unggah & Kumpulkan Hasil | Koneksi online terdeteksi | `Upload & Kumpulkan Tryout` | Upload berjalan → hasil menunggu atau selesai, masuk screen 14 |
| 14 Hasil Tryout | Upload selesai atau hasil masih diproses | Tunggu hasil atau buka pembahasan | State `waiting`, `available`, dan akses pembahasan **perlu dicocokkan dengan backend** |

#### State global

| Area | State yang diperlukan | Dampak UI |
| --- | --- | --- |
| Eligibility | `public`, `offline_branch_active`, `offline_branch_not_started` | Public tetap ke flow online; offline branch masuk flow ini; sesi belum aktif menampilkan status tunggu |
| Download | `idle`, `downloading`, `completed`, `failed` | Progress, CTA, retry, dan pesan error berubah sesuai status |
| Consent | `unchecked`, `checked` | CTA utama disabled atau enabled |
| Network | `online`, `offline`, `unknown` | Checklist dan upload gate berubah; overlay enforcement hanya aktif selama attempt |
| Attempt | `not_started`, `active`, `reviewing`, `locked`, `terminated` | Menentukan apakah soal, timer, dan navigasi dapat dipakai |
| Answer | `unanswered`, `answered`, `doubtful` | Nomor soal, pilihan jawaban, ringkasan, dan penanda ragu-ragu berubah |
| Timer | `running`, `paused_by_network`, `expired` | Timer berjalan, berhenti sementara, atau otomatis mengumpulkan |
| Network enforcement | `inactive`, `clear`, `warning_0_to_25s`, `terminated` | Enforcement aktif hanya selama attempt; input dikunci saat online dan attempt dihentikan setelah 25 detik sesuai baseline PM |
| Upload | `not_ready`, `ready`, `uploading`, `uploaded`, `failed`, `pending_sync` | CTA, progress, retry, dan status hasil berubah |
| Result | `waiting`, `available`, `error` | Menampilkan status pemrosesan atau CTA pembahasan |

#### State per fase

**Persiapan**

- Download hanya tersedia setelah eligibility sesi cabang valid.
- Screen 01 mengharuskan peserta mencentang persetujuan sebelum CTA aktif.
- Screen 04 menunggu koneksi berubah menjadi offline sebelum dapat lanjut.
- Jika koneksi tetap online pada pre-check, CTA mulai tetap disabled.

**Pengerjaan**

- Timer mulai saat attempt benar-benar dimulai di screen 06.
- Jawaban disimpan lokal setiap kali peserta memilih opsi atau berpindah soal.
- Peserta dapat menandai soal sebagai `doubtful`.
- Koneksi online memunculkan overlay, mengunci soal dan navigasi, serta menghentikan timer.
- Jika koneksi kembali offline dalam 25 detik, overlay ditutup dan timer dilanjutkan.
- Jika koneksi tetap online selama 25 detik, attempt menjadi `terminated` dan tidak dapat dilanjutkan.

Boundary enforcement: nudge anti-internet dimulai ketika attempt masuk screen pengerjaan dan berlaku sampai attempt disimpan atau terminated. Persiapan download tidak memakai nudge anti-cheat; persiapan upload memakai gate koneksi yang terpisah.

**Review dan simpan**

- Screen 09 memperlihatkan soal terjawab, dilewati, dan ragu-ragu.
- Peserta dapat kembali ke soal sebelum mengonfirmasi simpan.
- Screen 10 mengunci hasil lokal setelah konfirmasi.

**Pengumpulan**

- Screen 12 memandu peserta menyalakan koneksi.
- Screen 13 mengaktifkan CTA upload setelah online terdeteksi.
- Jawaban yang gagal dikirim masuk `pending_sync` dan dapat dicoba ulang.
- Screen 14 membedakan hasil yang masih menunggu dengan hasil yang sudah tersedia.

#### Keputusan yang masih terbuka

1. Apakah screen 10 menuju screen 11 untuk semua subtes kecuali subtes terakhir, lalu menuju screen 12 hanya setelah subtes terakhir?
2. Apakah countdown pada screen 11 dapat dibatalkan atau hanya dapat dilewati melalui CTA?
3. State error download dan upload yang perlu ditampilkan di prototype belum memiliki screen khusus di section ini.
4. Apakah hasil pada screen 14 langsung tersedia setelah upload atau selalu masuk state menunggu?
5. Apakah event `NETWORK_RECOVERED`, koneksi terdeteksi, dan terminasi harus terlihat di UI peserta atau hanya dikirim ke dashboard pengawas?
6. Apakah enforcement harus mencakup screen review, konfirmasi simpan, dan transisi subtes selama attempt belum final? Baseline planning saat ini menganggap iya.

### CRAFT-003 — Token visual

- [x] Warna background, text, border, primary, warning, dan error.
- [x] Font family, weight, size, line height, dan letter spacing.
- [x] Spacing utama: page padding, card padding, gap, dan button padding.
- [x] Radius card, alert, checkbox, dan button.
- [x] Shadow card dan sticky action bar.
- [x] Ukuran dan alignment icon.

Token catalog: `src/tokens.css`; audit notes: `FOUNDATION_AUDIT.md`.

### CRAFT-004 — Asset map

- [x] Download asset yang dipakai screen 01.
- [x] Kelompokkan asset berdasarkan komponen dan fungsi.
- [x] Pertahankan nama file lokal yang jelas dan konsisten dengan export Figma.
- [x] Catat section sumber dan node screen yang menggunakan registry.
- [x] Inventarisasi 44 asset lokal yang dipakai lintas screen 01–14.

#### Asset registry

Semua file di bawah bersumber dari section Figma `15:7547`. Salinan untuk delivery statis berada di `public/assets/figma/` dan tersedia saat build di `dist/assets/figma/`; runtime memakai URL `/assets/figma/<nama-file>`.

| Kelompok | Asset |
| --- | --- |
| Navbar dan profil | `ruangguru-logo.svg`, `navbar-more.svg`, `dropdown.svg`, `user-head.svg`, `user-body.svg`, `user-outer.svg`, `result-account.png` |
| Hero dan background | `header-left.svg`, `header-right.svg`, `header-mask.svg`, `result-bg.svg`, `result-header-bg.svg`, `review-background-mask.svg` |
| Exam dan download | `book-pencil.svg`, `book.svg`, `pencil.svg`, `test.svg`, `download.svg`, `question-count.svg`, `clock.png` |
| Checklist dan network | `checklist.svg`, `checklist-ready.svg`, `checklist-ready-banner.svg`, `checklist-success.svg`, `checklist-offline-complete.svg`, `wifi.svg`, `protected.svg`, `refresh.svg`, `warning.svg` |
| Review dan timer | `review-alert.svg`, `review-info.svg`, `review-info-blue.svg`, `review-pagination.svg`, `review-pagination-blue.svg`, `review-clock.png`, `divider.svg`, `alert-paper.svg`, `alert-paper-detail.svg`, `alert-badge.svg` |
| Panduan dan konfirmasi | `android-guide.svg`, `save-warning.png`, `start-tryout-modal.png`, `start-tryout-warning.png` |
| Hasil | `result-waiting.png` |

### CRAFT-005 — Komponen reusable

- [x] `AppShell` dan mobile viewport wrapper.
- [x] `Navbar`.
- [x] `Hero` sebagai `HeaderBackground`.
- [x] Header persiapan dengan step indicator di `PreparationCard`, `OfflinePreparationCard`, dan `ReadyPreparationCard`.
- [x] Checklist item di preparation/upload cards.
- [x] `.card` wrapper.
- [x] `Notice` dan alert variants.
- [x] `Button` primary, secondary, disabled, dan loading.
- [x] Native checkbox styling in rules and doubtful controls.
- [x] Platform and guide tabs.
- [x] `StickyActions`.
- [x] Question navigator and question card composition in `QuestionOneFigma`.
- [x] Timer formatting and timer boxes in `QuestionOneFigma`.
- [x] `NetworkOverlay`.
- [x] Upload progress and `SyncStatus` states in `UploadPreparationFigma`.

Component map and prop boundaries: `FOUNDATION_AUDIT.md`.

### CRAFT-006 — App shell dan routing prototype

- [x] Satu entry point untuk semua screen.
- [x] Gunakan React sebagai stack prototype.
- [x] State screen yang bisa dipilih saat review.
- [x] Navigation antar-screen menggunakan CTA dari desain.
- [x] Data demo terpusat agar isi screen konsisten.
- [x] Komponen visual tidak bergantung pada screen tertentu.

Shell and routing audit: `FOUNDATION_AUDIT.md`.

## CRAFT-007 — State contract dan fixture path

- `network`: `online | offline`, controlled by the review menu and retained across screens.
- `attemptStatus`: `not_started | active | reviewing | locked | terminated`.
- Attempt boundary: screens 07–11. Online detection locks controls, pauses the timer, and starts a 25-second warning for every non-terminated attempt state.
- Recovery: returning offline clears the warning and resumes the timer; remaining online terminates the attempt and sets `syncStatus=pending_sync`.
- Upload boundary: screens 12–13 use a separate connection gate. Upload exposes `idle | uploading | failed`; failed uploads keep `pending_sync` and expose retry.
- Fixture path for browser review: screen 01 consent → screen 02 download → screen 03 progress → screen 04 offline gate → screen 05 readiness → screen 06 start → screens 07–11 attempt boundary → screen 12 online gate → screen 13 upload/retry → screen 14 result waiting.
- Acceptance evidence is tracked in `TEST_PLAN.md`; visual sign-off is performed by the planner after builder evidence is submitted.

Contract source and fixture path audit: `src/state/contract.ts`, `src/fixtures/toOfflineQuestions.ts`, and `FOUNDATION_AUDIT.md`.

### CRAFT-202/203/214/216 review notes

- Screen 08 and screen 09 were browser-smoke checked at 360 × 740 with Online mode; the warning overlay appeared and the visible controls were disabled.
- Screen 04 now renders `1/2` while Online and `2/2` while Offline, including checklist and CTA state.
- Screen 13 exposes upload failure and retry UI while preserving pending synchronization.

## Template task screen

Setiap task `CRAFT-101` sampai `CRAFT-114` menggunakan checklist ini.

### Implementasi

- [ ] Baca node Figma dan screenshot referensi.
- [ ] Catat struktur frame dan ukuran penting.
- [ ] Reuse token dan komponen yang sudah tersedia.
- [ ] Gunakan asset lokal dari Figma.
- [ ] Implementasikan konten, layout, dan state screen.
- [ ] Implementasikan CTA dan transisi yang relevan.
- [ ] Abaikan mock browser bar.

### Review

- [ ] Screenshot prototype pada viewport `360 × 740`.
- [ ] Bandingkan struktur dan posisi elemen dengan Figma.
- [ ] Review typography dan wrapping text.
- [ ] Review warna, border, radius, dan shadow.
- [ ] Review icon dan asset.
- [ ] Review state enabled, disabled, loading, dan error yang relevan.
- [ ] Catat mismatch dengan node dan lokasi yang spesifik.
- [ ] Iterasikan sampai reviewer memberi status `Approved`.

## Urutan craft yang disarankan

1. `CRAFT-101` — Aturan & Persetujuan sebagai pilot dan validasi komponen dasar.
2. `CRAFT-102` dan `CRAFT-103` — Download paket dan progress download.
3. `CRAFT-104` dan `CRAFT-105` — Panduan mematikan internet dan kesiapan offline.
4. `CRAFT-106` — Konfirmasi mulai tryout.
5. `CRAFT-107` dan `CRAFT-108` — Pengerjaan soal dan variasi state.
6. `CRAFT-109` dan `CRAFT-110` — Tinjau serta simpan hasil.
7. `CRAFT-111` — Transisi subtes.
8. `CRAFT-112` dan `CRAFT-113` — Menyalakan internet dan upload hasil.
9. `CRAFT-114` — Hasil tryout.
10. `CRAFT-201` sampai `CRAFT-206` — Integrasi, behavior offline, review, dan handoff.
11. `CRAFT-213` — Audit loophole dan integritas attempt.
12. `CRAFT-214` — Finalisasi boundary enforcement attempt aktif.
13. `CRAFT-215` — Abuse-case test dan recovery regression.
14. `CRAFT-216` — State-driven screen 04 dan regression persiapan offline.
15. `CRAFT-219` — Rebuild screen 06 sebagai native bottom drawer.
16. `CRAFT-220` — Rebuild ikon navigator soal screen 07–08.
17. `CRAFT-221` — Kunci visual state screen 07 vs 08.
18. `CRAFT-222` — Audit framing dan state screen 12.
19. `CRAFT-223` — Perbaiki delivery asset Figma.
20. `CRAFT-224` — Wire touchpoint navigator soal ke screen 09.
21. `CRAFT-225` — Audit visual screen 11 — Subtes Berikutnya.
22. `CRAFT-232` — Auto-start persiapan konten dan gate CTA.

## Format catatan review

```md
### REVIEW-001
- Screen: `CRAFT-101` / node `15:9085`
- Viewport: `360 × 740`
- Status: Changes Requested

Temuan:
- [ ] Card aturan terlalu tinggi 8 px.
- [ ] Logo navbar turun 2 px.
- [ ] State tombol belum mengikuti disabled state Figma.

Perbaikan berikutnya:
- [ ] Sesuaikan tinggi card.
- [ ] Sesuaikan alignment navbar.
- [ ] Perbaiki token disabled button.
```

### REVIEW-001 — Prototype pass

- Screens: `CRAFT-101`–`CRAFT-114`
- Viewport: `360 × 740`
- Status: Functional flow approved; visual parity with Figma is still pending.
- Evidence: local Vite preview inspected in browser at `http://localhost:3000/`.
- Verified: consent gating, download progress, offline/online CTA gating, question selection, doubtful state, review summary, save flow, upload flow, result state, and menu jump navigation.
- User review: flow confirmed okay.
- Fixed during review: review menu string IDs could render a blank screen; IDs are now converted to numeric `ScreenId` values before routing. The preparation screens were then aligned against their Figma references: removed the invented stepper, restored Indonesian copy, matched navbar alignment, rebuilt the disclaimer icon from local assets, matched the download card/progress/warning layout, added the long Android connection guide and completed 2/2 readiness state, used the exported Figma confirmation screenshot for screen 06 with functional click targets over the modal actions, and replaced the generic question card with the full-screen instruction, pagination, timer, offline pill, passage, and sticky navigation structure for screens 07–08.
- Continued visual craft: screens 09–14 now use Figma-matched layouts and local exported illustration assets. Screen 09 includes the review alert, progression metrics, timer, skipped/doubtful groups, and sticky actions. Screen 10 uses the Figma warning modal and keeps the confirmation transitions. Screen 11 is the subtest summary state; screens 12–13 are the offline upload preparation states; screen 14 shows the result pending state and score summary. All six screens were inspected in the local browser at 360 × 740 and are queued for internal planner review.
- Remaining: planner visual sign-off against the source Figma frames and product decisions for countdown cancellation, backend result timing, and upload error recovery.

## Definisi selesai

Craft plan selesai ketika:

- seluruh 14 screen memiliki implementasi dan status `Approved`;
- komponen reusable dipakai lintas screen;
- flow dari persiapan sampai hasil dapat dijalankan;
- state offline, timer, penyimpanan, submit, dan pending upload mengikuti baseline MVP;
- setiap mismatch visual terakhir sudah ditutup;
- prototype siap diteruskan ke tahap development.
