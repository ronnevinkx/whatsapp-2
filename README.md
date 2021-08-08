# WhatsApp 2.0

A Next.js app mimicking WhatsApp Web with Firebase and styled-components.

## Table of Contents

-   [Technologies](#technologies)
-   [Notes](#notes)
-   [Scripts](#scripts)
-   [Issues](#issues)
-   [Resources](#resources)

---

## Technologies

**Core**

-   Next.js
-   Firebase
-   react-firebase-hooks
-   TypeScript

**Styling**

-   styled-components
-   Material UI

**Helpers**

-   Moment.js
-   timeago-react
-   email-validator
-   react-loader-spinner

## Notes

Based on [this](https://www.youtube.com/watch?v=svlEVg0To_c) Sonny Sangha tutorial, with the following adjustments:

-   Built the search form: filters chat names
-   Rebuilt the "create chat" functionality, not through a prompt but with a modal
-   Theming with styled-components
-   Custom styles
-   Google account `displayName` in header
-   Once logged in, database stores Google displayName in users collection and displays it in chats list
-   Optimized sign-out UX
-   Permanently redirected `/login` route to `/` via `next.config.js`
-   Stricter ESLint setup

Bootstrapped with create-next-app: `npx create-next-app --ts`

## Scripts

| Description          | Command         | Value        |
| -------------------- | --------------- | ------------ |
| Start the dev server | `npm run dev`   | `next dev`   |
| Build Next.js app    | `npm run build` | `next build` |
| Start the server     | `npm run start` | `next start` |
| Run ESLint           | `npm run lint`  | `next lint`  |

## Resources

-   [Material Icons](https://material-ui.com/components/material-icons/)
-   [WhatsApp 2.0 tutorial](https://www.youtube.com/watch?v=svlEVg0To_c) by @sonnysangha
