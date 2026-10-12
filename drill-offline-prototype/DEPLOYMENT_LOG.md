# Drill Offline — Deployment Log

Catatan ini melacak perubahan yang sudah dipush ke branch GitHub dan perubahan lokal yang belum dipush.

## Status saat ini

- Branch: `feat/drill-dev`
- Remote: `origin/feat/drill-dev`
- Commit remote terbaru: `7f4338e` — `fix: add React type declarations for Vercel build`
- Branch lokal dan remote sinkron pada commit tersebut.
- Build lokal pada `7f4338e` berhasil setelah penambahan `@types/react` dan `@types/react-dom`.
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

Rentang commit Drill tersebut tercatat pada branch remote dari `95044e9` sampai `7f4338e` (termasuk catatan review/audit `a417062`, `b66e58d`, dan `9a7f716`).

## Belum dipush

Perubahan lokal berikut belum masuk ke `origin/feat/drill-dev`, sehingga belum memicu deployment dari commit tersebut:

- Mengemas instruksi tekstual cara mematikan internet ke accordion tertutup secara default. Switch simulasi tetap di sidebar tester.
- Mengemas instruksi menyalakan internet pada langkah pengumpulan ke accordion.
- Mengubah konfirmasi akhiri sesi menjadi pop-up dengan `Kembali` dan `Yakin`.
- Melanjutkan otomatis saat koneksi dinyalakan pada langkah awal dan setelah sesi selesai; upload hasil tetap memerlukan aksi user.
- Mengganti placeholder panduan cara mematikan koneksi internet dengan GIF `public/assets/figma/offline-connection-guide.gif`.
- Menambahkan GIF reverse `public/assets/figma/offline-connection-guide-reversed.gif` dan memasangnya pada panduan cara menyalakan koneksi internet di step pengumpulan.

File yang berubah: `src/main.tsx`, `src/styles.css`, `DEPLOYMENT_LOG.md`, `public/assets/figma/offline-connection-guide.gif`, dan `public/assets/figma/offline-connection-guide-reversed.gif`.

## Cara memperbarui log

Setelah perubahan siap dan dipush atas perintah user, pindahkan ringkasannya dari **Belum dipush** ke **Task yang sudah dipush**, lalu catat hash commit, tanggal, dan status deployment Vercel yang terverifikasi.
