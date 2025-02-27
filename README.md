This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Task Management Application
A dynamic and interactive task management application built with Next.js, Redux Toolkit, and Tailwind CSS. This application allows users to add, edit, delete, filter, sort, and search tasks. Tasks are persisted in local storage, ensuring data is retained across page refreshes.

## Features
Add Tasks: Add new tasks with a title, description, due date, priority, and status.

Edit Tasks: Update the status and priority of existing tasks.

Delete Tasks: Remove tasks from the list.

Filter Tasks: Filter tasks by status (todo, in-progress, done) and priority (low, medium, high).

Search Tasks: Search tasks by title or description.

Sort Tasks: Sort tasks by due date or priority.

Error Handling: Display toast notifications for successful or failed actions.

Responsive Design: The application is fully responsive and works on all screen sizes.

## Technologies Used
Next.js: A React framework for building server-rendered applications.

Redux Toolkit: A state management library for managing global application state.

Tailwind CSS: A utility-first CSS framework for styling the application.

React Toastify: A library for displaying toast notifications.



## Getting Started

First, run the development server:

```bash
npm install
and
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
## Approach
State Management
Redux Toolkit is used to manage the application's global state. The taskSlice handles all task-related actions (add, edit, delete) and state updates.

Local Storage is used to persist tasks, ensuring data is retained even after a page refresh.

Filtering, Sorting, and Searching
Filtering: Tasks can be filtered by status and priority using dropdowns.

Sorting: Tasks can be sorted by due date or priority.

Searching: Tasks can be searched by title or description using a search input.

Error Handling
React Toastify is used to display toast notifications for successful or failed actions (e.g., adding, editing, or deleting tasks).

Styling
Tailwind CSS is used for styling the application. It provides a responsive and modern design with minimal custom CSS.
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
