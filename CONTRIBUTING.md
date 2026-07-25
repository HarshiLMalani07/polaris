# Contributing to Polaris

Thanks for wanting to help. Here's everything you need to get productive.

---

## Quick Start

```bash
# 1. Fork & clone
git clone https://github.com/<your-username>/polaris.git
cd polaris

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Fill in the values — the README documents what each one is for

# 4. Run the dev server
npm run dev
```

Polaris needs two more processes running alongside it:

```bash
npx convex dev                  # database + schema
npx inngest-cli@latest dev      # the AI agent won't respond without this
```

> **Heads up:** the live preview relies on WebContainers, which require cross-origin isolation. The COOP/COEP headers are already set in `next.config.ts` — if you change them, preview will silently stop booting.

---

## Project Layout

Polaris is organised by feature, not by file type.

```
src/
  app/                      # routes and API handlers only — keep logic out
  features/
    auth/                   # Clerk sign-in states
    projects/               # launcher, file tree, GitHub import/export, navbar
    editor/                 # CodeMirror, tabs, AI editor extensions
    preview/                # WebContainer, terminal, preview pane
    conversations/          # AI chat, tabs, Inngest agent + tools
  components/ui/            # shared shadcn primitives — change with care
convex/                     # schema, queries, mutations
```

Inside a feature:

- `components/` — React components
- `hooks/` — Convex bindings and stateful logic
- `store/` — zustand stores
- `constants.ts` — strings and config
- `inngest/` — background jobs and agent tools

Anything used by more than one feature belongs in `src/components/` or `src/lib/`.

---

## Working on the AI Agent

The agent lives in `src/features/conversations/inngest/`.

- `process-message.ts` — the network, the system prompt, the run loop
- `tools/` — one file per tool the agent can call
- `constants.ts` — prompts

To add a tool: create it in `tools/`, register it on the agent, and give it a description precise enough that the model knows *when* to reach for it. Tools write to Convex through `convex/system.ts`, which is authorized with `POLARIS_CONVEX_INTERNAL_KEY` rather than a user session — never call the user-facing mutations from a background job.

---

## What to Work On

- **Bugs** — open an issue with steps to reproduce
- **Features** — open an issue to discuss it *before* writing the code
- **Docs** — always welcome, no issue needed

---

## Making a Pull Request

1. Branch off `main`: `git checkout -b feat/your-feature-name`
2. Make your changes
3. Verify before pushing:
   ```bash
   npx tsc --noEmit
   npm run lint
   ```
4. Commit with [conventional commits](https://www.conventionalcommits.org):
   - `feat: add chat tabs to the conversation sidebar`
   - `fix: stop duplicate empty agents on repeat clicks`
   - `docs: document the internal Convex key`
5. Push and open a PR against `main`

Screenshots or a short clip for anything that changes the UI, please — it makes review much faster.

---

## Code Style

- **TypeScript everywhere.** Avoid `any`; if you truly need it, leave a comment saying why.
- **Match the surrounding code.** Same naming, same comment density, same idioms.
- **Convex is the source of truth.** Don't mirror server state in local React state.
- **Client mutations verify ownership.** Every user-facing Convex function checks the caller against `project.ownerId` — keep it that way.
- **Pro-gated routes return `403 "Pro plan required"`.** The client surfaces that as an upgrade toast; reuse the pattern instead of inventing new error strings.
- **Tailwind for styling.** Use theme tokens (`bg-sidebar`, `text-muted-foreground`) rather than hard-coded colors, so both themes keep working.

---

## Questions?

Open an issue or reach out on [GitHub](https://github.com/HarshiLMalani07).
