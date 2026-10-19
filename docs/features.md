# FrontHire Features

This document lists every user-facing feature that is currently implemented and verified. A feature belongs here only if its code compiles, `npm run lint` and `npm run build` pass, and it has been manually tested.

For the data model, see [data-model.md](./data-model.md). For the source-code layout and state flow, see [architecture.md](./architecture.md).

---

## Foundations

### TypeScript application data model
`src/types/application.ts` defines `ApplicationStatus`, `JobType`, `InterviewFormat`, and `JobApplication`. All application data flowing through the app is typed against these definitions. See [data-model.md](./data-model.md).

### Mock seed data
`src/data/mockApplications.ts` provides sample applications used on first load when no persisted data exists.

### React Router configuration
`src/routes/AppRoutes.tsx` wires the four routes:

- `/` → Dashboard
- `/applications` → Applications
- `/interviews` → Interviews
- `/settings` → Settings

All four routes render inside the shared `MainLayout`.

### Shared application state via Context API
`ApplicationsProvider` (`src/context/ApplicationsProvider.tsx`) exposes `applications`, `addApplication`, `updateApplication`, and `deleteApplication` to every descendant. Consumed through the `useApplications()` hook in `src/hooks/useApplications.ts`.

### localStorage persistence
Applications are written to `localStorage` under the key `fronthire-applications`. On startup the provider attempts to parse this key; if it is absent or invalid, it falls back to `mockApplications`.

---

## Layout and navigation

### Desktop sidebar
`src/components/layout/Sidebar.tsx` renders persistent navigation on `lg` and wider screens.

### Mobile navigation drawer
Below `lg`, a hamburger control opens an off-canvas drawer containing the same navigation links. The drawer is keyboard-accessible, closes on route change, and closes on `Escape`.

### Header with search
`src/components/layout/Header.tsx` shows a search input, a notifications placeholder, and a profile placeholder. Search state drives filtering on the Applications page.

---

## Dashboard

### Statistics cards
`src/components/dashboard/StatCard.tsx` displays aggregate counts (total, applied, interviewing, offers, etc.) computed from the shared application state.

### Recent applications
`src/components/dashboard/RecentApplications.tsx` shows a summary table of the most recent applications, linking through to `/applications`.

### Status badges
`src/components/dashboard/StatusBadge.tsx` renders the colored pill for each application status. Color and label are derived from `ApplicationStatus`.

---

## Applications

### Application table
`src/components/applications/ApplicationTable.tsx` lists applications with company, position, location, status, and date applied. Each row exposes edit and delete controls.

### Search
Filtering by company, position, and location via the header search input. Matching is case-insensitive and live.

### Filter by status
`src/components/applications/ApplicationFilters.tsx` lets the user narrow the list to a single `ApplicationStatus` or show all.

### Add application
`src/components/applications/ApplicationForm.tsx` opens inside the shared `Modal`. Required fields (`company`, `position`, `status`) are validated. On submit, `addApplication` updates context and persists to `localStorage`.

### Edit application
Reuses the same form, pre-filled with the selected application. On submit, `updateApplication` replaces the record in context and `localStorage`.

### Delete application with confirmation
Delete opens a confirmation modal. Only after the user confirms is `deleteApplication` called. The confirmation shows the company and position to prevent accidental deletion.

### Conditional interview fields
When the form's status is `interview` (or when the user chooses to add interview details), the interview fields — `interviewDate`, `interviewTime`, `interviewFormat`, `meetingLink`, `interviewNotes` — become visible and optional.

### Accessible modal
`src/components/ui/Modal.tsx` is the shared dialog primitive used by the application form and delete confirmation. It traps focus, closes on `Escape`, closes on backdrop click, and restores focus to the trigger.

---

## Interviews

### Interview statistics
The Interviews page shows counts of applications that carry interview details, split by status and format, derived from shared application state.

### Interview cards
The Interviews page (src/pages/InterviewsPage.tsx) lists applications whose status is interview and which have at least one of interviewDate, interviewTime, interviewFormat, meetingLink, or interviewNotes set. Each matching application is rendered by src/components/interviews/InterviewCard.tsx. The card displays:

- Position, company, and location
- Interview date (formatted with `toLocaleDateString('en-ZA', { weekday, year, month, day })`)
- Interview time, or “Time to be confirmed” if unset
- Interview format with a matching icon (`Online` → `Video`, `Phone` → `Phone`, `In-person` → `Users`, unset → `MapPin`), or “Format not specified” if unset
- Interview notes, if present, in a bordered block

### Meeting link behavior
- **If `meetingLink` is set:** the card renders a “Join meeting” anchor with `href={application.meetingLink}`, `target="_blank"`, and `rel="noreferrer"`, plus the `ExternalLink` icon. The anchor has a visible `focus-visible` ring.
- **If `meetingLink` is not set and the format is `Phone`:** the card shows the plain text “Phone interview” and no button.
- **Otherwise (any other format without a link, or no format):** the card renders nothing in the action area.

### Interview empty state
`src/components/interviews/InterviewEmptyState.tsx` renders when no application carries interview details. It explains the empty state and points the user back to Applications to add one.

### Missing-data handling
A card renders with any combination of interview fields present. It never throws on missing `interviewDate`, `interviewTime`, `interviewFormat`, `meetingLink`, or `interviewNotes`.

---

## Settings

The Settings page currently renders as a placeholder. No user-facing settings are implemented yet.