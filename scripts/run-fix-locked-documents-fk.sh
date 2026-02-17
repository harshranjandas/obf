#!/usr/bin/env bash
# Fix Payload error: ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" failed.
# Uses DATABASE_URL from .env. Run from project root: ./scripts/run-fix-locked-documents-fk.sh

set -e
cd "$(dirname "$0")/.."

if [ ! -f .env ]; then
  echo "Missing .env. DATABASE_URL must be set."
  exit 1
fi

set -a
source .env
set +a

if [ -z "$DATABASE_URL" ]; then
  echo "DATABASE_URL not set in .env."
  exit 1
fi

echo "Applying fix: clean orphans and add payload_locked_documents_rels_parent_fk if missing..."
psql "$DATABASE_URL" -f scripts/fix-locked-documents-fk.sql

echo "Done. Restart the dev server (npm run dev) and the schema push should succeed."
