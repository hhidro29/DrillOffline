# Drill Prototype Status

## D-001 — Figma validation

- Status: `Internal Review`
- Source: Figma section `69:14041`
- Confirmed baseline frames: `69:13360`, `69:13411`, `69:13464`, `69:13527`, `69:10610`, `69:10677`, `69:10823`, `69:10895`, `69:13066`, `69:13136`, `69:12792`
- Target viewport: `360 × 740`
- Product boundary: one Drill session, no subtests, no TO anti-AI enforcement.

## D-002 — Standalone scaffold

- Status: `Internal Review`
- App boundary: this directory only; the parent TO app remains unchanged.
- Local fixtures live in `src/fixtures` and local assets live in `public/assets`.

## D-003 — Preparation flow

- Status: `Internal Review`
- Implemented states: download, downloading, offline guide, and ready.
- Preparation states are implemented and connected to the question session.

## D-004 — Question and answer results

- Status: `Internal Review`
- Implemented frames: `69:10610`, `69:10677`, `69:10823`, `69:10895`
- States: question selection, answer confirmation, wrong answer, and time expired.
- The timer is local to one session and has no network enforcement or subtest transition.

## D-005 — Upload and result

- Status: `Internal Review`
- Implemented frames: `69:13066`, `69:13136`, `69:12792`
- States: online guide, upload progress, and result summary.
- Upload is simulated locally and reaches the summary after the progress state; a visible failed/retry state is available for review.
- The developer sidebar includes an Online/Offline simulation. Offline blocks starting from the ready state until the mode is switched, while Online blocks upload until restored. Upload failure can be triggered from the sidebar while reviewing screen 10.

## D-006 — Navigation and tester sidebar

- Status: `Internal Review`
- The TO Offline sidebar interaction pattern is adapted locally for Drill: open/close, reset, active state, 11 direct jumps, an accessible single Online/Offline switch, and upload failure trigger.
- Online/Offline simulation now changes behavior, not only active styling: offline guide completion and question attempt require Offline; upload requires Online; changing the mode while a state is open immediately shows or removes the gate.
- The switch exposes `role="switch"` and `aria-checked`; its label and state remain visible in the open test menu.
- The offline guide no longer repeats the network state in a red alert; the switch, progress ring, checklist, and disabled/enabled CTA provide the state without changing the gate behavior.
- Screen 03 has one primary action: sticky `Lanjutkan`. It is disabled while Online, enables immediately when switched Offline, and transitions to screen 04 from both top and bottom scroll positions.

## D-007 — Visual iteration and QA

- Status: `Internal Review`
- Planner live audit passed all 11 states, including top/mid/bottom scroll checks on screens 03, 05, 06, 09, 10, and 11.
- Planner confirmed screen 10's green `1/2` progress arc and red alert icon match Figma, screen 11 lower sections remain visible through scroll, and sticky CTAs stay fully visible at the actual preview height.
- Screen 11 stat cards now use two equal `145px` columns at `x=28–173` and `x=187–332`, matching the Figma result row instead of leaving an unused third-column slot.
- Copy audit across all 11 states is free of `tryout` and `subtest` wording.

## D-008 — Handoff to planner

- Status: `Internal Review`
- Final commits: `bb40218` (responsive viewport and scroll anchoring), `ac89d98` (upload progress arc and red alert asset), `fba5906` (accessible network switch and reactive network gates).
- Preview: `http://127.0.0.1:3001/`
- Planner verdict: Internal Review ready after live verification.

## Assumptions and open decisions

- Download progress is simulated locally for visual review.
- The guide uses a neutral image placeholder until the Drill-specific instructional asset is exported from Figma.
- The instructional image area remains a neutral placeholder until the Drill-specific image export is available.
- Figma's guide image is a neutral placeholder in the source frame, so the prototype preserves that neutral area and its scrollable guide copy.
- The result summary uses local fixture values until a backend result contract is supplied.
- The teacher-link entry is represented by the standalone app entry; authentication and link validation are outside this prototype.

