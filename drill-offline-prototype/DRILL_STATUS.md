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
- The TO Offline sidebar interaction pattern is adapted locally for Drill: open/close, reset, active state, 11 direct jumps, Online/Offline simulation, and upload failure trigger.
- Online/Offline simulation now changes behavior, not only active styling: offline guide completion and question attempt require Offline; upload requires Online; changing the mode while a state is open immediately shows or removes the gate.

## D-007 — Visual iteration and QA

- Status: `Internal Review`
- Planner live audit passed all 11 states, including top/mid/bottom scroll checks on screens 03, 05, 06, 09, 10, and 11.
- Planner confirmed screen 10's green `1/2` progress arc and red alert icon match Figma, screen 11 lower sections remain visible through scroll, and sticky CTAs stay fully visible at the actual preview height.
- Screen 11 stat cards now use two equal `145px` columns at `x=28–173` and `x=187–332`, matching the Figma result row instead of leaving an unused third-column slot.
- Copy audit across all 11 states is free of `tryout` and `subtest` wording.

## D-008 — Handoff to planner

- Status: `Internal Review`
- Final commits: `bb40218` (responsive viewport and scroll anchoring), `ac89d98` (upload progress arc and red alert asset).
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
