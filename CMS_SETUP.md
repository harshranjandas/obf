# CMS Panel Setup Guide

## Overview

The CMS (Content Management System) panel allows you to manage all content, pages, partners, jobs, social networks, and view analytics for the One Big Future website.

## Features

- **Pages & Content Management**: Create and manage pages with full SEO support
- **Partners Module**: Manage partner organizations
- **Jobs Module**: Create and manage job listings with application tracking
- **Social Networks**: Manage social media links
- **Analytics Dashboard**: View website analytics and statistics

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Database

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/onebigfuture?schema=public"
ADMIN_EMAIL="admin@onebigfuture.com"
ADMIN_PASSWORD="changeme123"
```

### 3. Initialize Database

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Create admin user
npm run setup:admin

# Or run all at once
npm run setup
```

### 4. Access CMS Panel

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to: `http://localhost:3002/admin/login`

3. Login with:
   - Email: `admin@onebigfuture.com` (or your ADMIN_EMAIL)
   - Password: `changeme123` (or your ADMIN_PASSWORD)

## CMS Panel Structure

### Dashboard (`/admin`)
- Overview statistics
- Quick access to all modules

### Pages & Content (`/admin/pages`)
- Create and edit pages
- Manage SEO metadata (title, description, OG tags, Twitter cards)
- Control publishing status
- Set page order

### Partners (`/admin/partners`)
- Add/edit partner organizations
- Upload partner logos
- Set featured partners
- Manage partner order

### Jobs (`/admin/jobs`)
- Create job listings
- Manage job details (location, type, requirements)
- View job applications
- Control job publishing

### Social Networks (`/admin/social-networks`)
- Add/edit social media links
- Enable/disable networks
- Set display order

### Analytics (`/admin/analytics`)
- View page views, clicks, form submissions
- See top pages and countries
- Filter by date range

## API Endpoints

### Admin API (Protected)
- `GET /api/admin/pages` - List all pages
- `POST /api/admin/pages` - Create page
- `GET /api/admin/pages/[id]` - Get page
- `PATCH /api/admin/pages/[id]` - Update page
- `DELETE /api/admin/pages/[id]` - Delete page

Similar endpoints exist for:
- `/api/admin/partners`
- `/api/admin/jobs`
- `/api/admin/social-networks`
- `/api/admin/analytics`

### Public API
- `GET /api/partners` - Get published partners
- `GET /api/jobs` - Get published jobs
- `GET /api/social-networks` - Get enabled social networks
- `POST /api/analytics/track` - Track analytics events

## Security

- All admin routes require authentication
- Passwords are hashed using bcrypt
- Session-based authentication with secure cookies
- Change default admin password after first login

## Next Steps

1. Update frontend pages to fetch data from API endpoints
2. Add image upload functionality for partners and jobs
3. Implement job application management in admin panel
4. Add more analytics tracking throughout the site
