## 2026-10-19 — Establish documentation baseline

Brought the six documentation files up to date with the current implementation so future feature work can append to them:

- `architecture.md` — stack, source layout, state flow, routing, accessibility conventions, quality gates
- `data-model.md` — full type definitions, field reference, persistence contract, invariants
- `features.md` — inventory of every implemented feature (unchanged, verified against current code)
- `setup.md` — completed truncated code block; added scripts table and pre-push workflow
- `testing.md` — recorded current manual-testing status and planned automated coverage
- `development-log.md` — this entry

Verified with `npm run lint` and `npm run build`.

## 2026-10-19 — Fix: Interview meeting link markup
- Replaced invalid JSX in `InterviewCard.tsx` (stray closing `</a>` with no opening anchor) with a single accessible anchor using `href={application.meetingLink}`, `target="_blank"`, and `rel="noreferrer"`.
- Added ternary fallback: "Phone interview" text when no link exists and format is `Phone`; renders nothing otherwise.
- Verified with `npm run lint` and `npm run build`.

