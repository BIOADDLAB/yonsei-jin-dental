import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingMenu from '@/components/layout/FloatingMenu';
import Hero from '@/components/sections/Hero';
import Intro from '@/components/sections/Intro';
import Contact from '@/components/sections/Contact';
import Philosophy from '@/components/sections/Philosophy';
import SpecialCare from '@/components/sections/SpecialCare';
import SignatureCare from '@/components/sections/SignatureCare';
import Doctor from '@/components/sections/Doctor';
import Research from '@/components/sections/Research';
import Faq from '../components/sections/faq';
import CoreTabs from './../components/sections/CoreTabs';
import NoticeSection from './../components/sections/NoticeSection';
import PopupModal from '@/components/popup/PopupModal';
import { CLINIC, DOCTOR, FAQ, SIGNATURE_CARE } from '@/data/site';

const SITE_URL = 'https://yonsei-jin-dental.vercel.app';

const faqEntities = FAQ.flatMap(({ items }) =>
    items
        .filter(({ a }) => a.trim().length > 0)
        .map(({ q, a }) => ({
            '@type': 'Question',
            name: q,
            acceptedAnswer: {
                '@type': 'Answer',
                text: a.replace(/\n/g, ' '),
            },
        })),
);

const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'WebSite',
            '@id': `${SITE_URL}/#website`,
            url: `${SITE_URL}/`,
            name: CLINIC.name,
            alternateName: CLINIC.nameEn,
            inLanguage: 'ko-KR',
        },
        {
            '@type': 'Dentist',
            '@id': `${SITE_URL}/#clinic`,
            name: CLINIC.name,
            alternateName: CLINIC.nameEn,
            description:
                '여주 연세진치과는 네비게이션 임플란트, 치아교정, 디지털 풀아치 진료를 제공하며 자연치아 보존과 철저한 위생관리를 원칙으로 합니다.',
            url: `${SITE_URL}/`,
            telephone: '+82-31-883-0045',
            image: `${SITE_URL}/images/og-image.jpg`,
            logo: `${SITE_URL}/images/logo.svg`,
            address: {
                '@type': 'PostalAddress',
                streetAddress: '세종로 375-1, 2층',
                addressLocality: '여주시',
                addressRegion: '경기도',
                addressCountry: 'KR',
            },
            geo: {
                '@type': 'GeoCoordinates',
                latitude: CLINIC.lat,
                longitude: CLINIC.lng,
            },
            openingHoursSpecification: [
                {
                    '@type': 'OpeningHoursSpecification',
                    dayOfWeek: ['Monday', 'Wednesday'],
                    opens: '09:00',
                    closes: '18:00',
                },
                {
                    '@type': 'OpeningHoursSpecification',
                    dayOfWeek: ['Tuesday', 'Friday'],
                    opens: '09:00',
                    closes: '20:30',
                },
                {
                    '@type': 'OpeningHoursSpecification',
                    dayOfWeek: 'Saturday',
                    opens: '09:00',
                    closes: '12:30',
                },
            ],
            medicalSpecialty: 'Dentistry',
            sameAs: ['https://naver.me/59vHMVNw'],
            employee: { '@id': `${SITE_URL}/#doctor` },
            hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: '연세진치과 진료 항목',
                itemListElement: SIGNATURE_CARE.map(({ title }) => ({
                    '@type': 'Offer',
                    itemOffered: {
                        '@type': 'MedicalProcedure',
                        name: title,
                    },
                })),
            },
        },
        {
            '@type': 'Person',
            '@id': `${SITE_URL}/#doctor`,
            name: DOCTOR.name,
            jobTitle: `${DOCTOR.role} 치과의사`,
            image: `${SITE_URL}${DOCTOR.image}`,
            worksFor: { '@id': `${SITE_URL}/#clinic` },
            alumniOf: {
                '@type': 'CollegeOrUniversity',
                name: '연세대학교 치과대학',
            },
        },
        {
            '@type': 'FAQPage',
            '@id': `${SITE_URL}/#faq`,
            mainEntity: faqEntities,
        },
    ],
};

export default function Home() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
                }}
            />
            <Header />
            <main>
                <Hero />
                <Intro />
                <Philosophy />
                <SpecialCare />
                <SignatureCare />
                <Doctor />
                <Research />
                <CoreTabs />
                <Faq />
                <NoticeSection />
                <Contact />
            </main>
            <Footer />
            <FloatingMenu />
            <PopupModal />
        </>
    );
}
