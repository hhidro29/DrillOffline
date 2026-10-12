# TO Offline Foundation Audit

Date: 2026-10-12  
Scope: CRAFT-002, CRAFT-003, CRAFT-005, CRAFT-006, and CRAFT-007  
Status: Internal Review (planner approval pending)

## CRAFT-002 — Flow, state, and transitions

The 14-screen baseline flow is implemented by the `ScreenId` route union and the
`renderScreen()` switch in `src/main.tsx`. The shared state contract now lives in
`src/state/contract.ts` and covers:

- preparation: consent, download progress, and online/offline pre-check;
- attempt: `not_started`, `active`, `reviewing`, `locked`, and `terminated`;
- answer state: selected choices and doubtful question numbers;
- timer and 25-second network warning;
- upload: idle, uploading, failed, and pending synchronization;
- result: upload completion routes to the result waiting screen.

The route effect resets document and screen-owned scroll containers on every
screen transition. `getScrollOwner()` makes the fixed/document/internal scroll
choice explicit for review and smoke checks.

Known product decisions that remain open are recorded in `CRAFT_PLAN.md` and are
not silently converted into implementation requirements (download error copy,
backend result availability, and production enforcement outside the web app).

## CRAFT-003 — Visual tokens

`src/tokens.css` is the single token catalog for the prototype. It records the
Figma-derived palette, typography scale, spacing, radii, and shared card/sticky
action shadows. Global shell, card, action, and button rules consume these
variables while screen-specific rules retain their intentional Figma geometry.

## CRAFT-005 — Reusable component map

The React component API is implemented in `src/main.tsx` and is screen-agnostic:

| Component | Responsibility | Reused by |
| --- | --- | --- |
| `Navbar`, `Hero`, `Button` | shell chrome and actions | preparation, review, upload, result |
| `ExamCard`, `RulesCard` | entry and consent content | screen 01 |
| `PreparationCard`, `OfflinePreparationCard`, `ReadyPreparationCard` | preparation/checklist states | screens 02–05 |
| `QuestionOneFigma`, `ReviewFigma`, `SaveResultModal` | attempt, review, and save states | screens 07–10 |
| `NetworkOverlay` | online warning and termination | screens 07–11 |
| `UploadPreparationFigma` | connection gate and upload recovery | screens 12–13 |
| `StickyActions`, `formatTimer` | shared action bar and timer formatting | preparation and attempt screens |

The question and upload views receive state and callbacks through props; they do
not own routing or persistence. This keeps visual components reusable while the
`App` component owns the prototype state machine.

## CRAFT-006 — App shell and routing

- One React entry point is mounted by `createRoot()` in `src/main.tsx`.
- `App` owns the demo route, persistence, network simulator, and transition
  handlers; `renderScreen()` maps each `ScreenId` to its screen component.
- The review menu is a deliberate prototype route selector and is separate from
  CTA-driven transitions.
- `data-screen-id` and `data-scroll-owner` on `.screen-content` expose the route
  and scroll contract for browser smoke checks.
- Figma assets are served from the local `/assets/figma/` registry and do not use
  temporary remote asset URLs.

## CRAFT-007 — State contract and fixture path

The browser-review fixture path is:

`01 consent → 02 download → 03 progress → 04 offline gate → 05 ready → 06 start → 07/08 attempt → 09 review → 10 save → 11 next subtest → 12 online gate → 13 upload/retry → 14 result`

The state types, initial timer, attempt boundary, route labels, and scroll owner
are exported from `src/state/contract.ts`. Question content is loaded through
`src/fixtures/toOfflineQuestions.ts`, with structured IDs, answer choices, and
review metadata. `sessionStorage` persists the `AttemptSnapshot` shape for the
prototype recovery flow; the reviewer reset clears that snapshot and restores
the initial fixture state.

## Verification

- `npm run build` passes.
- `git diff --check` passes.
- Existing visual and state evidence remains in `evidence/`, including the
  approved CRAFT-227/228/229/231 captures.
- Browser smoke review at `http://localhost:3000/` confirmed the preparation
  path: consent gates screen 01, download progresses from screen 02 to 03,
  screen 04 switches from `1/2` disabled to `2/2` enabled when Offline is
  selected, screen 05 opens the start confirmation, and screen 06 starts the
  attempt at screen 07. The review menu remains a reviewer-only route selector.

No task status is changed to `Approved` by this audit. Planner review is still
required for all five foundation tasks.
