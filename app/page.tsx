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

export default function Home() {
    return (
        <>
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
        </>
    );
}
