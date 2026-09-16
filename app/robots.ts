import type { MetadataRoute } from 'next';

const SITE_URL = 'https://www.yonseijin.com';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
        },
        sitemap: [`${SITE_URL}/sitemap.xml`, `${SITE_URL}/blog/sitemap.xml`],
        host: SITE_URL,
    };
}
