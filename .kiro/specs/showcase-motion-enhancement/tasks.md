# Implementation Plan: Showcase Motion Enhancement

## Overview

This plan converts the design into incremental, test-driven coding steps. It builds the
testable pure-function core first (with fast-check property tests), then the React hooks and
the `PinnedScene` scrollytelling engine, then rewrites the Connection act (deleting
`AutoDemoChat.jsx`), and finally wires all six acts into pinned scenes inside `App.jsx`.

Implementation language: **JavaScript (JSX)** — matching the existing React 19 + Vite stack.
Tests use **Vitest + React Testing Library + fast-check** (added as dev dependencies).

The pure decision logic (`normalizeProgress`, `revealedCount`, `resolveSceneState`,
`shouldLoop`, `pickBreakpoint`, `contrastRatio`) lives in `src/scrolly/logic/` and
`src/design/` so it can be property-tested in isolation from React/DOM.

## Tasks

- [ ] 1. Set up test tooling
  - [ ] 1.1 Add Vitest, React Testing Library, and fast-check; configure the test runner
    - Add `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`, `jsdom`, and `fast-check` to `devDependencies` in `package.json` (only if not already present)
    - Add `"test": "vitest run"` and `"test:watch": "vitest"` scripts to `package.json`
    - Create `vitest.config.js` with the `jsdom` environment and a setup file
    - Create `src/test/setup.js` importing `@testing-library/jest-dom`
    - _Requirements: 4.1, 5.3, 7.1 (test harness for verification)_

- [ ] 2. Build the centralized design-token module and wire it into Tailwind/CSS
  - [ ] 2.1 Create the design-token module
    - Create `src/design/tokens.js` exporting `motion` (easing curves + durations), `typeScale` (≥5 steps), `space` (≥5 steps), `gradients` (≥2), and `colorRoles` (all named roles)
    - Keep all motion `duration` values within [200, 1200] ms
    - _Requirements: 2.1, 7.6_

  - [ ] 2.2 Wire color tokens into CSS variables and Tailwind
    - In `src/index.css`, define every color role for both `:root` (light) and `.dark` themes (background, surface, primary, secondary, accent, body-text, heading-text, border, plus gradient stops), with no empty values
    - In `tailwind.config.js`, map `theme.extend.colors` to the HSL CSS variables and add gradient/typography references so components use `bg-background`, `text-body-text`, `from-primary`, etc.
    - _Requirements: 2.2, 2.3, 2.4, 2.6_

  - [ ] 2.3 Implement the `contrastRatio` helper
    - Create `src/design/contrast.js` exporting `contrastRatio(fgHsl, bgHsl)` using WCAG relative-luminance, returning a value in [1, 21]
    - _Requirements: 2.5_

  - [ ]* 2.4 Write example/unit tests for tokens and contrast
    - Assert token module exposes all color roles, ≥2 gradients, ≥5 type steps, ≥5 spacing steps
    - Assert every color role resolves to a non-empty value in light and dark themes
    - Assert `contrastRatio` body/background ≥ 4.5:1 and heading/background ≥ 3.0:1 per theme, plus symmetry and [1,21] range
    - _Requirements: 2.1, 2.3, 2.5_

  - [ ]* 2.5 Write property test for motion duration tokens
    - **Property 7: Motion duration tokens stay within the allowed bound**
    - **Validates: Requirements 7.6**
    - Enumerate token-table duration values; assert each is within [200, 1200]; tag `// Feature: showcase-motion-enhancement, Property 7`; `numRuns >= 100`