## Evidence

- Preview: `http://127.0.0.1:3001/` at `360 × 740`.
- Live browser review covered download → offline guide → ready → question → confirmation → wrong-answer result → online guide → upload → summary.
- Timeout state was also verified through the local review control; the question controls lock and the timeout result appears.
- The Drill sidebar was verified at `360 × 740`; it opens from the navbar, highlights the current state, and jumps directly to all 11 states without changing the TO preview.
- The Figma parity pass aligned the question, confirmation, wrong-answer, timeout, upload-guide, upload, and result-summary layouts to the Drill frames in section `69:14041`, including the breadcrumb, gradient hero, timer treatment, answer cards, upload alert, score panel, and sticky actions.
- End-to-end browser verification passed on `http://127.0.0.1:3001/`: download → offline guide → ready → question → confirmation → correct result → upload guide → upload → summary, plus direct wrong-answer, timeout, and upload-failed states.
- Final question-frame alignment was checked against the Figma coordinates: the info card starts at `y=233` and the question card at `y=319` within the 360px frame after resetting the scroll container.
- The question stem now matches the Figma inner frame at `y=335` with `107px` height; the option stack begins at `y=458`.
- Long preparation guides scroll inside the content panel while their bottom CTA remains anchored to the 360 × 740 frame. Question and summary screens use internal scroll containers with fixed footers and no horizontal overflow.
- The app canvas now caps at 740px but follows the actual browser `100dvh`, so a 710px in-app content viewport keeps the entire sticky CTA visible instead of clipping its bottom edge.
- Result summary uses exported Figma score background, confetti, result ring, subbab icon, and video thumbnails; recommendation cards include the visible video titles.
- Upload screen progress ring now renders the Figma half-green arc for `1/2`, and its alert uses the exported red Figma status icon.
- Latest browser audit checked all 11 sidebar jumps, full scroll heights, scroll reset between states, correct-answer flow, wrong-answer flow, timeout, upload failed/retry, and Online/Offline gates. `npm run build` and `git diff --check` pass.
- Network matrix evidence: screen 03 Online disables the completion CTA and shows an alert; Offline enables it. Screen 04 Online disables `Kerjakan Drill`; Offline enables it. Screen 05 direct Online jumps show a blocked alert and disabled options; switching Offline enables the attempt. Screen 06 Submit is disabled Online and enabled Offline. Screen 10 upload is enabled Online and blocked Offline. Full network-gated correct flow and upload failed → retry → summary pass.
- Direct sidebar jumps preserve the selected network mode, so jumping to screen 10 while Offline cannot silently reset to Online; toggling to Online then immediately enables upload.
- Latest switch iteration verified at the preview viewport: screen 03 changes between blocked and complete guide states, screen 04 changes between disabled and enabled start CTA, screen 09 updates its 0/2 → 1/2 internet checklist, and screen 10 changes between disabled `Nyalakan Internet` and enabled upload. Upload failure → `Coba Lagi` → progress → result summary also passes.
- Planner final verdict after the latest live pass: Internal Review ready; all 11 states, long-screen scroll, sticky CTAs, network gates, wrong-answer, timeout, upload retry, and summary flow have no remaining P0/P1 mismatch.
- Follow-up visual pass verified screen 03 at top and bottom scroll positions in both network modes; the guide remains aligned with the reference without a redundant alert, and its sticky CTA stays visible.
- P0 regression check passed: sticky `Lanjutkan` → screen 04 `Kerjakan Drill` → screen 05 question flow; direct screen 05 jump and reset still preserve Offline/Online state as expected.
- Screen 05 alignment audit now locks the Figma gutter relationships explicitly: progress/card containers remain `x=16..344` (`328px`), question stem/options/report remain `x=32..328` (`296px`), and the footer remains full width with a `328px` timer at both 360×740 and 360×710. Selected-answer, Online-disabled, and Offline-enabled states were checked at top, mid, and bottom scroll with no horizontal overflow.
- Final screen 05 visual pass also matches the Figma option marker size (`30px`), report pill width (`94px`), boxed footer countdown, and full `44px` sticky `Lanjutkan` CTA. The footer is now `128px` tall so the CTA is never flex-shrunk or clipped; body, document, screen, and scroll widths remain `360px` in both target viewports.

