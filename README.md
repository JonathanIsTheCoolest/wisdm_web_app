This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Styling Conventions

This project uses **SASS (.scss)** for all styling. Please follow these conventions:

### General Styling Rules
- All styles are written in `.scss` files.
- Use variables and mixins from `src/styles/variables.scss` for all colors, font sizes, spacing, etc.
- Use common classes from `src/styles/classes.scss` for shared layout and component styles.
- Global styles are defined in `src/styles/globals.scss` and imported at the root level.
- The root of all styles is `src/styles/main.scss`.

### Class Naming
- Use camelCase with an uppercase letter for each new word, no dashes. Example: `.pageWrapper`, `.pageContainer`, `.pageContent`.

### Variable Naming
- Variables follow the format: `$variable-where-what`, e.g., `$font-size-header-small`.

### Style File Structure
- `src/styles/classes.scss`: Common classes (wrappers, containers, buttons, forms, etc.)
- `src/styles/variables.scss`: All SASS variables (colors, fonts, borders, paddings, margins, etc.)
- `src/styles/globals.scss`: Global styles inherited across all pages/components (e.g., light/dark mode)
- `src/styles/main.scss`: Root of all styles, especially fonts

### Layered Class Structure
- Use the following structure for page-level classes:
  ```scss
  .pageWrapper {
    .pageContainer {
      .pageContent {
      }
    }
  }
  ```

### Sizing and Styling
- Do **not** use `rem` or `em` for sizing. Always use variables from `variables.scss`.
- Example:
  ```scss
  .buttonWrapper {
    margin: $margin-medium;
    border-radius: $button-radius;
  }
  ```

### Font Inheritance
- Inherit font styles from the highest possible layer (e.g., `.pageWrapper` or `.startScreenWrapper`).
- Only use custom font colors at lower levels if necessary.

For more details, see the comments in the respective `.scss` files in `src/styles/`.

## Project Rules & Conventions

This project follows a set of rules and best practices to ensure code quality, maintainability, and consistency across the codebase:

### 1. Code Style & Formatting
- Use TypeScript for all code (no `any` types unless absolutely necessary; always prefer specific types and interfaces).
- Use Prettier and ESLint for code formatting and linting. Run these tools before committing code.
- Write clear, descriptive variable and function names. Avoid abbreviations unless they are widely understood.

### 2. File & Directory Organization
- Organize code by feature and function:
  - `src/components/`: Reusable UI components
  - `src/hooks/`: Custom React hooks
  - `src/services/`: API and business logic
  - `src/redux_lib/`: Redux state management
  - `src/types/`: TypeScript type definitions
  - `src/styles/`: All SASS styling files
- Keep files small and focused. Split large files into logical modules.

### 3. Naming Conventions
- Use camelCase for variables, functions, and file names.
- Use PascalCase for React components and TypeScript types/interfaces.
- Use the established SASS class naming convention (see Styling Conventions above).

### 4. Type Safety
- Avoid using `any`. Always define and use explicit types and interfaces.
- Keep type definitions in `src/types/` and import them where needed.

### 5. Error Handling
- Handle errors gracefully in all async code. Return consistent error objects and display user-friendly messages in the UI.
- Remove or replace all `console.log`/`console.error` statements with a proper logging mechanism or environment-based logging.

### 6. Environment Variables
- Store all sensitive or environment-specific values in `.env` files. Validate required environment variables at runtime.

### 7. Testing
- Write unit and integration tests for critical logic, hooks, and reducers. Use Jest and React Testing Library.

### 8. Documentation
- Document all exported functions, hooks, and components with JSDoc comments.
- Keep this README and all documentation up to date.

### 9. Accessibility
- Ensure all interactive elements are accessible (labels, roles, keyboard navigation, etc.).

### 10. Dead Code & Cleanup
- Regularly remove unused code, variables, and imports. Address all TODOs and cleanup comments.

For more details on styling, see the Styling Conventions section above. For any questions about project rules, refer to this section or ask a project maintainer.

## Component Conventions

**Location:** `src/components/`

- Use PascalCase for component file and directory names (e.g., `Timeline/Timeline.tsx`).
- Export components as default unless there's a strong reason to use named exports.
- All components should be typed with TypeScript, including props and state.
- Use functional components and React hooks.
- Keep components focused and reusable. Extract logic into hooks or utility functions when possible.
- Import styles using SCSS modules or shared classes from `classes.scss`.
- Add JSDoc comments for all exported components.

## Hook Conventions

**Location:** `src/hooks/`

- Name all custom hooks with the `use` prefix (e.g., `useLoadingState`).
- Export hooks as named exports.
- Always type hook return values and parameters.
- Keep hooks focused on a single responsibility.
- Document expected usage and return values with JSDoc.

## Service Conventions

**Location:** `src/services/`

- Service files should encapsulate API calls and business logic.
- Export functions as named exports.
- Always type function parameters and return values.
- Handle errors gracefully and return consistent error objects.
- Do not use `console.log` for error reporting; use a logging utility or return errors to the caller.

## Type Definition Conventions

**Location:** `src/types/`

- Use PascalCase for all type and interface names.
- Group related types and interfaces together.
- Export all types and interfaces for use throughout the codebase.
- Avoid using `any`; prefer explicit types.
- Add comments to describe the purpose of each type/interface.

## Redux/State Management Conventions

**Location:** `src/redux_lib/`

- Use Redux Toolkit for slices, async thunks, and store configuration.
- Name slices with the feature they represent (e.g., `authSlice`, `userSlice`).
- Keep state shape flat and normalized.
- Type all state, actions, and thunks.
- Export actions and reducers from each slice.
- Use custom hooks (`useAppDispatch`, `useAppSelector`) for accessing state and dispatch.

## Utility/Helper Function Conventions

**Location:** `src/app/_lib/`

- Group helpers by domain (e.g., `helper/`, `user/`, `firebase/`).
- Export functions as named exports.
- Type all parameters and return values.
- Add JSDoc comments for all exported functions.
- Keep helpers pure and side-effect free when possible.

## General File & Directory Conventions

- Organize by feature and function.
- Keep files small and focused.
- Use index files for barrel exports where appropriate.
