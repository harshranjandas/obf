# Neon database – table cross-check

Checked against Payload CMS collections and internal tables. **All expected tables exist on Neon.**

## Public schema tables (18 total)

| Table | Row count | Notes |
|-------|-----------|--------|
| **users** | 1 | Admin user (e.g. harsh@t9l.com) |
| **users_sessions** | 1 | Auth session |
| **pages** | 0 | Payload pages collection |
| **partners** | 2 | Payload partners collection |
| **jobs** | 0 | Payload jobs collection |
| **job_applications** | 0 | Payload job applications |
| **social_networks** | 0 | Payload social networks |
| **analytics** | 0 | Payload analytics |
| **uploads** | 11 | Payload media/uploads |
| **homepage_settings** | 1 | Payload homepage settings singleton |
| **homepage_settings_coming_soon_cards** | 3 | Relation/array for coming soon cards |
| **homepage_settings_social_networks** | 0 | Relation/array for social links |
| **payload_migrations** | 1 | Payload migrations |
| **payload_preferences** | 12 | Payload admin preferences |
| **payload_preferences_rels** | 12 | Preference relations |
| **payload_locked_documents** | 2 | Locked documents |
| **payload_locked_documents_rels** | 0 | Locked document relations |
| **payload_kv** | 0 | Payload key-value store |

## Payload collections → tables

- `users` → **users** ✓
- `pages` → **pages** ✓
- `partners` → **partners** ✓
- `jobs` → **jobs** ✓
- `job-applications` → **job_applications** ✓
- `social-networks` → **social_networks** ✓
- `analytics` → **analytics** ✓
- `uploads` → **uploads** ✓
- `homepage-settings` → **homepage_settings** + relation tables ✓

## users table check

- **Schema:** `public`
- **Columns:** id, email, role, hash, salt, updated_at, created_at, reset_password_token, reset_password_expiration, login_attempts, lock_until
- **Sample row:** id=2, email=harsh@t9l.com

No missing tables; migration is complete.
