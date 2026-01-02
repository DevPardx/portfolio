import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/private/'],
      },
    ],
    sitemap: 'https://diegopardo.vercel.app/sitemap.xml',
    host: 'https://diegopardo.vercel.app',
  }
}
