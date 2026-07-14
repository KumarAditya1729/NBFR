import type { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/studio/', '/private/'],
      },
      {
        userAgent: 'GPTBot',
        allow: ['/', '/publications/', '/bihar/'],
      },
    ],
    sitemap: 'https://nbrf.in/sitemap.xml',
  }
}
