import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const nanum = localFont({
    src: './fonts/NanumSquareNeo-Variable.ttf',
    weight: '100 900',
    variable: '--font-nanum',
    display: 'swap',
});

// #TODO: 도메인 확정되면 실제 주소로 교체
const SITE_URL = 'https://yonsei-jin-dental.vercel.app/';
const TITLE = '연세진치과 | 여주 임플란트·치아교정 치과';
const DESCRIPTION =
    '여주 연세진치과는 네비게이션 임플란트, 치아교정, 디지털 풀아치 진료를 제공하며 자연치아 보존과 철저한 위생관리를 원칙으로 합니다.';

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: { default: TITLE, template: '%s | 연세진치과' },
    description: DESCRIPTION,
    alternates: { canonical: '/' },
    openGraph: {
        title: TITLE,
        description: DESCRIPTION,
        url: SITE_URL,
        siteName: '연세진치과',
        type: 'website',
        locale: 'ko_KR',
        images: [
            {
                url: '/images/og-image.jpg',
                width: 1200,
                height: 630,
                alt: '연세진치과 - 정직한 진료, 세심한 치료를 약속드립니다',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: TITLE,
        description: DESCRIPTION,
        images: ['/images/og-image.jpg'],
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ko" className={nanum.variable}>
            <body>{children}</body>
        </html>
    );
}
