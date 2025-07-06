# Open-Sky Auth

Goal: provide the best auth library and tools for SvelteKit ecosystem.

NOT READY FOR USE. Currently building the package from auth code I have used across a number of real-world applications.

Features:
_these are subject to change before 1.0_
- Passwordless accounts with email magic-links or one-time codes
- Passkey support: lots of care has gone into creating a great implementation of Passkeys and delivering an exceptional UX
- Passwords
- Authorization helpers for RBAC, unauthenticated sessions, and more
- Database adapter for Drizzle (can use with any sqlite, pg, mysql database you connect to with drizzle)
- Provides the schema to make setting up tables easy and flexible
- Auth UI components (both login and account management)

Roadmap:
- Use sveltekit remote functions to simplify codebase
- Support phone numbers in addition to email (for account creation, login codes, etc)
- Add database adapters in addition to Drizzle
- Expose an API to connect to auth service from iOS App or other use cases
