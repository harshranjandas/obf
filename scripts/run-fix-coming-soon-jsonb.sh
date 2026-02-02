#!/usr/bin/env bash
# Run the description column fix on Neon so /admin stops returning 500.
# Uses DATABASE_URL from .env. Run from project root: ./scripts/run-fix-coming-soon-jsonb.sh

set -e
cd "$(dirname "$0")/.."

if [ ! -f .env ]; then
  echo "Missing .env. DATABASE_URL (Neon) must be set."
  exit 1
fi

set -a
source .env
set +a

if [ -z "$DATABASE_URL" ]; then
  echo "DATABASE_URL not set in .env."
  exit 1
fi

echo "Applying fix: homepage_settings_coming_soon_cards.description -> jsonb ..."
psql "$DATABASE_URL" -f scripts/fix-coming-soon-description-jsonb.sql

echo "Done. Restart the app and open /admin again."
