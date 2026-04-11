# Cross-Layer Thinking Guide

> **Purpose**: Think through data flow across layers before implementing.

---

## The Problem

**Most bugs happen at layer boundaries**, not within layers.

Common cross-layer bugs:
- API returns format A, frontend expects format B
- Database stores X, service transforms to Y, but loses data
- Multiple layers implement the same logic differently

---

## Before Implementing Cross-Layer Features

### Step 1: Map the Data Flow

Draw out how data moves:

```
Source → Transform → Store → Retrieve → Transform → Display
```

For each arrow, ask:
- What format is the data in?
- What could go wrong?
- Who is responsible for validation?

### Step 2: Identify Boundaries

| Boundary | Common Issues |
|----------|---------------|
| API ↔ Service | Type mismatches, missing fields |
| Service ↔ Database | Format conversions, null handling |
| Backend ↔ Frontend | Serialization, date formats |
| Component ↔ Component | Props shape changes |

### Step 3: Define Contracts

For each boundary:
- What is the exact input format?
- What is the exact output format?
- What errors can occur?

---

## Common Cross-Layer Mistakes

### Mistake 1: Implicit Format Assumptions

**Bad**: Assuming date format without checking

**Good**: Explicit format conversion at boundaries

### Mistake 2: Scattered Validation

**Bad**: Validating the same thing in multiple layers

**Good**: Validate once at the entry point

### Mistake 3: Leaky Abstractions

**Bad**: Component knows about database schema

**Good**: Each layer only knows its neighbors

### Mistake 4: UI and Runtime Disagree on Semantics

**Bad**: Backend emits UTC timestamps while the Docker UI promises Shanghai-local scheduling semantics

**Good**: Treat display time, persisted time, and scheduler time as an explicit contract across runtime, API, and UI

### Mistake 5: Runtime Capability Assumptions Stay Implicit

**Bad**: Shared code assumes browser APIs or container/browser launch flags are always available

**Good**: Check capabilities at the runtime boundary and provide compatibility fallbacks where the UI or Docker environment can differ

### Mistake 6: Failure Is Collapsed Into a Valid Business Value

**Bad**: Upstream request fails, but the helper converts that failure into `0`, `[]`, or another normal-looking result

**Good**: Preserve the difference between transport failure and a legitimate empty/zero business result so logs and UI can diagnose the real cause

---

## Checklist for Cross-Layer Features

Before implementation:
- [ ] Mapped the complete data flow
- [ ] Identified all layer boundaries
- [ ] Defined format at each boundary
- [ ] Decided where validation happens

After implementation:
- [ ] Tested with edge cases (null, empty, invalid)
- [ ] Verified error handling at each boundary
- [ ] Checked data survives round-trip
- [ ] Verified displayed timestamps match the timezone semantics promised to users
- [ ] Verified runtime-specific capabilities (Docker root, browser APIs, headless mode) at the boundary
- [ ] Verified transport failures are not silently converted into normal business values

---

## When to Create Flow Documentation

Create detailed flow docs when:
- Feature spans 3+ layers
- Multiple teams are involved
- Data format is complex
- Feature has caused bugs before
