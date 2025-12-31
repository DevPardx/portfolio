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
  title: "Full-Stack Developer | Portfolio",
  description: "Building scalable web solutions with modern technologies.",
  keywords: ["TypeScript", "React", "Next.js", "Node.js", "Rust", "Full-Stack Developer"],
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "en"
  const messages = await getMessages()

  return (
    <html lang={locale} className="dark scroll-smooth">
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
