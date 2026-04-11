# Backend Development Guidelines

> Best practices for backend development in this project.

---

## Overview

This directory contains the current backend conventions for this project. The backend here includes shared core logic, Electron main-process code, and the Docker Express runtime.

---

## Guidelines Index

| Guide | Description | Status |
|-------|-------------|--------|
| [Directory Structure](./directory-structure.md) | Module organization and file layout | Current |
| [Database Guidelines](./database-guidelines.md) | Persistence and config storage patterns | Current |
| [Error Handling](./error-handling.md) | Error types, handling strategies | Current |
| [Quality Guidelines](./quality-guidelines.md) | Code standards, forbidden patterns | Current |
| [Logging Guidelines](./logging-guidelines.md) | Structured logging, log levels | Current |

---

## Pre-Development Checklist

Read these files before changing backend-related code:

1. `directory-structure.md` for runtime boundaries
2. `database-guidelines.md` if persistence or config shape changes
3. `error-handling.md` if you add routes, IPC handlers, or scheduler behavior
4. `logging-guidelines.md` if you change Docker logs or user-visible diagnostics
5. `quality-guidelines.md` before final review

---

**Language**: All documentation should be written in **English**.