- [ ] 3. Implement the pure scene-logic core with property-based tests
  - [ ] 3.1 Implement `normalizeProgress`
    - Create `src/scrolly/logic/progress.js` exporting `normalizeProgress(scrollTop, trackTop, trackHeight, viewportH)` that clamps to [0,1] and maps linearly across the track
    - _Requirements: 1.1, 1.2, 1.4_

  - [ ]* 3.2 Write property test for `normalizeProgress`
    - **Property 1: Progress normalization is total, clamped, and monotonic**
    - **Validates: Requirements 1.1, 1.2**
    - Generators: random `scrollTop`, `trackTop`, `trackHeight > 0`, `viewportH`; assert result in [0,1] and non-decreasing for `s1 <= s2`; tag `// Feature: showcase-motion-enhancement, Property 1`; `numRuns >= 100`

  - [ ] 3.3 Implement `revealedCount`
    - Create `src/scrolly/logic/chat.js` exporting `revealedCount(progress, timeline)` returning how many messages are revealed for a fixed-order, ascending-`revealAt` timeline
    - _Requirements: 4.2, 4.6_

  - [ ]* 3.4 Write property test for `revealedCount`
    - **Property 2: Chat message reveal is monotonic and fully revealed at progress 1**
    - **Validates: Requirements 4.2, 4.6**
    - Generators: random sorted `ChatTimeline`, ordered progress pairs `p1 <= p2` in [0,1]; assert monotonic, result in [0, length], and `revealedCount(1, timeline) === timeline.length`; tag `// Feature: showcase-motion-enhancement, Property 2`; `numRuns >= 100`

  - [ ] 3.5 Implement `resolveMotionMode` and `resolveSceneState`
    - Create `src/scrolly/logic/motionMode.js` exporting `resolveMotionMode(reduced)` (`'static' | 'animated'`) and `resolveSceneState(progress, timeline, reduced)` returning `{ mode, revealedCount, phase }`, where `reduced` forces the final static state
    - _Requirements: 1.6, 5.1, 5.2, 5.6, 7.7_

  - [ ]* 3.6 Write property test for `resolveSceneState` / reduced-motion override
    - **Property 3: Reduced motion forces final static state everywhere**
    - **Validates: Requirements 1.6, 5.1, 5.2, 5.6, 7.7**
    - Generators: random progress, timeline, visibility ratio with `reduced = true`; assert `mode === 'static'`, `revealedCount === timeline.length`, and `shouldLoop(ratio, true) === false`; tag `// Feature: showcase-motion-enhancement, Property 3`; `numRuns >= 100`

  - [ ] 3.7 Implement `shouldLoop`
    - Create `src/scrolly/logic/loopGate.js` exporting `shouldLoop(visibilityRatio, reduced)` that returns false when off-screen or reduced, and is threshold-monotonic in visibility
    - _Requirements: 6.4, 5.6_

  - [ ]* 3.8 Write property test for `shouldLoop`
    - **Property 4: Off-screen scenes do not loop**
    - **Validates: Requirements 6.4**
    - Generators: random visibility ratios including 0, both `reduced` values; assert false at `visibilityRatio === 0` and threshold-monotonicity; tag `// Feature: showcase-motion-enhancement, Property 4`; `numRuns >= 100`

  - [ ] 3.9 Implement `pickBreakpoint`
    - Create `src/scrolly/logic/breakpoints.js` exporting `pickBreakpoint(width)` returning exactly one of mobile `[320,767]`, tablet `[768,1023]`, desktop `[1024,3840]`
    - _Requirements: 3.1, 3.2, 3.3, 3.7_

  - [ ]* 3.10 Write property test for `pickBreakpoint`
    - **Property 5: Breakpoint selection partitions every viewport width**
    - **Validates: Requirements 3.7**
    - Generators: random width in [320, 3840]; assert exactly one breakpoint contains the width (mutually exclusive, jointly exhaustive); tag `// Feature: showcase-motion-enhancement, Property 5`; `numRuns >= 100`

  - [ ] 3.11 Implement the active-act selector
    - Create `src/scrolly/logic/activeAct.js` exporting a selector that takes per-act visibility ratios and returns at most one active act, never selecting one below the 30% threshold when another meets it
    - _Requirements: 7.3_

  - [ ]* 3.12 Write property test for the active-act selector
    - **Property 6: At most one act is the active motion scene**
    - **Validates: Requirements 7.3**
    - Generators: random arrays of visibility ratios; assert at most one active act and correct 30%-threshold precedence; tag `// Feature: showcase-motion-enhancement, Property 6`; `numRuns >= 100`

