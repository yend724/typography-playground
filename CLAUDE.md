# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Typography Playground — a browser-based interactive tool for exploring CSS typography properties with real-time preview. Built with Vite + React (TypeScript) + Tailwind CSS v4.

## Package Manager

pnpm を使用する。npm / yarn は使わない。

## Commands

```bash
pnpm dev             # Start dev server
pnpm build           # Production build
pnpm preview         # Preview production build
pnpm vitest          # Run all tests (watch mode)
pnpm vitest run      # Run tests once
pnpm vitest <path>   # Run a single test file
```

## Architecture

See `docs/architecture.md` for full details. Key points:

**Data-driven design**: Each CSS property is a `PropertyDefinition` object in `shared/data/properties/`. `PropertyControl` dispatches to the correct input component based on `controlType` (slider, select, color, text, font-family, multi-value, axis-slider-group).

**Data flow**: `useTypographyState` (useReducer + Context) holds all property values as `Record<string, string | undefined>`. Controls write via `setProperty()`, preview reads `appliedStyles` (computed `React.CSSProperties`), and `useCSSOutput` generates the CSS string.

**Styling separation**: Tailwind CSS for the app UI; inline styles (`React.CSSProperties`) for the preview area. Never mix the two.

## Directory Structure

```
src/shared/     → types, data, hooks, utils, reusable UI (Tooltip, CopyButton)
src/features/   → domain modules (controls/, preview/)
src/views/      → page-level components (PlaygroundView)
```

**Import rule**: `views/ → features/ → shared/`. No cross-feature imports. No circular dependencies.

## TypeScript Conventions

See `.claude/skills/typescript-conventions/` for full reference. Key rules:

- Arrow functions only (no `function` declarations, no `class`)
- `type` with `Readonly<{}>` for data shapes (not `interface`)
- Union types over enums: `type Status = "active" | "inactive"`
- Named exports only (no `export default`)
- `strict: true`, no `any` — use `unknown` and narrow
- Immutable by default: `readonly` arrays, `Readonly<>` for exported types
- 3+ params → parameter object
- `handle` prefix for event handlers, `on` prefix for callback props

## React Conventions

See `.claude/skills/react/` for full reference. Key rules:

- Arrow function components (no `React.FC`, no class components)
- Props: `type Props = Readonly<{...}>` with destructuring in parameter
- State updates always immutable: `setItems(prev => [...prev, newItem])`

## Testing

See `docs/coding-guidelines.md` and `.claude/skills/testing/` for full reference. Key rules:

- TDD: write failing test first → minimal implementation → refactor
- Test files sit alongside source: `css.ts` / `css.test.ts`
- Vitest + @testing-library/react + jsdom
- Test behavior, not implementation; use `getByRole`/`getByLabelText`
- Minimize mocks; prefer dependency injection
- Test names in Japanese are acceptable

## Implementation Plan

See `plan/20260208-master-plan.md` for the 9-phase step-by-step plan.

**Phase単位の確認ルール**: 実装は必ずPhase単位で進める。各Phaseの全Stepを完了したら、次のPhaseに進む前にユーザーに確認を取ること。確認なしに次のPhaseへ進んではならない。
