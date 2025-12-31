# Diego Pardo - Portfolio

A modern, bilingual portfolio website showcasing my work as a Fullstack Developer and Founder at QuickStack. Built with the latest web technologies and best practices.

🌐 **Live Demo:** [diegopardo.dev](https://diegopardo.dev)

## ✨ Features

- 🌍 **Bilingual Support** - Seamless switching between English and Spanish with next-intl
- 🎨 **Modern UI** - Glassmorphism design with smooth animations using Framer Motion
- 📧 **Smart Contact Form** - Rate-limited (30-min cooldown) with dual email notifications
- 🚀 **Performance Optimized** - Server components, dynamic imports, and Vercel deployment
- 📱 **Fully Responsive** - Mobile-first design with Tailwind CSS
- 🔒 **Type-Safe** - Built with TypeScript and validated with Zod
- 🎯 **SEO Ready** - Optimized metadata and semantic HTML
- 📊 **Analytics** - Integrated Vercel Analytics for insights

## 🛠️ Tech Stack

**Framework & Core:**
- [Next.js 16.1](https://nextjs.org/) - React framework with App Router
- [React 19](https://react.dev/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety

**Styling:**
- [Tailwind CSS v4](https://tailwindcss.com/) - Utility-first CSS
- [shadcn/ui](https://ui.shadcn.com/) - Re-usable component system
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Lucide Icons](https://lucide.dev/) - Icon system

**Internationalization:**
- [next-intl](https://next-intl-docs.vercel.app/) - i18n for Next.js
- Custom language toggle with cookie persistence

**Forms & Validation:**
- [React Hook Form](https://react-hook-form.com/) - Form state management
- [Zod](https://zod.dev/) - Schema validation

**Email & Communication:**
- [Resend](https://resend.com/) - Transactional email API
- [React Email](https://react.email/) - Email template components

**Rate Limiting:**
- [LRU Cache](https://github.com/isaacs/node-lru-cache) - In-memory rate limiting
- Custom implementation with IP + email tracking

**Developer Experience:**
- [ESLint](https://eslint.org/) - Code linting
- [Vercel Analytics](https://vercel.com/analytics) - Performance monitoring

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- A [Resend](https://resend.com) API key for the contact form

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/DevPardx/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:
   ```env
   RESEND_API_KEY=your_resend_api_key
   CONTACT_EMAIL=your_email@example.com
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
portfolio/
├── app/
│   ├── api/
│   │   └── contact/          # Contact form API route
│   ├── layout.tsx            # Root layout with i18n provider
│   ├── page.tsx              # Main portfolio page
│   └── globals.css           # Global styles
├── components/
│   ├── ui/                   # shadcn/ui components
│   ├── navbar.tsx            # Navigation with language toggle
│   ├── experience-timeline.tsx
│   ├── hero-background.tsx
│   └── language-toggle.tsx   # Language switcher
├── emails/                   # Email templates
│   ├── contact-notification.tsx
│   └── contact-autoresponse.tsx
├── lib/
│   ├── rate-limit.ts         # Rate limiting utility
│   ├── utils.ts              # Helper functions
│   └── validations/
│       └── contact.ts        # Form validation schemas
├── messages/
│   ├── en.json               # English translations
│   └── es.json               # Spanish translations
├── public/                   # Static assets
├── i18n.ts                   # i18n configuration
└── next.config.ts            # Next.js configuration
```

## 🌍 Internationalization

The portfolio supports English and Spanish with seamless switching:

- **Default Language:** English
- **Language Detection:** Cookie-based persistence
- **Toggle Location:** Navbar (desktop & mobile)
- **Translated Content:** All sections, forms, emails, and error messages

## 🔒 Rate Limiting

The contact form implements smart rate limiting to prevent spam:

- **Cooldown Period:** 30 minutes
- **Tracking Method:** IP address + email (dual tracking)
- **Storage:** In-memory LRU cache (serverless-friendly)
- **User Feedback:** Shows remaining wait time in minutes
- **Response Code:** HTTP 429 (Too Many Requests)

## 📧 Contact Form Features

- **Dual Email Notifications:**
  - Owner notification with contact details
  - Auto-response to the sender
- **Bilingual Email Templates:** Matches user's selected language
- **Form Validation:** Client and server-side with Zod
- **Error Handling:** User-friendly messages
- **Loading States:** Visual feedback during submission

## 🎨 Design Features

- **Glassmorphism UI:** Modern frosted glass effect
- **Smooth Animations:** Entrance animations, hover effects, scroll triggers
- **Custom Typography:** Inter for body, Poppins for headings
- **Responsive Grid:** Mobile-first with Tailwind breakpoints

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `RESEND_API_KEY` | API key from Resend for sending emails | Yes |
| `CONTACT_EMAIL` | Your email address to receive contact form submissions | Yes |

## 🚢 Deployment

This project is optimized for [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

The site will be automatically deployed with every push to the main branch.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Connect

- **Portfolio:** [diegopardo.dev](https://diegopardo.dev)
- **LinkedIn:** [dev-pardx](https://www.linkedin.com/in/dev-pardx/)
- **GitHub:** [DevPardx](https://github.com/DevPardx)
- **Email:** technology@quickstack.agency
