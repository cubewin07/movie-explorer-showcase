# Movie Explorer Showcase – Why This Landing Page Exists

This repository hosts a narrative landing page for the Movie Explorer app. Its purpose is to communicate the product’s value within seconds, demonstrate core experiences with live data and motion, and convert curiosity into activation with a clear call-to-action.

- Live app CTA appears throughout and points to the main product.
- The page uses real TMDB data to make the story credible.
- Motion and micro-interactions preview how the app feels before sign‑up.

Launch the app: https://cubewin07.github.io/movie-explorer

## Why Create a Landing Page
- Clarify value fast: visitors immediately understand “discover together, discuss in real time”.
- Validate direction: motion prototypes plus live data reduce ambiguity for stakeholders.
- Increase activation: clear CTAs guide users into the full app when interest peaks.
- Lower friction: a guided, scroll-based narrative beats dropping users into complex flows.
- Shareable artifact: a single link that tells the product story for pitches and feedback.

## What It Demonstrates
- Orientation — Smart Discovery
  - A concise grid of trending titles with genre, year, and rating.
  - Components: [Orientation.jsx](file:///Users/letanthang/learning_software/React_projects/movie_explorer-showcase/src/components/acts/Orientation.jsx), [MockMovieCard.jsx](file:///Users/letanthang/learning_software/React_projects/movie_explorer-showcase/src/components/ui/MockMovieCard.jsx)
  - Data: [useTrendingMovies](file:///Users/letanthang/learning_software/React_projects/movie_explorer-showcase/src/hooks/useMovies.js), [axiosInstance](file:///Users/letanthang/learning_software/React_projects/movie_explorer-showcase/src/lib/axiosInstance.js)

- Discovery — Immersive Details
  - A cinematic detail panel with backdrop, cast pills, rating, runtime.
  - Component: [Discovery.jsx](file:///Users/letanthang/learning_software/React_projects/movie_explorer-showcase/src/components/acts/Discovery.jsx)
  - Data: [useFeaturedMovie](file:///Users/letanthang/learning_software/React_projects/movie_explorer-showcase/src/hooks/useMovies.js)

- Connection — Real‑time Community
  - Simulated chat with presence, typing indicator, and guided cursor motion to communicate the promise of instant conversation.
  - Component: [Connection.jsx](file:///Users/letanthang/learning_software/React_projects/movie_explorer-showcase/src/components/acts/Connection.jsx), [AutoDemoChat.jsx](file:///Users/letanthang/learning_software/React_projects/movie_explorer-showcase/src/components/ui/AutoDemoChat.jsx)

- Feedback — Active Engagement
  - Social proof via lightweight reviews that demonstrate quick reactions and discussions.
  - Component: [Feedback.jsx](file:///Users/letanthang/learning_software/React_projects/movie_explorer-showcase/src/components/acts/Feedback.jsx)

- Resilience — Technical Excellence
  - Highlights reliability, security, and responsiveness; data fetching is cached and resilient via React Query.
  - Component: [Resilience.jsx](file:///Users/letanthang/learning_software/React_projects/movie_explorer-showcase/src/components/acts/Resilience.jsx)
  - Provider: [main.jsx](file:///Users/letanthang/learning_software/React_projects/movie_explorer-showcase/src/main.jsx)

- Cohesion — Clear CTA
  - A strong call‑to‑action ties the narrative together and routes to the app.
  - Component: [Cohesion.jsx](file:///Users/letanthang/learning_software/React_projects/movie_explorer-showcase/src/components/acts/Cohesion.jsx)

## Tech Stack
- React + Vite for fast builds and HMR.
- Tailwind CSS for design system and responsive layout.
- Framer Motion for scroll‑aware motion and micro‑interactions.
- React Query for data fetching, caching, and resilience.
- Axios + TMDB API for real movie data.
- Lenis for smooth scroll experience.

## Architecture Overview
- Narrative flow
  - Scroll‑based sections orchestrated in [App.jsx](file:///Users/letanthang/learning_software/React_projects/movie_explorer-showcase/src/App.jsx) with Lenis.
  - A hero banner combines live cards and chat preview: [Hero.jsx](file:///Users/letanthang/learning_software/React_projects/movie_explorer-showcase/src/components/Hero.jsx).
- Data layer
  - Queries: [useMovies.js](file:///Users/letanthang/learning_software/React_projects/movie_explorer-showcase/src/hooks/useMovies.js)
  - HTTP client: [axiosInstance.js](file:///Users/letanthang/learning_software/React_projects/movie_explorer-showcase/src/lib/axiosInstance.js)
- UI composition
  - Reusable section wrapper: [Section.jsx](file:///Users/letanthang/learning_software/React_projects/movie_explorer-showcase/src/components/Section.jsx)
  - UI primitives: [MockMovieCard.jsx](file:///Users/letanthang/learning_software/React_projects/movie_explorer-showcase/src/components/ui/MockMovieCard.jsx), [MockChatInterface.jsx](file:///Users/letanthang/learning_software/React_projects/movie_explorer-showcase/src/components/ui/MockChatInterface.jsx)

## Run Locally
- Requirements: Node 18+ recommended
- Environment
  - Create `.env` with `VITE_TMDB_AUTH_TOKEN` set to a valid TMDB bearer token (used in [axiosInstance.js](file:///Users/letanthang/learning_software/React_projects/movie_explorer-showcase/src/lib/axiosInstance.js)).
- Install and start
  - `npm install`
  - `npm run dev`
- Lint
  - `npm run lint`
- Deploy (optional, GitHub Pages)
  - `npm run build`
  - `npm run deploy`
