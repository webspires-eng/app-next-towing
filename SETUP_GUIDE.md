# Next Towing - Setup & Development Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- SQLite (for development) or PostgreSQL (for production)
- Google Maps API keys
- DVLA API key (optional, for vehicle lookup)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd app-next-towing
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Then edit `.env` and fill in your values:
   - `DATABASE_URL`: Database connection string
   - `NEXTAUTH_SECRET`: Generate with `openssl rand -base64 32`
   - `GOOGLE_MAPS_SERVER_KEY`: Server-side Google Maps API key
   - `NEXT_PUBLIC_GOOGLE_MAPS_BROWSER_KEY`: Client-side Google Maps API key
   - `DVLA_API_KEY`: UK DVLA Vehicle API key
   - Other configuration values

4. **Initialize the database**
   ```bash
   npx prisma migrate dev
   npm run seed
   ```

5. **Create your first admin user**
   ```bash
   # Start the development server first
   npm run dev
   
   # Then visit http://localhost:3000/dashboard/users
   # (You'll need to temporarily disable auth or create via Prisma Studio)
   
   # OR use Prisma Studio:
   npx prisma studio
   # Navigate to User model and create a user with hashed password
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
app-next-towing/
├── prisma/
│   ├── schema.prisma          # Database schema
│   ├── migrations/            # Database migrations
│   └── seed.js               # Seed data script
├── public/                    # Static assets
├── src/
│   ├── app/
│   │   ├── (frontend)/       # Public-facing pages
│   │   ├── (backend)/        # Admin dashboard
│   │   │   └── dashboard/    # Protected admin routes
│   │   ├── api/              # API routes
│   │   ├── login/            # Authentication page
│   │   ├── layout.js         # Root layout
│   │   ├── globals.css       # Global styles
│   │   ├── not-found.js      # 404 page
│   │   └── error.js          # Error boundary
│   ├── components/           # React components
│   │   ├── admin/           # Admin-specific components
│   │   └── ui/              # Reusable UI components
│   ├── lib/                  # Utility functions
│   │   ├── prisma.js        # Prisma client
│   │   ├── auth.js          # NextAuth configuration
│   │   └── utils.js         # Helper functions
│   └── data/                 # Static data
├── middleware.js             # Auth middleware
├── .env.example              # Environment variables template
└── package.json              # Dependencies
```

---

## 🔐 Authentication Setup

The application uses **NextAuth.js** with credentials provider and bcrypt for password hashing.

### Creating an Admin User

**Method 1: Using Prisma Studio (Recommended)**
```bash
npx prisma studio
```
1. Open User model
2. Click "Add record"
3. Fill in email, name, and **manually hash your password**:
   ```bash
   # Generate hashed password
   node -e "console.log(require('bcrypt').hashSync('your-password', 10))"
   ```
4. Set `role` to `ADMIN`
5. Save

**Method 2: Using the Dashboard (After First Login)**
- Visit `/dashboard/users`
- Use the "Add New User" form
- Passwords are automatically hashed

### Login
- Visit `/login`
- Enter your credentials
- You'll be redirected to `/dashboard`

---

## 🗄️ Database

### Schema Overview

- **User**: Admin users with authentication
- **Service**: Towing/recovery services (e.g., "Car Recovery", "Towing")
- **Location**: Coverage areas (e.g., "Manchester", "M60 Motorway")
- **Page**: Dynamic landing pages (Service + Location combinations)
- **Post**: Blog posts and articles
- **Booking**: Customer booking submissions

### Common Commands

```bash
# Create a new migration
npx prisma migrate dev --name description_of_changes

# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# Seed the database
npm run seed

# Open Prisma Studio (GUI)
npx prisma studio

# Generate Prisma Client
npx prisma generate
```

---

## 🛠️ Development

### Running the App

```bash
# Development mode with hot reload
npm run dev

# Production build
npm run build

# Start production server
npm start
```

### Code Structure

**API Routes** (`src/app/api/`)
- `/api/auth/[...nextauth]` - Authentication
- `/api/booking` - Booking submissions
- `/api/dvla/lookup` - Vehicle registration lookup
- `/api/distance` - Google Maps distance calculation
- `/api/directions` - Google Maps directions

**Admin Pages** (`src/app/(backend)/dashboard/`)
- `/dashboard` - Overview with statistics
- `/dashboard/services` - Manage services
- `/dashboard/locations` - Manage coverage areas
- `/dashboard/posts` - Manage blog posts
- `/dashboard/users` - Manage admin users