- [ ] 4. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 5. Build the motion hooks and scrollytelling engine
  - [ ] 5.1 Implement `useReducedMotionPreference`
    - Create `src/hooks/useReducedMotionPreference.js` wrapping Framer's `useReducedMotion` plus a live `matchMedia('(prefers-reduced-motion: reduce)')` `change` listener, guarding `window.matchMedia` absence
    - _Requirements: 5.1, 5.4, 5.5_

  - [ ]* 5.2 Write unit test for `useReducedMotionPreference`
    - Render the hook and assert it flips to reduced on a `matchMedia` `change` to "reduce" and back to animated on change away
    - _Requirements: 5.4, 5.5_

  - [ ] 5.3 Implement `useSceneProgress`
    - Create `src/components/scrolly/useSceneProgress.js` wrapping `useScroll({ target, offset: ['start start','end end'] })`, returning a constant MotionValue locked at 1 when `reducedMotion` is set, and re-exporting the pure `normalizeProgress`
    - _Requirements: 1.1, 1.2, 1.4, 1.6_

  - [ ] 5.4 Implement `useInViewGate`
    - Create `src/hooks/useInViewGate.js` wrapping Framer's `useInView` (IntersectionObserver) with an `amount: 0.3` variant, returning `inView` and a `shouldLoop` flag derived from the pure `shouldLoop` helper
    - _Requirements: 6.4, 7.2, 7.3_

  - [ ] 5.5 Implement `PinnedScene`
    - Create `src/components/scrolly/PinnedScene.jsx` rendering the `relative h-[{pinVh}vh]` track + `sticky top-0 h-screen overflow-hidden` panel in normal mode, and a single natural-height section with `staticProgress = 1` in reduced mode; consume `useReducedMotionPreference` and `useSceneProgress`; expose children as a render-prop receiving progress; apply `will-change` only while active
    - _Requirements: 1.1, 1.3, 1.5, 1.6, 5.2, 6.1_

- [ ] 6. Rewrite the Connection act
  - [ ] 6.1 Replace `AutoDemoChat` with scroll-driven `ConnectionChat`
    - Delete `src/components/ui/AutoDemoChat.jsx`
    - Create `src/components/ui/ConnectionChat.jsx` with a fixed `CHAT_TIMELINE` (ascending `revealAt`), revealing messages via `revealedCount(progress, timeline)`, animating with opacity + translateY/scale only (no layout properties), no cursor element at any progress, a persistent "Online" presence status, and a typing indicator before the next incoming message
    - Loop typing dots and delivery ticks with a fixed 1.4 s cycle gated by `useInViewGate`, independent of scroll progress
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6_

  - [ ] 6.2 Rewrite `Connection.jsx` to use `PinnedScene`
    - Rewrite `src/components/acts/Connection.jsx` to render `PinnedScene` and pass scene progress into `ConnectionChat`; remove the old `useScroll`/sticky boilerplate and the `AutoDemoChat` import; source colors/gradients/typography from design tokens
    - _Requirements: 1.1, 4.2, 2.2, 2.6, 7.6_

  - [ ]* 6.3 Write example tests for `ConnectionChat`
    - Assert no cursor element renders at progress 0, 0.5, 1
    - Assert animated style keys are a subset of `{opacity, x, y, scale, rotate, transform}` (no `width/height/top/left/margin`)
    - Assert typing/delivery loop cycle duration is within [1s, 2s] and not bound to progress
    - _Requirements: 4.1, 4.3, 4.5_

