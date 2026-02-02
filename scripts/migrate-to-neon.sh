#!/usr/bin/env bash
# Migrate local PostgreSQL data to Neon.
# Run from project root. Requires: pg_dump and psql in PATH.
#
# 1. Set your LOCAL database URL (one-time, for the dump):
#    export LOCAL_DATABASE_URL='postgresql://onebigfuture:onebigfuture123@localhost:5432/onebigfuture'
# 2. Ensure .env has DATABASE_URL pointing to Neon (already set).
# 3. Run: ./scripts/migrate-to-neon.sh
#
# Run this before starting the app against Neon, or drop existing tables on Neon first.

set -e
cd "$(dirname "$0")/.."

BACKUP_FILE="neon-migration-backup-$(date +%Y%m%d-%H%M%S).sql"

if [ -z "$LOCAL_DATABASE_URL" ]; then
  echo "Usage: LOCAL_DATABASE_URL='postgresql://user:pass@localhost:5432/dbname' ./scripts/migrate-to-neon.sh"
  echo ""
  echo "Example (your previous local DB):"
  echo "  LOCAL_DATABASE_URL='postgresql://onebigfuture:onebigfuture123@localhost:5432/onebigfuture' ./scripts/migrate-to-neon.sh"
  exit 1
fi

if [ ! -f .env ]; then
  echo "Missing .env. Ensure DATABASE_URL (Neon) is set there."
  exit 1
fi

# Load .env for DATABASE_URL (Neon)
set -a
source .env
set +a

if [ -z "$DATABASE_URL" ]; then
  echo "DATABASE_URL not set in .env (should be your Neon URL)."
  exit 1
fi

echo "1. Dumping local database to $BACKUP_FILE ..."
pg_dump "$LOCAL_DATABASE_URL" --no-owner --no-acl -F p -f "$BACKUP_FILE"

echo "2. Restoring to Neon ..."
psql "$DATABASE_URL" -f "$BACKUP_FILE"

echo "3. Done. Backup kept as $BACKUP_FILE (you can delete it after verifying)."
