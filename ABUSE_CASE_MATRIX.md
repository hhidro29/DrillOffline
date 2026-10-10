# Abuse-case Matrix — TO Offline Prototype

This matrix records the recovery and integrity checks for loopholes `L-001` through `L-009` in [`SECURITY_AUDIT.md`](/Users/fa-2400/Documents/ChatGPT/TO%20Offline%20Mode/SECURITY_AUDIT.md). It describes what the web prototype can demonstrate and keeps platform or backend controls explicit where they cannot be verified in this repository.

## Test conditions

- Viewport: `360 × 740`.
- Runtime: `http://localhost:3000/`.
- Network is controlled through the review menu's simulator.
- Attempt boundary: screens `07–11`; upload boundary: screens `12–13`.
- `SMOKE-*` references point to the acceptance matrix and evidence log in [`TEST_PLAN.md`](/Users/fa-2400/Documents/ChatGPT/TO%20Offline%20Mode/TEST_PLAN.md).

## Matrix

| ID | Abuse case | Prototype check | Expected result | Evidence / disposition |
| --- | --- | --- | --- | --- |
| L-001 | Device Wi-Fi, mobile data, hotspot, VPN, or another network path remains available. | Set the simulator Online while the attempt is active. | Question, review, save, and next-subtest controls lock; the 25-second warning starts. The prototype cannot disable device networking. | `SMOKE-003`, `SMOKE-011`; web residual risk and production requirement. |
| L-002 | A second device is used for internet or AI access. | Review the attempt boundary and platform scope. | No browser-only control can detect or prevent a second device. | `SMOKE-013`; residual risk requiring proctoring, camera, or a controlled exam environment. |
| L-003 | Browser network signals or requests are manipulated. | Exercise the Online/Offline transition and the 25-second guard. | UI enforcement is deterministic for the simulator state, but `navigator.onLine`, DNS, heartbeat, and client events are not a trust boundary. | `SMOKE-003`–`SMOKE-005`; production requires telemetry, session lease, and server-side attempt state. |
| L-004 | Reload, back-forward cache, duplicate tab, storage clearing, or clock changes reset the attempt. | Reload during an active attempt and inspect the restored snapshot. | Screen, answers, doubtful flags, network, attempt status, timer, and sync status restore from `sessionStorage`; persistence is client-only and does not protect against storage or clock tampering. | `SMOKE-012`; implementation snapshot in `src/main.tsx`; production requires monotonic/server time and atomic persistence. |
| L-005 | Internet is enabled between detector polls or before the UI reacts. | Switch to Online during screens `07–11` and observe the warning sequence. | The attempt enters the warning state, controls remain locked, and 25 seconds of continuous Online state terminates the attempt. Exact detection latency is not proven by this simulator. | `SMOKE-003`–`SMOKE-005`; production must define heartbeat interval, fail-closed behavior, and audit events. |
| L-006 | Local answer data is read or modified. | Inspect the client snapshot boundary and answer persistence path. | Answers persist for the review fixture, but client storage is mutable and cannot be trusted as authoritative. | `SMOKE-012`; production requires versioning, checksum/signature, server validation, and a clear trust boundary. |
| L-007 | Another tab, window, notification, or application is opened. | Treat visibility/focus as an additional runtime signal in the production design review. | This prototype does not claim consistent detection or prevention of other applications. | `SMOKE-013`; residual platform risk. Add visibility/focus telemetry or kiosk/native controls for production. |
| L-008 | A race occurs during start, navigator review, save, or next-subtest. | Open the question navigator from screens `07` and `08`, then exercise the Online lock. | Navigator origin is preserved; Online state prevents the guarded transitions; termination sets `pending_sync` and routes to upload preparation. | `CRAFT-224`, `SMOKE-011`; state contract in `CRAFT_PLAN.md`. |
| L-009 | Upload fails, the browser closes, or the connection changes during sync. | Force upload failure on screen `13`, then switch Online and retry. | Failed upload remains `pending_sync`, exposes `Coba Lagi`, and a successful retry reaches screen `14`; duplicate submission and crash recovery need backend validation. | `SMOKE-006`/`SMOKE-007`; production requires idempotent upload, retry backoff, duplicate protection, and restart recovery. |

## Recovery regression checklist

- [x] Online attempt lock and 25-second termination are represented across screens `07–11`.
- [x] Returning Offline clears the warning and continues the timer from its prior value.
- [x] Navigator review preserves the source screen (`07` or `08`) when returning from screen `09`.
- [x] Upload failure retains `pending_sync` and exposes retry.
- [x] Reload recovery restores the client attempt snapshot.
- [x] L-001, L-002, and L-007 remain platform residual risks instead of being marked solved by the web prototype.
- [x] L-003, L-004, L-005, L-006, L-008, and L-009 include explicit production controls where the prototype is not authoritative.

## Sign-off boundary

The matrix supports `CRAFT-215` internal review. It does not provide production security assurance or replace backend, device-management, or proctoring validation.
