# Migrating to Neon Postgres

Your app is configured to use **Neon Postgres** via `DATABASE_URL` in `.env`. Both Payload CMS and Prisma use this URL.

## If you need to copy existing data from local Postgres to Neon

1. **Keep your local Postgres running** (with the old data).

2. **Run the migration script** from the project root:

   ```bash
   LOCAL_DATABASE_URL='postgresql://onebigfuture:onebigfuture123@localhost:5432/onebigfuture' ./scripts/migrate-to-neon.sh
   ```

   This dumps your local database and restores it into Neon. You need `pg_dump` and `psql` installed (e.g. from Postgres client tools).

3. **Fix the Coming Soon description column** (required after migrating from an older schema where this column was text):

   ```bash
   ./scripts/run-fix-coming-soon-jsonb.sh
   ```

   This runs one SQL statement on Neon so Payload can sync the schema without failing on `ALTER COLUMN description SET DATA TYPE jsonb`.

4. **Start the app** — it will use Neon:

   ```bash
   npm run dev
   ```

## If Neon is already empty (new project)

- No migration needed. Start the app; Payload will create tables on Neon (`push: true`).
- Create your admin user via Payload or your existing setup script if needed.

## Connection details

- **Config:** `payload.config.ts` and `prisma/schema.prisma` both use `process.env.DATABASE_URL` / `env("DATABASE_URL")`.
- **Neon URL** is set in `.env` with `?sslmode=require` for SSL.
