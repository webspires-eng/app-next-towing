# 🚀 Deployment Checklist

Use this checklist before deploying the Next Towing application to production.

---

## ✅ Pre-Deployment

### 1. Environment Variables
- [ ] Copy `.env.example` to `.env`
- [ ] Set `NEXTAUTH_SECRET` (generate with: `openssl rand -base64 32`)
- [ ] Set `NEXTAUTH_URL` to production URL
- [ ] Set `DATABASE_URL` to production database
- [ ] Set `GOOGLE_MAPS_SERVER_KEY` (IP-restricted)
- [ ] Set `NEXT_PUBLIC_GOOGLE_MAPS_BROWSER_KEY` (HTTP referrer-restricted)
- [ ] Set `DVLA_API_KEY` (if using vehicle lookup)
- [ ] Set `RESEND_API_KEY` or other email service key (optional)
- [ ] Set all `NEXT_PUBLIC_*` site configuration variables

### 2. Database Setup
- [ ] Create production database (PostgreSQL recommended)
- [ ] Update `DATABASE_URL` in production environment
- [ ] Run migrations: `npx prisma migrate deploy`
- [ ] Verify database connection
- [ ] (Optional) Run seed script if needed

### 3. Create First Admin User
Choose one method:

**Option A: Prisma Studio (Development)**
```bash
npx prisma studio
# Create user with hashed password
```

**Option B: Generate Hashed Password**
```bash
# Generate password hash
node -e "console.log(require('bcrypt').hashSync('your-secure-password', 10))"
# Insert directly into database
```

**Option C: Temporarily Disable Auth**
- Comment out middleware
- Access `/dashboard/users`
- Create user via form
- Re-enable middleware

### 4. API Keys Configuration

**Google Maps API Keys**
- [ ] Create project in Google Cloud Console
- [ ] Enable required APIs:
  - Maps JavaScript API
  - Places API
  - Distance Matrix API
  - Directions API
- [ ] Create SERVER key (restrict by IP)
- [ ] Create BROWSER key (restrict by HTTP referrer)
- [ ] Test both keys work

**DVLA API (Optional)**
- [ ] Register at DVLA Developer Portal
- [ ] Subscribe to Vehicle Enquiry API
- [ ] Get API key
- [ ] Test vehicle lookup

### 5. Security Checks
- [ ] Verify all environment variables are set
- [ ] Test authentication flow
- [ ] Verify admin routes are protected
- [ ] Check middleware is working
- [ ] Test API endpoints require proper authentication
- [ ] Review `.gitignore` includes `.env`
- [ ] Ensure no sensitive data in code
- [ ] Update placeholder phone numbers
- [ ] Update placeholder domain URLs
- [ ] Update social media links

### 6. Content Updates
- [ ] Update company name in `.env`
- [ ] Update phone number in `.env`
- [ ] Update email addresses in `.env`
- [ ] Update site URL in `.env`
- [ ] Add real services in database
- [ ] Add real locations in database
- [ ] Update homepage content if needed
- [ ] Add company logo/branding
- [ ] Update favicon

### 7. Build & Test
- [ ] Run production build: `npm run build`
- [ ] Fix any build errors
- [ ] Test production build locally: `npm start`
- [ ] Test all pages load correctly
- [ ] Test authentication
- [ ] Test booking form
- [ ] Test admin dashboard
- [ ] Test on mobile devices

---

## 🚢 Deployment

### Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Set Environment Variables**
   - Go to Vercel dashboard
   - Navigate to Settings → Environment Variables
   - Add all variables from `.env.example`
   - OR use CLI:
     ```bash
     vercel env add DATABASE_URL
     vercel env add NEXTAUTH_SECRET
     # ... add all others
     ```

5. **Deploy to Production**
   ```bash
   vercel --prod
   ```

### Other Platforms

#### Netlify
- [ ] Connect GitHub repository
- [ ] Set build command: `npm run build`
- [ ] Set publish directory: `.next`
- [ ] Add all environment variables
- [ ] Enable Next.js plugin
- [ ] Deploy

#### Railway
- [ ] Create new project
- [ ] Connect GitHub repository
- [ ] Add PostgreSQL service
- [ ] Set environment variables
- [ ] Deploy

#### Self-Hosted (VPS/Server)
- [ ] Install Node.js 18+
- [ ] Clone repository
- [ ] Install dependencies: `npm ci`
- [ ] Set environment variables
- [ ] Build: `npm run build`
- [ ] Start with PM2 or similar
- [ ] Set up reverse proxy (Nginx/Caddy)
- [ ] Configure SSL certificate
- [ ] Set up automatic restarts

