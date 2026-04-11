# Component Guidelines

> How components are built in this project.

---

## Overview

This frontend uses Vue SFCs with `<script setup lang="ts">`.
Most pages are view-centric and directly compose Vuetify components plus UnoCSS utility classes.

The project does not currently maintain a large shared component library. Reuse happens more through stores and helpers than through extracted presentational components.

---

## Component Structure

Preferred file shape:

1. `<script setup lang="ts">`
2. imports from Vue, Pinia, router, and local helpers
3. refs/reactive state
4. async handlers and initialization
5. `<template>`
6. optional scoped styles

Examples:

- `src/renderer/views/jobs/index.vue`
- `src/renderer/views/config/index.vue`
- `src/renderer/layout/index.vue`

---

## Props And Composition

- Many current components are route-level views and have no props.
- When a value is shared across screens, prefer a Pinia store or a helper module over prop drilling.
- Use `storeToRefs()` when destructuring reactive store state.

Examples:

- `src/renderer/views/jobs/index.vue` reads store state via `storeToRefs(log)`, `storeToRefs(cronjob)`, and `storeToRefs(login)`.
- `src/renderer/views/config/index.vue` reads `fansList` from the Pinia store rather than receiving it as props.

---

## Styling Patterns

- Use Vuetify components for forms, tables, dialogs, alerts, and buttons.
- Use UnoCSS utility classes for layout, spacing, and simple visual tweaks.
- Add scoped SCSS only when utility classes are not enough.

Examples:

- `src/renderer/views/jobs/index.vue` mixes Vuetify (`v-btn`, `v-table`, `v-dialog`) with utility classes such as `flex`, `justify-between`, and `opacity-60`.
- `src/renderer/layout/index.vue` is almost entirely utility-class based.
- `src/renderer/views/jobs/index.vue` uses a small scoped SCSS block for `.scrollbar-container`.

---

## Accessibility

- Keep text labels on form inputs and buttons; Vuetify already provides most semantics.
- Add `alt` text when rendering images, as in `src/renderer/views/jobs/index.vue`.
- Keep navigation visible and straightforward; the current shell uses text labels and icons.

This codebase does not yet show deeper a11y practices such as keyboard-specific tests, so preserve existing clarity and avoid regressions.

---

## Common Mistakes

- Do not replace simple store usage with unnecessary prop chains.
- Do not move all layout into custom CSS when utility classes already express it clearly.
- Do not mix unrelated orchestration code into layout components.
- Do not extract one-off components too early; most current pages are intentionally local and direct.
