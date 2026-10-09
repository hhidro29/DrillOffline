# Security Audit — TO Offline Prototype

Dokumen ini adalah audit planning, bukan klaim bahwa prototype web dapat menjamin peserta tidak pernah memiliki akses internet. Simulator pada prototype hanya mengubah state internal aplikasi.

## Boundary produk

- **Persiapan download:** boleh membutuhkan koneksi, tetapi tidak memakai nudge anti-cheat.
- **Attempt aktif:** dimulai saat peserta masuk pengerjaan dan mencakup pengerjaan, review, konfirmasi simpan, serta transisi subtes selama attempt belum final. Network detection memicu nudge, lock, pause timer, dan batas toleransi 25 detik.
- **Upload hasil:** bukan bagian dari anti-cheat attempt; memakai gate Online dan retry sinkronisasi.
- **Hasil:** tidak memerlukan network enforcement attempt.

## Temuan prototype saat ini

| Severity | Area | Temuan | Dampak |
| --- | --- | --- | --- |
| P0 | Screen 09–11 | Enforcement sebelumnya hanya aktif pada screen 07–08. Guard sekarang mencakup review, save confirmation, dan next subtest selama attempt belum terminated. | Resolved in prototype; online state locks controls and starts the same 25-second warning across screens 07–11. |
| P1 | Screen 05–06 | Peserta dapat menekan mulai saat Online dan baru menerima nudge ketika masuk screen 07. | Bukan akses ke soal, tetapi pre-check dan copy status belum konsisten dengan kesiapan offline. |
| P1 | Screen 07–08 | Konten soal dan answer state pada prototype masih sebagian statis. | Lock input dan penyimpanan jawaban belum bisa diuji secara utuh. |
| P1 | Screen 03 | Download tetap berjalan saat simulator Offline dan belum memiliki error/retry. | State network sebelum attempt tidak terwakili dengan konsisten. |
| P1 | Screen 13 | Upload failure, retry, dan recovery sebelumnya belum memiliki simulasi lengkap. | Resolved in prototype; upload now exposes uploading, failed, pending_sync, and retry states. Backend idempotency remains a production requirement. |
| P2 | Review menu | Menu jump dapat melewati prerequisite dan transition guard. | Aman hanya sebagai fixture review; tidak boleh menjadi bagian build produksi. |

## Loophole dan mitigasi

| ID | Loophole | Kelas | Mitigasi planning |
| --- | --- | --- | --- |
| L-001 | Browser prototype tidak dapat mematikan Wi-Fi, mobile data, hotspot, VPN, atau aplikasi lain di level device. | Platform | Evaluasi native kiosk, MDM/device management, atau proctoring untuk produksi. Catat sebagai batas web prototype. |
| L-002 | Peserta memakai device kedua untuk membuka AI atau internet. | Platform | Tidak dapat diselesaikan oleh web app saja; perlu kebijakan proctoring, kamera/pengawas, atau lingkungan ujian terkontrol. |
| L-003 | `navigator.onLine`, DNS, atau heartbeat web dapat dimanipulasi melalui DevTools, proxy, service worker, atau pemblokiran request. | Client trust | Network event tidak boleh menjadi satu-satunya sumber kebenaran; gunakan telemetry, session lease, dan server-side attempt state bila online tersedia. |
| L-004 | Timer dan attempt state yang hanya disimpan di client dapat di-reset melalui reload, back-forward cache, tab duplikat, clear storage, atau perubahan clock. | Integrity | Gunakan monotonic/server time, attempt token sekali pakai, persistence atomik, dan recovery test setelah crash/reload. |
| L-005 | Peserta menyalakan internet sebentar di antara polling atau sebelum detector bereaksi. | Detection latency | Definisikan heartbeat interval, fail-closed behavior, event sequence, dan audit log; jangan mengandalkan satu event browser. |
| L-006 | Jawaban di LocalStorage/IndexedDB dapat dibaca atau dimodifikasi. | Data integrity | Gunakan payload versioning, checksum/signature, server validation, dan jangan menganggap enkripsi client sebagai trust boundary. |
| L-007 | Tab, window, split screen, notification, atau aplikasi lain dibuka tanpa terdeteksi konsisten. | Runtime | Uji visibility/focus sebagai signal tambahan; untuk jaminan gunakan kiosk/native controls. |
| L-008 | Race condition saat start attempt, pindah review, save, atau next subtest membuat enforcement terlewati. | Flow | Satu state machine untuk seluruh attempt; setiap transition harus melewati guard network dan attempt status. |
| L-009 | Upload gagal, browser ditutup, atau koneksi berubah saat sync. | Recovery | Simulasikan idempotent upload, retry backoff, duplicate submission protection, dan pending sync setelah restart. |

## Acceptance gate

Loophole dianggap tertangani hanya jika:

1. Boundary attempt dan upload disepakati produk.
2. Screen 05–11 memiliki guard yang konsisten sesuai boundary.
3. Abuse-case test L-003 sampai L-009 memiliki expected result dan evidence.
4. Batas platform L-001 dan L-002 dinyatakan eksplisit sebagai requirement produksi atau residual risk.
5. Review menu/fixture dipisahkan dari flow yang diklaim sebagai E2E production-like.
