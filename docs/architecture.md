# FrontHire Architecture

## Technology stack

- React 18 with TypeScript
- Vite (dev server and production build)
- Tailwind CSS
- React Router
- Lucide React (icons)
- React Context API for shared state
- `localStorage` for persistence
- ESLint for static analysis

## Source layout
src/
├── components/
│ ├── applications/ ApplicationFilters, ApplicationForm, ApplicationTable
│ ├── dashboard/ RecentApplications, StatCard, StatusBadge
│ ├── interviews/ InterviewCard, InterviewEmptyState
│ ├── layout/ Header, Sidebar
│ └── ui/ Modal
├── context/
│ ├── applications-context.ts Context object + typed shape
│ └── ApplicationsProvider.tsx Provider, reducer/state, localStorage sync
├── data/
│ └── mockApplications.ts Seed data for first run
├── hooks/
│ └── useApplications.ts Typed consumer of the context
├── layouts/
│ └── MainLayout.tsx Header + Sidebar + <Outlet />
├── pages/
│ ├── ApplicationsPage.tsx
│ ├── DashboardPage.tsx
│ ├── InterviewsPage.tsx
│ └── SettingsPage.tsx
├── routes/
│ └── AppRoutes.tsx
├── types/
│ └── application.ts
└── main.tsx


## State flow

The application has exactly one source of truth for application data: `ApplicationsProvider`.

localStorage["fronthire-applications"]
│
▼ (read on mount, validated)
ApplicationsProvider state
│
├── addApplication(next) → state + localStorage
├── updateApplication(id, patch) → state + localStorage
└── deleteApplication(id) → state + localStorage
│
▼ (useApplications())
Pages and components


Rules:

- Components never read from `localStorage` directly.
- Components never write to `localStorage` directly.
- Components consume only `useApplications()`.
- The provider is the sole writer of the `fronthire-applications` key.

## Routing

`AppRoutes` is the single place routes are declared. `MainLayout` wraps every page, so navigation is identical across routes. Adding a new page is: create the page in `src/pages/`, register the route in `AppRoutes`, add a navigation link in `Sidebar`.

## Accessibility conventions

- Interactive elements are real `<button>`, `<a>`, or `<input>` elements — never `div` with `onClick`.
- Every icon that is decorative carries `aria-hidden="true"`.
- The `Modal` primitive traps focus, restores it to the trigger on close, and closes on `Escape`.
- Visible `focus-visible` ring on every interactive element.
- Form inputs have associated `<label>` elements; dynamic errors are announced via `aria-live`.

## Build and quality gates

The definition of done for any change is:

1. `npm run lint` passes
2. `npm run build` passes
3. The change is manually tested
4. Documentation is updated
5. The change is committed and pushed

See [development-log.md](./development-log.md) for the chronological record.

