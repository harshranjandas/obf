# Payload CMS Database Setup

## Quick Setup (Recommended)

The easiest way to set up Payload database tables is to answer the prompts manually when starting the server:

1. **Start the server:**
   ```bash
   npm run dev
   ```

2. **When you see prompts like:**
   ```
   Is users table created or renamed from another table?
   ❯ + users                  create table
   ```
   
3. **For each prompt, press ENTER** (this selects "create table")

4. **After all prompts are answered**, wait 30-60 seconds for tables to be created

5. **Access the admin panel:** http://localhost:3002/admin

## Automated Setup (Using Expect)

If you have `expect` installed, you can use the automated script:

```bash
./scripts/setup-payload-db.sh
```

**Note:** This requires `expect` to be installed:
- macOS: `brew install expect`
- Linux: Usually pre-installed or `sudo apt-get install expect`

## What Was Fixed

✅ **Hydration Error:** Fixed the nested `<html>` tags issue
✅ **Middleware:** Created middleware to detect Payload routes
✅ **Layout:** Root layout now skips HTML/body for Payload routes

## Current Status

- ✅ Server runs successfully
- ✅ Admin panel loads (after tables are created)
- ⚠️ Database tables need to be created (one-time setup)

## Troubleshooting

### Tables Not Created

If tables aren't being created:

1. Make sure `push: true` is set in `payload.config.ts`
2. Answer all prompts when starting the server
3. Wait 30-60 seconds after answering prompts
4. Check database: `psql "postgresql://onebigfuture:onebigfuture123@localhost:5432/onebigfuture" -c "\dt"`

### Admin Panel Not Loading

1. Check server is running: `lsof -ti:3002`
2. Check for errors in terminal
3. Wait 30-60 seconds on first load (Payload initialization)
4. Check browser console for errors

### Still Having Issues?

Run the setup script manually:
```bash
npm run dev
# Then answer each prompt with ENTER
```
