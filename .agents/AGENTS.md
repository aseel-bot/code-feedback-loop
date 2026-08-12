# Strict Agent Instructions & Development Rules (AGENTS.md)

This file defines the mandatory, high-craft rules and standards that MUST be strictly followed during development in this project.

---

## 🎨 1. Design Engineering & Anti-Slop Guidelines
- **Visual Excellence**: Never generate basic, generic, or templated interfaces. Every UI must feel premium, state-of-the-art, and meticulously crafted.
- **Harmonious Color Systems**: Avoid default browser colors (e.g., plain `#ff0000` or `#0000ff`). Use curated HSL/OKLCH color palettes with rich dark modes, subtle glassmorphism (`backdrop-filter: blur()`), and smooth gradients.
- **Typography & Hierarchy**: Use modern web typography (e.g., *Inter*, *Outfit*, *Plus Jakarta Sans*, or *Geist*) with explicit optical sizing, tracking, and line heights.
- **Micro-Interactions**: Every interactive element (buttons, cards, inputs) must feature active states, subtle hover scale/glow effects, and instant visual feedback.
- **No Placeholders**: Never leave broken images or dummy placeholders. Use SVG graphics or generated media assets.

---

## ⚡ 2. Motion & Animation Craft
- **Purpose-Driven Motion**: Follow Emil Kowalski's design engineering philosophy. Motion must explain spatial relationships or provide feedback—never add motion just for decor.
- **Natural Physics**: Use spring dynamics or high-craft easing curves like `cubic-bezier(0.16, 1, 0.3, 1)`. Avoid linear or default `ease` timing functions.
- **GPU Acceleration**: Only animate performance-safe properties (`transform`, `opacity`, `filter`). Avoid animating layout properties (`width`, `height`, `margin`, `padding`) to prevent layout thrashing.
- **Interruptibility**: Transitions must be fluid and cleanly interruptible when users initiate new actions mid-animation.
- **Accessibility**: Always respect `prefers-reduced-motion` queries by offering simplified, non-disruptive alternatives.

---

## 🛠️ 3. Code Architecture & Technical Rigor
- **Strict TypeScript & Clean Code**: Enforce strict typing. Avoid `any`, implicit type casting, or suppressed lint rules.
- **No Symptom Masking**: Never resolve errors by swallowing exceptions, adding empty `catch` blocks, or returning dummy fallbacks. Address the root cause directly.
- **Modular & Decoupled Design**: Keep UI components small, focused, and reusable with clear prop interfaces.
- **Performance & Dynamic Math**: Avoid arbitrary static pixel offsets or magic numbers. Compute container dimensions dynamically from element bounds.

---

## 🧪 4. Verification & Quality Assurance
- **Empirical Verification**: Never declare a feature or bug fix complete without running build/typecheck commands (`npm run build`, `tsc --noEmit`, or equivalent) and verifying runtime output.
- **Log Inspection**: Inspect error logs and tracebacks fully before forming diagnostic hypotheses. Base all fixes strictly on log evidence.

---

## 📦 5. Library & Tooling Best Practices
- **Curated Primitives**: Utilize high-craft headless primitives and libraries (e.g., *Sonner* for notifications, *Framer Motion* / *CSS Springs* for animations) when building complex UI components.
- **User Feedback**: Ensure every async operation exhibits loading states, skeleton loaders, or clear toast feedback.

---

## 🧠 6. Active Skill Integrations (35 Installed Skills)
Before executing relevant tasks, the agent MUST read and apply instructions from the matching skill in `.agents/skills/`:

### UI, Motion & Frontend Design
1. **`design-taste-frontend`**: Anti-slop frontend engineering for landing pages, web apps, and UI redesigns.
2. **`emil-design-eng`**: Emil Kowalski's philosophy on UI polish, component craft, and subtle interaction details.
3. **`apple-design`**: iOS-grade gesture dynamics, glass depth, fluid spring motion, and optical typography.
4. **`animate`**: Custom animation craft (physics, curves, interruption, exits).
5. **`animation-vocabulary`**: Reverse-lookup glossary for motion patterns.
6. **`ask-sonner`**: Integration and styling guide for Sonner toast notifications.
7. **`pick-ui-library`**: Curated library selection (charts, tables, forms, virtualization, toasts).
8. **`find-animation-opportunities`**: Read-only audit for UI element motion opportunities.
9. **`improve-animations`**: Prioritized motion codebase audits and execution roadmaps.
10. **`review-animations`**: Motion code review against high-craft standards.
11. **`prototype`**: Multi-variant visual component prototyping.
12. **`frontend-ui-engineering`**: High-craft frontend UI implementation.

### Architecture, Engineering & Code Quality
13. **`api-and-interface-design`**: API contract design, REST/GraphQL interface modeling.
14. **`browser-testing-with-devtools`**: Browser DevTools inspection, debugging, and end-to-end verification.
15. **`ci-cd-and-automation`**: Automated build pipelines, GitHub Actions, and deployment scripts.
16. **`code-review-and-quality`**: Code review, static analysis, and quality assurance.
17. **`code-simplification`**: Refactoring complex logic into readable, maintainable primitives.
18. **`context-engineering`**: Context window optimization, prompt structuring, and token management.
19. **`debugging-and-error-recovery`**: Systematic root-cause debugging and fault isolation.
20. **`deprecation-and-migration`**: Breaking change migrations and API deprecation strategies.
21. **`documentation-and-adrs`**: Architecture Decision Records (ADRs) and project documentation.
22. **`doubt-driven-development`**: Edge-case validation, defensive assertions, and doubt-testing.
23. **`git-workflow-and-versioning`**: Git commit craft, branching strategies, and release tagging.
24. **`idea-refine`**: Turning vague requirements into precise, actionable technical specifications.
25. **`incremental-implementation`**: Step-by-step feature rollout with zero regression risk.
26. **`interview-me`**: Interactive requirements gathering and decision alignment.
27. **`observability-and-instrumentation`**: Telemetry, structured logging, and APM tracking.
28. **`performance-optimization`**: Memory, CPU, network, and bundle size performance tuning.
29. **`planning-and-task-breakdown`**: Task decomposition and implementation planning.
30. **`security-and-hardening`**: Vulnerability mitigation, input sanitization, and security hardening.
31. **`shipping-and-launch`**: Pre-launch verification checklists and production readiness.
32. **`source-driven-development`**: Codebase exploration via empirical source tracing.
33. **`spec-driven-development`**: Specification-first implementation workflows.
34. **`test-driven-development`**: TDD red-green-refactor testing methodology.
35. **`using-agent-skills`**: Skill discovery, chaining, and execution governance.