- Responsive shell pass centers the fixed `360px` Figma frame in wide viewports while preserving the mobile frame geometry. At `1024 × 710`, screens 03, 04, 05, 09, 10, and 11 render at `x=332` with no left-anchored blank-space imbalance; the test drawer aligns to the same shell. At `360 × 740` and `360 × 710`, screens 03, 04, 05, 09, 10, and 11 keep their sticky actions visible and retain the measured Figma gutters without horizontal overflow.

- End-session iteration makes the screen 05 header `Akhiri` action functional. It opens the existing screen 06 confirmation state, freezes the session timer, preserves the selected answer, and exposes `Kembali` plus `Simpan Hasil` actions. Confirming in Offline mode transitions to screen 09; the existing Online upload gate then continues to screen 10, including upload failure → retry → summary. Online mode keeps the submit action disabled. The confirmation footer is stacked on the 360px frame so its copy and actions remain readable.

- Lazy backlog batch verified against Figma nodes `69:10610` (question) and `69:10677` (answer confirmation). Screen 05 no longer renders the non-Figma `Lanjutkan` CTA; it keeps only the timer footer. Screen 03 no longer renders the duplicate inline guide CTA. Screen 06 now uses a dedicated confirmation layout without the question hero or inline network warning, with `Yakin ingin mengakhiri sesi Drill?`, `Kembali`, and `Yakin`; the timer freezes until cancellation. Submit/action sizing is `120 × 40px` on the confirmation footer. Switching Offline → Online from question/confirmation opens a blocking `Koneksi internet terdeteksi` modal; `Kembali ke Offline` restores the attempt and answer state. Verified at `360 × 710`, `360 × 740`, and `1024 × 710`; wide shell remains centered at `x=332`, with no horizontal overflow.

- DRILL-037 local revision removes the user-facing `Kembali ke Offline` action from the connection interruption modal. The timer and automatic timeout path remain; reviewer-only sidebar control `Simulate return Offline` triggers the same recovery event deterministically. The preparation entry auto-starts download, uses the exact loading copy `Mempersiapkan konten untukmu`, advances progress continuously to 100%, and then opens the internet-off guide. Preparation step counters are removed from the main flow while checklist statuses remain. The guide now has a sticky `Mulai Kerjakan` CTA, disabled Online and enabled Offline, which opens the question screen directly. Direct jumps and reset retain their reviewer behavior.

- DRILL-038/044 collection iteration routes `Yakin` into the turn-on-internet and collection states, then starts upload automatically once Online. Upload progress remains visible, the manual `Kumpulkan` action is retained as fallback/reviewer control, and successful upload reaches the summary.
- DRILL-039/043 question status iteration combines the question progress (`1/10`) and `Mode Offline` marker in the same horizontal info card. The separate lower-screen Offline pill was removed so the marker no longer covers the question, options, or footer.
- DRILL-045 collection visual iteration reuses the preparation hierarchy: shared header artwork, prep card, checklist rows, divider, education notice, status panel, and sticky action spacing. Collection-specific copy and upload status preserve the distinct submission context.

- Final audit regression fix: automatic upload completion now tracks and cancels its pending timer when reviewer forces an upload failure or resets the session. The failed state remains available for `Coba Lagi` instead of jumping to Summary from a stale auto-upload callback; retry resumes progress and reaches processed results.

- DRILL-046 visual collection pass updates the latest Offline screenshot state: pending checklist rows now use empty indicators instead of grey checkmarks, collection copy has one clear message per status, and the shared prep/card hierarchy remains intact. Online auto-upload, retry, processed summary, scroll, and overflow behavior remain unchanged.
