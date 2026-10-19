# FrontHire Data Model

All application data is described by types in `src/types/application.ts`. Nothing outside that file defines new structural shapes for application records.

## `ApplicationStatus`

```ts
type ApplicationStatus =
  | 'saved'
  | 'applied'
  | 'assessment'
  | 'interview'
  | 'offer'
  | 'rejected';

  JobType
ts
type JobType = 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
InterviewFormat
ts
type InterviewFormat = 'Online' | 'Phone' | 'In-person';
JobApplication
Field	Type	Required	Notes
id	string	yes	Unique. Generated on creation.
company	string	yes	
position	string	yes	
location	string	yes	
status	ApplicationStatus	yes	
dateApplied	string	yes	YYYY-MM-DD
jobType	JobType	yes	
interviewDate	string	no	YYYY-MM-DD
interviewTime	string	no	HH:mm
interviewFormat	InterviewFormat	no	
meetingLink	string	no	If set, rendered as a "Join meeting" anchor in InterviewCard.
interviewNotes	string	no	Free text. Rendered in a bordered block on the card.
Optional fields must be tolerated by every reader. InterviewCard in particular renders correctly with any subset present.

Persistence
Storage medium: browser localStorage.

Key: fronthire-applications.

Value: JSON.stringify(JobApplication[]).

On mount, the provider parses this key; if it is absent, unparseable, or not an array, the provider loads mockApplications.

The provider is the only code path that reads or writes this key.

Invariants
id is unique across all applications in storage.

status is always one of the six ApplicationStatus values.

jobType is always one of the four JobType values.

interviewFormat, if present, is one of the three InterviewFormat values.

Any interview field may be present independently of the others.

text

---

### File 3 — `docs/setup.md` (replace — current file is truncated)

```markdown
# FrontHire Setup

## Requirements

- Node.js 20 or newer
- npm 10 or newer
- A modern browser (Chrome, Firefox, Safari, Edge)
- Git

The project is developed in GitHub Codespaces, but any local Node.js environment works.

## First-time setup

From a fresh clone:

```bash
npm install
npm run dev
Open the printed http://localhost:5173 URL.

Scripts
Command	Purpose
npm run dev	Start the Vite dev server with hot module reload
npm run build	Type-check and produce a production build in dist/
npm run preview	Serve the production build locally
npm run lint	Run ESLint over src/
Definition of done for any change
npm run lint passes

npm run build passes

The change has been manually tested

The relevant files in docs/ are updated

The change is committed and pushed

Before pushing, always run:

bash
git fetch origin
git status
If git status reports behind 'origin/main', integrate the remote changes first:

bash
git pull --rebase origin main
npm run lint
npm run build
git push
Never force-push main.

Reset local application data
Application data is stored in localStorage under the key fronthire-applications. To reset to seed data: open DevTools → Application → Local Storage → delete the fronthire-applications key → reload the page.

text

---

### File 4 — `docs/testing.md` (new)

```markdown
# FrontHire Testing

## Current state

Testing is manual. Automated test infrastructure (Vitest, React Testing Library, or Playwright) is planned for a later phase and is not yet installed.

## Manual testing checklist

Before declaring any change done, verify the checklist for the affected area in [features.md](./features.md). Each feature section there describes the expected behavior a tester should confirm.

## Planned automated coverage

When automated testing is added, the target coverage is:

1. **Unit** — pure helpers such as date formatting in `InterviewCard`, and status filtering logic.
2. **Component** — form validation in `ApplicationForm`, delete confirmation flow in the modal, `InterviewCard` rendering with each combination of optional interview fields.
3. **Integration** — the full add → edit → delete lifecycle against `ApplicationsProvider` including `localStorage` round-trip.
4. **Accessibility** — `Modal` focus trap and `Escape` handling; keyboard traversal of the sidebar and mobile drawer; `InterviewCard` meeting-link focusability.
5. **End-to-end** — a Playwright flow that adds an application, navigates to Interviews, confirms the card renders, and confirms the meeting link opens in a new tab.

This file will be filled in with exact test names and file paths when the tooling is introduced.
