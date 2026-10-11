# Project Boundaries — TO Offline and Drill Offline

The repository now treats TO Offline and Drill Offline as two standalone prototype projects. They may use the same Figma file, but they do not share source code during this milestone.

## TO Offline

- **Project:** current worktree root (`TO Offline Mode`)
- **Branch:** `feat/EPIC-004-ruanguji-offline-craft`
- **Dev/preview port:** `3000`
- **Entrypoint:** `src/main.tsx`
- **Styles:** `src/styles.css`
- **Design source:** Figma section `15:7547`
- **Scope:** 14-screen tryout flow, including subtest transition and result waiting state
- **Prompt pair:** [`TO_PLANNER_PROMPT.md`](TO_PLANNER_PROMPT.md) and [`TO_BUILDER_PROMPT.md`](TO_BUILDER_PROMPT.md)

## Drill Offline

- **Project root:** `/Users/fa-2400/Documents/ChatGPT/Drill Offline`
- **Project:** `drill-offline-prototype/` inside the `feat/drill-dev` worktree
- **Branch:** `feat/drill-dev`
- **Dev/preview port:** `3001`
- **Entrypoint:** `drill-offline-prototype/src/main.tsx`
- **Styles:** `drill-offline-prototype/src/styles.css`
- **Fixtures:** `drill-offline-prototype/src/fixtures/`
- **Assets:** `drill-offline-prototype/public/assets/figma/`
- **Design source:** Figma node `69:14041`
- **Scope:** 11-screen, one-session Drill flow with no subtests or TO transition logic
- **Prompt pair:** [`DRILL_PLANNER_PROMPT.md`](DRILL_PLANNER_PROMPT.md) and [`DRILL_BUILDER_PROMPT.md`](DRILL_BUILDER_PROMPT.md)

The Drill worktree is located at `/Users/fa-2400/Documents/ChatGPT/Drill Offline`. Confirm Git registration with:

```sh
git worktree list
```

Run the Drill preview from the `drill-offline-prototype/` directory, not from the parent TO app:

```sh
npm run dev -- --host 127.0.0.1
```

The Drill Vite configuration owns port `3001`; the TO Vite configuration owns port `3000`.

## Isolation rules

1. TO changes stay in the TO worktree and must not add Drill routes or Drill fixtures to `src/main.tsx`.
2. Drill changes stay in `drill-offline-prototype/` on `feat/drill-dev` and must not import from the TO `src/` directory.
3. Similar UI can be implemented locally in both projects. Shared extraction is deferred until both prototypes have completed planner review.
4. `CRAFT-*` commits belong to TO. `DRILL-*` commits belong to Drill.
5. A browser URL alone is not evidence of project identity. Verify the Vite config, entrypoint, sidebar labels, and screen count before reviewing a preview.

## Review ownership

- TO planner reviews `CRAFT_PLAN.md` and TO evidence.
- Drill planner reviews `DRILL_STATUS.md`, the Drill task rows in `TASKS.md`, and Drill evidence.
- Builders set tasks to `Internal Review`; planners decide `Approved` or `Changes Requested`.
