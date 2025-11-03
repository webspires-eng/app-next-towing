# Next Towing - 24/7 Vehicle Recovery Platform

A modern, full-stack web application for a towing and vehicle recovery service, built with Next.js 15, React 19, Prisma, and Tailwind CSS 4.

## ✨ Features

### Public Website
- 🏠 **Landing Pages**: Dynamic service/location pages (e.g., `/towing/manchester`)
- 📍 **Interactive Booking**: Multi-step booking form with Google Maps integration
- 🚗 **DVLA Integration**: Automatic vehicle lookup by registration plate
- 📱 **Responsive Design**: Mobile-first, optimized for all devices
- ⚡ **Fast Performance**: ISR with 60s revalidation, optimized images
- 🎯 **SEO Optimized**: Dynamic meta tags, Open Graph, structured data

### Admin Dashboard
- 🔐 **Secure Authentication**: NextAuth with bcrypt password hashing
- 🧰 **Service Management**: CRUD for towing/recovery services
- 📍 **Location Management**: Manage coverage areas (cities, motorways)
- ✍️ **Blog/Posts**: Create and publish articles
- 👥 **User Management**: Add/remove admin users with role-based access
- 📊 **Dashboard Overview**: Quick stats and metrics
- 🖼️ **Image Upload**: Featured images for services and locations

### API & Integrations
- 🗺️ **Google Maps**: Distance calculation, directions, autocomplete
- 🚗 **DVLA API**: UK vehicle registration lookup
- 📧 **Booking System**: Customer booking submissions with database storage
- 🔒 **Protected Routes**: Middleware-based authentication

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env
# Edit .env with your API keys and configuration

# 3. Initialize database
npx prisma migrate dev
npm run seed

# 4. Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

For detailed setup instructions, see [SETUP_GUIDE.md](./SETUP_GUIDE.md).

---

## 📋 Project Status

### ✅ Completed
- [x] Full authentication system (NextAuth + bcrypt)
- [x] Admin dashboard with all CRUD operations
- [x] Dynamic landing page generation (service × location)
- [x] Booking system with database storage
- [x] Google Maps integration (distance, directions, places)
- [x] DVLA vehicle lookup
- [x] User management
- [x] Service management
- [x] Location management
- [x] Blog/posts system
- [x] Custom 404 and error pages
- [x] SEO optimization
- [x] Responsive design

### 🚧 Recommended Enhancements
- [ ] Email notifications for bookings (Resend/SendGrid integration ready)
- [ ] Real-time booking status tracking
- [ ] Customer portal for booking history
- [ ] Driver mobile app/portal
- [ ] Payment integration (Stripe/PayPal)
- [ ] SMS notifications
- [ ] Admin analytics dashboard
- [ ] Rate limiting on API routes
- [ ] Advanced WYSIWYG editor for posts
- [ ] Image optimization pipeline

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **UI**: [React 19](https://react.dev/), [Tailwind CSS 4](https://tailwindcss.com/)
- **Database**: [Prisma](https://www.prisma.io/) + SQLite (dev) / PostgreSQL (prod)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Password**: [bcrypt](https://www.npmjs.com/package/bcrypt)
- **Maps**: [Google Maps API](https://developers.google.com/maps)
- **Vehicle Data**: [DVLA API](https://developer-portal.driver-vehicle-licensing.api.gov.uk/)

---

## 📁 Key Directories

```
src/
├── app/
│   ├── (frontend)/          # Public pages
│   ├── (backend)/dashboard/ # Admin panel (protected)
│   ├── api/                 # API routes
│   └── login/               # Auth page
├── components/              # React components
├── lib/                     # Utilities & configs
└── data/                    # Static data
```

---

## 🔐 Environment Variables

See `.env.example` for all required environment variables:

- `DATABASE_URL` - Database connection string
- `NEXTAUTH_SECRET` - Auth secret (generate with `openssl rand -base64 32`)
- `NEXTAUTH_URL` - Your site URL
- `GOOGLE_MAPS_SERVER_KEY` - Server-side Maps API key
- `NEXT_PUBLIC_GOOGLE_MAPS_BROWSER_KEY` - Client-side Maps API key
- `DVLA_API_KEY` - UK vehicle lookup API key
- And more...

---

## 🚢 Deployment

### Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

Set all environment variables in Vercel dashboard.

### Other Platforms

Compatible with any Node.js hosting:
- Netlify
- Railway
- Render
- AWS
- Self-hosted

---

## 📖 Documentation

- [SETUP_GUIDE.md](./SETUP_GUIDE.md) - Comprehensive setup and development guide
- [.env.example](./.env.example) - Environment variables documentation
- [prisma/schema.prisma](./prisma/schema.prisma) - Database schema

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## 📝 License

[Your License Here]

---

## 🆘 Support

For setup help, see [SETUP_GUIDE.md](./SETUP_GUIDE.md#-troubleshooting).

For bugs and feature requests, open an issue on GitHub.

---

**Built with ❤️ for the vehicle recovery industry**
