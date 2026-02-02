# Admin panel not opening – fix

If **http://localhost:3002/admin** returns 500, never loads, or shows a blank/wrong page:

## 1. Fix the database column (Neon)

Payload expects the `description` column in `homepage_settings_coming_soon_cards` to be `jsonb`. After migrating from an older schema it can still be `text`, which makes Payload’s schema sync fail and the admin return 500.

From the **project root**, run:

```bash
./scripts/run-fix-coming-soon-jsonb.sh
```

You need `psql` and `DATABASE_URL` set in `.env` (your Neon URL). The script runs one `ALTER TABLE` to change the column type.

## 2. Next.js 16: use proxy, not middleware

This project uses **proxy.ts** (not middleware.ts) so the Payload admin route gets the correct headers. If you had an old middleware.ts, it has been removed; proxy.ts at the project root is used instead.

## 3. Restart the app

```bash
npm run dev
```

Then open **http://localhost:3002/admin** again.

---

If you still get 500, check the terminal where `npm run dev` is running for the exact error (often the same `ALTER TABLE ... description SET DATA TYPE jsonb` message).
