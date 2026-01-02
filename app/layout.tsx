import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "sonner"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { cookies } from "next/headers"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-heading",
})

export const metadata: Metadata = {
  metadataBase: new URL('https://diegopardo.vercel.app'),
  title: {
    default: "Diego Pardo | Full-Stack Developer & Software Engineer",
    template: "%s | Diego Pardo"
  },
  description: "Experienced Full-Stack Developer specializing in TypeScript, React, Next.js, Node.js, and Rust. Building scalable, modern web applications and MVPs. Available for freelance projects and consulting.",
  keywords: [
    "Diego Pardo",
    "Full-Stack Developer",
    "Software Engineer",
    "TypeScript Developer",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "Rust Developer",
    "Web Development",
    "Frontend Developer",
    "Backend Developer",
    "Freelance Developer",
    "MVP Development",
    "Quickstack Agency",
  ],
  authors: [{ name: "Diego Pardo", url: "https://diegopardo.vercel.app" }],
  creator: "Diego Pardo",
  publisher: "Diego Pardo",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["es_ES"],
    url: "https://diegopardo.vercel.app",
    title: "Diego Pardo | Full-Stack Developer & Software Engineer",
    description: "Experienced Full-Stack Developer specializing in TypeScript, React, Next.js, Node.js, and Rust. Building scalable, modern web applications and MVPs.",
    siteName: "Diego Pardo Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Diego Pardo - Full-Stack Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Diego Pardo | Full-Stack Developer & Software Engineer",
    description: "Experienced Full-Stack Developer specializing in TypeScript, React, Next.js, Node.js, and Rust. Building scalable web applications.",
    images: ["/og-image.png"],
    creator: "@diegopardo",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "en"
  const messages = await getMessages()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Diego Pardo',
    jobTitle: 'Full-Stack Developer',
    description: 'Experienced Full-Stack Developer specializing in TypeScript, React, Next.js, Node.js, and Rust',
    url: 'https://diegopardo.vercel.app',
    email: 'diego@quickstack.agency',
    image: 'https://diegopardo.vercel.app/linkedin-pfp.jpeg',
    sameAs: [
      'https://github.com/DevPardx',
      'https://www.linkedin.com/in/dev-pardx/',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'San Salvador',
      addressCountry: 'El Salvador',
    },
    worksFor: {
      '@type': 'Organization',
      name: 'Quickstack Agency',
      url: 'https://quickstack.agency',
    },
    knowsAbout: [
      'TypeScript',
      'React',
      'Next.js',
      'Node.js',
      'Rust',
      'PostgreSQL',
      'MongoDB',
      'Full-Stack Development',
      'Web Development',
      'Software Engineering',
    ],
  }

  return (
    <html lang={locale} className="dark scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          {children}
          <Toaster position="top-right" theme="dark" richColors />
          <Analytics />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