**Public Pages** (`src/app/(frontend)/`)
- `/` - Homepage
- `/booking` - Booking form with Google Maps integration
- `/services` - Services listing
- `/areas` - Coverage areas
- `/[service]/[location]` - Dynamic landing pages

---

## 🔑 API Keys Setup

### Google Maps API

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable APIs:
   - Maps JavaScript API
   - Places API
   - Distance Matrix API
   - Directions API
4. Create TWO API keys:
   - **Server key**: Restrict by IP address (for API routes)
   - **Browser key**: Restrict by HTTP referrer (for client-side)

### DVLA Vehicle API

1. Register at [DVLA Developer Portal](https://developer-portal.driver-vehicle-licensing.api.gov.uk/)
2. Subscribe to Vehicle Enquiry API
3. Get your API key
4. Add to `.env` as `DVLA_API_KEY`

---

## 🚢 Deployment

### Environment Variables

Make sure these are set in your production environment:
- All keys from `.env.example`
- `NEXTAUTH_URL`: Your production URL
- `NEXTAUTH_SECRET`: Strong random string
- `DATABASE_URL`: Production database connection

### Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables
vercel env add DATABASE_URL
vercel env add NEXTAUTH_SECRET
# ... add all other env vars
```

### Database Migration

For production:
```bash
# Push schema without migration files
npx prisma db push

# OR use migrations
npx prisma migrate deploy
```

---

## 🎨 Customization

### Branding

Update in `.env`:
- `NEXT_PUBLIC_COMPANY_NAME`
- `NEXT_PUBLIC_PHONE_NUMBER`
- `NEXT_PUBLIC_SITE_URL`

Update in `src/app/layout.js`:
- Meta title and description
- Open Graph settings

### Theme Colors

Edit `src/app/globals.css`:
```css
:root {
  --brand: #facc14;     /* Yellow brand color */
  --accent: #facc14;
  --text: #0e172b;      /* Dark text */
  /* ... */
}
```

### Components

All components are in `src/components/`:
- Modify existing components
- Create new ones following the naming convention
- Use Tailwind CSS for styling

---

## 📧 Email Notifications

The booking API is ready for email integration. Uncomment and configure in:
`src/app/api/booking/route.js`

**Recommended services:**
- [Resend](https://resend.com) - Modern, developer-friendly
- [SendGrid](https://sendgrid.com) - Reliable, established
- [Postmark](https://postmarkapp.com) - Transactional focus

Example with Resend:
```bash
npm install resend
```

```javascript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'bookings@yourdomain.com',
  to: 'admin@yourdomain.com',
  subject: 'New Booking Request',
  html: '<p>New booking details...</p>'
});
```

---

## 🔒 Security Checklist

- [x] Authentication implemented with NextAuth
- [x] Password hashing with bcrypt
- [x] Protected admin routes with middleware
- [x] API routes validation
- [x] Environment variables for sensitive data
- [ ] Rate limiting (TODO - consider adding)
- [ ] CSRF protection (TODO - consider adding for forms)
- [ ] Input sanitization (basic validation in place)
- [ ] SQL injection protection (Prisma provides this)

---

## 🐛 Troubleshooting

### Database Issues

**"P1001: Can't reach database server"**
- Check `DATABASE_URL` in `.env`
- Ensure database is running
- For SQLite, check file permissions

**"Migration failed"**
```bash
npx prisma migrate reset
npx prisma migrate dev
npm run seed
```

### Authentication Issues

**"Invalid credentials"**
- Verify user exists in database
- Check password is correctly hashed
- Ensure `NEXTAUTH_SECRET` is set

**"Middleware not working"**
- Check `middleware.js` is in root directory
- Verify `NEXTAUTH_URL` matches your domain

### Build Issues

**"Module not found"**
```bash
rm -rf node_modules package-lock.json
npm install
```

**"Prisma Client not generated"**
```bash
npx prisma generate
```

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Google Maps API Documentation](https://developers.google.com/maps/documentation)

---

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

---

## 📝 License

[Your License Here]

---

## 🆘 Support

For issues and questions:
- Check the troubleshooting section above
- Review closed issues on GitHub
- Contact the development team

---

**Built with ❤️ using Next.js, Prisma, and Tailwind CSS**
