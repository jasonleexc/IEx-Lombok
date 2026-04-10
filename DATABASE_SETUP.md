# Marine Conservation App - Database Setup Guide

This guide will help you migrate from hardcoded data to a Supabase database with admin functionality.

## 🚀 What's Been Implemented

### ✅ Database Schema
- **Users table** with role-based access (user/admin)
- **Species table** for sea turtle information
- **Regions table** for geographic regions
- **Region Sites table** for specific locations within regions
- **Sightings table** for user-reported turtle sightings
- **Conservation Tips table** for guidelines and actions
- **Emergency Contacts table** for regional contact information
- **Proper relationships** between all tables

### ✅ Frontend Features
- **Caching system** with TTL support for efficient data fetching
- **Admin dashboard** at `/admin` with full CRUD operations
- **Data service layer** with automatic cache invalidation
- **Authentication service** with role management
- **All pages updated** to use Supabase instead of hardcoded data

### ✅ Admin Functionality
- **Edit species information** (name, scientific name, status, habitat, diet, etc.)
- **Edit region details** (name, country, description, highlights)
- **View and manage sightings**
- **Edit conservation tips** (interaction guidelines and actions)
- **Edit emergency contacts** by region
- **Cache management** with refresh functionality
- **Automatic frontend updates** when data changes

## 📋 Setup Instructions

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Note your project URL and anon key

### 2. Set Up Database
1. Open the Supabase SQL Editor
2. Copy and run the contents of `database/schema.sql`
3. Copy and run the contents of `database/migrate-data.sql`

### 3. Configure Environment Variables
1. Copy `.env.example` to `.env`
2. Fill in your Supabase credentials:
   ```bash
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

### 4. Set Up Admin User
1. Run the app and create a regular user account
2. In Supabase, manually update the user's role to 'admin':
   ```sql
   UPDATE users SET role = 'admin' WHERE email = 'your_admin_email';
   ```

### 5. Start the Application
```bash
cd frontend
npm install
npm run dev
```

## 🔧 Admin Dashboard Usage

### Accessing Admin Panel
- Navigate to `/admin` in your browser
- Only users with 'admin' role can access

### Managing Content
- **Species**: Edit turtle species information, conservation status, and facts
- **Regions**: Update region descriptions and featured status
- **Conservation Tips**: Modify interaction guidelines and action items
- **Emergency Contacts**: Update regional contact information
- **Sightings**: View user-reported sightings (read-only for now)

### Cache Management
- **Refresh Cache**: Forces cache invalidation and data reload
- **Auto-invalidation**: Cache automatically clears when data is updated

## 🏗️ Architecture

### Data Flow
```
Frontend → DataService → Supabase → Cache → UI Updates
     ↑              ↓
Admin Dashboard → CRUD Operations → Cache Invalidation
```

### Caching Strategy
- **Species**: 10 minutes TTL
- **Regions**: 10 minutes TTL  
- **Sightings**: 2 minutes TTL
- **Conservation Tips**: 30 minutes TTL
- **Emergency Contacts**: 1 hour TTL

### Security
- **Row Level Security (RLS)** enabled on all tables
- **Public read access** for content tables
- **Admin-only write access** for content management
- **JWT-based authentication** with role claims

## 🔄 Migration Notes

### What Changed
- **Hardcoded data files** are still present but no longer used
- **All components** now use `dataService` instead of direct imports
- **Admin functionality** added for non-technical users
- **Real-time updates** when admin changes content

### Backward Compatibility
- Original data files remain as backup
- Component interfaces maintained
- No breaking changes to existing functionality

## 🚨 Important Notes

### Performance
- Caching reduces database load significantly
- Consider adjusting TTL values based on update frequency
- Monitor cache hit rates in production

### Security
- Never expose service role keys in frontend
- Use environment variables for all secrets
- Regularly review RLS policies

### Scaling
- Consider implementing pagination for large datasets
- Add search functionality to admin dashboard
- Implement audit logging for content changes

## 🐛 Troubleshooting

### Common Issues
1. **"Missing Supabase environment variables"**
   - Check your `.env` file exists and has correct values
   
2. **"Access denied" errors**
   - Verify RLS policies are correctly set up
   - Check user has appropriate role

3. **Cache not updating**
   - Use "Refresh Cache" button in admin panel
   - Check browser cache if issues persist

### Getting Help
- Check Supabase logs for database errors
- Review browser console for frontend issues
- Verify network requests in developer tools

## 🎯 Next Steps

### Potential Enhancements
- [ ] Add image upload functionality
- [ ] Implement real-time subscriptions
- [ ] Add bulk operations to admin panel
- [ ] Create content approval workflow
- [ ] Add analytics and reporting
- [ ] Implement backup/restore functionality

### Production Considerations
- [ ] Set up proper error monitoring
- [ ] Configure CDN for static assets
- [ ] Implement rate limiting
- [ ] Add comprehensive logging
