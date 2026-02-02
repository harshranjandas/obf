# Quick Start Guide - Payload Admin Panel

## ✅ What's Fixed

1. **Hydration Error:** Fixed! No more nested HTML tags
2. **Server:** Running successfully on port 3002
3. **Admin Routes:** Properly configured with middleware

## 🚀 Setup Database Tables (One-Time)

You have **two options** to create the database tables:

### Option 1: Automated (Recommended)

Run the setup script that automatically answers prompts:

```bash
npm run setup:payload
```

This will:
- Start the server
- Automatically answer all prompts with "create table"
- Create all necessary database tables
- Keep the server running

**Press Ctrl+C when done** to stop the server.

### Option 2: Manual

1. Start the server:
   ```bash
   npm run dev
   ```

2. When you see prompts like:
   ```
   Is users table created or renamed from another table?
   ❯ + users                  create table
   ```

3. **Press ENTER** for each prompt (selects "create table")

4. Wait 30-60 seconds after all prompts are answered

5. Tables will be created automatically

## 📍 Access Admin Panel

Once tables are created:

1. Open: **http://localhost:3002/admin**
2. Wait 10-15 seconds for first load (normal)
3. Create your first admin user through the login page

## 🔍 Verify Setup

Check if tables were created:

```bash
psql "postgresql://onebigfuture:onebigfuture123@localhost:5432/onebigfuture" -c "\dt"
```

You should see tables like:
- `users`
- `pages`
- `partners`
- `jobs`
- `job_applications`
- `social_networks`
- `analytics`
- `media`
- `users_sessions`

## ⚠️ Troubleshooting

### "relation users does not exist"

- Tables haven't been created yet
- Run `npm run setup:payload` or answer prompts manually

### Admin panel not loading

- Wait 30-60 seconds on first access
- Check server is running: `lsof -ti:3002`
- Check browser console for errors

### Prompts keep appearing

- Make sure you're pressing ENTER (not typing anything)
- Wait for each prompt to finish before the next one appears

## 📝 Next Steps

After setup:
1. Access admin panel at http://localhost:3002/admin
2. Create your first admin user
3. Start managing content!