- [ ] 7. Integrate all six acts into pinned scenes
  - [ ] 7.1 Convert Orientation to a `PinnedScene`
    - Rewrite `src/components/acts/Orientation.jsx` to map scene progress to a transform/opacity-only assemble/parallax sequence using token easing/durations and token colors
    - _Requirements: 1.1, 1.4, 6.1, 7.2, 7.6, 2.2_

  - [ ] 7.2 Convert Discovery to a `PinnedScene`
    - Rewrite `src/components/acts/Discovery.jsx` to scale/fade the featured backdrop and stagger the detail panel/cast pills via `useTransform`, consuming already-available data with static fallback
    - _Requirements: 1.1, 1.4, 6.1, 7.2, 7.6, 2.2_

  - [ ] 7.3 Convert Feedback to a `PinnedScene`
    - Rewrite `src/components/acts/Feedback.jsx` with an action→success morph (scale/opacity) and a toast slide-in using transform-only motion and token values
    - _Requirements: 1.1, 1.4, 6.1, 7.2, 7.6, 2.2_

  - [ ] 7.4 Convert Resilience to a `PinnedScene`
    - Rewrite `src/components/acts/Resilience.jsx` with an error→recovery sequence and a retry affordance fading through, transform/opacity only
    - _Requirements: 1.1, 1.4, 6.1, 7.2, 7.6, 2.2_

  - [ ] 7.5 Convert Cohesion to a `PinnedScene` with the live-app CTA
    - Rewrite `src/components/acts/Cohesion.jsx` to resolve the brand gradient and present a CTA linking to the live Movie Explorer app once ≥30% visible (via `useInViewGate` 0.3 variant); add a reachability guard (timeout ≤5 s) that flips the CTA to an "unavailable" state while retaining all rendered content
    - _Requirements: 7.4, 7.5, 1.1, 6.1, 7.6, 2.2_

  - [ ] 7.6 Wire acts into `App.jsx` in fixed order
    - Update `src/App.jsx` to render Orientation → Discovery → Connection → Feedback → Resilience → Cohesion in fixed order under the `ReactLenis` root, with an `overflow-x` guard on the root container
    - _Requirements: 7.1, 3.4_

- [ ] 8. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 9. Integration and example tests for assembled behavior
  - [ ]* 9.1 Write test asserting fixed act order
    - Render `App` and assert acts appear in fixed DOM order Orientation→Cohesion
    - _Requirements: 7.1_

  - [ ]* 9.2 Write reduced-motion visibility test
    - With reduced motion active, assert all narrative text and CTAs render fully visible (no opacity-0 gating) and looping indicators render a single static frame
    - _Requirements: 5.2, 5.3, 5.6_

  - [ ]* 9.3 Write responsive/transform-only example tests
    - Assert animated style keys across motion components are a subset of `{opacity, x, y, scale, rotate, transform}` (Req 6.1, 6.5)
    - Assert no horizontal overflow (`scrollWidth <= clientWidth`) at sampled widths and that headings draw size/line/weight from `typeScale`
    - _Requirements: 3.4, 6.1, 6.5, 2.6_

- [ ] 10. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional test sub-tasks and can be skipped for a faster MVP.
- Each task references specific requirement sub-clauses for traceability.
- Property tests use `fast-check` with `fc.assert(fc.property(...), { numRuns: 100 })` minimum and carry a `// Feature: showcase-motion-enhancement, Property N: …` tag comment.
- All 7 correctness properties (P1–P7) are covered by tasks 3.2, 3.4, 3.6, 3.8, 3.10, 3.12, and 2.5.
- Layout, sticky/pin behavior, frame timing, and rendered visuals are covered by example/integration tests (tasks 6.3, 9.x), not property tests, per the design's Testing Strategy.

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1"] },
    { "id": 1, "tasks": ["2.1", "3.1", "3.3", "3.5", "3.7", "3.9", "3.11"] },
    { "id": 2, "tasks": ["2.2", "2.3", "3.2", "3.4", "3.6", "3.8", "3.10", "3.12"] },
    { "id": 3, "tasks": ["2.4", "2.5", "5.1", "5.3", "5.4"] },
    { "id": 4, "tasks": ["5.2", "5.5"] },
    { "id": 5, "tasks": ["6.1", "7.1", "7.2", "7.3", "7.4", "7.5"] },
    { "id": 6, "tasks": ["6.2", "6.3"] },
    { "id": 7, "tasks": ["7.6"] },
    { "id": 8, "tasks": ["9.1", "9.2", "9.3"] }
  ]
}
```
