# Drill Offline — Deployment Log

Catatan ini melacak perubahan yang sudah dipush ke branch GitHub dan perubahan lokal yang belum dipush.

## Status saat ini

- Branch: `feat/drill-dev`
- Remote: `git@github.com:hhidro29/DrillOffline.git`, branch `feat/drill-dev`
- Commit remote terbaru: `335e5e0` — `DRILL-038: complete collection and offline status refinements`
- Branch lokal dan remote sinkron pada commit tersebut.
- Build lokal setelah revisi terbaru berhasil.
- Push ke branch memicu integrasi deployment Vercel. Status deployment live perlu dikonfirmasi di Vercel; file ini tidak mengklaim deployment sukses tanpa pemeriksaan di sana.

## Task yang sudah dipush

| Task / commit | Isi perubahan | Status |
| --- | --- | --- |
| `DRILL-001`–`DRILL-004` | Scaffold prototype Drill terpisah, alur persiapan, soal, hasil, upload, dan retry upload. | Sudah dipush |
| `DRILL-005`–`DRILL-008` | Sidebar tester, navigasi antar-state, penyelarasan screen ke Figma, serta review scroll dan visual. | Sudah dipush |
| `DRILL-009`–`DRILL-012` | Penyesuaian tinggi viewport dan sticky action, tampilan status upload, serta kolom statistik hasil. | Sudah dipush |
| `DRILL-013`–`DRILL-016` | Gate Online/Offline yang berfungsi, switch aksesibel, state tetap konsisten saat navigasi langsung, dan audit alur jaringan. | Sudah dipush |
| `DRILL-017`–`DRILL-020` | Perapian panduan offline, CTA langkah persiapan, serta penyelarasan geometri screen soal dan footer. | Sudah dipush |
| `DRILL-021` | Shell prototype responsif dan terpusat. | Sudah dipush |
| `DRILL-022`–`DRILL-023` | Alur akhiri sesi, konfirmasi, upload hasil, dan penyelarasan screen soal/konfirmasi ke Figma. | Sudah dipush |
| `7f4338e` | Menambahkan tipe React yang diperlukan agar `npm run build` lolos di Vercel. | Sudah dipush; build lokal berhasil |
| `ed1aef7` — `DRILL-024` | Accordion instruksi koneksi, pop-up akhir sesi, transisi otomatis saat koneksi aktif, GIF panduan asli dan reverse, serta deployment log. | Sudah dipush; build lokal berhasil |
| `20206a2` — `DRILL-025` | Copy pop-up koneksi disederhanakan menjadi satu blok teks; countdown 25 detik tetap tampil terpisah. How-to koneksi tampil langsung tanpa accordion. | Sudah dipush; build lokal berhasil |
| `669a642` — `DRILL-037` | Auto-start persiapan, copy `Mempersiapkan konten untukmu`, penghapusan counter tahap pada flow utama, CTA `Mulai Kerjakan`, dan penghapusan CTA `Kembali ke Offline` dari pop-up. | Sudah dipush; build lokal berhasil |
| `335e5e0` — `DRILL-038` | Flow `Yakin` ke pengumpulan, indikator `1/10` + `Mode Offline`, auto-upload saat Online, serta penyelarasan visual halaman pengumpulan. | Sudah dipush; build lokal berhasil |

Rentang commit Drill tersebut tercatat pada branch remote dari `95044e9` sampai `7f4338e` (termasuk catatan review/audit `a417062`, `b66e58d`, dan `9a7f716`).

## Belum dipush

Tidak ada perubahan source yang belum dipush. Deployment log ini diperbarui setelah push terakhir.

## Cara memperbarui log

Setelah perubahan siap dan dipush atas perintah user, pindahkan ringkasannya dari **Belum dipush** ke **Task yang sudah dipush**, lalu catat hash commit, tanggal, dan status deployment Vercel yang terverifikasi.
