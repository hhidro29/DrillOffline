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
- Remaining flow: question session, answer confirmation, wrong answer, timeout, upload, and result summary.

## Assumptions and open decisions

- Download progress is simulated locally for visual review.
- The guide uses a neutral image placeholder until the Drill-specific instructional asset is exported from Figma.
- The question/session screens will use the fixture in `src/fixtures/drill.ts` and will be implemented in D-004.
