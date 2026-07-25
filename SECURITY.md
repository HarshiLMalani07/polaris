# Security Policy

## Reporting a Vulnerability

**Please don't open a public GitHub issue for security problems.**

Email the details privately to:

📧 **harshilmalani2021@gmail.com**

Include:

- A description of the issue
- Steps to reproduce it
- What an attacker could do with it

You'll get a response within 48 hours, and I'll work with you on a fix before anything is made public. Credit is yours if you want it.

---

## Scope

This policy covers the Polaris application code in this repository.

Particularly interested in reports about:

- **Cross-tenant access** — reaching another user's project, files, or conversations
- **`POLARIS_CONVEX_INTERNAL_KEY`** — any path that lets a client reach the internal Convex functions in `convex/system.ts`
- **GitHub token handling** — leaking the OAuth token used for repo import/export
- **Plan enforcement** — bypassing the Pro gate on the import/export routes
- **WebContainer escape** — breaking out of the in-browser sandbox to the host page or another user's session
- **Prompt injection with real consequences** — content in a repo or scraped page that makes the agent write to files outside the current project

Out of scope:

- Vulnerabilities in third-party services (Convex, Clerk, Inngest, OpenAI, Firecrawl, StackBlitz/WebContainers) — please report those to the respective vendor
- Anything requiring a user to already have your credentials
- Self-inflicted issues in code the agent generated at your own request, running inside your own preview sandbox
- Missing hardening headers with no demonstrated impact

---

## Handling Secrets

If you're running Polaris yourself: every key in `.env.local` is sensitive, and `POLARIS_CONVEX_INTERNAL_KEY` in particular is a full bypass of per-user authorization. Never expose it to the client, never prefix it with `NEXT_PUBLIC_`, and rotate it if it ever lands in a commit.
