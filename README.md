# Novahost Monorepo

Novahost is a modern cloud hosting platform built with Next.js, TypeScript, and Bun, featuring project deployment, authentication, and management tools. This monorepo uses [Turborepo](https://turbo.build/) for high-performance monorepo management.

## Project Structure

```
apps/
  api-server/       # API backend (Bun)
  build-server/     # Build orchestration server
  reverse-proxy/    # Reverse proxy server
  web/              # Next.js frontend (dashboard, auth, etc.)
packages/
  eslint-config/    # Shared ESLint config
  prismaDB/         # Prisma schema & client
  typescript-config/# Shared TS config
  ui/               # Shared UI components
docker/             # Dockerfiles for deployment
.turbo/             # Turborepo cache and state
.github/            # GitHub Actions workflows
```

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) v1.2+
- [Node.js](https://nodejs.org/) v18+
- [PostgreSQL](https://www.postgresql.org/) database

### Install Dependencies

```bash
bun install
```

### Environment Variables

Create `.env.local` files as needed (see `apps/web/README.md` for details).

### Development

Start all apps in development mode:

```bash
bun run dev
```

Or run a specific app (e.g., Next.js frontend):

```bash
cd apps/web
bun run dev
```

### Build

```bash
bun run build
```

## Database

Prisma is used for database access. See [`packages/prismaDB`](packages/prismaDB/README.md) for schema and migration instructions.

## Authentication

- NextAuth.js with credentials, Google, and GitHub providers
- Email verification and password reset via Resend
- Secure session and "Remember Me" support

See [`apps/web/README.md`](apps/web/README.md) for full authentication setup.

## Deployment

- Dockerfiles provided in [`docker/`](docker/)
- See each app's README for deployment instructions

## Contributing

1. Fork the repo
2. Create a feature branch
3. Commit your changes
4. Open a pull request

## License

MIT

---

For detailed documentation, see