---

## ✅ Post-Deployment

### 1. Verification
- [ ] Visit production URL
- [ ] Test homepage loads
- [ ] Test login at `/login`
- [ ] Access dashboard at `/dashboard`
- [ ] Test booking form
- [ ] Test vehicle lookup
- [ ] Test Google Maps integration
- [ ] Submit test booking
- [ ] Verify booking in database
- [ ] Test on different browsers
- [ ] Test on mobile devices

### 2. Admin Setup
- [ ] Login as admin
- [ ] Create additional admin users if needed
- [ ] Add all services
- [ ] Add all coverage locations
- [ ] Generate service/location pages
- [ ] Create initial blog posts
- [ ] Review all pages

### 3. SEO & Analytics
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Set up Google Analytics (optional)
- [ ] Set up error tracking (Sentry, etc.)
- [ ] Test Open Graph tags
- [ ] Test Twitter cards
- [ ] Verify structured data

### 4. Performance
- [ ] Run Lighthouse audit
- [ ] Check PageSpeed Insights
- [ ] Optimize images if needed
- [ ] Enable caching headers
- [ ] Test page load times
- [ ] Check mobile performance

### 5. Security
- [ ] Set up HTTPS/SSL
- [ ] Configure security headers
- [ ] Set up CORS if needed
- [ ] Enable rate limiting (optional)
- [ ] Set up monitoring/alerts
- [ ] Review access logs
- [ ] Test authentication security
- [ ] Verify API endpoints are protected

### 6. Monitoring
- [ ] Set up uptime monitoring
- [ ] Configure error alerts
- [ ] Set up database backups
- [ ] Monitor API usage (Google Maps, DVLA)
- [ ] Check server resources
- [ ] Monitor response times

---

## 🎯 Optional Enhancements

### Email Integration
- [ ] Choose email service (Resend/SendGrid/Postmark)
- [ ] Get API key
- [ ] Uncomment email code in `/api/booking/route.js`
- [ ] Create email templates
- [ ] Test booking notifications
- [ ] Set up admin notification emails

### Advanced Features
- [ ] Set up Redis for caching
- [ ] Add rate limiting middleware
- [ ] Implement CSRF protection
- [ ] Add image CDN (Cloudinary, etc.)
- [ ] Set up logging service
- [ ] Add analytics dashboard
- [ ] Implement real-time features
- [ ] Add SMS notifications
- [ ] Payment integration

---

## 🐛 Troubleshooting

### Build Fails
```bash
# Clear cache and reinstall
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

### Database Connection Issues
- Check `DATABASE_URL` format
- Verify database is accessible from deployment platform
- Check firewall rules
- Test connection locally first

### Authentication Not Working
- Verify `NEXTAUTH_SECRET` is set
- Check `NEXTAUTH_URL` matches your domain
- Ensure middleware.js is in root directory
- Check browser cookies are enabled

### API Keys Not Working
- Verify keys are correctly set
- Check API restrictions (IP/HTTP referrer)
- Ensure APIs are enabled in Google Cloud
- Check API quotas/limits

### Images Not Loading
- Check file upload permissions
- Verify image paths are correct
- Ensure public directory is served
- Check CDN configuration if using

---

## 📝 Final Checklist

- [ ] All environment variables set
- [ ] Database migrated and connected
- [ ] Admin user created and tested
- [ ] Build successful
- [ ] Deployment successful
- [ ] Production site accessible
- [ ] Authentication working
- [ ] Booking form working
- [ ] Admin dashboard accessible
- [ ] All APIs functioning
- [ ] Content updated
- [ ] SSL/HTTPS enabled
- [ ] Monitoring set up
- [ ] Backups configured
- [ ] Documentation reviewed

---

## 🎉 Go Live!

Once all items are checked:
1. Announce launch to team
2. Monitor for first few hours
3. Check error logs
4. Respond to any issues
5. Celebrate! 🎊

---

## 📞 Support Contacts

- **Technical Issues**: [Your support email]
- **Deployment Platform**: [Vercel/Netlify support]
- **Google Maps API**: [Google Cloud support]
- **DVLA API**: [DVLA support portal]

---

**Last Updated**: November 3, 2025  
**Version**: 1.0.0  
**Status**: Ready for Production ✅
