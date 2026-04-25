# Frontend Development Guidelines

> Best practices for frontend development in this project.

---

## Overview

This project no longer has a standalone Vue/Electron renderer. The supported UI is the Docker WebUI served from `src/docker/html.ts`.

The legacy Vue renderer guidelines below are retained only as historical references. For current UI changes, treat `src/docker/html.ts` as Docker runtime code and read the backend guidelines first.

---

## Guidelines Index

| Guide | Description | Status |
|-------|-------------|--------|
| [Directory Structure](./directory-structure.md) | Legacy Vue renderer module organization | Legacy |
| [Component Guidelines](./component-guidelines.md) | Legacy Vue SFC patterns | Legacy |
| [Hook Guidelines](./hook-guidelines.md) | Legacy Vue reusable-logic patterns | Legacy |
| [State Management](./state-management.md) | Legacy Vue state patterns | Legacy |
| [Quality Guidelines](./quality-guidelines.md) | Legacy Vue quality guidance | Legacy |
| [Type Safety](./type-safety.md) | Legacy Vue type patterns | Legacy |

---

## Pre-Development Checklist

Before changing current UI code:

1. Read `../backend/directory-structure.md` for Docker-only runtime boundaries
2. Read `../backend/error-handling.md` for route error responses
3. Read `../backend/logging-guidelines.md` if diagnostics or logs change
4. Read `../backend/quality-guidelines.md` before final review

Do not reintroduce `src/renderer/`, Vue, Vite, Pinia, Vuetify, or Electron renderer IPC unless desktop support is explicitly restored.

---

**Language**: All documentation should be written in **English**.
